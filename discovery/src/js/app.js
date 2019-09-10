class DelayChain {

    constructor() {
        this.timeout = null;
    }

    delay(ms) {
        var self = this;
        window.clearTimeout(self.timeout);
        return new Promise(function(resolve, reject) {
            // Reject timeout makes sure the promise gets rejected
            // if the delayChain is cancelled
            var rejectTimeout = window.setTimeout(function() {
                reject();
            }, ms + 100);

            self.timeout = window.setTimeout(function() {
                window.clearTimeout(rejectTimeout);
                resolve();
            }, ms);
        });
    }

    cancel() {
        // Only clear the main timeout so the reject timeout fires
        window.clearTimeout(this.timeout);
    }
}

var currentOpenCarousel = null;




function openNavItem() {
    document.getElementById("update-pop").classList.toggle("popShow");
}

var zindexCount = 1000;

window.initCircleNav = function () {

  var dc = new DelayChain();

  $(".slideUp-trigger").on("click", function(e) {

    var $this = $(this);
    var carouselId = $this.attr("data-href");
    var $carousel = $("#" + carouselId);
    var $slide = $carousel.find(".slide").first();

    $this.find(".requirements-item-content").css({
      "z-index": zindexCount++
    });

    //$slide.addClass("slide-fadeout");

    dc.delay(1).then(function () {
      $this.addClass("requirements-item--pop-out");
      $slide.addClass("slide-bumpin");
      return dc.delay(600);
    }).then(function () {
      $this.addClass("requirements-item--pop-out-finish");
      $("body").addClass("start-pop-down show-carousel");
      if (currentOpenCarousel) {
        currentOpenCarousel.removeClass("carousel-wrapper--show");
      }
      currentOpenCarousel = $carousel;
      currentOpenCarousel.addClass("carousel-wrapper--show");
      return dc.delay(150);
    }).then(function() {
      $slide.addClass("slide-bumpin-remove");
      return dc.delay(500);
    }).then(function () {
      $("body").removeClass("start-pop-down");
      $this.removeClass("requirements-item--pop-out");
      $this.removeClass("requirements-item--pop-out-finish");
      return dc.delay(1000);
    }).then(function () {
      $slide.removeClass("slide-bumpin");
      $slide.removeClass("slide-bumpin-remove");
    }).catch(function (e) {
      console.log("caight?");
      console.log(e);
    });
  });
}



window.initCarouselLinks = function () {


  var dc = new DelayChain();
  var currentSlideEl = null;
  var currentOverlayEl = null;



  var closeOverlay = function () {
    dc.cancel();
    var el = currentOverlayEl;
    var $slide = currentSlideEl;

    dc.delay(1).then(function () {
      el.addClass("main-content-item--visible-remove");
      $slide.addClass("slide-fadeout-remove");
      return dc.delay(800);
    }).then(function () {
      el.removeClass("main-content-item--visible-remove");
      el.removeClass("main-content-item--visible");
      $slide.removeClass("slide-fadeout-remove");
      $slide.removeClass("slide-fadeout");
      $.fn.fullpage.destroy("all");
    });
  }



    // Carousel links
  $(".carousel-wrapper a").on("click", function (e) {

    e.preventDefault();
    dc.cancel();

    var url = $(this).attr("href").slice(0, -5);
    var el = $("#" + url);
    var $slide = $(this).closest(".slide");
    currentSlideEl = $slide;
    currentOverlayEl = el;

    el.addClass("main-content-item--visible-add");
    $slide.removeClass("slide-fadeout");
    $slide.removeClass("slide-fadeout-remove");
    $slide.addClass("slide-fadeout-add");


    dc.delay(1).then(function () {
      el.addClass("main-content-item--visible");
      $slide.addClass("slide-fadeout");
      return dc.delay(500);
    }).then(function () {
      el.removeClass("main-content-item--visible-add");
      $slide.removeClass("slide-fadeout-add");
    });
    initFullPage(el);
    return false;
  });


  $(".js-close-content-overlay").on("click", function () {
    closeOverlay();
  });


  $("body").on("keydown", function (e) {
    if(e.which == 27){
      closeOverlay();
    }
  })
}


window.initFullPage = function ($el) {

  $el.find(".fullpage").fullpage({
    slidesNavigation: true,
    scrollOverflow: true,
    onLeave: function(index, nextIndex, direction) {
      //leaving 1st section
      if(index == 1){
         $el.find('.header').addClass('fixed');
      }
      //back to the 1st section
      if(nextIndex == 1){
        $el.find('.header').removeClass('fixed');
      }

      // Item appearence animations
      window.setTimeout(function() {
        $(".fp-section").eq(index).addClass("section--has-seen");
      }, 100);
    },

    afterResize: function(){
        //windowsHeight = $(window).height();
    }
  });

}
