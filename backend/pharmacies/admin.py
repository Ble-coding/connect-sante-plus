from django.contrib import admin
from .models import Pharmacy, PharmacyInventory


@admin.register(Pharmacy)
class PharmacyAdmin(admin.ModelAdmin):
    list_display = ['name', 'city', 'owner', 'phone', 'is_24_7', 'is_active']
    list_filter = ['is_active', 'is_24_7', 'city', 'country']
    search_fields = ['name', 'city', 'address']


@admin.register(PharmacyInventory)
class PharmacyInventoryAdmin(admin.ModelAdmin):
    list_display = ['pharmacy', 'medication', 'quantity', 'price', 'is_available', 'last_updated']
    list_filter = ['is_available', 'pharmacy']
    search_fields = ['pharmacy__name', 'medication__name']








