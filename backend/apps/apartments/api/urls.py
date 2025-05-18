from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.apartments.api.views import ApartmentViewSet

# Створення маршрутизатора для ViewSet
router = DefaultRouter()
router.register(r'apartments', ApartmentViewSet, basename='apartments')

urlpatterns = [
    # Додаємо маршрути для Apartment API
    path('', include(router.urls)),
]
