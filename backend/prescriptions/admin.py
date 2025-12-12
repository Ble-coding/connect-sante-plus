from django.contrib import admin
from .models import Prescription, PrescriptionMedication


@admin.register(Prescription)
class PrescriptionAdmin(admin.ModelAdmin):
    list_display = ['id', 'patient', 'doctor', 'issue_date', 'valid_until', 'status']
    list_filter = ['status', 'issue_date']
    search_fields = ['patient__username', 'doctor__username']


@admin.register(PrescriptionMedication)
class PrescriptionMedicationAdmin(admin.ModelAdmin):
    list_display = ['id', 'prescription', 'medication', 'dosage', 'frequency', 'duration']
    list_filter = ['prescription']








