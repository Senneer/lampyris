
$(document).ready(function () {

  if ($(".wrapper._main").length) {

    $(".category__infoListItem a").on("click", function(e) {
      e.preventDefault();
      // var service = $(this).html();
      $(".section._home").css("display", "none");
      $(".section._order").css("display", "grid");

      $(".order__slider").slick({
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1
      });
    });

    $(".service__listItem button").on("click", function (e) {
      e.preventDefault();
      $(this).toggleClass("_selected");
    });

    var title = $("._service .order__stageTitle");
    var service = '';
    $(".stages__itemSubstageItem button").on("click", function (e) {
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
      if ($(window).scrollTop() === 0 && delta < 0) {
        $(".wrapper").css("display", "flex");
        $(".html, body").animate({ scrollTop: $(".land").offset().top }, 0)
        .animate({ scrollTop: 0 }, 700, "swing", function () {
          $(".land").css("display", "none");
        });
        $.each(sliders, function (i) {
          sliders[i].slick("unslick");
        });
      }
    }

    function changeLayout(showEl, display, hideEl, scrollEl) {
      showEl.css("display", display);
      $(".html, body").animate({ scrollTop: scrollEl.offset().top }, 700, "swing", function () {
        hideEl.css("display", "none");
      });
    }

    $(".footer__about").on("click", function (e) {
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

    $(".about__totop").on("click", function (e) {
      e.preventDefault();
      changeLayout($(".wrapper"), "flex", $(".land"), $(".html, body"));
      $.each(sliders, function (i) {
        sliders[i].slick("unslick");
      });
    });

    $(".scrollto").on("touchend, click", function (e) {
      e.preventDefault();
      var el = $(this).attr("data-href");
      $("html, body").animate({
        scrollTop: $(el).offset().top
      }, 900);
      return false;
    });

    $(window).on("load", function () {
      $(".stages__block, .service, .total").mCustomScrollbar();
    });
  } else if ($(".wrapper._log").length) {

    function changeWindow(currentWindow, nextWindow) {
      currentWindow.parents(".log__block").css("display", "none");
      nextWindow.css("display", "flex");
    }
    $(".log__layout._recover").on("click", function(e) {
      e.preventDefault();
      changeWindow($(this), $(".log__block._recover"));
    });
    $(".log__layout._registration").on("click", function(e) {
      e.preventDefault();
      changeWindow($(this), $(".log__block._reg"));
    });
    $(".log__back").on("click", function(e) {
      e.preventDefault();
      changeWindow($(this), $(".log__block._login"));
    });
    $(".log__layout._login").on("click", function(e) {
      e.preventDefault();
      changeWindow($(this), $(".log__block._login"));
    });

    $(".log__compType").on("click", function() {
      $(this).siblings().removeClass("_checked");
      $(this).addClass("_checked");
    });

    const logininput = Array.prototype.slice.call(document.getElementsByClassName('log__formItemInp'));
    logininput.forEach(item => {
      item.addEventListener("change", function() {
        if (item.value !== '') {
          if (item.classList.contains('_notempty') === false) {
            item.classList.add('_notempty');
          }
        } else {
          item.className = item.className.replace(' _notempty', '');
        }
      });
    });

    $(".log__slider").slick({
      dots: true,
      arrows: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000
    });
  } else if ($(".wrapper._profile").length) {
    $("html, body").on("click", function() {
      $(".notif__popup").fadeOut(200);
    });
    $(".profile__headerNotif").on("click", function(e) {
      e.stopPropagation();
    });
    $(".profile__headerNotif button").on("click", function(e) {
      e.preventDefault();
      $(".notif__popup").fadeToggle(200);
    });

    $(window).on("load", function () {
      $(".notif__popupList").mCustomScrollbar();
    });
  }
});