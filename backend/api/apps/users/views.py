from django.shortcuts import render
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from .serializers import *
from django.contrib.auth import authenticate, login, logout


# --- register view api
class RegisterAPIView(generics.GenericAPIView):
    serializer_class = UserRegsiter
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Account created successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    


# --- login view api 
class LoginAPIView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    
    def post(self, request):
        user = authenticate(email=request.data['email'], password=request.data['password'])
        if user:
            serializer = self.serializer_class(user)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)



# --- logout view api
class LogoutAPIView(generics.GenericAPIView):
    permissions_classes = [permissions.IsAuthenticated]
    def delete(self, request):
        logout(request)
        return Response({'message': 'Logged out successfully'}, status=status.HTTP_204_NO_CONTENT)
    
    

# --- user detail view api
class UserDetailAPIView(generics.GenericAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        serializer = self.serializer_class(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request):
        serializer = self.serializer_class(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Account updated successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    
'''
    Note:
    admin side of the app is not yet implemented

'''