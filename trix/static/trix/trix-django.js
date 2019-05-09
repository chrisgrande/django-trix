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

// document.addEventListener('trix-file-accept', function(ev) {
//   ev.preventDefault();
// });

document.addEventListener('trix-attachment-add', function(ev) {

  var data = {};

  var request = new XMLHttpRequest();
  request.open('POST', '/trix/attachment/', true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  xhr.setRequestHeader("X-CSRF-Token", getCookie('csrftoken'));
  request.send(data);

});

