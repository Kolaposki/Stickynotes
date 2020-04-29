from django.contrib import admin
from .models import Note
from django.contrib.auth.models import Group
from django.contrib.auth.models import User


# Register your models here.


class NoteAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'manager', 'is_done', 'date_updated')
    list_display_links = ('title', 'id')
    search_fields = ('manager__username', 'title', 'description')
    list_filter = ('is_done', 'date_updated', 'manager')
    list_per_page = 30


admin.site.register(Note, NoteAdmin)
admin.site.unregister(Group)
