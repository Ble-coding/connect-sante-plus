from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from datetime import datetime, timedelta
from .models import Medication, PatientMedication, MedicationDose
from .serializers import (
    MedicationSerializer, 
    PatientMedicationSerializer, 
    PatientMedicationDetailSerializer,
    MedicationDoseSerializer
)


class MedicationViewSet(viewsets.ModelViewSet):
    queryset = Medication.objects.all()
    serializer_class = MedicationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    search_fields = ['name', 'generic_name', 'active_ingredient']
    ordering_fields = ['name', 'created_at']


class PatientMedicationViewSet(viewsets.ModelViewSet):
    serializer_class = PatientMedicationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'patient':
            return PatientMedication.objects.filter(patient=user)
        elif user.user_type == 'admin':
            return PatientMedication.objects.all()
        return PatientMedication.objects.none()
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return PatientMedicationDetailSerializer
        return PatientMedicationSerializer
    
    @action(detail=False, methods=['get'])
    def active(self, request):
        """Médicaments actifs du patient"""
        medications = self.get_queryset().filter(status='active')
        serializer = self.get_serializer(medications, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def today_schedule(self, request):
        """Planning des prises du jour"""
        today = timezone.now().date()
        start_of_day = timezone.make_aware(datetime.combine(today, datetime.min.time()))
        end_of_day = timezone.make_aware(datetime.combine(today, datetime.max.time()))
        
        # Récupérer toutes les doses prévues pour aujourd'hui
        doses = MedicationDose.objects.filter(
            patient_medication__patient=request.user,
            scheduled_time__gte=start_of_day,
            scheduled_time__lte=end_of_day
        ).order_by('scheduled_time')
        
        serializer = MedicationDoseSerializer(doses, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def mark_dose_taken(self, request, pk=None):
        """Marquer une dose comme prise"""
        patient_medication = self.get_object()
        dose_id = request.data.get('dose_id')
        
        if dose_id:
            try:
                dose = MedicationDose.objects.get(
                    id=dose_id,
                    patient_medication=patient_medication
                )
                dose.taken = True
                dose.taken_time = timezone.now()
                dose.overdue = False
                dose.save()
                
                # Mettre à jour le médicament
                patient_medication.last_taken_at = timezone.now()
                if patient_medication.remaining_doses > 0:
                    patient_medication.remaining_doses -= 1
                if patient_medication.remaining_doses == 0:
                    patient_medication.status = 'completed'
                patient_medication.save()
                
                return Response(MedicationDoseSerializer(dose).data)
            except MedicationDose.DoesNotExist:
                return Response(
                    {'error': 'Dose non trouvée'}, 
                    status=status.HTTP_404_NOT_FOUND
                )
        
        return Response(
            {'error': 'dose_id requis'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    @action(detail=True, methods=['post'])
    def toggle_reminders(self, request, pk=None):
        """Activer/désactiver les rappels"""
        patient_medication = self.get_object()
        patient_medication.reminders_enabled = not patient_medication.reminders_enabled
        patient_medication.save()
        return Response(PatientMedicationSerializer(patient_medication).data)
    
    @action(detail=True, methods=['post'])
    def stop(self, request, pk=None):
        """Arrêter le traitement"""
        patient_medication = self.get_object()
        patient_medication.status = 'stopped'
        patient_medication.end_date = timezone.now().date()
        patient_medication.save()
        return Response(PatientMedicationSerializer(patient_medication).data)
