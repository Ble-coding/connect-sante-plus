from rest_framework import serializers
from accounts.serializers import UserSerializer
from medications.serializers import MedicationSerializer
from medications.models import Medication
from .models import Pharmacy, PharmacyInventory


class PharmacySerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    
    class Meta:
        model = Pharmacy
        fields = '__all__'


class PharmacyInventorySerializer(serializers.ModelSerializer):
    pharmacy = PharmacySerializer(read_only=True)
    medication = MedicationSerializer(read_only=True)
    pharmacy_id = serializers.PrimaryKeyRelatedField(queryset=Pharmacy.objects.all(), source='pharmacy', write_only=True)
    medication_id = serializers.PrimaryKeyRelatedField(queryset=Medication.objects.all(), source='medication', write_only=True)
    
    class Meta:
        model = PharmacyInventory
        fields = '__all__'


class PharmacyDetailSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    inventory = PharmacyInventorySerializer(many=True, read_only=True)
    
    class Meta:
        model = Pharmacy
        fields = '__all__'

