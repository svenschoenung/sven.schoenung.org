$(function() {
        var hidePopup = document.cookie.indexOf('__privacy_hide_popup=true') >= 0;
	if (!hidePopup) {
                var $popup = $('<div class="privacy-popup">Privacy settings: </div>')
                var $editButton = $('<a href="/privacy">Edit</a>');
                var $dismissButton = $('<a href="#">Dismiss</a>');
                $popup.append($editButton);
                $popup.append(' | ');
                $popup.append($dismissButton);

                $editButton.click(function() {
			document.cookie = "__privacy_hide_popup=true;max-age=31536000;path=/"
                });

                $dismissButton.click(function() {
			document.cookie = "__privacy_hide_popup=true;max-age=31536000;path=/"
			$popup.fadeOut(1000);
                });

		$('body').prepend($popup);
		$popup.fadeIn(1000);
	}
});
