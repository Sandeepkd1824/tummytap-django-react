from django.contrib import admin
from .models import (
    Category,
    Product,
    ProductImage,
    Review,
    Favorite,
    DeliverySlot,
    DietPlan,
    SpecialEvent,
    CartItem,
    Order,
    OrderItem,
    MonthlySubscription,
)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "is_active")
    search_fields = ("name",)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "category", "price", "is_available", "stock_count")
    list_filter = ("category", "is_available", "tags")
    search_fields = ("name",)


@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ("id", "product", "is_primary")
    list_filter = ("is_primary",)


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("id", "product", "user", "rating", "created_at")
    list_filter = ("rating", "created_at")


@admin.register(Favorite)
class FavoriteAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "product", "created_at")


@admin.register(DeliverySlot)
class DeliverySlotAdmin(admin.ModelAdmin):
    list_display = ("id", "label", "start_time", "end_time")


@admin.register(DietPlan)
class DietPlanAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "price_per_day")


@admin.register(SpecialEvent)
class SpecialEventAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "slug", "created_at")
    prepopulated_fields = {"slug": ("name",)}


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "product", "quantity", "created_at")


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "status",
        "payment_status",
        "total_price",
        "created_at",
    )
    list_filter = ("status", "payment_status", "created_at")


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ("id", "order", "product", "quantity", "price_at_time")


@admin.register(MonthlySubscription)
class MonthlySubscriptionAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "product", "start_date", "end_date", "is_active")
    list_filter = ("is_active",)
