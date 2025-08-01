# products/views.py

from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import *
from .serializers import *
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ["name"]


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["category", "is_available"]
    search_fields = ["name", "description"]


class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        product = serializer.validated_data["product"]
        quantity = serializer.validated_data["quantity"]

        cart_item, created = CartItem.objects.get_or_create(
            user=self.request.user,
            product=product,
            defaults={"quantity": quantity},
        )
        if not created:
            cart_item.quantity += quantity
            cart_item.save()
        serializer.instance = cart_item

    def destroy(self, request, pk=None):
        return self._delete_item(request, pk)

    @action(detail=False, methods=["delete"], url_path="clear")
    def clear_cart(self, request):
        CartItem.objects.filter(user=request.user).delete()
        return Response({"message": "Cart cleared."}, status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=["post"], url_path="increase")
    def increase_quantity(self, request, pk=None):
        return self._adjust_quantity(request, pk, increase=True)

    @action(detail=True, methods=["post"], url_path="decrease")
    def decrease_quantity(self, request, pk=None):
        return self._adjust_quantity(request, pk, increase=False)

    # --- Private helper methods ---

    def _get_cart_item(self, user, pk):
        try:
            return CartItem.objects.get(user=user, product_id=pk)
        except CartItem.DoesNotExist:
            return None

    def _delete_item(self, request, pk):
        item = self._get_cart_item(request.user, pk)
        if item:
            item.delete()
            return Response(
                {"message": "Product removed from cart."},
                status=status.HTTP_204_NO_CONTENT,
            )
        return Response(
            {"error": "Product not found in cart."}, status=status.HTTP_404_NOT_FOUND
        )

    def _adjust_quantity(self, request, pk, increase=True):
        item = self._get_cart_item(request.user, pk)
        if not item:
            return Response(
                {"error": "Item not found in cart."}, status=status.HTTP_404_NOT_FOUND
            )

        if increase:
            item.quantity += 1
            item.save()
            return Response(
                {"message": "Quantity increased.", "quantity": item.quantity}
            )
        else:
            if item.quantity > 1:
                item.quantity -= 1
                item.save()
                return Response(
                    {"message": "Quantity decreased.", "quantity": item.quantity}
                )
            else:
                item.delete()
                return Response(
                    {"message": "Item removed from cart."},
                    status=status.HTTP_204_NO_CONTENT,
                )


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["product", "user"]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class FavoriteViewSet(viewsets.ModelViewSet):
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["product", "user"]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class DietPlanViewSet(viewsets.ModelViewSet):
    queryset = DietPlan.objects.all()
    serializer_class = DietPlanSerializer
    permission_classes = [permissions.IsAuthenticated]
