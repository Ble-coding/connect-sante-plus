"""
URL configuration for Pharma Africa Connect backend.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # JWT Authentication
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    
    # API endpoints
    path('api/accounts/', include('accounts.urls')),
    path('api/pharmacies/', include('pharmacies.urls')),
    path('api/consultations/', include('consultations.urls')),
    path('api/prescriptions/', include('prescriptions.urls')),
    path('api/medications/', include('medications.urls')),
    path('api/messaging/', include('messaging.urls')),
    path('api/notifications/', include('notifications.urls')),
    path('api/blog/', include('blog.urls')),
    path('api/faq/', include('faq.urls')),
    path('api/contact/', include('contact.urls')),
    path('api/medical-history/', include('medical_history.urls')),
    path('api/chatbot/', include('chatbot.urls')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

