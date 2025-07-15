from django.db import models

# Create your models here.
class Booking(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    date_from = models.DateField()
    date_to = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.full_name} | {self.date_from} - {self.date_to}"
      