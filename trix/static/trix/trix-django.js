// Turn off the default Trix captions
Trix.config.attachments.preview.caption = {
  name: false,
  size: false
};

// Function to get local cookies
// Used to return the csrf token with: getCookie('csrftoken');
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function uploadAttachment(attachment) {
    // Create form data to submit
    var file = attachment.file;
    var form = new FormData;
    form.append("Content-Type", file.type);
    form.append("trix-attachment", file);

    // Create XHR request
    var request = new XMLHttpRequest();
    request.open('POST', '/trix/attachment/', true);
    request.setRequestHeader("X-CSRF-Token", getCookie('csrftoken'));

    // Report file uploads back to Trix
    request.upload.onprogress = function(event) {
        var progress = event.loaded / event.total * 100;
        attachment.setUploadProgress(progress);
    };

    // Tell Trix what url and href to use on successful upload
    request.onload = function() {
        if (request.status === 200) {
            var data = JSON.parse(request.responseText);
            return attachment.setAttributes({
                url: data.attachment_url,
            })
        }
    };

  return request.send(form);
}

document.addEventListener('trix-attachment-add', function(event) {
    var attachment = event.attachment;

    if (attachment.file) {
        return uploadAttachment(attachment);
    }
});
