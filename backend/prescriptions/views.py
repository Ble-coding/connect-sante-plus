from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import Prescription, PrescriptionMedication
from .serializers import PrescriptionSerializer, PrescriptionDetailSerializer, PrescriptionMedicationSerializer


class PrescriptionViewSet(viewsets.ModelViewSet):
    queryset = Prescription.objects.all()
    serializer_class = PrescriptionSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['status', 'patient', 'doctor']
    ordering_fields = ['issue_date', 'created_at']
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return PrescriptionDetailSerializer
        return PrescriptionSerializer
    
    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'patient':
            return Prescription.objects.filter(patient=user)
        elif user.user_type == 'doctor':
            return Prescription.objects.filter(doctor=user)
        elif user.user_type == 'admin':
            return Prescription.objects.all()
        return Prescription.objects.none()
    
    @action(detail=False, methods=['get'])
    def active(self, request):
        """Obtenir les ordonnances actives"""
        user = request.user
        queryset = self.get_queryset().filter(status='active', valid_until__gte=timezone.now())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def completed(self, request):
        """Obtenir les ordonnances terminées"""
        user = request.user
        queryset = self.get_queryset().filter(status='completed')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def complete(self, request, pk=None):
        """Marquer une ordonnance comme terminée"""
        prescription = self.get_object()
        prescription.status = 'completed'
        prescription.save()
        return Response({'status': 'completed'})








