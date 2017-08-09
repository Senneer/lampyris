
$(document).ready(function() {
  $(".order__slider").slick({
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1
  });

  $(".service__listItem button").on("click", function(e) {
    e.preventDefault();
    $(this).toggleClass("_selected");
  });

  var title = $("._service .order__stageTitle");
  var service = '';
  $(".stages__itemSubstageItem button").on("click", function(e) {
    e.preventDefault();
    service = $(this).text();
    title.html(service);
  });


  // for landing
  var elem = document.getElementsByClassName('land')[0];
  if (elem.addEventListener) {
    if ('onwheel' in document) {
      elem.addEventListener("wheel", onWheel);
    } else if ('onmousewheel' in document) {
      elem.addEventListener("mousewheel", onWheel);
    } else {
      elem.addEventListener("MozMousePixelScroll", onWheel);
    }
  } else {
    elem.attachEvent("onmousewheel", onWheel);
  }

  var sliders = [$(".prod__sliderImg ul"), $(".prod__sliderText"), $(".team__dmPeople"), $(".history__slider")];

  function onWheel(e) {
    e = e || window.event;
    var delta = e.deltaY || e.detail || e.wheelDelta;
    if ($(window).scrollTop() === 0 && delta < 0 ) {
      $(".wrapper").css("display", "flex");
      $(".html, body").animate({scrollTop: $(".land").offset().top}, 0)
      .animate({scrollTop: 0}, 700, "swing" ,function() {
        $(".land").css("display", "none");
      });
      $.each(sliders, function(i) {
        sliders[i].slick("unslick");
      });
    }
  }

  function changeLayout(showEl, display, hideEl, scrollEl) {
    showEl.css("display", display);
    $(".html, body").animate({scrollTop: scrollEl.offset().top}, 700, "swing" ,function() {
      hideEl.css("display", "none");
    });
  }

  $(".footer__about").on("click", function(e) {
    e.preventDefault();
    changeLayout($(".land"), "block", $(".wrapper"), $(".land"));

    sliders[0].slick({
      dots: true,
      dotsClass: "prod__sliderImgDots",
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      nextArrow: $(".prod__sliderImgNext"),
      asNavFor: ".prod__sliderText"
    });
    sliders[1].slick({
      dots: false,
      arrows: false,
      draggable: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      asNavFor: ".prod__sliderImg ul"
    });
    sliders[2].slick({
      dots: false,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1
    });
    sliders[3].slick({
      dots: true,
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: '<button type="button" class="slick-next">вперед</button>',
      prevArrow: '<button type="button" class="slick-prev">назад</button>'
    });
  });

  $(".about__totop").on("click", function(e) {
    e.preventDefault();
    changeLayout($(".wrapper"), "flex", $(".land"), $(".html, body"));
    $.each(sliders, function(i) {
      sliders[i].slick("unslick");
    });
  });

  $(".scrollto").on("touchend, click", function(e) {
    e.preventDefault();
    var el = $(this).attr("data-href");
    $("html, body").animate({
      scrollTop: $(el).offset().top}, 900);
    return false;
  });
});

$(window).on("load", function() {
  $(".stages__block").mCustomScrollbar();
  $(".service").mCustomScrollbar();
  $(".total").mCustomScrollbar();
});