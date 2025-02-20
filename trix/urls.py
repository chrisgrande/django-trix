try:
    # Django 3.x
    from django.conf.urls import url
except ImportError:
    # Django 4.x+
    from django.urls import re_path as url

from django.urls import include
from .views import UploadTrixAttachment

urlpatterns = [
    url(r'^attachment/$', UploadTrixAttachment.as_view()),
]
