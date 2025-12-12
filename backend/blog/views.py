from rest_framework import viewsets, permissions
from .models import BlogPost
from .serializers import BlogPostSerializer


class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.filter(is_published=True)
    serializer_class = BlogPostSerializer
    permission_classes = [permissions.AllowAny]
    search_fields = ['title', 'content', 'category']
    filterset_fields = ['category', 'author']
    ordering_fields = ['created_at', 'published_at']
    
    def get_queryset(self):
        if self.request.user.is_authenticated and self.request.user.user_type == 'admin':
            return BlogPost.objects.all()
        return BlogPost.objects.filter(is_published=True)








