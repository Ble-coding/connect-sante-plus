from django.contrib import admin
from .models import Medication, PatientMedication, MedicationDose


@admin.register(Medication)
class MedicationAdmin(admin.ModelAdmin):
    list_display = ['name', 'dosage', 'form', 'requires_prescription', 'manufacturer']
    list_filter = ['form', 'requires_prescription']
    search_fields = ['name', 'generic_name', 'active_ingredient']


@admin.register(PatientMedication)
class PatientMedicationAdmin(admin.ModelAdmin):
    list_display = ['medication', 'patient', 'status', 'start_date', 'end_date', 'reminders_enabled']
    list_filter = ['status', 'reminders_enabled', 'created_at']
    search_fields = ['medication__name', 'patient__username', 'patient__email']
    readonly_fields = ['created_at', 'updated_at']


@admin.register(MedicationDose)
class MedicationDoseAdmin(admin.ModelAdmin):
    list_display = ['patient_medication', 'scheduled_time', 'taken', 'taken_time', 'overdue']
    list_filter = ['taken', 'overdue', 'scheduled_time']
    search_fields = ['patient_medication__medication__name', 'patient_medication__patient__username']

