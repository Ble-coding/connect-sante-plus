from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ChatSessionViewSet, whatsapp_webhook

router = DefaultRouter()
router.register(r'sessions', ChatSessionViewSet, basename='chatsession')

urlpatterns = [
    path('', include(router.urls)),
    path('whatsapp/webhook/', whatsapp_webhook, name='whatsapp_webhook'),
]

