from django.db import models


class ContactMessage(models.Model):
    TYPES = [
        ('pharmacy', 'Pharmacie'),
        ('doctor', 'Professionnel de santé'),
        ('insurance', 'Compagnie d\'assurance'),
        ('investor', 'Investisseur'),
        ('other', 'Autre'),
    ]
    
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    company = models.CharField(max_length=200, blank=True)
    type = models.CharField(max_length=20, choices=TYPES, default='other')
    subject = models.CharField(max_length=200)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Message de {self.name} - {self.subject}"








