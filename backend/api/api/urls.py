from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf import settings
from django.conf.urls.static import static


schema_view = get_schema_view(
   openapi.Info(
      title="Stadium Management System API",
      default_version='v1',
      description="Stadium Management System API description",
      terms_of_service="https://www.github.com/dhayford92/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('panel', admin.site.urls),
    path('api/user/', include('apps.users.urls'), name='user'),
    path('api/core/', include('apps.event.urls'), name='core'),
    path('api/admin/', include('apps.admin.urls'), name='Admin'),
    path('', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


