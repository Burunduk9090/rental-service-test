from rest_framework import viewsets, permissions, filters, status
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema

from apps.apartments.models import Apartment
from apps.apartments.api.serializers import ApartmentSerializer


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Кастомний дозвіл: тільки власник може редагувати або видаляти
    """

    def has_object_permission(self, request, view, obj):
        # Читати дозволено всім, але змінювати лише власнику
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.owner == request.user


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class ApartmentViewSet(viewsets.ModelViewSet):
    """
    ViewSet для CRUD операцій над квартирами
    """
    queryset = Apartment.objects.all()
    serializer_class = ApartmentSerializer
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = {
        'price': ['gte', 'lte'],  # price_min, price_max
        'number_of_rooms': ['exact'],  # Фільтр за кількістю кімнат
        'availability': ['exact'],  # Фільтр за доступністю (True/False)
    }
    search_fields = ['name', 'description']  # Пошук за назвою та описом
    lookup_field = 'slug'  # Змінюємо пошук з pk на slug

    def get_permissions(self):
        """
        Призначення дозволів залежно від запиту
        """
        # Для створення квартири — тільки авторизовані користувачі
        if self.action in ['create']:
            return [permissions.IsAuthenticated()]
        # Для редагування/видалення — тільки власник
        if self.action in ['update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated(), IsOwnerOrReadOnly()]
        # Для списку / деталей — відкритий доступ
        return [permissions.AllowAny()]

    def perform_create(self, serializer):
        """
        Призначення власника при створенні квартири
        """
        serializer.save(owner=self.request.user)

    @extend_schema(
        description="Отримати список квартир із фільтрами, пошуком і пагінацією",
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @extend_schema(
        description="Отримати деталі квартири за slug",
    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    @extend_schema(
        description="Створити нову квартиру (доступ тільки для авторизованих користувачів)",
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @extend_schema(
        description="Оновлення квартири (доступ тільки для власника)",
    )
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    @extend_schema(
        description="Видалення квартири (доступ тільки для власника)",
    )
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)
