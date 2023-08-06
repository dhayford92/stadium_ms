from rest_framework import serializers
from .models import User



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

