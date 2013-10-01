from jobs import views
from django.conf.urls import patterns, url, include
from rest_framework.routers import DefaultRouter
from django.contrib import admin
admin.autodiscover()

router = DefaultRouter()
router.register(r'jobs', views.JobViewSet)
router.register(r'users', views.UserViewSet)

urlpatterns = patterns('',
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
)

urlpatterns += patterns('',
    url(r'^api-token-auth/', 'rest_framework.authtoken.views.obtain_auth_token')
)

urlpatterns += patterns('backend.views',
                       url(r'^admin/', include(admin.site.urls))
)
