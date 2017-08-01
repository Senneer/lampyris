"use strict";

$(document).ready(function () {
  $(".order__slider").slick({
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1
  });
});

$(window).on("load", function () {
  // $(".stages").mCustomScrollbar();
  // $(".service").mCustomScrollbar();
});