from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from django.utils import timezone
from .models import PatientProfile, DoctorProfile, PharmacistProfile
from .serializers import (
    UserSerializer, RegisterSerializer, UserDetailSerializer,
    PatientProfileSerializer, DoctorProfileSerializer, PharmacistProfileSerializer
)

User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_serializer_class(self):
        if self.action == 'retrieve' or self.action == 'me':
            return UserDetailSerializer
        return UserSerializer
    
    @action(detail=False, methods=['post'], permission_classes=[permissions.AllowAny])
    def register(self, request):
        """Inscription d'un nouvel utilisateur"""
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # Retourner une indication que la vérification email est requise
            return Response({
                'message': 'Inscription réussie. Un email de vérification a été envoyé.',
                'requires_verification': True,
                'email': user.email
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['post'], permission_classes=[permissions.AllowAny])
    def verify_email(self, request):
        """Vérifier l'email avec le code"""
        email = request.data.get('email')
        code = request.data.get('code')
        
        if not email or not code:
            return Response(
                {'detail': 'Email et code requis.'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            user = User.objects.get(email=email)
            if user.verification_code == code:
                if user.verification_code_expires and user.verification_code_expires < timezone.now():
                    return Response(
                        {'detail': 'Code de vérification expiré.'}, 
                        status=status.HTTP_400_BAD_REQUEST
                    )
                user.is_active = True
                user.is_verified = True
                user.verification_code = None
                user.verification_code_expires = None
                user.save()
                
                refresh = RefreshToken.for_user(user)
                return Response({
                    'user': UserDetailSerializer(user).data,
                    'tokens': {
                        'refresh': str(refresh),
                        'access': str(refresh.access_token),
                    }
                }, status=status.HTTP_200_OK)
            else:
                return Response(
                    {'detail': 'Code de vérification invalide.'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
        except User.DoesNotExist:
            return Response(
                {'detail': 'Utilisateur non trouvé.'}, 
                status=status.HTTP_404_NOT_FOUND
            )
    
    @action(detail=False, methods=['get', 'put', 'patch'])
    def me(self, request):
        """Obtenir ou mettre à jour le profil de l'utilisateur connecté"""
        if not request.user.is_authenticated:
            return Response(
                {'detail': 'Authentification requise.'}, 
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        user = request.user
        if request.method == 'GET':
            serializer = self.get_serializer(user)
            return Response(serializer.data)
        elif request.method in ['PUT', 'PATCH']:
            serializer = self.get_serializer(user, data=request.data, partial=request.method == 'PATCH')
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.AllowAny])
    def doctors(self, request):
        """Liste des médecins"""
        doctors = User.objects.filter(user_type='doctor', is_active=True)
        serializer = self.get_serializer(doctors, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.AllowAny])
    def pharmacists(self, request):
        """Liste des pharmaciens"""
        pharmacists = User.objects.filter(user_type='pharmacist', is_active=True)
        serializer = self.get_serializer(pharmacists, many=True)
        return Response(serializer.data)


class PatientProfileViewSet(viewsets.ModelViewSet):
    queryset = PatientProfile.objects.all()
    serializer_class = PatientProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'patient':
            return PatientProfile.objects.filter(user=user)
        elif user.user_type == 'admin':
            return PatientProfile.objects.all()
        return PatientProfile.objects.none()


class DoctorProfileViewSet(viewsets.ModelViewSet):
    queryset = DoctorProfile.objects.all()
    serializer_class = DoctorProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'doctor':
            return DoctorProfile.objects.filter(user=user)
        return DoctorProfile.objects.all()


class PharmacistProfileViewSet(viewsets.ModelViewSet):
    queryset = PharmacistProfile.objects.all()
    serializer_class = PharmacistProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

