from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FAQCategoryViewSet, FAQViewSet

router = DefaultRouter()
router.register(r'categories', FAQCategoryViewSet, basename='faq-category')
router.register(r'questions', FAQViewSet, basename='faq')

urlpatterns = [
    path('', include(router.urls)),
]








