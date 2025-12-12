from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import Appointment, Consultation
from .serializers import (
    AppointmentSerializer, AppointmentDetailSerializer, ConsultationSerializer
)
from accounts.models import User


class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['status', 'doctor', 'patient']
    ordering_fields = ['date', 'created_at']
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return AppointmentDetailSerializer
        return AppointmentSerializer
    
    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'patient':
            return Appointment.objects.filter(patient=user)
        elif user.user_type == 'doctor':
            return Appointment.objects.filter(doctor=user)
        elif user.user_type == 'admin':
            return Appointment.objects.all()
        return Appointment.objects.none()
    
    def perform_create(self, serializer):
        user = self.request.user
        if user.user_type == 'patient':
            serializer.save(patient=user)
        else:
            serializer.save()
    
    @action(detail=True, methods=['post'])
    def confirm(self, request, pk=None):
        """Confirmer un rendez-vous"""
        appointment = self.get_object()
        if appointment.status == 'pending':
            appointment.status = 'confirmed'
            appointment.save()
            return Response({'status': 'confirmed'})
        return Response(
            {'error': 'Le rendez-vous ne peut pas être confirmé'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        """Annuler un rendez-vous"""
        appointment = self.get_object()
        appointment.status = 'cancelled'
        appointment.save()
        return Response({'status': 'cancelled'})
    
    @action(detail=True, methods=['post'])
    def start_consultation(self, request, pk=None):
        """Démarrer une consultation"""
        appointment = self.get_object()
        if appointment.status != 'confirmed':
            return Response(
                {'error': 'Le rendez-vous doit être confirmé'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        appointment.status = 'in_progress'
        appointment.save()
        
        # Créer la consultation si elle n'existe pas
        consultation, created = Consultation.objects.get_or_create(
            appointment=appointment,
            defaults={
                'consultation_type': request.data.get('consultation_type', 'teleconsultation')
            }
        )
        
        serializer = ConsultationSerializer(consultation)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def complete_consultation(self, request, pk=None):
        """Terminer une consultation"""
        appointment = self.get_object()
        if appointment.status != 'in_progress':
            return Response(
                {'error': 'La consultation doit être en cours'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        appointment.status = 'completed'
        appointment.save()
        
        # Mettre à jour la consultation
        consultation = getattr(appointment, 'consultation', None)
        if consultation:
            consultation.diagnosis = request.data.get('diagnosis', '')
            consultation.treatment = request.data.get('treatment', '')
            consultation.notes = request.data.get('notes', '')
            if request.data.get('next_appointment'):
                consultation.next_appointment = request.data.get('next_appointment')
            consultation.save()
        
        return Response({'status': 'completed'})


class ConsultationViewSet(viewsets.ModelViewSet):
    queryset = Consultation.objects.all()
    serializer_class = ConsultationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'patient':
            return Consultation.objects.filter(appointment__patient=user)
        elif user.user_type == 'doctor':
            return Consultation.objects.filter(appointment__doctor=user)
        elif user.user_type == 'admin':
            return Consultation.objects.all()
        return Consultation.objects.none()








