import random
from django.core.mail import send_mail

def generate_otp():
    return str(random.randint(100000, 999999))

def send_otp_via_email(email, otp):
    subject = "Your TummyTap OTP Code"
    message = f"Your OTP code is: {otp}"
    from_email = "your-email@gmail.com"
    send_mail(subject, message, from_email, [email])
