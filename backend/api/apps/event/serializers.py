from apps.users.serializers import UserSerializer
from rest_framework import serializers
from .models import Event, Ticket, ParkingLot, Transaction


class DateTimeFieldWithCustomFormat(serializers.DateTimeField):
    def to_representation(self, value):
        return value.strftime('%Y-%m-%d %H:%M:%S')
    
    
    

class EventSerializer(serializers.ModelSerializer):
    event_type = serializers.SerializerMethodField()
    class Meta:
        model = Event
        fields = '__all__'
        
    def get_event_type(self, obj):
        return dict(Event.EventType)[obj.event_type]
    

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
    class Meta:
        model = ParkingLot
        fields = '__all__'
        

class TransactionSerializer(serializers.ModelSerializer):
    status = serializers.SerializerMethodField()
    created_at = DateTimeFieldWithCustomFormat()
    user = UserSerializer(read_only=True)
    class Meta:
        model = Transaction
        depth = 1
        fields = '__all__'
        
    def get_status(self, obj):
        return dict(Transaction.Status)[obj.status]