from django.contrib import admin
from .models import ChatSession, ChatMessage, ChatbotResponse


@admin.register(ChatbotResponse)
class ChatbotResponseAdmin(admin.ModelAdmin):
    list_display = ['keyword', 'priority', 'is_active']
    list_filter = ['is_active']
    search_fields = ['keyword']


@admin.register(ChatSession)
class ChatSessionAdmin(admin.ModelAdmin):
    list_display = ['session_id', 'phone_number', 'is_handled_by_human', 'created_at']
    list_filter = ['is_handled_by_human', 'created_at']
    search_fields = ['session_id', 'phone_number', 'whatsapp_id']


@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ['session', 'message', 'is_from_user', 'is_automated', 'created_at']
    list_filter = ['is_automated', 'is_from_user', 'created_at']
    search_fields = ['message']




