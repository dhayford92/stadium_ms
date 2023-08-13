from apps.users.serializers import UserSerializer
from rest_framework import serializers
from .models import Event, Refund, Ticket, ParkingLot, Transaction


class DateTimeFieldWithCustomFormat(serializers.DateTimeField):
    def to_representation(self, value):
        return value.strftime('%Y-%m-%d %H:%M:%S')
    

class EventTypeField(serializers.ChoiceField):
    def to_representation(self, value):
        return dict(self.choices)[value]


class EventSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Event
        fields = '__all__'
        read_only_fields = ['created_at']
    
    

class TicketSerializer(serializers.ModelSerializer):
    event = EventSerializer(read_only=True)
    total = serializers.SerializerMethodField()
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Ticket
        fields = '__all__'
        
    def get_total(self, obj):
        return obj.total
    
    
class ParkingLotSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = ParkingLot
        fields = '__all__'
        

class TransactionSerializer(serializers.ModelSerializer):
    created_at = DateTimeFieldWithCustomFormat()
    user = UserSerializer(read_only=True)
    ticket = TicketSerializer(read_only=True)
    class Meta:
        model = Transaction
        depth = 1
        fields = '__all__'



class RefundSerializer(serializers.ModelSerializer):
    created_at = DateTimeFieldWithCustomFormat()
    user = UserSerializer(read_only=True)
    ticket = TicketSerializer(read_only=True)
    class Meta:
        model = Refund
        depth = 1
        fields = '__all__'