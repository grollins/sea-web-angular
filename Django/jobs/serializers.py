from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Job


class JobSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.Field(source='owner.username')

    class Meta:
        model = Job
        fields = ('id', 'url', 'title', 'status', 'owner', 'structure', 'topology')
        read_only = ('status')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    jobs = serializers.HyperlinkedRelatedField(many=True, view_name='job-detail')

    class Meta:
        model = User
        fields = ('url', 'username', 'jobs')
