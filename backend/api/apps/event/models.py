from typing import Iterable, Optional
from django.db import models
import random
import string
import qrcode
from io import BytesIO
from django.core.files import File
from PIL import Image, ImageDraw
from django.db.models.signals import post_save
from django.dispatch import receiver



# event model class

class Event(models.Model):
    EventType = (
        ('1', 'Sports'),
        ('2', 'Concert')
    )
    image = models.ImageField(upload_to='images/')
    title = models.CharField(max_length=250)
    description = models.TextField()
    price = models.IntegerField()
    event_type = models.CharField(max_length=250, choices=EventType)
    capacity = models.IntegerField()
    location = models.CharField(max_length=250)
    date = models.DateField()
    time = models.TimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name_plural = 'Events'
        db_table = 'event'
    


# ticket model class
class Ticket(models.Model):
    Status = (
        ('1', 'Pending'),
        ('2', 'Approved'),
        ('3', 'Cancelled'),
        ('4', 'Booked'),
    )
    ticket_id = models.CharField(max_length=250, unique=True, editable=False)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    qr_code = models.ImageField(upload_to='qr_codes/')
    seat = models.CharField(max_length=250, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=250, choices=Status, default='1')
    is_valid = models.BooleanField(default=False)
    is_refund = models.BooleanField(default=False)
    
    @property
    def total(self):
        return self.event.price * self.quantity
    
    def save(self, *args, **kwargs) -> None:
        if self.ticket_id is None or self.ticket_id == '':
            new_code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
            if self.__class__.objects.filter(ticket_id=new_code).exists():
                self.ticket_id = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
            else:
                self.ticket_id = new_code
        
        if self.qr_code is None or self.qr_code == '':
            qrcode_img = qrcode.make(self.ticket_id)
            canvas = Image.new('RGB', (290, 290), 'white')
            ImageDraw.Draw(canvas).text((10, 10), self.ticket_id, fill='black')
            canvas.paste(qrcode_img)
            fname = f'qr_code-{self.ticket_id}.png'
            buffer = BytesIO()
            canvas.save(buffer, 'PNG')
            self.qr_code.save(fname, File(buffer), save=False)
            canvas.close()
        return super().save()



# parking lot ticket model class
class ParkingLot(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    user = models.ForeignKey('users.User', on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=250)
    is_booked = models.BooleanField(default=False)
    price = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = 'Parking Lots'
        db_table = 'parking_lot'
        
        


# transaction model class
class Transaction(models.Model):
    Status = (
        ('1', 'Pending'),
        ('2', 'Approved'),
        ('3', 'Cancelled'),
        ('4', 'Booked')
    )
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    amount = models.IntegerField(default=0)
    status = models.CharField(max_length=250, choices=Status, default='1')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    @property
    def total(self):
        return self.ticket.event.price * self.ticket.quantity
    
    def __str__(self):
        return self.ticket.ticket_id
    
    class Meta:
        verbose_name_plural = 'Transactions'
        db_table = 'transaction'
        



# refund model class
class Refund(models.Model):
    Status = (
        ('1', 'Pending'),
        ('2', 'Approved'),
        ('3', 'Cancelled'),
    )
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    amount = models.IntegerField()
    is_paid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    @property
    def total(self):
        return self.ticket.event.price * self.ticket.quantity
    
    def __str__(self):
        return self.ticket.ticket_id
    
    class Meta:
        verbose_name_plural = 'Refunds'
        db_table = 'refund'
        
        
        


# parking signal function
@receiver(post_save, sender=Event)
def parking_signal(sender, instance, created, **kwargs):
    if created:
        for i in range(1, instance.capacity + 1):
            a = f'AB{i/2}'
            ParkingLot.objects.create(event=instance, name=f'Lot{i if i >= 30 else a}', price=10)
            

# ticket signal function
@receiver(post_save, sender=Ticket)
def trancation_signal(sender, instance, created, **kwargs):
    if created:
        Transaction.objects.create(ticket=instance, user=instance.user)