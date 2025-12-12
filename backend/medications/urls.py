from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MedicationViewSet, PatientMedicationViewSet

router = DefaultRouter()
router.register(r'medications', MedicationViewSet, basename='medication')
router.register(r'patient-medications', PatientMedicationViewSet, basename='patient-medication')

urlpatterns = [
    path('', include(router.urls)),
]

