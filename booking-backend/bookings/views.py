from django.shortcuts import render
from rest_framework import generics
from .models import Booking
from .serializers import BookingSerializer
# Create your views here.

class BookingListCreateView(generics.ListCreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
