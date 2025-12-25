var isWide;
var navFull;
var closeByOutsideClickActive = false; // bugfix

// Returns whether or not isWide changes
function setViewOrientation() {
  var w = $(window).width();
  var h = $(window).height();
  if (w >= h) {
    retval = (isWide === false);
    isWide = true;
  }
  else {
    retval = (isWide === true);
    isWide = false;
  }
  return retval;
}

function showFullNav() {
  if (!navFull) {
    $("nav.hamburger").fadeOut();
    
    if (isWide) { // side animation (wide viewport)
      $("nav.full").show();
      $("nav.full").animate({left:"0"}, null, null, function() {
        $("nav.peek").fadeOut("fast"); // to be done as the LAST STEP
      });
    }
    else { // top animation (tall viewport)
      $("nav.full").show();
      $("nav.full").animate({top:"0"});
    }
    
    window.setTimeout(function() {
      navFull = true;
      closeByOutsideClickActive = true; // ALLOW an outside-click to function
    }, 600);
  }
}

function hideFullNav() {
  if (navFull) {
    $("nav.hamburger").fadeIn();
    
    if (isWide) { // side - wide
      $("nav.peek").show();
      $("nav.full").animate({left:"-16em"}, null, null, function() {
        $(this).hide(); // don't hide before it disappears
      });
    }
    else { // top - tall
      $("nav.full").animate({top:"-22em"}, null, null, function() {
        $(this).hide(); // don't hide before it disappears
      });
    }
    
    window.setTimeout(function() {
      navFull = false;
    }, 600);
  }
}

function scaleSideNavToFit() {
  var viewH = $(window).height();
  var navH = 22 * parseFloat($("body").css("font-size"));
  
  // edit nav font-size as necessary, but enforce a 50% minimum
  if (navH > viewH) {
    var percent = viewH/navH*100;
    if (percent < 50) percent = 50;
    $("nav").css("font-size", percent + "%");
  }
  else { // set font-size to 100% if no issues.
    $("nav").css("font-size", "100%");
  }
}

$(document).ready(function() {
  
  // initial setup  
  setViewOrientation();
  navFull = false;
  
  if (isWide) { // wide viewport
    $("nav.peek").show();
    $("nav.full").addClass("side");
    $("nav.full").css("left", "-16em");
  }
  else { // tall viewport
    $("nav.full").addClass("top");
    $("nav.full").css("top", "-22em");
    $("nav.hamburger").addClass("stretch");
  }
  
  
  // window resize handler - keeps nav full open if it already was.
  $(window).resize(function() {
    
    // stuff to do only if isWide changed
    if (setViewOrientation()) {
      if (isWide) { // from F to T
        $("nav.hamburger").removeClass("stretch");
        
        $("nav.full").addClass("side");
        $("nav.full").removeClass("top");
        if (!navFull) {
          $("nav.peek").show();
          $("nav.full").css("left", "-16em");
          $("nav.full").css("top", "0");
        }
      }
      else { // from T to F
        $("nav.hamburger").addClass("stretch");
        
        $("nav.full").addClass("top");
        $("nav.full").removeClass("side");
        if (!navFull) {
          $("nav.peek").hide();
          $("nav.full").css("left", "0");
          $("nav.full").css("top", "-22em");
        }
      }
    }
    
    /*****************************************************************/
    /* AT THIS POINT, isWide IS PROPERLY SET FOR THE NEW WINDOW SIZE */
    /*****************************************************************/
    
    // make sure the side nav doesn't extend past the window bottom
    if (isWide) scaleSideNavToFit();
    else $("nav").css("font-size", "100%"); // font-size full otherwise
  });
  
  
  // Open full menu
  $("nav.hamburger").click(function () {
    showFullNav();
  });
  
  // Close full menu (exit button)
  $("nav.full .exit a").click(function () {
    hideFullNav();
  });
  
  // Close full menu (click outside)
  // Big thanks to stackoverflow.com/questions/1403615!
  $(document).mouseup(function (event) {
    if (closeByOutsideClickActive) {
      var container = $("nav.full");
      if (!container.is(event.target) &&
          container.has(event.target).length === 0) {
        hideFullNav();
        closeByOutsideClickActive = false;
      }
    }
  });
  
});

