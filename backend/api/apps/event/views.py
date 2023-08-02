from django.shortcuts import render
from rest_framework import generics, permissions, status, views
from rest_framework.response import Response
from .serializers import *
from .models import *




class EventListAPIView(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_fields = ('event_type', )
    
    def get_queryset(self):
        queryset = Event.objects.all()
        return queryset
    

class EventDetailAPIView(generics.RetrieveDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'
    
    def get_queryset(self):
        queryset = Event.objects.all()
        return queryset



class CartAPIView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request, id):
        qty = request.data.get('quantity')
        
        event = Event.objects.filter(id=id).first()
        if event is None:
            return Response({'message': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)
        ticket, created = Ticket.objects.get_or_create(
            event=event,
            user=request.user,
        )
        if created:
            ticket.quantity = int(qty)
            ticket.save()
            return Response({'message': 'Event added to cart successfully'}, status=status.HTTP_200_OK)
        else:
            ticket.quantity += int(qty)
            ticket.save()
            return Response({'message': 'Event increased successfully'}, status=status.HTTP_200_OK)
        
        
    def get(self, request, id):
        event = Event.objects.filter(id=id).first()
        if event is None:
            return Response({'message': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)
        ticket = Ticket.objects.filter(event=event, user=request.user).first()
        if ticket is None:
            return Response({'message': 'Event not found in cart'}, status=status.HTTP_404_NOT_FOUND)
        serializer = TicketSerializer(ticket)
        return Response(serializer.data, status=status.HTTP_200_OK)
        