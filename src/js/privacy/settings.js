$(function() {

  function isDisabled(setting) {
    var disabled = document.cookie.indexOf('__privacy_disable_' + setting + '=true') >= 0;
    return disabled;
  }

  function update($elem, setting) {
    if (isDisabled(setting)) {
      $elem.find('i').removeClass('fa-check-square-o').addClass('fa-square-o');
      $elem.find('label').text($elem.attr('data-disabled'));
    } else {
      $elem.find('i').removeClass('fa-square-o').addClass('fa-check-square-o');
      $elem.find('label').text($elem.attr('data-enabled'));
    }
  } 

  $('.privacy-setting').each(function(i, elem) {
    var $elem = $(elem);
    var setting = $elem.attr('data-setting');

    var $checkbox = $('<span><i class="fa"></i> <label></label></span>');

    $elem.append($checkbox);
    update($elem, setting);
       
    $checkbox.click(function() {
      document.cookie = '__privacy_disable_' + setting + '=' + !isDisabled(setting) + ';max-age=31536000;path=/';
      update($elem, setting);
    });
  });
});
