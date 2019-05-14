from django.conf.urls import include, url
from .views import UploadTrixAttachment


urlpatterns = [
    url(r'^attachment/$', UploadTrixAttachment.as_view()),
]
