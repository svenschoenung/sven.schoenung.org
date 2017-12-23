(function() {
  var $tags = [
    'all',
    'crypto', 'code', 'docs', 'film', 'games', 'images',
    'music', 'news', 'social'
  ].map(function(tag) {
    var $tag = $('<span class="tag" data-tag="' + tag + '"><i class="fa fa-tag"></i>' + tag + '</span>');

    $tag.click(function() {
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
    return $tag;
  });

  $tags[0].addClass('active');
  $tags[0].attr('data-tag', '');

  $('.tags').append($tags);
})();
