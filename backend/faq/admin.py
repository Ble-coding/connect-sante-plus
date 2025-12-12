from django.contrib import admin
from .models import FAQCategory, FAQ


@admin.register(FAQCategory)
class FAQCategoryAdmin(admin.ModelAdmin):
    list_display = ['title', 'order', 'created_at']
    ordering = ['order']


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ['question', 'category', 'order', 'created_at']
    list_filter = ['category']
    search_fields = ['question', 'answer']
    ordering = ['category', 'order']








