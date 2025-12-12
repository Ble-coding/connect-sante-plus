from twilio.rest import Client
from django.conf import settings
from .models import ChatSession, ChatMessage, ChatbotResponse
import uuid


def send_whatsapp_message(to: str, message: str, session_id: str = None):
    """Envoyer un message WhatsApp via Twilio"""
    account_sid = settings.TWILIO_ACCOUNT_SID
    auth_token = settings.TWILIO_AUTH_TOKEN
    from_number = settings.TWILIO_WHATSAPP_NUMBER
    
    if not all([account_sid, auth_token, from_number]):
        return False
    
    try:
        client = Client(account_sid, auth_token)
        message_obj = client.messages.create(
            body=message,
            from_=f'whatsapp:{from_number}',
            to=f'whatsapp:{to}'
        )
        return True
    except Exception as e:
        print(f"Error sending WhatsApp message: {e}")
        return False


def get_automated_response(message: str) -> str:
    """Générer une réponse automatique basée sur les mots-clés"""
    message_lower = message.lower()
    
    # Rechercher dans les réponses automatisées
    responses = ChatbotResponse.objects.filter(is_active=True).order_by('-priority')
    for response in responses:
        if response.keyword.lower() in message_lower:
            return response.response
    
    # Réponses par défaut
    if any(word in message_lower for word in ['urgence', 'urgent', 'grave', 'emergency']):
        return "Pour les urgences médicales, appelez immédiatement le +225 12 345 678 ou rendez-vous aux urgences les plus proches."
    
    if any(word in message_lower for word in ['rendez-vous', 'consultation', 'rdv', 'appointment']):
        return "Pour prendre un rendez-vous, vous pouvez utiliser notre plateforme de téléconsultation. Souhaitez-vous que je vous guide ?"
    
    if any(word in message_lower for word in ['pharmacie', 'médicament', 'ordonnance', 'pharmacy', 'medication']):
        return "Nous pouvons vous aider à trouver une pharmacie proche ou à gérer vos ordonnances. Que souhaitez-vous faire ?"
    
    if any(word in message_lower for word in ['bonjour', 'salut', 'hello', 'hi']):
        return "Bonjour ! Je suis l'assistant virtuel de Pharma Africa Connect. Comment puis-je vous aider aujourd'hui ?"
    
    if any(word in message_lower for word in ['humain', 'agent', 'personne', 'parler', 'human', 'speak to']):
        return "Je comprends que vous souhaitez parler à un agent. Un membre de notre équipe va prendre en charge votre demande dans les plus brefs délais."
    
    return "Merci pour votre message. Un membre de notre équipe va vous répondre dans les plus brefs délais. En attendant, pouvez-vous préciser votre demande ?"


def handle_incoming_whatsapp(request):
    """Gérer les messages WhatsApp entrants"""
    from_number = request.POST.get('From', '').replace('whatsapp:', '')
    message_body = request.POST.get('Body', '')
    
    if not from_number or not message_body:
        return False
    
    # Créer ou récupérer la session
    try:
        session = ChatSession.objects.get(whatsapp_id=from_number)
    except ChatSession.DoesNotExist:
        session = ChatSession.objects.create(
            session_id=str(uuid.uuid4()),
            whatsapp_id=from_number,
            phone_number=from_number
        )
    
    # Traiter le message
    response_text = get_automated_response(message_body)
    
    # Enregistrer le message de l'utilisateur
    ChatMessage.objects.create(
        session=session,
        message=message_body,
        is_from_user=True,
        is_automated=False
    )
    
    # Si la session n'est pas gérée par un humain, envoyer une réponse automatique
    if not session.is_handled_by_human:
        # Vérifier si le message nécessite une intervention humaine
        if any(word in message_body.lower() for word in ['humain', 'agent', 'personne', 'parler', 'human', 'speak to']):
            session.is_handled_by_human = True
            session.save()
            response_text += "\n\nUn agent va prendre en charge votre demande."
        
        # Enregistrer la réponse du bot
        ChatMessage.objects.create(
            session=session,
            message=response_text,
            is_from_user=False,
            is_automated=True
        )
        
        # Envoyer la réponse via WhatsApp
        send_whatsapp_message(from_number, response_text, session.session_id)
    else:
        # Si géré par un humain, juste enregistrer que le message a été reçu
        ChatMessage.objects.create(
            session=session,
            message="Message reçu et transmis à notre équipe.",
            is_from_user=False,
            is_automated=False
        )
    
    return True

