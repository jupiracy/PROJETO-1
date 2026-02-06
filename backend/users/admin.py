from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, StudentProfile

class StudentProfileInline(admin.StackedInline):
    model = StudentProfile
    can_delete = False
    verbose_name_plural = 'Student Profile'

class CustomUserAdmin(UserAdmin):
    inlines = (StudentProfileInline,)

admin.site.register(User, CustomUserAdmin)
