from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAmin
from .models import *



class UserAdmin(BaseUserAmin):
    fieldsets = (
        (None, {'fields': ('email', 'password', 'fullname', 'number', 'last_login')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    )
    add_fieldsets = (
        ( None, {
            'classes': ('wide',),
            'fields': ('fullname', 'email', 'number', 'password1', 'password2')
        }
        ),
    )
    list_display = ('email', 'fullname', 'number', 'is_staff', 'last_login')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'groups')
    search_fields = ['email', 'fullname']
    ordering = ['email']
    filter_horizontal = ('groups', 'user_permissions',)
    




class AssetAdmin(admin.ModelAdmin):
    list_display = ('name', 'type', 'condition',)
    list_editable = ('condition',)
    list_filter = ('type', 'condition',)
    
    class Meta:
        model = Asset
        
        
class MaintenanceAdmin(admin.ModelAdmin):
    list_display = ('asset', 'asignee', 'type', 'priority', 'status', 'date')
    list_editable = ('asignee', 'status')
    list_filter = ('status', 'type',)
    
    class Meta:
        model = Maintainace




admin.site.register(User, UserAdmin)
admin.site.register(Asset, AssetAdmin)
admin.site.register(Maintainace, MaintenanceAdmin)