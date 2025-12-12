from django.contrib import admin
from .models import MedicalHistoryEntry, MedicalDocument, Vaccination


@admin.register(MedicalHistoryEntry)
class MedicalHistoryEntryAdmin(admin.ModelAdmin):
    list_display = ['title', 'patient', 'entry_type', 'date', 'doctor_name', 'created_at']
    list_filter = ['entry_type', 'date', 'created_at']
    search_fields = ['title', 'patient__username', 'doctor_name', 'description']
    readonly_fields = ['created_at', 'updated_at']


@admin.register(MedicalDocument)
class MedicalDocumentAdmin(admin.ModelAdmin):
    list_display = ['name', 'entry', 'file_type', 'uploaded_at']
    list_filter = ['file_type', 'uploaded_at']
    search_fields = ['name', 'entry__title']


@admin.register(Vaccination)
class VaccinationAdmin(admin.ModelAdmin):
    list_display = ['vaccine_name', 'patient', 'date_administered', 'next_due_date', 'status']
    list_filter = ['status', 'date_administered', 'created_at']
    search_fields = ['vaccine_name', 'patient__username', 'doctor_name']
    readonly_fields = ['created_at', 'updated_at']
