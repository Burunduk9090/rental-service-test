from django.contrib import admin

from apps.apartments.models import Apartment

# Register your models here.

@admin.register(Apartment)
class ApartmentAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'number_of_rooms', 'availability', 'owner', 'created_at', 'updated_at']
    list_filter = ['availability', 'owner', 'price', 'number_of_rooms', 'created_at', 'updated_at']
    search_fields = ['name', 'description', 'owner__email']
    prepopulated_fields = {'slug': ('name',)}
    ordering = ('-created_at',)
    list_per_page = 25
    readonly_fields = ('created_at', 'updated_at')

    fieldsets = (
        ('Main Information', {
            'fields': ('name', 'slug', 'description', 'price', 'number_of_rooms', 'square', 'availability')
        }),
        ('Additional Information', {
            'fields': ('owner', 'created_at', 'updated_at'),
        }),
    )
