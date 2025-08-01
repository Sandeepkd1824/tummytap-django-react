# accounts/urls.py
from django.urls import path
from .views import RegisterView, VerifyOTPView, LoginView, JWTLoginView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    # path('send-otp/', SendOTPView.as_view(), name='send_otp'),
    path('verify-otp/', VerifyOTPView.as_view(), name='verify_otp'),
    # path('login/', LoginView.as_view(), name="login"),
    path('login/', JWTLoginView.as_view(), name="login")
]
