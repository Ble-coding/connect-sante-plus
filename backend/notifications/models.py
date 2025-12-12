from django.db import models
from accounts.models import User


class Notification(models.Model):
    TYPES = [
        ('appointment', 'Rendez-vous'),
        ('prescription', 'Ordonnance'),
        ('message', 'Message'),
        ('system', 'Système'),
        ('pharmacy', 'Pharmacie'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    notification_type = models.CharField(max_length=20, choices=TYPES)
    title = models.CharField(max_length=200)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    link = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Notification pour {self.user.username} - {self.title}"








