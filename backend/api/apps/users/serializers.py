from rest_framework import serializers
from .models import User



class UserRegsiter(serializers.ModelSerializer):
    password = serializers.CharField(min_length=3, write_only=True)
    
    class Meta:
        model = User
        fields = ['fullname', 'email', 'number', 'password']
        
    def validate(self, attrs):
        email = attrs.get('email', None)
        phone = attrs.get('number', None)
        
        if email is None:
            raise ValueError('Email can not be empty')
        if phone is None:
            raise ValueError('Phone can not be empty')

        if User.objects.filter(email=email).exists():
            raise ValueError('Email already exists')
        return attrs
    
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    