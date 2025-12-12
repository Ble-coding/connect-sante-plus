from django.db import models
from accounts.models import User


class Medication(models.Model):
    FORMS = [
        ('comprime', 'Comprimé'),
        ('sirop', 'Sirop'),
        ('gelule', 'Gélule'),
        ('injection', 'Injection'),
        ('pommade', 'Pommade'),
        ('collyre', 'Collyre'),
        ('autre', 'Autre'),
    ]
    
    name = models.CharField(max_length=200)
    generic_name = models.CharField(max_length=200, blank=True)
    dosage = models.CharField(max_length=50)
    form = models.CharField(max_length=50, choices=FORMS, default='comprime')
    description = models.TextField(blank=True)
    requires_prescription = models.BooleanField(default=True)
    active_ingredient = models.CharField(max_length=200, blank=True)
    manufacturer = models.CharField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f"{self.name} ({self.dosage})"


class PatientMedication(models.Model):
    """Suivi des médicaments pris par un patient"""
    STATUS_CHOICES = [
        ('active', 'En cours'),
        ('completed', 'Terminé'),
        ('stopped', 'Arrêté'),
        ('overdue', 'En retard'),
    ]
    
    patient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='patient_medications')
    medication = models.ForeignKey(Medication, on_delete=models.CASCADE)
    prescription = models.ForeignKey('prescriptions.Prescription', on_delete=models.SET_NULL, null=True, blank=True, related_name='tracked_medications')
    
    # Informations de traitement
    dosage = models.CharField(max_length=50)  # Peut différer du dosage standard
    frequency = models.CharField(max_length=100)  # "3 fois par jour", "matin et soir"
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    total_doses = models.IntegerField(default=0)
    remaining_doses = models.IntegerField(default=0)
    
    # Suivi
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    reminders_enabled = models.BooleanField(default=True)
    next_dose_time = models.TimeField(null=True, blank=True)
    last_taken_at = models.DateTimeField(null=True, blank=True)
    
    # Horaires de prise
    dose_times = models.JSONField(default=list)  # ["08:00", "14:00", "20:00"]
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = "Médicaments patients"

    def __str__(self):
        return f"{self.medication.name} - {self.patient.username}"


class MedicationDose(models.Model):
    """Enregistrement de chaque prise de médicament"""
    patient_medication = models.ForeignKey(PatientMedication, on_delete=models.CASCADE, related_name='doses')
    scheduled_time = models.DateTimeField()
    taken_time = models.DateTimeField(null=True, blank=True)
    taken = models.BooleanField(default=False)
    overdue = models.BooleanField(default=False)
    notes = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['scheduled_time']
        verbose_name_plural = "Prises de médicaments"

    def __str__(self):
        return f"{self.patient_medication.medication.name} - {self.scheduled_time}"
