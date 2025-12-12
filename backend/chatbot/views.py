from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import ChatSession, ChatMessage, ChatbotResponse
from .serializers import ChatSessionSerializer, ChatMessageSerializer
from .whatsapp import handle_incoming_whatsapp, get_automated_response
import uuid
import re
from django.utils import timezone


class ChatSessionViewSet(viewsets.ModelViewSet):
    queryset = ChatSession.objects.all()
    serializer_class = ChatSessionSerializer
    permission_classes = [permissions.AllowAny]


    @action(detail=False, methods=['post'], permission_classes=[permissions.AllowAny])
    def send_message(self, request):
        """Envoyer un message et recevoir une réponse"""
        session_id = request.data.get('session_id')
        message = request.data.get('message')
        phone_number = request.data.get('phone_number')
        whatsapp_id = request.data.get('whatsapp_id')
        
        if not message:
            return Response(
                {'detail': 'Message requis.'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Créer ou récupérer la session
        if session_id:
            try:
                session = ChatSession.objects.get(session_id=session_id)
            except ChatSession.DoesNotExist:
                session = ChatSession.objects.create(
                    session_id=str(uuid.uuid4()),
                    phone_number=phone_number or '',
                    whatsapp_id=whatsapp_id or ''
                )
        else:
            session = ChatSession.objects.create(
                session_id=str(uuid.uuid4()),
                phone_number=phone_number or '',
                whatsapp_id=whatsapp_id or ''
            )
        
        # Enregistrer le message de l'utilisateur
        user_message = ChatMessage.objects.create(
            session=session,
            message=message,
            is_from_user=True,
            is_automated=False
        )
        
        # Générer la réponse
        if not session.is_handled_by_human:
            bot_response_text = get_automated_response(message)
            bot_message = ChatMessage.objects.create(
                session=session,
                message=bot_response_text,
                is_from_user=False,
                is_automated=True
            )
            
            # Si le message nécessite une intervention humaine, marquer la session
            if any(word in message.lower() for word in ['humain', 'agent', 'personne', 'parler', 'human', 'speak to']):
                session.is_handled_by_human = True
                session.save()
                bot_response_text += "\n\nUn agent va prendre en charge votre demande."
        else:
            bot_response_text = "Votre message a été transmis à notre équipe. Un agent va vous répondre prochainement."
            bot_message = ChatMessage.objects.create(
                session=session,
                message=bot_response_text,
                is_from_user=False,
                is_automated=False
            )
        
        return Response({
            'session_id': session.session_id,
            'response': bot_response_text,
            'is_automated': bot_message.is_automated,
            'is_handled_by_human': session.is_handled_by_human
        }, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def transfer_to_human(self, request):
        """Transférer la session à un agent humain"""
        session_id = request.data.get('session_id')
        try:
            session = ChatSession.objects.get(session_id=session_id)
            session.is_handled_by_human = True
            session.save()
            return Response({'status': 'transferred'}, status=status.HTTP_200_OK)
        except ChatSession.DoesNotExist:
            return Response(
                {'detail': 'Session non trouvée.'}, 
                status=status.HTTP_404_NOT_FOUND
            )


@csrf_exempt
@require_http_methods(["POST"])
def whatsapp_webhook(request):
    """Webhook pour recevoir les messages WhatsApp de Twilio"""
    from django.http import HttpResponse
    try:
        handle_incoming_whatsapp(request)
        # Twilio attend une réponse au format TwiML ou texte simple
        return HttpResponse('<?xml version="1.0" encoding="UTF-8"?><Response></Response>', content_type='text/xml')
    except Exception as e:
        print(f"Error handling WhatsApp webhook: {e}")
        return HttpResponse('Error', status=500)

