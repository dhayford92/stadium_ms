from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import *



class RegisterAPIView(generics.GenericAPIView):
    serializer_class = UserRegsiter
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Account created successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)