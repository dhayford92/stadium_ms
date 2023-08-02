from rest_framework import serializers
from .models import Event, Ticket, ParkingLot


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
    
    class Meta:
        model = Ticket
        fields = '__all__'
        
    def get_total(self, obj):
        return obj.total
    