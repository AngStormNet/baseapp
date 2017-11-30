from django.contrib.auth.models import Permission, User
from django.http import HttpResponseForbidden
from django.test import TestCase
from django.urls import reverse
from factory import Faker
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_403_FORBIDDEN,
)
from rest_framework.test import APIRequestFactory, force_authenticate

from cva.tests.factories import GroupFactory, UserFactory
from cva.views.user import UserViewSet


class UserViewSetTests(TestCase):
    """Test all actions of UserViewSet List, Retieve, Update.

    All methods force_auth with user1.
    """

    def setUp(self):
        """Create user accounts to modify."""
        self.factory = APIRequestFactory()

        self.user1 = UserFactory()
        self.user1.first_name = Faker('first_name').generate({})
        self.user1.is_active = False
        self.user1.save()

        self.user2 = UserFactory()
        self.user2.first_name = Faker('first_name').generate({})
        self.user2.is_active = True
        self.user2.save()

        self.group = GroupFactory()

        # Create a user with permissions to change user accounts.
        self.change_user_perm = Permission.objects.get(codename='change_user')
        self.admin_user = UserFactory()
        self.admin_user.is_active = True
        self.admin_user.user_permissions.add(self.change_user_perm)
        self.admin_user.save()

    def test_assign_groups_to_user(self):
        """Test the method that assigns groups to users."""
        self.assertEqual(len(self.user1.groups.all()), 0)
        view = UserViewSet()
        user = view.assign_groups_to_user(
            user=self.user1,
            group_names=[self.group.name, 'junk group',]
        )
        self.assertEqual(len(user.groups.all()), 1)

    def test_change_groups(self):
        """Test moving a user from one group to another."""
        self.assertEqual(len(self.user1.groups.all()), 0)
        # Assign one group
        view = UserViewSet.as_view(actions={'put': 'update'})
        request = self.factory.put(
            reverse('user-detail', args=(self.user1.pk,)),
            {
                'groups': [self.group.name]
            },
            format='json'
        )
        force_authenticate(request, user=self.admin_user)
        response = view(request, pk=self.user1.pk)
        self.assertEqual(len(self.user1.groups.all()), 1)
        
        # Reassign to another group
        new_group = GroupFactory(name=self.group.name + '-NEW')
        request = self.factory.put(
            reverse('user-detail', args=(self.user1.pk,)),
            {
                'groups': [new_group.name]
            },
            format='json'
        )
        force_authenticate(request, user=self.admin_user)
        response = view(request, pk=self.user1.pk)
        self.assertEqual(response.status_code, HTTP_200_OK)        
        self.assertEqual(len(self.user1.groups.all()), 1)
        self.assertEqual(self.user1.groups.all()[0], new_group)

    def test_create_fails(self):
        """Verify a user account cannot be created by POST to /users"""
        start_user_count = User.objects.count()
        view = UserViewSet.as_view(actions={'post': 'create'})
        request = self.factory.post(
            reverse('user-list'),
            {
                'username': 'new.user',
                'first_name': 'New',
                'last_name': 'User',
                'is_active': True,
            },
            format='json'
        )
        force_authenticate(request, user=self.admin_user)
        response = view(request)
        self.assertEqual(response.status_code, HTTP_403_FORBIDDEN)
        stop_user_count = User.objects.count()
        # When the counts are equal, no user account was created.
        self.assertEqual(start_user_count, stop_user_count)

    def test_delete_fails(self):
        """Verify a user account cannot be deleted using the API."""
        start_user_count = User.objects.count()
        view = UserViewSet.as_view(actions={'delete': 'destroy'})
        request = self.factory.delete(
            reverse('user-detail', args=(self.user1.pk,)),
            format='json'
        )
        force_authenticate(request, user=self.admin_user)
        response = view(request, pk=self.user1.pk)
        self.assertEqual(response.status_code, HTTP_403_FORBIDDEN)
        stop_user_count = User.objects.count()
        # When the counts are equal, no user account was deleted.
        self.assertEqual(start_user_count, stop_user_count)

    def test_forbidden(self):
        """Test a user without permsissions cannot update a user account."""
        view = UserViewSet.as_view(actions={'put': 'update'})
        request = self.factory.put(
            reverse('user-detail', args=(self.user1.pk,)),
            {
                'is_active': True,
            },
            format='json'
        )
        force_authenticate(request, user=self.user2)
        response = view(request, pk=self.user1.pk)
        self.assertEqual(response.status_code, HTTP_403_FORBIDDEN)

    def test_list(self):
        """Tests retrieval of all users in the system from /users"""
        view = UserViewSet.as_view(actions={'get': 'list'})
        request = self.factory.get(reverse('user-list'))
        force_authenticate(request, user=self.admin_user)
        response = view(request)
        self.assertEqual(response.status_code, HTTP_200_OK)        
        data_list = response.data
        self.assertEqual(len(data_list), 3)

        for data in data_list:
            if data['id'] == self.user1.pk:
                self.assertEqual(data['is_active'], self.user1.is_active)
                self.assertEqual(data['first_name'], self.user1.first_name)
            elif data['id'] == self.user2.pk:
                self.assertEqual(data['is_active'], self.user2.is_active)
                self.assertEqual(data['first_name'], self.user2.first_name)

    def test_retieve(self):
        """Tests that we are able to retrieve a users data from the API"""
        view = UserViewSet.as_view(actions={'get': 'retrieve'})
        request = self.factory.get(reverse('user-detail', args=(self.user1.pk,)))
        force_authenticate(request, user=self.admin_user)
        response = view(request, pk=self.user1.pk)
        self.assertEqual(response.status_code, HTTP_200_OK)
        user = response.data

        self.assertEqual(user['id'], self.user1.pk)
        self.assertEqual(user['first_name'], self.user1.first_name)
        self.assertEqual(user['is_active'], self.user1.is_active)

    def test_update_no_groups(self):
        """Tests that we are able to remove all groups from a user."""
        self.user1.groups.add(self.group)
        self.assertEqual(len(self.user1.groups.all()), 1)
        
        view = UserViewSet.as_view(actions={'put': 'update'})
        request = self.factory.put(
            reverse('user-detail', args=(self.user1.pk,)),
            {
                'groups': [],
            },
            format='json'
        )
        force_authenticate(request, user=self.admin_user)
        response = view(request, pk=self.user1.pk)
        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertEqual(len(self.user1.groups.all()), 0)

    def test_update_groups(self):
        """Tests that we are able to add a group to a user."""
        self.assertEqual(len(self.user1.groups.all()), 0)
        
        view = UserViewSet.as_view(actions={'put': 'update'})
        request = self.factory.put(
            reverse('user-detail', args=(self.user1.pk,)),
            {
                'groups': [self.group.name, 'garbage group']
            },
            format='json'
        )
        force_authenticate(request, user=self.admin_user)
        response = view(request, pk=self.user1.pk)
        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertEqual(len(self.user1.groups.all()), 1)
