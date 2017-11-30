import ldap
import logging
import os
from django_auth_ldap.config import LDAPSearch

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECRET_KEY = os.getenv('DJANGO_SECRET_KEY')
DEBUG = bool(int(os.getenv('DEBUG')))

ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_extensions',
    'django_nose',
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
    'reversion',
    'cva',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
        'rest_framework.permissions.DjangoModelPermissions',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
    ),
}

ROOT_URLCONF = 'cva.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'cva.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'HOST': os.getenv('DATABASE_HOST'),
        'NAME': os.getenv('DATABASE_DB'),
        'USER': os.getenv('DATABASE_USER'),
        'PASSWORD': os.getenv('DATABASE_PASSWORD'),
        'PORT': os.getenv('DATABASE_PORT', 5432),
    }
}

# REDIS related settings 
REDIS_HOST = 'localhost'
REDIS_PORT = '6379'
BROKER_URL = 'redis://' + REDIS_HOST + ':' + REDIS_PORT + '/0'
BROKER_TRANSPORT_OPTIONS = {'visibility_timeout': 3600} 
CELERY_RESULT_BACKEND = 'redis://' + REDIS_HOST + ':' + REDIS_PORT + '/0'

# CORS Configuration.
CORS_ORIGIN_ALLOW_ALL = True

# You can provide a whitelist specific with hostnames as shown below.
# CORS_ORIGIN_WHITELIST = []
# CORS_ORIGIN_REGEX_WHITELIST = []



# LDAP Service configuration.
if DEBUG:
    # Use a local development LDAP service
    AUTH_LDAP_SERVER_URI = 'localhost'
    AUTH_LDAP_BIND_DN = 'CN=admin,DC=example,DC=org'
    AUTH_LDAP_BIND_PASSWORD = 'admin'
    AUTH_LDAP_USER_SEARCH = LDAPSearch(
        'dc=example,dc=org',
        ldap.SCOPE_SUBTREE,
        '(uid=%(user)s)',
    )
else:
    # Use RFS production LDAP
    AUTH_LDAP_SERVER_URI = 'ldap://dc01-vm-fgs-va-cit150.foreground.local'
    AUTH_LDAP_BIND_DN = 'cn=SA CONEX,ou=Service Accounts,dc=foreground,dc=local'
    AUTH_LDAP_BIND_PASSWORD = os.getenv('LDAP_BIND_PASSWORD')
    AUTH_LDAP_USER_SEARCH = LDAPSearch(
        'ou=Departments,dc=foreground,dc=local',
        ldap.SCOPE_SUBTREE,
        '(sAMAccountName=%(user)s)',
    )

# Populate the Django user from the LDAP directory.
AUTH_LDAP_USER_ATTR_MAP = {
    "first_name": "givenName",
    "last_name": "sn",
    "email": "mail",
}

# This is the default, but it is good to be explicit.
AUTH_LDAP_ALWAYS_UPDATE_USER = True

# Try LDAP first.
# Try django default second.
AUTHENTICATION_BACKENDS = (
    'django_auth_ldap.backend.LDAPBackend',
    'django.contrib.auth.backends.ModelBackend',
)

# Enable the logging for auth so we can see LDAP errors.
logger = logging.getLogger('django_auth_ldap')
logger.addHandler(logging.StreamHandler())
if DEBUG:
    logger.setLevel(logging.DEBUG)
else:
    logger.setLevel(logging.INFO)

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

MEDIA_URL = os.getenv("MEDIA_URL", "/media/")
MEDIA_ROOT = os.getenv("MEDIA_VOLUME", "/srv/files/")

STATIC_URL = "/static/"

TEST_RUNNER = 'django_nose.NoseTestSuiteRunner'

if not DEBUG:
    # CSRF over HTTP protection
    CSRF_COOKIE_SECURE = True
    SESSION_COOKIE_SECURE = True
    SECURE_SSL_REDIRECT = True
    SECURE_BROWSER_XSS_FILTER = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
    X_FRAME_OPTIONS = 'DENY'
    CSRF_COOKIE_HTTPONLY = True
