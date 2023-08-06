from multiprocessing import context
from apps.users.models import User
from apps.event.models import *
from apps.event.serializers import *
from rest_framework import generics, permissions, views, status
from rest_framework.response import Response
from apps.users.serializers import *
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.renderers import JSONRenderer




class DashboardAPIView(views.APIView):
    permissiom_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    
    def get(self, request):
        account_balance = 0
        total_clients = User.objects.all().count()
        tickets = Ticket.objects.all().count()
        transactions = Transaction.objects.all()
        for transaction in transactions:
            account_balance += transaction.amount
        refunds = Refund.objects.all().count()
        context = {
            'total_clients': total_clients,
            'account_balance': account_balance,
            'new_sales': tickets,
            'transactions': TransactionSerializer(transactions, many=True).data,
            'pending_contacts': refunds,
        }
        return Response(context, status=status.HTTP_200_OK)
    
    
# -- user api ---
class UserAPIView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    queryset = User.objects.all().order_by('-id')
    serializer_class = UserSerializer


# -- update and delete user api ---
class UserUpdateAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'id'
    
    
    
'''

    Event API
    
'''
class EventAPIView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    queryset = Event.objects.all().order_by('-id')
    serializer_class = EventSerializer
    parser_classes = (MultiPartParser, FormParser,)
    renderer_classes = (JSONRenderer,)
    
    def post(self, request, *args, **kwargs):
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Event created successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    
class EventDetailAPIView(generics.RetrieveDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    lookup_field = 'id'
    

# --- update event api ---
class UpdateEvent(views.APIView):
    # permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    parser_classes = (MultiPartParser, FormParser,)
    
    def patch(self, request, id):
        event = Event.objects.filter(id=id).first()
        if event is None:
            return Response({'message': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = EventSerializer(event, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Event updated successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

# --- change event image api ---
class ChangeEventImage(views.APIView):
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    parser_classes = (MultiPartParser, FormParser,)
    
    def patch(self, request, id):
        event = Event.objects.filter(id=id).first()
        if event is None:
            return Response({'message': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = EventSerializer(event, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Event image updated successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    


'''

    Ticket API
    
'''

# --- get all tickets api ---
class TicketAPIView(views.APIView):
    # permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    
    def get(self, request):
        tickets = Ticket.objects.filter(is_refund=False).order_by('-id')
        refund = Refund.objects.filter(is_paid=True)
        transactions = Transaction.objects.all()
        total_account = 0
        for transaction in transactions:
            total_account += transaction.amount
        tickets_sales = 0
        for ticket in tickets:
            tickets_sales += ticket.total
        tickets_refund = 0
        for refund in refund:
            tickets_refund += refund.amount
        
        
        context = {
            'total_account': total_account,
            'tickets_sales': tickets_sales,
            'tickets_refund': tickets_refund,
            'tickets': TicketSerializer(tickets, many=True).data,
        }
        return Response(context, status=status.HTTP_200_OK)
    

# --- get detail ticket api ---
class TicketDetailAPIView(generics.RetrieveDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    lookup_field = 'id'


class CreateTicketAPIView(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    queryset = Ticket.objects.all().order_by('-id')
    serializer_class = TicketSerializer
    # -- not in use --:

    
'''
    Refund API
    
'''

class RefundAPIView(views.APIView):
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    queryset = Refund.objects.all().order_by('-id')
    
    def get(self, request):
        refunds = Refund.objects.all().order_by('-id')
        total_amount = 0
        pending_amount = refunds.filter(is_paid=False).count()
        for refund in refunds.filter(is_paid=True):
            total_amount += refund.amount
            
        context = {
            'total_amount': total_amount,
            'pending_amount': pending_amount,
            'refunds': RefundSerializer(refunds, many=True).data,
        }
        return Response(context, status=status.HTTP_200_OK)
    

class UpdateRefundAPIView(generics.UpdateAPIView):
    # permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    queryset = Refund.objects.all()
    serializer_class = RefundSerializer
    lookup_field = 'id'
    
    
class PayRefund(views.APIView):
    def post(self, request, id):
        refund = Refund.objects.get(id=id)
        refund.is_paid = True
        refund.save()
        return Response({'message': 'Refund Paid Successfully'}, status=status.HTTP_200_OK)