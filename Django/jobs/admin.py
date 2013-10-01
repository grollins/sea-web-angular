from django.contrib import admin
from .models import Job


class JobAdmin(admin.ModelAdmin):
    pass

''' Register Admin layouts into django'''
admin.site.register(Job, JobAdmin)
