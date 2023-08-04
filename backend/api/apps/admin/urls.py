from django.urls import path
from .views import *


urlpatterns = [
    path('dashboard/', DashboardAPIView().as_view()),
]
