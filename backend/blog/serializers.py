from rest_framework import serializers
from accounts.serializers import UserSerializer
from .models import BlogPost


class BlogPostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    
    class Meta:
        model = BlogPost
        fields = '__all__'








