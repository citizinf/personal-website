$(document).ready(function() {
  // correctly set #main-container's left/right padding based on view orientation
  setPadding();
  $(window).resize(function() {
    setPadding();
  });
  
  // set the height of the Goodreads div to be the same as the Grouvee div
  var h = $("#grouvee_widget_16020").height();
  $(".gr_custom_container_1420788534").css("padding-bottom", h-289);
  // set the height of the Flixster div as well!
  $("#flixster_widget").height(h);
});

function setPadding() {
  if ($(window).width() >= $(window).height()) {
    var em = parseFloat($("body").css("font-size"));
    $("#main-container").css("padding-left", 4*em);
    $("#main-container").css("padding-right", 4*em);
  }
  else {
    $("#main-container").css("padding-left", 0);
    $("#main-container").css("padding-right", 0);
  }
}

