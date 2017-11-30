from django.conf import settings
from django.contrib.auth.models import User


if settings.DEBUG:
    def run():
        """Script entry point"""
        remove_test_users()

def remove_test_users():
    """Remove users for testing"""
    User.objects.all().delete()

