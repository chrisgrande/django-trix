from django import forms
from django.urls import include, path, re_path
from django.contrib import admin
from django.views.generic import FormView
from django.conf import settings
from django.conf.urls.static import static

from trix.widgets import TrixEditor


class EditorForm(forms.Form):
    content = forms.CharField(widget=TrixEditor)


class EditorView(FormView):
    form_class = EditorForm
    template_name = 'index.html'


urlpatterns = [
    re_path(r'^admin/', admin.site.urls),
    path('trix/', include('trix.urls')),
    path('', EditorView.as_view()),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
