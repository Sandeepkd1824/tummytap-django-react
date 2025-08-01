from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register("categories", CategoryViewSet)
router.register("products", ProductViewSet)
router.register("cart", CartItemViewSet, basename="cart")
router.register("reviews", ReviewViewSet)
router.register("favorites", FavoriteViewSet)
router.register("diet-plans", DietPlanViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
