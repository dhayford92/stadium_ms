from django.contrib import admin
from .models import Event, Ticket, ParkingLot



class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'image', 'created_at')
    list_filter = ('title', 'price', 'created_at')
    
    class Meta:
        model = Event
        fields = '__all__'


class TicketAdmin(admin.ModelAdmin):
    list_display = ('ticket_id', 'event', 'user', 'quantity', 'seat', 'created_at', 'status', 'is_valid', 'is_refund')
    list_editable = ('status', 'is_valid', 'is_refund')
    list_filter = ('status', 'is_valid', 'is_refund')
    search_fields = ('ticket_id', 'event', 'user', 'quantity', 'seat', 'status')
    
    class Meta:
        model = Ticket
        fields = '__all__'
        
        


admin.site.register(Event, EventAdmin)
admin.site.register(Ticket, TicketAdmin)
admin.site.register(ParkingLot)