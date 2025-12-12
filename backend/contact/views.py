from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.conf import settings
import requests
from .models import ContactMessage
from .serializers import ContactMessageSerializer


class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.AllowAny]  # Permet l'envoi sans authentification
    
    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]
    
    def create(self, request, *args, **kwargs):
        # Vérifier le captcha
        captcha_token = request.data.get('captcha_token')
        if not captcha_token:
            return Response(
                {'detail': 'Captcha requis.'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        secret_key = settings.RECAPTCHA_SECRET_KEY
        if secret_key:
            try:
                response = requests.post(
                    'https://www.google.com/recaptcha/api/siteverify',
                    data={
                        'secret': secret_key,
                        'response': captcha_token
                    },
                    timeout=5
                )
                result = response.json()
                if not result.get('success'):
                    return Response(
                        {'detail': 'Vérification captcha échouée.'}, 
                        status=status.HTTP_400_BAD_REQUEST
                    )
            except requests.RequestException:
                if not settings.DEBUG:
                    return Response(
                        {'detail': 'Erreur lors de la vérification captcha.'}, 
                        status=status.HTTP_400_BAD_REQUEST
                    )
        
        # Supprimer le token du data avant la sérialisation
        data = request.data.copy()
        data.pop('captcha_token', None)
        
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated and user.user_type == 'admin':
            return ContactMessage.objects.all()
        return ContactMessage.objects.none()
    
    @action(detail=True, methods=['post'])
    def mark_read(self, request, pk=None):
        """Marquer un message comme lu (admin seulement)"""
        if request.user.user_type != 'admin':
            return Response(
                {'error': 'Non autorisé'}, 
                status=status.HTTP_403_FORBIDDEN
            )
        message = self.get_object()
        message.is_read = True
        message.save()
        return Response({'status': 'read'})





