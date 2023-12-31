from rest_framework import serializers
from .models import *



class DateTimeFieldWithCustomFormat(serializers.DateTimeField):
    def to_representation(self, value):
        return value.strftime('%Y-%m-%d %H:%M:%S')

# --- register serializer
class UserRegsiter(serializers.ModelSerializer):
    password = serializers.CharField(min_length=3, write_only=True)
    
    class Meta:
        model = User
        fields = ['fullname', 'email', 'number', 'password', 'is_staff']
        
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


# --- login serializer
class LoginSerializer(serializers.ModelSerializer):
    password = serializers.CharField(min_length=3, write_only=True)
    email = serializers.EmailField(min_length=3)
    
    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'fullname', 'token', 'is_staff']
        read_only_fields = ['id', 'fullname', 'token', 'is_staff']
    
    def validate(self, attrs):
        email = attrs.get('email', None)
        
        if email is None:
            raise ValueError('Email can not be empty')
        return attrs
    
    
# --- user serializer
class UserSerializer(serializers.ModelSerializer):
    last_login = DateTimeFieldWithCustomFormat()
    
    class Meta:
        model = User
        fields = ['id', 'fullname', 'email', 'number', 'is_staff', 'last_login']
        read_only_fields = ['id', 'last_login', 'email']




class AssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset
        fields = '__all__'
        
    def validate(self, attrs):
        name = attrs.get('name', None)
        if name is None:
            raise ValueError('Name can not be empty')
        return attrs
    
    def create(self, validated_data):
        Asset.objects.create(**validated_data)
        return {'message': 'Asset created successfully'}
    
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance
    
    
    
class MaintanceSerializer(serializers.ModelSerializer):
    asignee = UserSerializer(read_only=True)
    asset = AssetSerializer(read_only=True)
    class Meta:
        model = Maintainace
        fields = '__all__'