"use strict";

$(document).ready(function () {
  $(".order__slider").slick({
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1
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

$(window).on("load", function () {
  // $(".stages").mCustomScrollbar();
  // $(".service").mCustomScrollbar();
});