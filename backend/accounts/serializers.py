from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from django.core.mail import send_mail
from django.conf import settings
from django.utils.crypto import get_random_string
from django.utils import timezone
from datetime import timedelta
import requests
from .models import User, PatientProfile, DoctorProfile, PharmacistProfile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 
                  'user_type', 'phone', 'profile_picture', 'is_verified', 
                  'date_joined', 'created_at']
        read_only_fields = ['id', 'date_joined', 'created_at']


class PatientProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = PatientProfile
        fields = '__all__'


class DoctorProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = DoctorProfile
        fields = '__all__'


class PharmacistProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = PharmacistProfile
        fields = '__all__'


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    user_type = serializers.ChoiceField(choices=User.USER_TYPES, required=True)
    specialization = serializers.CharField(required=False, allow_blank=True)
    license_number = serializers.CharField(required=False, allow_blank=True)
    captcha_token = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2', 'first_name', 
                  'last_name', 'phone', 'user_type', 'specialization', 'license_number', 'captcha_token']

    def validate_captcha_token(self, value):
        """Valider le token reCAPTCHA"""
        secret_key = settings.RECAPTCHA_SECRET_KEY
        if not secret_key:
            # En développement, on peut accepter un token de test
            if settings.DEBUG:
                return value
            raise serializers.ValidationError("Configuration reCAPTCHA manquante")
        
        try:
            response = requests.post(
                'https://www.google.com/recaptcha/api/siteverify',
                data={
                    'secret': secret_key,
                    'response': value
                },
                timeout=5
            )
            result = response.json()
            if not result.get('success'):
                raise serializers.ValidationError("Vérification captcha échouée")
        except requests.RequestException:
            if settings.DEBUG:
                return value
            raise serializers.ValidationError("Erreur lors de la vérification captcha")
        
        return value

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Les mots de passe ne correspondent pas."})
        
        # Validation spécifique pour les médecins et pharmaciens
        if attrs['user_type'] == 'doctor':
            if not attrs.get('specialization'):
                raise serializers.ValidationError({"specialization": "La spécialité est requise pour les médecins."})
            if not attrs.get('license_number'):
                raise serializers.ValidationError({"license_number": "Le numéro de licence est requis pour les médecins."})
        elif attrs['user_type'] == 'pharmacist':
            if not attrs.get('license_number'):
                raise serializers.ValidationError({"license_number": "Le numéro de licence est requis pour les pharmaciens."})
        
        return attrs

    def create(self, validated_data):
        password2 = validated_data.pop('password2')
        captcha_token = validated_data.pop('captcha_token')
        specialization = validated_data.pop('specialization', '')
        license_number = validated_data.pop('license_number', '')
        
        # Créer l'utilisateur mais inactif jusqu'à vérification email
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            phone=validated_data.get('phone', ''),
            user_type=validated_data['user_type'],
            is_active=False,  # Désactiver jusqu'à vérification
        )
        
        # Générer un code de vérification
        verification_code = get_random_string(length=6, allowed_chars='0123456789')
        user.verification_code = verification_code
        user.verification_code_expires = timezone.now() + timedelta(hours=24)
        user.save()
        
        # Envoyer l'email de vérification
        try:
            send_mail(
                subject='Vérification de votre compte Pharma Africa Connect',
                message=f'''Bonjour {user.first_name},

Merci de vous être inscrit sur Pharma Africa Connect.

Votre code de vérification est : {verification_code}

Ce code est valide pendant 24 heures.

Cordialement,
L'équipe Pharma Africa Connect''',
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[user.email],
                fail_silently=False,
            )
        except Exception as e:
            # En cas d'erreur d'envoi d'email, on continue quand même
            # En production, vous pourriez vouloir logger cette erreur
            if not settings.DEBUG:
                print(f"Erreur envoi email: {e}")
        
        # Créer le profil selon le type d'utilisateur
        if user.user_type == 'patient':
            PatientProfile.objects.create(user=user)
        elif user.user_type == 'doctor':
            DoctorProfile.objects.create(
                user=user,
                specialization=specialization,
                license_number=license_number,
            )
        elif user.user_type == 'pharmacist':
            PharmacistProfile.objects.create(
                user=user,
                license_number=license_number,
            )
        
        return user


class UserDetailSerializer(serializers.ModelSerializer):
    patient_profile = PatientProfileSerializer(read_only=True)
    doctor_profile = DoctorProfileSerializer(read_only=True)
    pharmacist_profile = PharmacistProfileSerializer(read_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 
                  'user_type', 'phone', 'profile_picture', 'is_verified',
                  'date_joined', 'created_at', 'patient_profile', 
                  'doctor_profile', 'pharmacist_profile']

