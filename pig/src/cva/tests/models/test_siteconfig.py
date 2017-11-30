from django.test import TestCase
from factory import Faker

from cva.models import SiteConfiguration


class TestSiteConfiguration(TestCase):

    def setUp(self):
        self.test_name = Faker('word').generate({})
        self.test_value = Faker('word').generate({})

    def test_add_value(self):
        """Verify the first call adds the value.

        Verify the second call does not add the new value.
        """
        site_conf = SiteConfiguration.add_value(
            name=self.test_name,
            value=self.test_value
        )
        self.assertEqual(self.test_name, site_conf.name)
        self.assertEqual(self.test_value, site_conf.value)

        site_conf = SiteConfiguration.add_value(
            name=self.test_name,
            value=Faker('sentence').generate({})
        )
        self.assertIsNone(site_conf)

    def test_get_value(self):
        """Verify the get method returns the proper value."""
        SiteConfiguration.add_value(
            name=self.test_name,
            value=self.test_value
        )
        value = SiteConfiguration.get_value(name=self.test_name)
        self.assertEqual(value, self.test_value)

    def test_get_value_fails(self):
        """Verify when a name does not exist in the db

        the return value is None.
        """
        SiteConfiguration.add_value(
            name=self.test_name,
            value=self.test_value
        )
        value = SiteConfiguration.get_value(
            name=Faker('sentence').generate({})
        )
        self.assertIsNone(value)

    def test_set_value(self):
        """Verify an existing entry can be udpdated."""
        SiteConfiguration.add_value(
            name=self.test_name,
            value=self.test_value
        )
        new_value = Faker('sentence').generate({})
        site_conf = SiteConfiguration.set_value(
            name=self.test_name,
            value=new_value
        )
        self.assertEqual(site_conf.value, new_value)

    def test_set_value_will_add(self):
        """Verify set_value will add the value when the name does not exist."""
        SiteConfiguration.set_value(
            name=self.test_name,
            value=self.test_value
        )
        value = SiteConfiguration.get_value(name=self.test_name)
        self.assertEqual(self.test_value, value)
