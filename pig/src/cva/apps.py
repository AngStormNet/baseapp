from django.apps import AppConfig
from django.conf import settings
from django.db import DatabaseError, connection



class ApplicationConfig(AppConfig):
    """Configure the application when it is first started."""
    name = 'cva'

    def set_site_configuration(self):
        """Add settings values to the database, if they don't exist."""
        SiteConfiguration = self.get_model('SiteConfiguration')
        """
        try:
            SiteConfiguration.add_value(
                name='RULE_ARCHIVE_DAYS',
                value=settings.RULE_ARCHIVE_DAYS
            )
        except DatabaseError:
            # The database table has not been created yet.
            connection.close()
        """

    def setup_signals(self):
        """Register the signal handlers."""
        from cva.signals import auth_token

    def ready(self):
        """Perform application configuration tasks.

        ready() is automatically called by django startup
        """
        self.setup_signals()
        self.set_site_configuration()
