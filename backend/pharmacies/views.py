from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from .models import Pharmacy, PharmacyInventory
from .serializers import (
    PharmacySerializer, PharmacyDetailSerializer, PharmacyInventorySerializer
)
from medications.models import Medication


class PharmacyViewSet(viewsets.ModelViewSet):
    queryset = Pharmacy.objects.filter(is_active=True)
    serializer_class = PharmacySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    search_fields = ['name', 'city', 'address']
    filterset_fields = ['city', 'country', 'is_24_7']
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return PharmacyDetailSerializer
        return PharmacySerializer
    
    @action(detail=False, methods=['get'])
    def search(self, request):
        """Recherche de pharmacies par localisation et médicament"""
        latitude = request.query_params.get('latitude')
        longitude = request.query_params.get('longitude')
        medication_name = request.query_params.get('medication')
        city = request.query_params.get('city')
        
        queryset = self.queryset
        
        if city:
            queryset = queryset.filter(city__icontains=city)
        
        if medication_name:
            # Trouver les pharmacies qui ont ce médicament en stock
            medications = Medication.objects.filter(
                Q(name__icontains=medication_name) | 
                Q(generic_name__icontains=medication_name)
            )
            pharmacy_ids = PharmacyInventory.objects.filter(
                medication__in=medications,
                quantity__gt=0,
                is_available=True
            ).values_list('pharmacy_id', flat=True).distinct()
            queryset = queryset.filter(id__in=pharmacy_ids)
        
        # TODO: Implémenter la recherche par distance si latitude/longitude sont fournis
        # Pour l'instant, on retourne simplement les pharmacies filtrées
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def inventory(self, request, pk=None):
        """Obtenir l'inventaire d'une pharmacie"""
        pharmacy = self.get_object()
        inventory = PharmacyInventory.objects.filter(pharmacy=pharmacy, is_available=True)
        serializer = PharmacyInventorySerializer(inventory, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def check_medication(self, request, pk=None):
        """Vérifier la disponibilité d'un médicament dans une pharmacie"""
        pharmacy = self.get_object()
        medication_id = request.data.get('medication_id')
        
        if not medication_id:
            return Response(
                {'error': 'medication_id est requis'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            inventory = PharmacyInventory.objects.get(
                pharmacy=pharmacy,
                medication_id=medication_id,
                is_available=True
            )
            serializer = PharmacyInventorySerializer(inventory)
            return Response(serializer.data)
        except PharmacyInventory.DoesNotExist:
            return Response(
                {'available': False, 'message': 'Médicament non disponible'},
                status=status.HTTP_404_NOT_FOUND
            )


class PharmacyInventoryViewSet(viewsets.ModelViewSet):
    queryset = PharmacyInventory.objects.all()
    serializer_class = PharmacyInventorySerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['pharmacy', 'medication', 'is_available']
    
    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'pharmacist':
            # Les pharmaciens ne voient que l'inventaire de leur pharmacie
            try:
                pharmacy = user.pharmacist_profile.pharmacy
                return PharmacyInventory.objects.filter(pharmacy=pharmacy)
            except:
                return PharmacyInventory.objects.none()
        elif user.user_type == 'admin':
            return PharmacyInventory.objects.all()
        return PharmacyInventory.objects.none()








