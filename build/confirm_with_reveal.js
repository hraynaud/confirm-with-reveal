// Generated by CoffeeScript 1.6.3
(function() {
  var $, confirm_handler, localization_defaults, reveal_confirm;

  $ = this.jQuery;

  localization_defaults = {
    title: 'Are you sure?',
    body: 'This action cannot be undone.',
    password: false,
    prompt: 'Type <i>%s</i> to continue:',
    ok: 'Confirm',
    cancel: 'Cancel'
  };

  reveal_confirm = function(element) {
    var confirm, confirm_button, confirm_html, confirm_label, confirm_localization, modal, password;
    confirm_localization = $.extend({}, localization_defaults, window.confirm_localization);
    confirm = element.data('confirm');
    if (!confirm) {
      return true;
    }
    if (typeof confirm === 'string') {
      return window.confirm(confirm);
    }
    modal = $("<div class='reveal-modal medium' data-reveal>\n  <h2 class='header'></h2>\n  <p class='warning'></p>\n  <div class='footer'>\n    <a class='cancel-button secondary button radius inline'></a>\n  </div>\n</div>");
    modal.find('.header').html(confirm.title || confirm_localization['title']);
    modal.find('.warning').html(confirm.body || confirm_localization['body']);
    modal.find('.cancel-button').html(confirm.cancel || confirm_localization['cancel']);
    confirm_button = element.is('a') ? element.clone() : $('<a/>');
    confirm_button.removeAttr('class').removeAttr('data-confirm').addClass('button radius alert inline confirm').html(confirm.ok || confirm_localization['ok']);
    if (element.is('form') || element.is(':input')) {
      confirm_button.on('click', function() {
        return element.closest('form').removeAttr('data-confirm').submit();
      });
    }
    modal.find('.cancel-button').on('click', function(e) {
      return modal.foundation('reveal', 'close');
    });
    modal.find('.footer').append(confirm_button);
    if ((password = confirm.password || confirm_localization['password'])) {
      confirm_label = (confirm.prompt || confirm_localization['prompt']).replace('%s', password);
      confirm_html = "<label>" + confirm_label + "</label>\n<input class='confirm-password' type='text' />";
      modal.find('.warning').after($(confirm_html));
      modal.find('.confirm-password').on('keyup', function(e) {
        return confirm_button.toggleClass('disabled', $(this).val() !== password);
      });
      confirm_button.addClass('disabled').on('click', function(e) {
        if ($(this).hasClass('disabled')) {
          return false;
        }
      });
    }
    modal.appendTo($('body')).foundation().foundation('reveal', 'open').on('closed.fndtn.reveal', function(e) {
      return modal.remove();
    });
    return false;
  };

  if ($.rails) {
    $.rails.allowAction = reveal_confirm;
  } else {
    confirm_handler = function(e) {
      var proceed;
      proceed = reveal_confirm($(this));
      if (!proceed) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
      return proceed;
    };
    $(document).on('click', 'a[data-confirm], :input[data-confirm]', confirm_handler);
    $(document).on('submit', 'form[data-confirm]', confirm_handler);
  }

}).call(this);
