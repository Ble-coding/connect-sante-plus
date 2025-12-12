from rest_framework import serializers
from .models import MedicalHistoryEntry, MedicalDocument, Vaccination
from accounts.serializers import UserSerializer


class MedicalDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalDocument
        fields = '__all__'


class MedicalHistoryEntrySerializer(serializers.ModelSerializer):
    patient = UserSerializer(read_only=True)
    doctor = UserSerializer(read_only=True, allow_null=True)
    documents = MedicalDocumentSerializer(many=True, read_only=True)
    consultation_id = serializers.IntegerField(write_only=True, required=False, allow_null=True)
    prescription_id = serializers.IntegerField(write_only=True, required=False, allow_null=True)

    class Meta:
        model = MedicalHistoryEntry
        fields = '__all__'
    
    def create(self, validated_data):
        consultation_id = validated_data.pop('consultation_id', None)
        prescription_id = validated_data.pop('prescription_id', None)
        
        if consultation_id:
            from consultations.models import Consultation
            try:
                validated_data['consultation'] = Consultation.objects.get(id=consultation_id)
            except Consultation.DoesNotExist:
                pass
        
        if prescription_id:
            from prescriptions.models import Prescription
            try:
                validated_data['prescription'] = Prescription.objects.get(id=prescription_id)
            except Prescription.DoesNotExist:
                pass
        
        return super().create(validated_data)


class VaccinationSerializer(serializers.ModelSerializer):
    patient = UserSerializer(read_only=True)
    doctor = UserSerializer(read_only=True, allow_null=True)
    history_entry = MedicalHistoryEntrySerializer(read_only=True, allow_null=True)

    class Meta:
        model = Vaccination
        fields = '__all__'








