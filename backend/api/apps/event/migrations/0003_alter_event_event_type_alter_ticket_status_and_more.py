# Generated by Django 4.2.3 on 2023-08-06 12:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0002_alter_transaction_amount'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='event_type',
            field=models.CharField(choices=[('Sports', 'Sports'), ('Concert', 'Concert')], max_length=250),
        ),
        migrations.AlterField(
            model_name='ticket',
            name='status',
            field=models.CharField(choices=[('Pending', 'Pending'), ('Approved', 'Approved'), ('Cancelled', 'Cancelled'), ('Booked', 'Booked')], default='1', max_length=250),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='status',
            field=models.CharField(choices=[('Pending', 'Pending'), ('Approved', 'Approved'), ('Cancelled', 'Cancelled'), ('Booked', 'Booked')], default='1', max_length=250),
        ),
    ]