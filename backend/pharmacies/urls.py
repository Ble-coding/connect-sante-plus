from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PharmacyViewSet, PharmacyInventoryViewSet

router = DefaultRouter()
router.register(r'pharmacies', PharmacyViewSet, basename='pharmacy')
router.register(r'inventory', PharmacyInventoryViewSet, basename='pharmacy-inventory')

urlpatterns = [
    path('', include(router.urls)),
]








