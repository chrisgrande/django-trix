from django import forms
from django.utils.html import format_html
from django.utils.safestring import mark_safe


class TrixEditor(forms.Textarea):

    def render(self, name, value, attrs=None, renderer=None):
        if attrs is None:
            attrs = {}
        attrs.update({'style': 'visibility: hidden; position: absolute;'})

        params = {
            'input': attrs.get('id') or f'{name}_id',
            'class': 'trix-content',
        }
        param_str = ' '.join(f'{k}="{v}"' for k, v in params.items())

        html = super().render(name, value, attrs, renderer=renderer)
        return format_html(
            '{}<p><trix-editor {}></trix-editor></p>',
            html,
            mark_safe(param_str),
        )

    class Media:
        css = {'all': ('trix/trix.css',)}
        js = ('trix/trix.js', 'trix/trix-django.js')
