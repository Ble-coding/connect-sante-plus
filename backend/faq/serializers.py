from rest_framework import serializers
from .models import FAQCategory, FAQ


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = '__all__'


class FAQCategorySerializer(serializers.ModelSerializer):
    questions = FAQSerializer(many=True, read_only=True)
    
    class Meta:
        model = FAQCategory
        fields = '__all__'








