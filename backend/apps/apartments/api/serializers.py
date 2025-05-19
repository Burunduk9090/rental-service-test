from rest_framework import serializers
from apps.apartments.models import Apartment


class ApartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Apartment
        fields = [
            'id',
            'name',
            'slug',
            'description',
            'price',
            'number_of_rooms',
            'square',
            'availability',
            'owner',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'owner', 'created_at', 'updated_at']
