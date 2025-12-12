from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet, PatientProfileViewSet, 
    DoctorProfileViewSet, PharmacistProfileViewSet
)

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'patient-profiles', PatientProfileViewSet, basename='patient-profile')
router.register(r'doctor-profiles', DoctorProfileViewSet, basename='doctor-profile')
router.register(r'pharmacist-profiles', PharmacistProfileViewSet, basename='pharmacist-profile')

urlpatterns = [
    path('', include(router.urls)),
]








