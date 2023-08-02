from django.urls import path
from .views import *



urlpatterns = [
    path('events/', EventListAPIView.as_view(), name='event-list'),
    path('event/<int:id>/', EventDetailAPIView.as_view(), name='event-detail'),
    path('cart/<int:id>/', CartAPIView.as_view(), name='cart'),
]

