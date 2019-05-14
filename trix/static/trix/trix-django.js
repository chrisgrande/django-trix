// Turn off the default Trix captions
Trix.config.attachments.preview.caption = {
  name: false,
  size: false
};

// Function to get local cookies
// Used to return the csrf token with: getCookie('csrftoken');
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
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
    let file = attachment.file;
    let form = new FormData;
    form.append("Content-Type", file.type);
    form.append("trix-attachment", file);

    // Create XHR request
    let request = new XMLHttpRequest();
    request.open('POST', '/trix/attachment/', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.setRequestHeader("X-CSRF-Token", getCookie('csrftoken'));

    // Report file uploads back to Trix
    request.upload.onprogress = function(event) {
        let progress = event.loaded / event.total * 100;
        attachment.setUploadProgress(progress);
    };

    // Tell Trix what url and href to use on successful upload
    request.onload = function() {
        if (request.status === 201) {
            let data = JSON.parse(request.responseText);
            return attachment.setAttributes({
                url: data.image_url,
                href: data.url
            })
        }
    };

  return request.send(form);
}

document.addEventListener('trix-attachment-add', function(event) {
    let attachment = event.attachment;

    if (attachment.file) {
        return uploadAttachment(attachment);
    }
});
