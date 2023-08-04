from django.shortcuts import render
from rest_framework import generics, permissions, status, views
from rest_framework.response import Response
from .serializers import *
from .models import *
import random
import string




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
        


# -- checkput api ---
class CheckoutAPIView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request, id):
        event = Event.objects.filter(id=id).first()
        if event is None:
            return Response({'message': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)
        ticket = Ticket.objects.filter(event=event, user=request.user).first()
        if ticket is None:
            return Response({'message': 'Event not found in cart'}, status=status.HTTP_404_NOT_FOUND)
        transaction = Transaction.objects.get(user=request.user, ticket=ticket)
        transaction.status = '4'
        transaction.amount = ticket.total
        ticket.status = '4'
        ticket.seat = ''.join(random.choices(string.ascii_uppercase + string.digits, k=3))
        transaction.save()
        ticket.save()
        return Response({'message': 'Ticket successfully paid'}, status=status.HTTP_200_OK)
    
    
    

class GetUserHomeAPIView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        ticket_count = Ticket.objects.filter(user=request.user).count()
        refund_count = Refund.objects.filter(user=request.user).count()
        transactions = Transaction.objects.filter(user=request.user)
        context = {
            'ticket_count': ticket_count,
            'refund_count': refund_count,
            'transactions': TransactionSerializer(transactions, many=True).data
        }
        return Response(context, status=status.HTTP_200_OK)
    
    