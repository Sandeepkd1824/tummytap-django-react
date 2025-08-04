# accounts/urls.py
from django.urls import path
from .views import (
    RegisterView,
    VerifyOTPView,
    JWTLoginView,
    UserProfileView,
    DeliveryAddressViewSet,
    UserUpdateView,
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    # path('send-otp/', SendOTPView.as_view(), name='send_otp'),
    path("verify-otp/", VerifyOTPView.as_view(), name="verify_otp"),
    # path('login/', LoginView.as_view(), name="login"),
    path("login/", JWTLoginView.as_view(), name="login"),
    path("profile/", UserProfileView.as_view(), name="user-profile"),
    path("user/", UserUpdateView.as_view(), name="user-update"),
    path("addresses/", DeliveryAddressViewSet.as_view({"get": "list", "post": "create"}), name="user-addresses"),
    path("addresses/<int:pk>/", DeliveryAddressViewSet.as_view({"get": "retrieve", "put": "update", "delete": "destroy"}), name="user-address-detail"),
]
