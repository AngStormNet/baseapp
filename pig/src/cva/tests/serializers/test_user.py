from django.contrib.auth.models import Permission
from django.test import TestCase

from cva.tests.factories import GroupFactory, UserFactory
from cva.serializers.user import UserAuthSerializer, UserSerializer


class TestUserAuthSerializer(TestCase):
    """Test the UserAuthSerializer."""

    def setUp(self):
        """Create a user to test. Add a group and a pemission."""
        self.password = 'Omaha!1776'
        self.user = UserFactory()
        self.user.set_password(self.password)
        self.user.save()

        self.group = GroupFactory()
        self.group.user_set.add(self.user)

        self.perm = Permission.objects.get(codename='add_group')
        self.perm.user_set.add(self.user)

    def tearDown(self):
        """Delete the test user, token and group."""
        self.user.auth_token.delete()
        self.user.delete()
        self.group.delete()

    def test_to_representation(self):
        """Verify the method to_representation returns the right user data."""
        response = UserAuthSerializer(self.user).data
        self.assertEqual(
            self.user.auth_token.key,
            response['token']
        )
        self.assertEqual(
            self.user.id,
            response['id']
        )
        self.assertEqual(
            self.user.first_name,
            response['first_name']
        )
        self.assertEqual(
            self.user.last_name,
            response['last_name']
        )
        self.assertEqual(
            self.user.email,
            response['email']
        )
        self.assertIn(
            self.group.name,
            response['groups']
        )
        # test_perm_value will be "auth.add_group"
        test_perm_value = "{}.{}".format(
            self.perm.natural_key()[1],
            self.perm.natural_key()[0],
        )
        self.assertIn(
            test_perm_value,
            response['permissions']
        )


class TestUserSerializer(TestCase):
    """Test the UserSerializer."""
    def setUp(self):
        self.user = UserFactory()
        self.user.is_active = True
        self.user.save()

        self.group_count = 2
        groups = list(GroupFactory.create_batch(self.group_count))
        self.user.groups.set(groups)

    def test_groups(self):
        """Verify groups are in the serialized user data."""
        test_data = UserSerializer(self.user).data
        self.assertEqual(self.group_count, len(test_data['groups']))
