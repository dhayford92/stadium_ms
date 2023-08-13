from django.urls import path
from .views import *



urlpatterns = [
    path('events/', EventListAPIView.as_view(), name='event-list'),
    path('event/<int:id>/', EventDetailAPIView.as_view(), name='event-detail'),
    path('cart/<int:id>/', CartAPIView.as_view(), name='cart'),
    path('checkout/<int:id>/', CheckoutAPIView.as_view(), name='checkout'),
    path('profile/home/', GetUserHomeAPIView.as_view(), name='profile-home'),
    path('parklot/<str:ticket_id>', EventParkingLotAPIView.as_view()),
]

