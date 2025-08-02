from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, EmailOTP


class CustomUserAdmin(UserAdmin):
    list_display = ("email", "is_staff", "is_active", "is_verified", "date_joined")
    list_filter = ("is_staff", "is_active", "is_verified")
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (
            "Permissions",
            {
                "fields": (
                    "is_staff",
                    "is_active",
                    "is_verified",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        (
            "Important dates",
            {"fields": ("last_login",)},
        ),  # Removed date_joined from here
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "password1", "password2", "is_staff", "is_active"),
            },
        ),
    )
    search_fields = ("email",)
    ordering = ("email",)
    filter_horizontal = (
        "groups",
        "user_permissions",
    )
    readonly_fields = (
        "date_joined",
        "last_login",
    )  # Add date_joined to readonly_fields


class EmailOTPAdmin(admin.ModelAdmin):
    list_display = ("email", "otp", "created_at", "is_expired")
    list_filter = ("created_at",)
    search_fields = ("email",)
    readonly_fields = ("created_at", "is_expired")


# Register your models here
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(EmailOTP, EmailOTPAdmin)
