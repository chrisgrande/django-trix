from django.views.generic import View
from django.core.files.storage import default_storage
from django.http import JsonResponse
from django.utils.crypto import get_random_string
import os
import uuid


class AttachmentView(View):
    def post(self, request, *args, **kwargs):
        attachment = request.FILES['trix-attachment']

        file_ext = os.path.splitext(attachment.name)[-1]

        random_directory = get_random_string(10)

        random_file_name = os.path.join(random_directory, "%s%s" % (str(uuid.uuid4()), file_ext))

        saved_attachment = default_storage.save(random_file_name, attachment)

        attachment_url = default_storage.url(saved_attachment)

        return JsonResponse({'attachment_url': attachment_url})
