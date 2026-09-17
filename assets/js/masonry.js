$(document).ready(function() {
  // Init Masonry
  var $grid = $('.grid').masonry({
    gutter: 10,
    horizontalOrder: true,
    itemSelector: '.grid-item',
  });
  // Layout Masonry after each image loads
  $grid.imagesLoaded().progress( function() {
    $grid.masonry('layout');
  });

  // Start across the gallery, then fill the shortest column to balance heights.
  var $gallery = $('.gallery-container');
  if ($gallery.length) {
    $gallery.addClass('gallery-masonry').masonry({
      itemSelector: '.gallery-item',
      columnWidth: '.gallery-item',
      gutter: 20,
      horizontalOrder: false,
      percentPosition: true,
      transitionDuration: 0,
    });
    // Recompute positions for cached, newly loaded, and failed images alike.
    $gallery.imagesLoaded().progress(function() {
      $gallery.masonry('layout');
    });
  }
});
