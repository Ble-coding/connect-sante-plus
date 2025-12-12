from django.db import models
from accounts.models import User
from consultations.models import Consultation
from medications.models import Medication


class Prescription(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('completed', 'Terminée'),
        ('expired', 'Expirée'),
    ]
    
    consultation = models.ForeignKey(Consultation, on_delete=models.CASCADE, related_name='prescriptions')
    patient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='prescriptions')
    doctor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='issued_prescriptions')
    issue_date = models.DateTimeField(auto_now_add=True)
    valid_until = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-issue_date']

    def __str__(self):
        return f"Ordonnance {self.id} - {self.patient.username}"


class PrescriptionMedication(models.Model):
    prescription = models.ForeignKey(Prescription, on_delete=models.CASCADE, related_name='medications')
    medication = models.ForeignKey(Medication, on_delete=models.CASCADE)
    dosage = models.CharField(max_length=50)
    frequency = models.CharField(max_length=50)  # "3x/jour"
    duration = models.CharField(max_length=50)  # "7 jours"
    quantity = models.IntegerField()
    instructions = models.TextField(blank=True)

    def __str__(self):
        return f"{self.medication.name} - {self.prescription.id}"








