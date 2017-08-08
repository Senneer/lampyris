'use strict';

$(document).ready(function () {
  $(".order__slider").slick({
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1
  });

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

  function onWheel(e) {
    e = e || window.event;
    var delta = e.deltaY || e.detail || e.wheelDelta;
    if ($(window).scrollTop() === 0 && delta < 0) {
      $(".wrapper").css("display", "flex");
      $(".html, body").animate({ scrollTop: $(".land").offset().top }, 0).animate({ scrollTop: 0 }, 700, "swing", function () {
        $(".land").css("display", "none");
      });
    }
  }

  $(".footer__about").on("click", function (e) {
    e.preventDefault();
    $(".land").css("display", "block");
    $(".html, body").animate({ scrollTop: $(".land").offset().top }, 700, "swing", function () {
      $(".wrapper").css("display", "none");
    });

    $(".prod__sliderImg ul").slick({
      dots: true,
      dotsClass: "prod__sliderImgDots",
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      nextArrow: $(".prod__sliderImgNext"),
      asNavFor: ".prod__sliderText"
    });
    $(".prod__sliderText").slick({
      dots: false,
      arrows: false,
      draggable: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      asNavFor: ".prod__sliderImg ul"
    });
    $(".team__dmPeople").slick({
      dots: false,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1
    });
    $(".history__slider").slick({
      dots: true,
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: '<button type="button" class="slick-next">вперед</button>',
      prevArrow: '<button type="button" class="slick-prev">назад</button>'
    });
  });

  $(".about__totop").on("click", function (e) {
    e.preventDefault();
    $(".wrapper").css("display", "flex");
    $(".html, body").animate({ scrollTop: $("html, body").offset().top }, 700, "swing", function () {
      $(".land").css("display", "none");
    });
  });

  $(".scrollto").on("touchend, click", function (e) {
    e.preventDefault();
    var el = $(this).attr("data-href");
    $("html, body").animate({
      scrollTop: $(el).offset().top }, 900);
    return false;
  });
});

$(window).on("load", function () {
  // $(".stages").mCustomScrollbar();
  // $(".service").mCustomScrollbar();
});