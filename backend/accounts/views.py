from django.contrib.auth import authenticate
from django.core.mail import send_mail
from django.conf import settings
from django.utils.crypto import get_random_string
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, viewsets, generics
from .models import CustomUser, EmailOTP, DeliveryAddress
from .serializers import (
    RegisterSerializer,
    LoginSerializer,
    JWTLoginSerializer,
    UserDetailSerializer,
    DeliveryAddressSerializer,
    UserUpdateSerializer,
)


def send_otp(email):
    otp = get_random_string(length=6, allowed_chars='0123456789')
    EmailOTP.objects.update_or_create(email=email, defaults={"otp": otp})

    subject = "Your OTP Code for TummyTap"
    message = f"Your OTP code is: {otp}"
    from_email = settings.EMAIL_HOST_USER
    recipient_list = [email]

    send_mail(subject, message, from_email, recipient_list)
    print(f"[DEBUG] OTP sent to {email}: {otp}")  # helpful in development


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save(is_verified=False)
            send_otp(user.email)
            return Response({"message": "User registered. OTP sent to email."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyOTPView(APIView):
    def post(self, request):
        email = request.data.get("email")
        otp = request.data.get("otp")

        if not email or not otp:
            return Response({"error": "Email and OTP are required"}, status=400)

        try:
            otp_obj = EmailOTP.objects.get(email=email)
        except EmailOTP.DoesNotExist:
            return Response({"error": "No OTP found for this email"}, status=404)

        if otp_obj.otp == otp:
            try:
                user = CustomUser.objects.get(email=email)
                user.is_verified = True
                user.save()
                otp_obj.delete()
                return Response({"message": "Email verified successfully"}, status=200)
            except CustomUser.DoesNotExist:
                return Response({"error": "User not found"}, status=404)
        else:
            return Response({"error": "Invalid OTP"}, status=400)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(request, email=email, password=password)

            if user is not None:
                if not user.is_verified:
                    return Response({"error": "Please verify your email before logging in"}, status=403)
                return Response({"message": "Login successful"}, status=200)
            else:
                return Response({"error": "Invalid credentials"}, status=401)
        return Response(serializer.errors, status=400)

class JWTLoginView(APIView):
    def post(self, request):
        serializer = JWTLoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=200)
        return Response(serializer.errors, status=401)


class UserProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserDetailSerializer(user)
        return Response(serializer.data)


class UserUpdateView(generics.RetrieveUpdateAPIView):
    serializer_class = UserUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class DeliveryAddressViewSet(viewsets.ModelViewSet):
    serializer_class = DeliveryAddressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return DeliveryAddress.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
