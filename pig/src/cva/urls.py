from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic import TemplateView
from rest_framework import routers

from cva.views.group import GroupList
from cva.views.siteconfig import SiteConfigViewSet
from cva.views.user import CustomObtainAuthToken, UserViewSet


router = routers.DefaultRouter(trailing_slash=False)
router.register(r'users', UserViewSet)
router.register(r'settings', SiteConfigViewSet)

urlpatterns = [
    url(r'^groups/', GroupList.as_view(), name='group-list'),
    url(r'^user/authenticate/', CustomObtainAuthToken.as_view()),
]

urlpatterns += router.urls

# During development, make media and static files available.
# Include the admin link for managing the River Workflow.
if settings.DEBUG:
    urlpatterns.append(url(r'^admin/', admin.site.urls))    
    urlpatterns + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
