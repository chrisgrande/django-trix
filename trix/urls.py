from django.urls import path
from .views import UploadTrixAttachment


urlpatterns = [
    path('attachment/', UploadTrixAttachment.as_view()),
]
