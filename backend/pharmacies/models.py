from django.db import models
from accounts.models import User
from medications.models import Medication


class Pharmacy(models.Model):
    name = models.CharField(max_length=200)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owned_pharmacies')
    address = models.TextField()
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=100, default='Côte d\'Ivoire')
    phone = models.CharField(max_length=20)
    email = models.EmailField(blank=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    opening_hours = models.JSONField(default=dict)  # {"monday": "8:00-20:00", ...}
    is_24_7 = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Pharmacies"
        ordering = ['name']

    def __str__(self):
        return self.name


class PharmacyInventory(models.Model):
    pharmacy = models.ForeignKey(Pharmacy, on_delete=models.CASCADE, related_name='inventory')
    medication = models.ForeignKey(Medication, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    last_updated = models.DateTimeField(auto_now=True)
    is_available = models.BooleanField(default=True)

    class Meta:
        verbose_name_plural = "Inventaires de pharmacies"
        unique_together = ['pharmacy', 'medication']

    def __str__(self):
        return f"{self.pharmacy.name} - {self.medication.name}"








