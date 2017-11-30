from django.contrib.auth.models import Group, User
from django.http import HttpResponseForbidden
from django.shortcuts import get_object_or_404

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

from cva.serializers.user import UserAuthSerializer, UserSerializer


class CustomObtainAuthToken(ObtainAuthToken):
    """Return user auth token and user data."""

    def post(self, request, *args, **kwargs):
        """Return JSON with user auth token and user data.
        
        After a successful user authentication,
        return the auth token, user attributes,
        user's groups, and user's permissions.
        """
        response = super(CustomObtainAuthToken, self).post(
            request,
            *args,
            **kwargs
        )
        token = Token.objects.get(key=response.data['token'])
        return Response(UserAuthSerializer(token.user).data)


class UserViewSet(ModelViewSet):
    """Define all UserViewSet Methods"""
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def assign_groups_to_user(self, user, group_names):
        """Assign groups to user"""
        selected_groups = []
        for group_name in group_names:
            try:
                group = Group.objects.get(name=group_name)
            except Group.DoesNotExist:
                # Group  does not exist, do not give it to the user.
                pass
            finally:
                selected_groups.append(group)

        if selected_groups:
            user.groups.set(selected_groups)
        else:
            user.groups.clear()
        return user

    def create(self, request):
        """User accounts cannot be created using the API."""
        return HttpResponseForbidden()

    def destroy(self, request, pk=None):
        """User accounts cannot be deleted using the API."""
        return HttpResponseForbidden()

    def get_queryset(self):
        """Set up the queryset filters"""
        queryset = User.objects.all().order_by('first_name')
        first_name = self.request.query_params.get('first_name', None)
        if first_name is not None:
            queryset = queryset.filter(first_name=first_name)
        return queryset

    def list(self, request):
        """/users list all users"""
        serializer = UserSerializer(self.get_queryset(), many=True)
        return Response(serializer.data)

    def partial_update(self, request, pk=None):
        """Use the update() method not this method."""
        return HttpResponseForbidden()

    def retrieve(self, request, pk=None):
        """/users/<pk> get individual user info"""
        user = get_object_or_404(User, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def update(self, request, pk=None):
        """Update fields set within the UserSerializer.
        
        Assign groups to the user.
        If the groups parameter is not given, do not change the user's groups.
        """
        if not request.user.has_perm('auth.change_user'):
            return HttpResponseForbidden()

        user = get_object_or_404(User, pk=pk)
        group_names = request.data.pop('groups', None)
        if group_names is not None:
            self.assign_groups_to_user(user=user, group_names=group_names)

        serializer = UserSerializer(user)
        return Response(serializer.data)
