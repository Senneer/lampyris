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
    var showDetailes = function showDetailes(block, slider) {
      block.css("display", "block");
      slider.slick({
        dots: true,
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
      });
    };

    var serviceSum = function serviceSum(service) {
      $.each(service, function (i, el) {
        var cost = $(el).attr("data-cost");
        var count = $(el).attr("data-count");
        // var number = $(el).html().replace(/[\s|\u00A0|&nbsp;]/g, '');
        var sum = parseInt(cost, 10);
        var num = 0;
        if (shownSumAll === true) {
          num = sum / count;
          $(el).html(parseInt(cost).toLocaleString() + " Р");
        } else {
          num = sum * count;
          $(el).html(num.toLocaleString() + " Р");
        }
      });
    };

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

    var checkServiceNumb = function checkServiceNumb(el, parent) {
      serviceNumb = el.parents(parent).index();
    };

    var OpenService = function OpenService(el, title, dataService, name) {
      var service = el.attr(dataService);
      title.html(name);
      $(".service-block").removeClass("_open").siblings(service).addClass("_open");
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
      $("body").animate({ scrollTop: scrollEl.offset().top }, 700, "swing", function () {
        hideEl.css("display", "none");
      });
    };

    $(".footer__feedbackCall").on("click", function (e) {
      e.preventDefault();
      $(".overlay").addClass("_open");
    });
    $(".overlay").on("click", function () {
      $(this).removeClass("_open");
    });
    $(".modal").on("click", function (e) {
      e.stopPropagation();
    });

    $(".category__infoListItem a").on("click", function (e) {
      e.preventDefault();
      $(".section._home").css("display", "none");
      $(".section._order").css("display", "grid");
      $(".footer__about").html("Парк станков").attr("data-page", ".machines");

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

    $.each($(".projects__itemName"), function (i, el) {
      $(el).find("button").on("click", function (e) {
        e.preventDefault();
        showDetailes($(".projects__detailed"), $(".projects__detailedList"));
      });
    });
    $.each($(".projects__allList li"), function (i, el) {
      $(el).find("button").on("click", function (e) {
        e.preventDefault();
        $(".projects__all").css("display", "none");
        showDetailes($(".projects__detailed"), $(".projects__detailedList"));
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

    var shownSumAll = true;


    $(".total__panelCount button").on("click", function (e) {
      e.preventDefault();
      $(this).addClass("_current");
      serviceSum($(".total__listItem ._cost"));
      if ($(this).hasClass("_all")) {
        shownSumAll = true;
        $(this).siblings("._one").removeClass("_current");
      } else if ($(this).hasClass("_one")) {
        shownSumAll = false;
        $(this).siblings("._all").removeClass("_current");
      }
    });

    var inputs = document.querySelectorAll(".service__panelFormFile input");
    var delFile = document.querySelectorAll(".service__panelFormFile button._del")[0];
    Array.prototype.forEach.call(inputs, function (input) {
      var label = input.nextElementSibling,
          labelVal = label.innerHTML;

      input.addEventListener("change", function (e) {
        var fileName = "";
        if (this.files && this.files.length > 1) {
          fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
        } else {
          fileName = e.target.value.split('\\').pop();
        }

        if (fileName) {
          label.innerHTML = fileName;
          label.classList.add("_attached");
          delFile.style.display = "block";
        } else {
          label.innerHTML = labelVal;
          label.classList.remove("_attached");
          delFile.style.display = "none";
        }
      });

      delFile.addEventListener("click", function (e) {
        e.preventDefault();
        delFile.style.display = "none";
        label.classList.remove("_attached");
        label.innerHTML = labelVal;
      });
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

    var services = $(".stages__item");
    var serviceNumb = 0;


    $(".stages__item ._add").on("click", function (e) {
      e.preventDefault();
      var service = $(this).parents(".stages__item");
      service.addClass("_active");
      $.each($(service).find(".stages__itemSubstageItem"), function (i, el) {
        if (i === 0) {
          $(el).addClass("_current");
          var title = $(el).find("span:first-child").text();
          OpenService($(el).find("button"), $("._service .order__stageTitle"), "data-service", title);
        }
      });
      checkServiceNumb($(this), ".stages__item");
    });
    $(".stages__item ._del").on("click", function (e) {
      e.preventDefault();
      var service = $(this).parents(".stages__item");
      service.removeClass("_active").find(".stages__itemSubstageItem").removeClass("_active _current");
    });

    $(".service__panelFormControl ._next").on("click", function (e) {
      e.preventDefault();
    });

    $(".stages__itemName button._info").on("click", function (e) {
      e.preventDefault();
      OpenService($(this), $("._service .order__stageTitle"), "data-service", "Информация о заказе");
    });
    $(".stages__itemSubstageItem button").on("click", function (e) {
      e.preventDefault();
      $(this).parent().siblings().removeClass("_current");
      $(this).parent().addClass("_current");
      OpenService($(this), $("._service .order__stageTitle"), "data-service", $(this).text());
      checkServiceNumb($(this), ".stages__item");
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
      changeLayout($($(this).attr("data-page")), "block", $(".wrapper"), $($(this).attr("data-page")));

      if ($(this).attr("data-page") === ".land") {
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
      }
    });

    $(".machines__close").on("click", function (e) {
      e.preventDefault();
      changeLayout($(".wrapper"), "flex", $(".machines"), $("body"));
    });

    $(".team__dmListItem button").on("click", function (e) {
      e.preventDefault();
      $(this).parent().siblings().removeClass("_active");
      $(this).parent().addClass("_active");
      sliders[2].slick("unslick").slick({
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1
      });
    });

    $(".about__totop").on("click", function (e) {
      e.preventDefault();
      changeLayout($(".wrapper"), "flex", $(".land"), $("body"));
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

    $(".req__listItemInfo button._del").on("click", function (e) {
      e.preventDefault();
      var row = $(this).parents(".req__listItem");
      row.fadeOut(200);
      setTimeout(function () {
        row.remove();
      }, 200);
    });
  }
});