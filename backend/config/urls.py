# config/urls.py

from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path("admin/", admin.site.urls),

    path("api/accounts/", include("accounts.urls")),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    # Product-related
    path("api/products/", include("products.urls")),  # ✅ Add this line
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
