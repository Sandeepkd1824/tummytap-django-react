from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.text import slugify
from django.db.models import JSONField
from django.utils import timezone

User = get_user_model()


class TimeStampedModel(models.Model):
    """Abstract base model with timestamp fields"""

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Category(TimeStampedModel):
    name = models.CharField(max_length=100, unique=True)
    image = models.ImageField(upload_to="category_images/")
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Product(TimeStampedModel):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    main_image = models.ImageField(upload_to="product_images/", null=True, blank=True)
    is_available = models.BooleanField(default=True)
    display_order = models.PositiveIntegerField(default=0)
    stock_count = models.PositiveIntegerField(default=100)

    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="products"
    )

    tags = JSONField(default=list, blank=True)  # Store tags like ["spicy", "vegan"]

    def __str__(self):
        return self.name


class ProductImage(TimeStampedModel):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="images"
    )
    image = models.ImageField(upload_to="product_images/")
    is_primary = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.product.name} Image"


class Review(TimeStampedModel):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="reviews"
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    comment = models.TextField(blank=True)

    def __str__(self):
        return f"{self.user.email} - {self.product.name} ({self.rating})"


class Favorite(TimeStampedModel):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="favorites"
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("product", "user")

    def __str__(self):
        return f"{self.user.email} ❤️ {self.product.name}"


class DeliverySlot(TimeStampedModel):
    """Used for pre-booking delivery windows"""

    start_time = models.TimeField()
    end_time = models.TimeField()
    label = models.CharField(max_length=100, help_text="e.g., Morning, Evening")

    def __str__(self):
        return f"{self.label} ({self.start_time} - {self.end_time})"


class DietPlan(TimeStampedModel):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price_per_day = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to="diet_plans/")

    def __str__(self):
        return self.name


class SpecialEvent(TimeStampedModel):
    """For festival or party items"""

    name = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to="event_images/")
    slug = models.SlugField(unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class CartItem(TimeStampedModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="cart_items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {self.product.name} × {self.quantity}"


class Order(TimeStampedModel):
    ORDER_STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("PROCESSING", "Processing"),
        ("DELIVERED", "Delivered"),
        ("CANCELLED", "Cancelled"),
    ]

    PAYMENT_STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("PAID", "Paid"),
        ("FAILED", "Failed"),
        ("REFUNDED", "Refunded"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="orders")
    status = models.CharField(
        max_length=20, choices=ORDER_STATUS_CHOICES, default="PENDING"
    )
    payment_status = models.CharField(
        max_length=20, choices=PAYMENT_STATUS_CHOICES, default="PENDING"
    )
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    delivery_slot = models.ForeignKey(
        DeliverySlot, on_delete=models.SET_NULL, null=True, blank=True
    )
    address = models.TextField()

    def __str__(self):
        return f"Order #{self.id} - {self.user.email} - {self.status}"

    @property
    def is_completed(self):
        return self.status in ["DELIVERED", "CANCELLED"]


class OrderItem(TimeStampedModel):
    order = models.ForeignKey(
        Order, on_delete=models.CASCADE, related_name="order_items"
    )
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    quantity = models.PositiveIntegerField(default=1)
    price_at_time = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.product.name} × {self.quantity} in Order #{self.order.id}"


class MonthlySubscription(TimeStampedModel):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="monthly_subscriptions"
    )
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    delivery_slot = models.ForeignKey(
        DeliverySlot, on_delete=models.SET_NULL, null=True, blank=True
    )
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.user.email} - {self.product.name} [{self.start_date} to {self.end_date}]"
