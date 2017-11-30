from django.contrib.auth import authenticate
from django.test import TestCase
from rest_framework.authtoken.models import Token

from cva.tests.factories import UserFactory


class TestAuth(TestCase):
    """Test the user authentication using LDAP and local process."""

    def setUp(self):
        """Create a user to test the login."""
        self.password = 'Omaha!1776'
        self.user = UserFactory()
        self.user.set_password(self.password)
        self.user.save()

    def tearDown(self):
        """Delete the test user."""
        self.user.delete()

    def test_user_auth_success(self):
        """Test a successful user authentication, login.

        This test will generate an error message similar to this
        Caught LDAPError while authenticating veronicagraves:
            LDAPError(2, 'No such file or directory')
        because the test will try LDAP auth first and fail,
        then it will try local auth and succeed.
        """
        usr = authenticate(
            username=self.user.username,
            password=self.password
        )
        self.assertIsNotNone(usr, msg="User not able to login.")


class TestAuthToken(TestCase):
    """Test the user creation process also creates an authorization Token."""
    
    def test_auth_token_success(self):
        """Verify a token is created for a new user."""
        orig_token_count = Token.objects.count()
        self.user = UserFactory()
        self.assertEqual(Token.objects.count(), orig_token_count + 1)
        self.assertIsNotNone(self.user.auth_token)
        self.user.auth_token.delete()
        self.user.delete()

    def test_auth_token_only_on_user_create(self):
        """Verify a token is not created when a user is updated."""
        orig_token_count = Token.objects.count()
        self.user = UserFactory()
        self.assertEqual(Token.objects.count(), orig_token_count + 1)
        self.user.is_active = not self.user.is_active
        self.user.save()
        self.assertEqual(Token.objects.count(), orig_token_count + 1)
        self.user.auth_token.delete()
        self.user.delete()
