from django.urls import path
from .views import *


urlpatterns = [
    path('dashboard/', DashboardAPIView().as_view()),
    path('users/', UserAPIView().as_view()),
    path('users/<int:id>/', UserUpdateAPIView().as_view()),
    # --- event api ---
    path('events/', EventAPIView().as_view()),
    path('event/<int:id>/', EventDetailAPIView().as_view()),
    path('event/<int:id>/update/', UpdateEvent.as_view()),
    path('event/<int:id>/image/', ChangeEventImage.as_view()),
    
    # --- ticket api ---
    path('ticket/', TicketAPIView().as_view()),
    path('ticket/<int:id>/', TicketDetailAPIView().as_view()),
    
    # --- refund api ---
    path('refund/', RefundAPIView().as_view()),
    path('refund/<int:id>/', UpdateRefundAPIView().as_view()),
    path('refund/<int:id>/pay/', PayRefund.as_view()),
]
