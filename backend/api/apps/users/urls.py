from django.urls import path
from .views import *


urlpatterns = [
    path('register/', RegisterAPIView.as_view(), name='register'),
    path('login/', LoginAPIView.as_view(), name='login'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
    path('client/detail/', UserDetailAPIView.as_view(), name='detail'),
]
