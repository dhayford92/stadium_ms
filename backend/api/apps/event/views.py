from django.shortcuts import render
from apps.users.models import User
from rest_framework import generics, permissions, status, views
from rest_framework.response import Response
from .serializers import *
from .models import *
import random
import string
from django_filters.rest_framework import DjangoFilterBackend




class EventListAPIView(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    filter_fields = ('event_type', )
    
    def get_queryset(self):
        queryset = Event.objects.all()
        return queryset
    

class EventDetailAPIView(generics.RetrieveDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
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
    



class EventParkingLotAPIView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request, ticket_id):
        ticket = Ticket.objects.filter(ticket_id=ticket_id).prefetch_related('event').first()
        if ticket is None:
            return Response({'message': 'Ticket not found'}, status=status.HTTP_404_NOT_FOUND)
        
        event = Event.objects.filter(id=ticket.event.id).first()
        if event is None:
            return Response({'message': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)
        parking_lots = ParkingLot.objects.filter(event=event)
        serializer = ParkingLotSerializer(parking_lots, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def patch(self, request, ticket_id):
        user = User.objects.filter(id=request.user.id).first()
        ticket = Ticket.objects.filter(ticket_id=ticket_id).first()
        if ticket is None:
            return Response({'error': 'Ticket not found'}, status=status.HTTP_404_NOT_FOUND)
        event = Event.objects.filter(id=ticket.event.id).first()
        parking_lots = ParkingLot.objects.filter(event=event, id=request.data['parking_lot_id']).first()
        if parking_lots is None:
            return Response({'error': 'Parking lot not found'}, status=status.HTTP_404_NOT_FOUND)
        parking_lots.user = user
        parking_lots.is_booked = True
        parking_lots.save()
        return Response({'message': 'Done'}, status=status.HTTP_200_OK)
    

    
    

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
    
    