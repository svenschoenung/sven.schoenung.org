$(function() {
	if (document.cookie.indexOf('__cookie_consent=') == -1) {
		$('body').prepend('<div style="display:none" class="cookie-consent">This site uses cookies: <a href="#" class="cookie-consent-agree">Agree</a> | <a href="#" class="cookie-consent-disable">Disable</a> | <a href="/privacy">Read more</a></div>');
		$('.cookie-consent-agree').click(function() {
			document.cookie = "__cookie_consent=true;max-age=31536000;path=/"
			$('.cookie-consent').fadeOut(1000);
		});
		$('.cookie-consent-disable').click(function() {
			document.cookie = "__cookie_consent=false;max-age=31536000;path=/"
			$('.cookie-consent').fadeOut(1000);
		});

		$('.cookie-consent').fadeIn(1000)
		
	}
});
