from django.db import models
from accounts.models import User


class MedicalHistoryEntry(models.Model):
    """Entrée dans l'historique médical d'un patient"""
    ENTRY_TYPES = [
        ('consultation', 'Consultation'),
        ('examen', 'Examen'),
        ('vaccination', 'Vaccination'),
        ('urgence', 'Urgence'),
        ('hospitalisation', 'Hospitalisation'),
        ('chirurgie', 'Chirurgie'),
        ('autre', 'Autre'),
    ]
    
    patient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='medical_history_entries')
    entry_type = models.CharField(max_length=20, choices=ENTRY_TYPES)
    title = models.CharField(max_length=200)
    doctor_name = models.CharField(max_length=200, blank=True)  # Nom du médecin ou établissement
    doctor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='created_history_entries')
    date = models.DateField()
    description = models.TextField()
    tags = models.JSONField(default=list, blank=True)  # ["routine", "tension"]
    
    # Liens vers d'autres entités
    consultation = models.ForeignKey('consultations.Consultation', on_delete=models.SET_NULL, null=True, blank=True, related_name='history_entries')
    prescription = models.ForeignKey('prescriptions.Prescription', on_delete=models.SET_NULL, null=True, blank=True, related_name='history_entries')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date', '-created_at']
        verbose_name_plural = "Entrées d'historique médical"

    def __str__(self):
        return f"{self.title} - {self.patient.username} ({self.date})"


class MedicalDocument(models.Model):
    """Documents médicaux associés à une entrée d'historique"""
    entry = models.ForeignKey(MedicalHistoryEntry, on_delete=models.CASCADE, related_name='documents')
    file = models.FileField(upload_to='medical_documents/')
    name = models.CharField(max_length=200)
    file_type = models.CharField(max_length=50, blank=True)  # pdf, image, etc.
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-uploaded_at']

    def __str__(self):
        return f"{self.name} - {self.entry.title}"


class Vaccination(models.Model):
    """Carnet de vaccination d'un patient"""
    STATUS_CHOICES = [
        ('à_jour', 'À jour'),
        ('bientôt_due', 'Bientôt due'),
        ('en_retard', 'En retard'),
    ]
    
    patient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='vaccinations')
    vaccine_name = models.CharField(max_length=200)
    date_administered = models.DateField()
    next_due_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='à_jour')
    doctor_name = models.CharField(max_length=200, blank=True)
    doctor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='administered_vaccinations')
    batch_number = models.CharField(max_length=100, blank=True)
    location = models.CharField(max_length=200, blank=True)  # Lieu de vaccination
    notes = models.TextField(blank=True)
    
    # Lien vers l'entrée d'historique correspondante
    history_entry = models.ForeignKey(MedicalHistoryEntry, on_delete=models.SET_NULL, null=True, blank=True, related_name='vaccination_record')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date_administered']
        verbose_name_plural = "Vaccinations"

    def __str__(self):
        return f"{self.vaccine_name} - {self.patient.username} ({self.date_administered})"
