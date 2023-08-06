from django.utils import timezone
from django.db import models
from django.contrib.auth.models import BaseUserManager, PermissionsMixin, AbstractBaseUser
from rest_framework_simplejwt.tokens import RefreshToken



class UserManager(BaseUserManager):
    def _create_user(self, email, password, is_staff, is_superuser, **kwargs):
        if not email:
            raise ValueError('User must have email address')
        now = timezone.now()
        email = self.normalize_email(email)
        user = self.model(
            email = email, 
            is_staff = is_staff,
            is_superuser=is_superuser,
            last_login=now,
            date_joined=now,
            **kwargs
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    
    #---create normal user
    def create_user(self, email=None, password=None, is_staff=None, **kwargs):
        return self._create_user(email, password, is_staff, False, **kwargs)

    #---create superuser
    def create_superuser(self, email, password, **kwargs):
        user = self._create_user(email, password, True, True, **kwargs)
        user.save(using=self._db)
        return user
    
    


class User(AbstractBaseUser, PermissionsMixin):
    fullname = models.CharField(max_length=250, null=True, blank=True)
    email = models.EmailField(max_length=250, unique=True)
    number = models.CharField(max_length=250, null=True, blank=True)
    is_active=models.BooleanField(default=True)
    is_staff=models.BooleanField(default=False)
    is_superuser=models.BooleanField(default=False)
    last_login = models.DateTimeField(null=True, blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    objects = UserManager()
    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['fullname']

    def get_absolute_url(self):
        return "/users/%i/" % (self.pk)

    def get_email(self):
        return self.email
    
    @property
    def token(self):
        token = RefreshToken.for_user(self)
        token['fullname'] = self.fullname
        return {
            'refresh': str(token),
            'access': str(token.access_token)
        }
        
    class Meta:
        db_table = 'users'