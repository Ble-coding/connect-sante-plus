from rest_framework import serializers
from .models import Medication, PatientMedication, MedicationDose
from accounts.serializers import UserSerializer


class MedicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medication
        fields = '__all__'


class MedicationDoseSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicationDose
        fields = '__all__'


class PatientMedicationSerializer(serializers.ModelSerializer):
    medication = MedicationSerializer(read_only=True)
    medication_id = serializers.PrimaryKeyRelatedField(
        queryset=Medication.objects.all(),
        source='medication',
        write_only=True
    )
    patient = UserSerializer(read_only=True)
    prescription_id = serializers.IntegerField(
        source='prescription.id',
        write_only=True,
        required=False,
        allow_null=True
    )
    doses = MedicationDoseSerializer(many=True, read_only=True)

    class Meta:
        model = PatientMedication
        fields = '__all__'
    
    def create(self, validated_data):
        prescription_id = validated_data.pop('prescription', {}).get('id') if 'prescription' in validated_data else None
        if prescription_id:
            from prescriptions.models import Prescription
            try:
                validated_data['prescription'] = Prescription.objects.get(id=prescription_id)
            except Prescription.DoesNotExist:
                pass
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        prescription_data = validated_data.pop('prescription', {})
        if prescription_data and 'id' in prescription_data:
            from prescriptions.models import Prescription
            try:
                instance.prescription = Prescription.objects.get(id=prescription_data['id'])
            except Prescription.DoesNotExist:
                pass
        return super().update(instance, validated_data)


class PatientMedicationDetailSerializer(serializers.ModelSerializer):
    medication = MedicationSerializer(read_only=True)
    patient = UserSerializer(read_only=True)
    prescription = serializers.SerializerMethodField()
    doses = MedicationDoseSerializer(many=True, read_only=True)

    class Meta:
        model = PatientMedication
        fields = '__all__'
    
    def get_prescription(self, obj):
        if obj.prescription:
            from prescriptions.serializers import PrescriptionSerializer
            return PrescriptionSerializer(obj.prescription).data
        return None
