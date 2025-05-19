from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.apartments.api.views import ApartmentViewSet

router = DefaultRouter()
router.register(r'apartments', ApartmentViewSet, basename='apartments')

urlpatterns = [
    path('', include(router.urls)),
]
