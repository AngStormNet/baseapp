from django.http import HttpResponseForbidden
from rest_framework.viewsets import ModelViewSet

from cva.models import SiteConfiguration
from cva.serializers.siteconfig import SiteConfigurationSerializer


class SiteConfigViewSet(ModelViewSet):
    """Define all SiteConfigViewSet Methods"""
    queryset = SiteConfiguration.objects.all()
    serializer_class = SiteConfigurationSerializer

    def destroy(self, request, pk=None):
        """Config Options cannot be deleted using the API."""
        return HttpResponseForbidden()

    def partial_update(self, request, pk=None):
         """Config Options cannot be partial_update using the API. Use Update"""
         return HttpResponseForbidden()

    def create(self, request):
        """Config options cannot be created using the API."""
        return HttpResponseForbidden()