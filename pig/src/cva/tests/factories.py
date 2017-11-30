from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from factory import Faker, lazy_attribute, post_generation, SubFactory
from factory.django import DjangoModelFactory

from cva.models import (
    SiteConfiguration,
)

User = get_user_model()


def get_unique_name(model):
    """Generate a random, unique name attribute for the given model."""
    exists = True
    while exists:
        name = Faker('word').generate({})
        exists = model.objects.filter(name=name).exists()
    return name

class GroupFactory(DjangoModelFactory):
    """Create a Group object for testing."""
    class Meta:
        model = Group

    @lazy_attribute
    def name(self):
        """Generate a random, unique name."""
        return get_unique_name(Group)


class UserFactory(DjangoModelFactory):
    """Create a User object for testing."""

    class Meta:
        model = User

    @lazy_attribute
    def username(self):
        """Generate a random, unique username."""
        exists = True
        while exists:
            username = Faker('user_name').generate({})
            exists = User.objects.filter(username=username).exists()
        return username


class SiteConfigurationFactory(DjangoModelFactory):
    """Create a SiteConfiguration object for testing."""

    class Meta:
        model = SiteConfiguration

    @lazy_attribute
    def name(self):
        """Generate a random, unique name."""
        return get_unique_name(SiteConfiguration)

    value = Faker('sentence')
