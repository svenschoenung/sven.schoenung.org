WebFont.load({
  google:{
   families: ['Raleway:200']
  },
  active: function() { $('body').removeClass('no-fonts'); },
  inactive: function() { $('body').removeClass('no-fonts'); }
});
