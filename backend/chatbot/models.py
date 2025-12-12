from django.db import models
from accounts.models import User


class ChatSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    session_id = models.CharField(max_length=255, unique=True)
    phone_number = models.CharField(max_length=20, blank=True)
    whatsapp_id = models.CharField(max_length=255, blank=True)
    is_handled_by_human = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Session {self.session_id}"


class ChatMessage(models.Model):
    session = models.ForeignKey(ChatSession, on_delete=models.CASCADE, related_name='messages')
    message = models.TextField()
    is_from_user = models.BooleanField(default=True)
    is_automated = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"Message from {'user' if self.is_from_user else 'bot'} - {self.created_at}"


class ChatbotResponse(models.Model):
    keyword = models.CharField(max_length=255)
    response = models.TextField()
    priority = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-priority']

    def __str__(self):
        return self.keyword




