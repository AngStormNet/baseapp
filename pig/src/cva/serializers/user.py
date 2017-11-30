from django.contrib.auth.models import User
from rest_framework.serializers import BaseSerializer, ModelSerializer

from .group import GroupSerializer


class UserAuthSerializer(BaseSerializer):
    """Serialize the user instance data into a dictionary."""
    
    def to_representation(self, user):
        """Return a dictionary with the user instance data.
        
        groups - a list of group names
        permissions - a list of the user's permissions
        """
        return {
            'id': user.id,
            'token': user.auth_token.key,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'groups': user.groups.all().values_list('name', flat=True),
            'permissions': user.get_all_permissions(),
        }


class UserSerializer(ModelSerializer):
    """UserSerializer for any user data for the user APIs"""
    groups = GroupSerializer(many=True, required=False)

    class Meta:
        model = User
        fields = (
            'id',
            'first_name',
            'last_name',
            'email',
            'is_active',
            'groups',
        )

