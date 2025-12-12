from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from datetime import date
from .models import MedicalHistoryEntry, MedicalDocument, Vaccination
from .serializers import (
    MedicalHistoryEntrySerializer,
    MedicalDocumentSerializer,
    VaccinationSerializer
)


class MedicalHistoryEntryViewSet(viewsets.ModelViewSet):
    serializer_class = MedicalHistoryEntrySerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'patient':
            return MedicalHistoryEntry.objects.filter(patient=user)
        elif user.user_type == 'doctor':
            # Les médecins peuvent voir l'historique de leurs patients
            return MedicalHistoryEntry.objects.filter(doctor=user)
        elif user.user_type == 'admin':
            return MedicalHistoryEntry.objects.all()
        return MedicalHistoryEntry.objects.none()
    
    def perform_create(self, serializer):
        if self.request.user.user_type == 'patient':
            serializer.save(patient=self.request.user)
        else:
            # Un médecin ou admin peut créer une entrée pour un patient
            serializer.save()


class MedicalDocumentViewSet(viewsets.ModelViewSet):
    serializer_class = MedicalDocumentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'patient':
            return MedicalDocument.objects.filter(entry__patient=user)
        elif user.user_type == 'doctor':
            return MedicalDocument.objects.filter(entry__doctor=user)
        elif user.user_type == 'admin':
            return MedicalDocument.objects.all()
        return MedicalDocument.objects.none()


class VaccinationViewSet(viewsets.ModelViewSet):
    serializer_class = VaccinationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'patient':
            return Vaccination.objects.filter(patient=user)
        elif user.user_type == 'doctor':
            return Vaccination.objects.filter(doctor=user)
        elif user.user_type == 'admin':
            return Vaccination.objects.all()
        return Vaccination.objects.none()
    
    @action(detail=False, methods=['get'])
    def upcoming(self, request):
        """Vaccinations bientôt dues ou en retard"""
        today = date.today()
        vaccinations = self.get_queryset().filter(
            next_due_date__lte=today
        ) | self.get_queryset().filter(
            next_due_date__lte=today + timezone.timedelta(days=30)
        )
        serializer = self.get_serializer(vaccinations, many=True)
        return Response(serializer.data)
