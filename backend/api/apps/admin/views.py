from apps.users.models import User
from apps.event.models import *
from apps.event.serializers import *
from rest_framework import generics, permissions, views, status
from rest_framework.response import Response
from apps.users.serializers import *



class DashboardAPIView(views.APIView):
    permissiom_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    
    def get(self, request):
        total_clients = User.objects.all().count()
        events = Event.objects.all().count()
        tickets = Ticket.objects.all().count()
        transactions = Transaction.objects.all()
        refunds = Refund.objects.all().count()
        context = {
            'total_clients': total_clients,
            'account_balance': events,
            'new_sales': tickets,
            'transactions': TransactionSerializer(transactions, many=True).data,
            'pending_contacts': refunds,
        }
        return Response(context, status=status.HTTP_200_OK)
    