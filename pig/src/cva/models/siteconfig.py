from django.db import models, IntegrityError


class SiteConfiguration(models.Model):
    """Model representing a single site-specific configuration instance"""
    name = models.TextField(
        'Configuration option',
        primary_key=True,
        editable=False
    )
    value = models.TextField('Configuration value')

    def __str__(self):
        """Return the name and value"""
        return "{}: {}".format(self.name, self.value)

    @classmethod
    def add_value(cls, name, value):
        """Add the given value if the name does not exist.
        
        If the name does exist, do not update the value, return None.
        """
        try:
            return cls.objects.create(name=name, value=value)
        except IntegrityError:
            return None

    @classmethod
    def get_value(cls, name):
        """Return the value for the given name."""
        try:
            return cls.objects.get(name=name).value
        except cls.DoesNotExist:
            return None

    @classmethod
    def set_value(cls, name, value):
        """Set the value for the given name.

        If the name does not exist, add the value.
        """
        try:
            site_conf = cls.objects.get(name=name)
        except cls.DoesNotExist:
            site_conf = cls.add_value(name=name, value=value)
        finally:
            site_conf.value = str(value)
            site_conf.save()
        return site_conf
