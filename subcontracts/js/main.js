"use strict";

$(document).ready(function () {

  function initCustomForms() {
    jcf.setOptions('Select', {
      wrapNative: false,
      maxVisibleItems: 8
    });
    jcf.replaceAll();
  }

  if ($(".wrapper._main").length) {
    var SelectService = function SelectService(e, el) {
      e.preventDefault();
      el.siblings().removeClass("_selected");
      el.addClass("_selected");
      $(".service__panelFormControl button._next").removeClass("_disable");
    };

    var addColors = function addColors(el) {
      var color = el.find(".color").attr("data-color");
      el.find(".color").css("background", color);
    };

    var onWheel = function onWheel(e) {
      e = e || window.event;
      var delta = e.deltaY || e.detail || e.wheelDelta;
      if ($(window).scrollTop() === 0 && delta < 0) {
        $(".wrapper").css("display", "flex");
        $(".html, body").animate({ scrollTop: $(".land").offset().top }, 0).animate({ scrollTop: 0 }, 700, "swing", function () {
          $(".land").css("display", "none");
        });
        $.each(sliders, function (i) {
          sliders[i].slick("unslick");
        });
      }
    };

    var changeLayout = function changeLayout(showEl, display, hideEl, scrollEl) {
      showEl.css("display", display);
      $(".html, body").animate({ scrollTop: scrollEl.offset().top }, 700, "swing", function () {
        hideEl.css("display", "none");
      });
    };

    $(".category__infoListItem a").on("click", function (e) {
      e.preventDefault();
      $(".section._home").css("display", "none");
      $(".section._order").css("display", "grid");

      $(".order__slider").slick({
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1
      });

      initCustomForms();
    });

    $(".projects").slick({
      dots: true,
      arrows: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1
    });

    $(".projects__showall").on("click", function (e) {
      e.preventDefault();
      $(".projects__all").css("display", "flex");
    });
    $(".projects__allBack").on("click", function (e) {
      e.preventDefault();
      $(".projects__all").css("display", "none");
    });
    $.each($(".projects__allList li"), function (i, el) {
      $(el).find("button").on("click", function (e) {
        e.preventDefault();
        $(".projects__all").css("display", "none");
        $(".projects__detailed").css("display", "block");
        $(".projects__detailedList").slick({
          dots: true,
          arrows: false,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1
        });
      });
    });
    $(".projects__detailedClose").on("click", function (e) {
      e.preventDefault();
      $(".projects__detailed").hide();
      $(".projects__detailedList").slick("unslick");
    });

    $(".category._list .category__infoTitle").on("click", function () {
      $(this).parents(".category").toggleClass("_open");
    });

    $(window).on("load", function () {
      $(".stages__block, .service, .total").mCustomScrollbar();
    });

    $(".service__listItem button").on("click", function (e) {
      e.preventDefault();
      $(this).parent().siblings().find("button").removeClass("_selected");
      $(this).addClass("_selected");
      $(".service__panelFormControl button._next").removeClass("_disable");
    });

    $.each($(".service__color li"), function () {
      addColors($(this));
    });
    $(".service__color li").on("click", function (e) {
      SelectService(e, $(this));
    });
    $(".service__shape li").on("click", function (e) {
      SelectService(e, $(this));
    });

    $(".stages__itemSubstageItem button").on("click", function (e) {
      e.preventDefault();
      var title = $("._service .order__stageTitle");
      var serviceName = '';
      var service = $(this).attr("data-service");
      serviceName = $(this).text();
      title.html(serviceName);
      $(".service-block").removeClass("_open").siblings(service).addClass("_open");
    });

    $(".service__optionsCountBlock input").focusout(function () {
      if ($(this).val() < 1) {
        $(this).val(1);
      }
    });
    $(".service__optionsCountBlock button._plus").on("click", function (e) {
      e.preventDefault();

      var i = $(".service__optionsCountBlock input").val();
      i++;
      $(".service__optionsCountBlock input").val(i);
    });
    $(".service__optionsCountBlock button._minus").on("click", function (e) {
      e.preventDefault();

      var i = $(".service__optionsCountBlock input").val();
      i--;
      if (i > 0) {
        $(".service__optionsCountBlock input").val(i);
      }
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

    var sliders = [$(".prod__sliderImg ul"), $(".prod__sliderText"), $(".team__dmPeople")];

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
  } else if ($(".wrapper._log").length) {
    var changeWindow = function changeWindow(currentWindow, nextWindow) {
      currentWindow.parents(".log__block").css("display", "none");
      nextWindow.css("display", "flex");
    };

    $(".log__layout._recover").on("click", function (e) {
      e.preventDefault();
      changeWindow($(this), $(".log__block._recover"));
    });
    $(".log__layout._registration").on("click", function (e) {
      e.preventDefault();
      changeWindow($(this), $(".log__block._reg"));
    });
    $(".log__back").on("click", function (e) {
      e.preventDefault();
      changeWindow($(this), $(".log__block._reg"));
    });
    $(".log__layout._login").on("click", function (e) {
      e.preventDefault();
      changeWindow($(this), $(".log__block._login"));
    });
    $(".log__btn._next").on("click", function (e) {
      e.preventDefault();
      changeWindow($(this), $(".log__block._recover"));
    });

    $(".log__compType").on("click", function () {
      $(this).siblings().removeClass("_checked");
      $(this).addClass("_checked");
    });

    var logininput = Array.prototype.slice.call(document.getElementsByClassName('log__formItemInp'));
    logininput.forEach(function (item) {
      item.addEventListener("change", function () {
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
      draggable: false,
      dots: true,
      arrows: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000
    });
  } else if ($(".wrapper._profile").length) {
    var addLine = function addLine() {
      $magicLine.width($(".profile__cntrlsTabs li button._current").width()).css("left", $(".profile__cntrlsTabs li button._current").position().left).data("origLeft", $magicLine.position().left).data("origWidth", $magicLine.width());
    };

    var fillDiag = function fillDiag() {
      var val = parseInt($(".discount__circle").attr("data-diag-fill"));
      var $circle = $('.discount__diag #bar');

      if (isNaN(val)) {
        val = 0;
      } else {

        if (val < 0) {
          val = 0;
        }
        if (val > 100) {
          val = 100;
        }

        var newperc = 75 * (val / 100); // 75 принимаем как 100%
        var perc = newperc + " " + (100 - newperc);

        var arrowDeg = 270 * (val / 100) - 135;

        $circle.css("stroke-dasharray", perc);
        $(".discount__arrow").css("transform", "translate(-50%, -50%) rotate(" + arrowDeg + "deg)");
      }
    };

    $("html, body").on("click", function () {
      $(".notif__popup").fadeOut(200);
    });
    $(".profile__headerNotif").on("click", function (e) {
      e.stopPropagation();
    });
    $(".profile__headerNotif button").on("click", function (e) {
      e.preventDefault();
      $(".notif__popup").fadeToggle(200);
    });

    var $el, leftPos, newWidth;
    var $mainNav = $(".profile__cntrlsTabs");

    $mainNav.append("<li class='_underline'></li>");
    var $magicLine = $("li._underline");

    addLine();

    $(".profile__cntrlsTabs li button").hover(function () {
      $el = $(this);
      leftPos = $el.position().left;
      newWidth = $el.parent().width();
      $magicLine.stop().animate({
        left: leftPos,
        width: newWidth
      }, 200);
    }, function () {
      $magicLine.stop().animate({
        left: $magicLine.data("origLeft"),
        width: $magicLine.data("origWidth")
      }, 200);
    });

    $(".profile__cntrlsTabs li button").on("click", function (e) {
      e.preventDefault();
      if ($(this).hasClass("_current") !== true) {
        $(this).parents(".profile__cntrlsTabs").find("button").removeClass("_current");
        $(this).addClass("_current");
        addLine();
        $($(this).attr("data-href")).fadeIn(200).siblings().css("display", "none");
      }
    });

    var reqService = $(".req__listItemServiceInfo");
    $(".req__listItemInfo .reveal").on("click", function (e) {
      e.preventDefault();
      var parent = $(this).parents(".req__listItem");
      if (parent.hasClass("_disclose") === true) {
        parent.removeClass("_disclose").find(".req__listItemServiceInfo").remove();
      } else {
        parent.siblings().removeClass("_disclose");
        parent.addClass("_disclose").append($(reqService).css("display", "grid"));
      }
    });

    $.each($("._progress ._bar"), function (i, el) {
      var ready = $(el).attr("data-ready");
      var text = $(el).siblings("._progress ._text");
      if (ready === "100%") {
        $(text).html("Готово к отправке").parent().addClass("_done");
      } else {
        $(text).html(ready);
      }
      $(el).css("width", $(this).attr("data-ready"));
    });

    fillDiag();

    $(window).on("load", function () {
      $(".notif__popupList").mCustomScrollbar();
    });
  }
});