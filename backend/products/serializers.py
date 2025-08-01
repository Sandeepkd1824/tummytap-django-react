from rest_framework import serializers
from .models import (
    Category,
    Product,
    ProductImage,
    Review,
    Favorite,
    DietPlan,
    SpecialEvent,
    CartItem,
    Order,
    OrderItem,
    MonthlySubscription,
    DeliverySlot,
)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", "image", "is_primary"]


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source="category", write_only=True
    )
    images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "description",
            "price",
            "category",
            "category_id",
            "tags",
            "main_image",
            "images",
            "is_available",
            "display_order",
            "stock_count",
            "created_at",
            "updated_at",
        ]


class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source="product.name")
    product_price = serializers.ReadOnlyField(source="product.price")

    class Meta:
        model = CartItem
        fields = [
            "id",
            "product",
            "product_name",
            "product_price",
            "quantity",
            "added_at",
        ]


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"


class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = "__all__"


class DietPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = DietPlan
        fields = "__all__"


class SpecialEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpecialEvent
        fields = "__all__"


class DeliverySlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliverySlot
        fields = "__all__"


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(), source="product", write_only=True
    )

    class Meta:
        model = OrderItem
        fields = ["id", "order", "product", "product_id", "quantity", "price_at_time"]


class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True, read_only=True)
    delivery_slot = DeliverySlotSerializer(read_only=True)
    delivery_slot_id = serializers.PrimaryKeyRelatedField(
        queryset=DeliverySlot.objects.all(),
        source="delivery_slot",
        write_only=True,
        allow_null=True,
        required=False,
    )

    class Meta:
        model = Order
        fields = [
            "id",
            "user",
            "status",
            "payment_status",
            "total_price",
            "delivery_slot",
            "delivery_slot_id",
            "address",
            "order_items",
            "created_at",
            "updated_at",
        ]


class MonthlySubscriptionSerializer(serializers.ModelSerializer):
    delivery_slot = DeliverySlotSerializer(read_only=True)
    delivery_slot_id = serializers.PrimaryKeyRelatedField(
        queryset=DeliverySlot.objects.all(),
        source="delivery_slot",
        write_only=True,
        allow_null=True,
        required=False,
    )

    class Meta:
        model = MonthlySubscription
        fields = [
            "id",
            "user",
            "product",
            "start_date",
            "end_date",
            "delivery_slot",
            "delivery_slot_id",
            "is_active",
            "created_at",
            "updated_at",
        ]
