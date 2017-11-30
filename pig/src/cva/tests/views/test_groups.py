from django.contrib.auth.models import Group
from django.http import HttpResponseForbidden
from django.test import TestCase
from django.urls import reverse
from rest_framework.status import HTTP_200_OK
from rest_framework.test import APIRequestFactory, force_authenticate

from cva.tests.factories import GroupFactory, UserFactory
from cva.views.group import GroupList


class GroupListTests(TestCase):
    """Test all actions of GroupList."""
    def setUp(self):
        """Create dummy data to test."""
        self.factory = APIRequestFactory()
        self.user = UserFactory()
        self.group = GroupFactory()

    def test_list(self):
        """Tests retrieval of all groups in the system from /groups"""
        view = GroupList.as_view()
        request = self.factory.get(reverse('group-list'))
        force_authenticate(request, user=self.user)
        response = view(request)
        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertEqual(
            len(response.data),
            Group.objects.count()
        )
