from rest_framework import viewsets, permissions
from .models import FAQCategory, FAQ
from .serializers import FAQCategorySerializer, FAQSerializer


class FAQCategoryViewSet(viewsets.ModelViewSet):
    queryset = FAQCategory.objects.all()
    serializer_class = FAQCategorySerializer
    permission_classes = [permissions.AllowAny]
    ordering_fields = ['order']


class FAQViewSet(viewsets.ModelViewSet):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer
    permission_classes = [permissions.AllowAny]
    search_fields = ['question', 'answer']
    filterset_fields = ['category']
    ordering_fields = ['order']








