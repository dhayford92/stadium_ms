# Generated by Django 4.2.3 on 2023-08-12 14:20

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_alter_user_table'),
    ]

    operations = [
        migrations.CreateModel(
            name='Asset',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=250, null=True)),
                ('type', models.CharField(blank=True, choices=[('Physical', 'Physical'), ('Equipment', 'Equipment')], max_length=250, null=True)),
                ('condition', models.CharField(blank=True, choices=[('New', 'New'), ('Used', 'Used'), ('Damaged', 'Damaged'), ('Under Maintainace', 'Under Maintainace')], max_length=250, null=True)),
                ('description', models.TextField(blank=True, null=True)),
            ],
            options={
                'db_table': 'asset',
            },
        ),
        migrations.CreateModel(
            name='Maintainace',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(blank=True, choices=[('Repair', 'Repair'), ('Replaced', 'Replaced')], max_length=250, null=True)),
                ('priority', models.CharField(blank=True, choices=[('High', 'High'), ('Medium', 'Medium'), ('Low', 'Low')], max_length=250, null=True)),
                ('status', models.CharField(blank=True, choices=[('Pending', 'Pending'), ('In Progress', 'In Progress'), ('Completed', 'Completed')], max_length=250, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('date', models.DateField(auto_now_add=True)),
                ('asignee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('asset', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.asset')),
            ],
            options={
                'db_table': 'maintainace',
            },
        ),
    ]
