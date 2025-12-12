from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MedicalHistoryEntryViewSet, MedicalDocumentViewSet, VaccinationViewSet

router = DefaultRouter()
router.register(r'entries', MedicalHistoryEntryViewSet, basename='medical-history-entry')
router.register(r'documents', MedicalDocumentViewSet, basename='medical-document')
router.register(r'vaccinations', VaccinationViewSet, basename='vaccination')

urlpatterns = [
    path('', include(router.urls)),
]








