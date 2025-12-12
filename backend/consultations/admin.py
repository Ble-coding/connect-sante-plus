from django.contrib import admin
from .models import Appointment, Consultation


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ['id', 'patient', 'doctor', 'date', 'status', 'created_at']
    list_filter = ['status', 'date']
    search_fields = ['patient__username', 'doctor__username']


@admin.register(Consultation)
class ConsultationAdmin(admin.ModelAdmin):
    list_display = ['id', 'appointment', 'consultation_type', 'created_at']
    list_filter = ['consultation_type']








