$('.tag').click(function() {
  var $tag = $(this);
  var $section = $tag.closest('.section');
  var $tiles = $section.find('.tile');
  var $tags = $section.find('.tag');

  $tags.removeClass('active');
  $tag.addClass('active');

  var activeTag = $section.find('.tag.active').attr('data-tag');

  if (activeTag.length == 0) {
    $tiles.removeClass('hidden');
    return;
  }

  $tiles.each(function(i, tile) {
    var $tile = $(tile);
    var tileTags = $tile.attr('data-tags').split(/ /);
    if ($.inArray(activeTag, tileTags) >= 0) {
      $tile.removeClass('hidden');
    } else {
      $tile.addClass('hidden');
    }
  });

});
