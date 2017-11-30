from rest_framework.serializers import ModelSerializer

from cva.models import SiteConfiguration


class SiteConfigurationSerializer(ModelSerializer):
    """Serializer for serializing the SiteConfiguration objects"""
    class Meta:
        model = SiteConfiguration
        fields = '__all__'
        read_only_fields = ('name',)