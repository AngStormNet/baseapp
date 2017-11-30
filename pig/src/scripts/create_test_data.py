import random
from django.conf import settings
from django.contrib.auth.models import Group, User


if settings.DEBUG:
    def run():
        """Script entry point"""
        create_test_users()

def create_test_users():
    """Create users for testing each group."""
    create_user(
        username='admin',
        password='cva.admin',
        groupname='Administrator',
    )
    create_user(
        username='ray.ro',
        password='cva.ray.ro',
    )
    create_user(
        username='cust.ro',
        password='cva.cust.ro',
    )
    create_user(
        username='engineer',
        password='cva.engineer',
        groupname='Engineer',
    )
    create_user(
        username='liaison',
        password='cva.liaison',
        groupname='Liaison',
    )

def create_user(username, password, groupname=None):
    """Create test users in the database."""
    user, created = User.objects.get_or_create(
        username=username,
        first_name=username,
        last_name='TestUser',
        email=username+'@ray.com',
    )
    if created:
        if groupname:
            user.groups.add(Group.objects.get(name=groupname))
        user.set_password(password)
        user.save()
    print(username, password)
