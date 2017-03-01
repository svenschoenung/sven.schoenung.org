(function() {
  var email = "twfoAtdipfovoh/psh".replace(/./g, function(chr) {
    return String.fromCharCode(chr.charCodeAt(0) - 1);
  });
  $('.email').append('<i class="fa fa-envelope"></i><a href="' + email + '" class="email">' + email + ' </a>');
})();
