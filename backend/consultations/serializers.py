from rest_framework import serializers
from accounts.serializers import UserSerializer
from accounts.models import User
from .models import Appointment, Consultation


class AppointmentSerializer(serializers.ModelSerializer):
    patient = UserSerializer(read_only=True)
    doctor = UserSerializer(read_only=True)
    patient_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(user_type='patient'), 
        source='patient', 
        write_only=True,
        required=False
    )
    doctor_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(user_type='doctor'),
        source='doctor',
        write_only=True
    )
    
    class Meta:
        model = Appointment
        fields = '__all__'


class ConsultationSerializer(serializers.ModelSerializer):
    appointment = AppointmentSerializer(read_only=True)
    
    class Meta:
        model = Consultation
        fields = '__all__'


class AppointmentDetailSerializer(serializers.ModelSerializer):
    patient = UserSerializer(read_only=True)
    doctor = UserSerializer(read_only=True)
    consultation = ConsultationSerializer(read_only=True, allow_null=True)
    
    class Meta:
        model = Appointment
        fields = '__all__'

