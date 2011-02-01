/**
 * Unobtrusive scripting adapter for no JS framework
 *
 */
new function(e) {
  var self = this;
  this.handleEvent = function(e) {
    var target = e.target;
    if (target === document && e.type === 'load') {
      var metatags = target.getElementsByTagName('meta');
      for (var i = 0; i < metatags.length; i++) {
        if (metatags[i].getAttribute('name') == 'csrf-param') {
          self.csrf_param = metatags[i].getAttribute('content');
        }
        else if (metatags[i].getAttribute('name') == 'csrf-token') {
          self.csrf_token = metatags[i].getAttribute('content');
        }
      }
      return true;
    }

    if (e.type === 'readystatechange') {
      if (target.readyState === 4) {
        var responseType = target.getResponseHeader('Content-Type');
        if (responseType && responseType.indexOf('javascript')) {
          new function() { eval(target.responseText); }();
        }
      }
      return true;
    }

    var tagName = target.tagName;
    if ((e.type === 'click' && tagName === 'A') ||
        (e.type === 'submit' && tagName === 'FORM')) {
      if (target.hasAttribute('data-confirm')) {
        if (!confirm(target.getAttribute('data-confirm'))) {
          e.preventDefault();
          return false;
        }
      }

      var form;
      if (target.hasAttribute('data-method') || target.hasAttribute('data-remote')) {
        e.preventDefault();
        // A form will be required...
        if (tagName === 'FORM') {
          form = target;
        }
        else {
          form = document.createElement('FORM');
          form.method = 'post';
          form.action = target.getAttribute('href');
          form.setAttribute('hidden', 'hidden');
          form.style.display = 'none';
          form.style.visibility = 'hidden';
          document.body.appendChild(form);
        }
        // Either way, it needs the CSRF token
        if (!form[self.csrf_param]) {
          var field = document.createElement('input');
          field.type = 'hidden';
          field.name = self.csrf_param;
          field.value = self.csrf_token;
          form.appendChild(field);
        }
      }

      var method;
      if (target.hasAttribute('data-method')) {
        // We'll need to send the _method parameter
        method = target.getAttribute('data-method').toLowerCase();
        var field = document.createElement('input');
        field.type = 'hidden';
        field.name = '_method';
        field.value = target.getAttribute('data-method');
        form.appendChild(field);
      }
      else if (tagName === 'A') {
        method = 'get';
      }
      else if (tagName === 'FORM') {
        method = 'post';
      }
      else {
        throw("Couldn't determine a method!");
      }

      var url;
      if (tagName === 'A') {
        url = target.getAttribute('href');
      }
      else if (tagName === 'FORM') {
        url = target.getAttribute('action');
      }
      else {
        throw("Couldn't determine URL!");
      }

      if (target.hasAttribute('data-remote')) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-Type', 'x-www-form-urlencoded');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Accept', 'text/javascript');
        xhr.addEventListener('readystatechange', this, false);
        var data = [];
        for (var i = 0; i < form.children.length; i++) {
          if (form.children[i].tagName === 'INPUT' || form.children[i].tagName === 'SELECT') {
            data.push(form.children[i].name + '=' + form.children[i].value);
          }
        }
        data = encodeURI(data.join('&'));
        xhr.send(data);
      }
      else if (target.hasAttribute('data-method')) {
        form.submit();
      }
    }
  };
  window.addEventListener('load', this, false);
  window.addEventListener('click', this, false);
  window.addEventListener('submit', this, false);
}();
