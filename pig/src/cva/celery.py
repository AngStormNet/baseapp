import os
from celery import Celery
from celery.schedules import crontab
from django.conf import settings

 
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cva.settings')
 
app = Celery('cva')
app.config_from_object('django.conf:settings')
 
# Load task modules from all registered Django app configs.
app.autodiscover_tasks()

# Define the scheduled tasks
if settings.DEBUG:
    # Run tasks every minute when in DEBUG mode
    app.conf.beat_schedule = {
        'test_scheduled_task': {
            'task': 'cva.tasks.test.test_scheduled_task',
            'schedule': crontab(),
        },
    }
else:
    # Production tasks
    app.conf.beat_schedule = {
    }