from django.urls import path
from .views import BookingListCreateView, BookingRetrieveUpdateDestroyView




urlpatterns = [
    path("bookings/", BookingListCreateView.as_view(), name="booking-list-create"),
    path("bookings/<int:pk>/", BookingRetrieveUpdateDestroyView.as_view(), name="booking-detail")
]