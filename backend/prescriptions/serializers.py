from rest_framework import serializers
from accounts.serializers import UserSerializer
from medications.serializers import MedicationSerializer
from medications.models import Medication
from consultations.serializers import ConsultationSerializer
from .models import Prescription, PrescriptionMedication


class PrescriptionMedicationSerializer(serializers.ModelSerializer):
    medication = MedicationSerializer(read_only=True)
    medication_id = serializers.PrimaryKeyRelatedField(
        queryset=Medication.objects.all(),
        source='medication',
        write_only=True
    )
    
    class Meta:
        model = PrescriptionMedication
        fields = '__all__'


class PrescriptionSerializer(serializers.ModelSerializer):
    patient = UserSerializer(read_only=True)
    doctor = UserSerializer(read_only=True)
    consultation = ConsultationSerializer(read_only=True)
    medications = PrescriptionMedicationSerializer(many=True, read_only=True)
    
    class Meta:
        model = Prescription
        fields = '__all__'


class PrescriptionDetailSerializer(serializers.ModelSerializer):
    patient = UserSerializer(read_only=True)
    doctor = UserSerializer(read_only=True)
    consultation = ConsultationSerializer(read_only=True)
    medications = PrescriptionMedicationSerializer(many=True)
    
    class Meta:
        model = Prescription
        fields = '__all__'

