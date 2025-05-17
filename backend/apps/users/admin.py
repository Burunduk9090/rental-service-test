from django.contrib import admin

from apps.users.models import User
from apps.apartments.models import Apartment


@admin.register(User)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ['email', 'is_verified', 'is_staff', 'is_active', 'date_joined']
    list_filter = ['is_verified', 'is_staff', 'is_active']
    search_fields = ['email']
    ordering = ['is_active', 'email']
    list_per_page = 25

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Permissions', {'fields': ('is_verified', 'is_staff', 'is_superuser', 'is_active')}),
        ('Important Dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_verified', 'is_staff', 'is_active'),
        }),
    )


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
