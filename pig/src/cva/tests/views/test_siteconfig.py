from django.contrib.auth.models import Permission
from django.http import HttpResponseForbidden
from django.test import TestCase
from django.urls import reverse
from factory import Faker
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_403_FORBIDDEN,
)
from rest_framework.test import APIRequestFactory, force_authenticate
from random import *

from cva.models import SiteConfiguration
from cva.tests.factories import UserFactory, SiteConfigurationFactory
from cva.views.siteconfig import SiteConfigViewSet


class SiteConfigViewSetTests(TestCase):
    """Test all actions of SiteConfigViewSet Create, List, Retieve, Update."""

    def setUp(self):
        """Create test data"""
        self.factory = APIRequestFactory()
        self.user = UserFactory()
        self.config = SiteConfigurationFactory()

    def test_create_api_fail(self):
        """Verify a site config option cannot be created."""
        view = SiteConfigViewSet.as_view(actions={'post': 'create'})
        request = self.factory.post(
            reverse('siteconfiguration-list'),
            {
                'name' : Faker('word').generate({}),
                'value' : randint(1, 500),
            },
            format='json'
        )
        force_authenticate(request, user=self.user)
        response = view(request)
        self.assertEqual(response.status_code, HTTP_403_FORBIDDEN)

    def test_delete_fail(self):
        """Verify a site config cannot be deleted"""
        view = SiteConfigViewSet.as_view(actions={'delete': 'destroy'})
        request = self.factory.delete(
            reverse('siteconfiguration-detail', args=(self.config.pk,)),
            format='json'
        )
        force_authenticate(request, user=self.user)
        response = view(request, pk=self.config.pk)
        self.assertEqual(response.status_code, HTTP_403_FORBIDDEN)

    def test_list(self):
        """Verify the retrieval of all site configs"""
        #SiteConfigurationFactory()
        view = SiteConfigViewSet.as_view(actions={'get': 'list'})
        request = self.factory.get(reverse('siteconfiguration-list'))
        force_authenticate(request, user=self.user)
        response = view(request)
        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertEqual(
            len(response.data),
            SiteConfiguration.objects.count()
        )

    def test_update_api_read_only_name(self):
        """Verify a user cannot add a new field by manupliating the form"""
        self.user.user_permissions.add(
            Permission.objects.get(codename='change_siteconfiguration')
        )
        current_name = self.config.name
        new_name = "some_name"
        view = SiteConfigViewSet.as_view(actions={'put': 'update'})
        request = self.factory.put(
            reverse('siteconfiguration-list'),
            {
                'name' : new_name,
                'value' : self.config.value,
            },
            format='json'
        )
        force_authenticate(request, user=self.user)
        response = view(request, pk=self.config.pk)
        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertEqual(
            SiteConfiguration.objects.get(pk=self.config.pk).name,
            current_name
        )

    def test_update_api_fail_no_permission(self):
        """Verify a user without change_siteconfiguration permission cannot update."""
        view = SiteConfigViewSet.as_view(actions={'put': 'update'})
        request = self.factory.put(
            reverse('siteconfiguration-list'),
            {
                'name' : self.config.name,
                'value' : randint(1, 500),
            },
            format='json'
        )
        force_authenticate(request, user=self.user)
        response = view(request, pk=self.config.pk)
        self.assertEqual(response.status_code, HTTP_403_FORBIDDEN)

    def test_update_api_success(self):
        """Ensure that Update API updates and returns a 200"""
        self.user.user_permissions.add(
            Permission.objects.get(codename='change_siteconfiguration')
        )

        rand_number = randint(1, 500)
        view = SiteConfigViewSet.as_view(actions={'put': 'update'})
        request = self.factory.put(
            reverse('siteconfiguration-list'),
            {
                'name' : self.config.name,
                'value' : rand_number,
            },
            format='json'
        )
        force_authenticate(request, user=self.user)
        response = view(request, pk=self.config.pk)
        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertEqual(
            int(SiteConfiguration.objects.get(pk=self.config.pk).value),
            rand_number
        )