from django.contrib import admin

from apps.users.models import User

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
