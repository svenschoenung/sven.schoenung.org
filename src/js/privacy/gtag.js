(function() {
	var trackingId = 'UA-91412260-2';
	var disableGtag = document.cookie.indexOf('__privacy_disable_gtag=true') >= 0;

	var disableStr = 'ga-disable-' + trackingId;
	if (disableGtag) {
		console.log('Google Analytics is disabled');
	
		document.cookie = disableStr + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';
		window[disableStr] = true; 
	}
	else {
		console.log('Google Analytics is enabled');

		document.cookie = disableStr + '=false; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';
		window[disableStr] = false; 

		$('head').append('<script async src="https://www.googletagmanager.com/gtag/js?id=' + trackingId + '"></script>');

		window.dataLayer = window.dataLayer || [];

		function gtag() { dataLayer.push(arguments); }

		gtag('js', new Date());
		gtag('config', trackingId, { 'anonymize_ip': true });
	}
})();
