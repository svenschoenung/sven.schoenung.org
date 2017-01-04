(function() {
  var email = "twfoAtdipfovoh/psh".replace(/./g, function(chr) {
    return String.fromCharCode(chr.charCodeAt(0) - 1);
  });
  $('.email').attr('href', 'mailto:' + email).text(email);
})();
