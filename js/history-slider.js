jQuery(document).ready(function(){

  var duration = 300,
  delay = 100,
  epsilon = (1000 / 60 / duration) / 4,
  firstCustomMinaAnimation = bezier(.42,.03,.77,.63, epsilon),
  secondCustomMinaAnimation = bezier(.27,.5,.6,.99, epsilon);


  var sliderWrapper = $(".history");
  var slider = sliderWrapper.find('.history__slider'),
  sliderNavigation = sliderWrapper.find('.history__nav').find('li');
  var svgCoverLayer = sliderWrapper.find('.history__svg-cover'),
  pathId = svgCoverLayer.find('path').attr('id'),
  svgPath = Snap('#'+pathId);
  initSlider(sliderWrapper);

  function NextBtn(e, btn, pathArray) {
    e.preventDefault();
    $('.history__arrow._prev').removeClass('_disable');
    var nextIndex = $('.history__navItem').index( $('.history__navItem._selected') ) + 1;
    var selectedItem = $(sliderNavigation[nextIndex]);
    var parity = retrieveParity(slider);
    var selectedSlidePosition = selectedItem.index(),
    selectedSlide = slider.children('li').eq(selectedSlidePosition),
    visibleSlide = retrieveVisibleSlide(slider),
    direction = 'next';
    updateSlide(visibleSlide, selectedSlide, direction, svgCoverLayer, sliderNavigation, pathArray, svgPath, parity);
    if(nextIndex >= $('.history__navItem').length - 1) {
      btn.addClass('_disable');
    }
  }
  function PrevBtn(e, btn, pathArray) {
    e.preventDefault();
    $('.history__arrow._next').removeClass('_disable');
    var nextIndex = $('.history__navItem').index( $('.history__navItem._selected') ) - 1;
    var selectedItem = $(sliderNavigation[nextIndex]);
    var parity = retrieveParity(slider);
    var selectedSlidePosition = selectedItem.index(),
    selectedSlide = slider.children('li').eq(selectedSlidePosition),
    visibleSlide = retrieveVisibleSlide(slider),
    direction = 'prev';
    updateSlide(visibleSlide, selectedSlide, direction, svgCoverLayer, sliderNavigation, pathArray, svgPath, parity);
    if(nextIndex <= 0) {
      btn.addClass('_disable');
    }
  }

  function initSlider(sliderWrapper) {

    //store path 'd' attribute values 
    var pathArray = [];
    pathArray[0] = svgCoverLayer.data('step1');
    pathArray[1] = svgCoverLayer.data('step2');
    pathArray[2] = svgCoverLayer.data('step3');
    pathArray[3] = svgCoverLayer.data('step4');
    pathArray[4] = svgCoverLayer.data('step5');

    $('.history__arrow._next').on('click', function(e) {
      NextBtn(e, $(this), pathArray);
    });
    $('.history__arrow._prev').on('click', function(e) {
      PrevBtn(e, $(this), pathArray);
    });

    //update visible slide when user clicks .cd-slider-navigation buttons
    sliderNavigation.on('click', function(event){
      event.preventDefault();
      var selectedItem = $(this);
      if(!selectedItem.hasClass('_selected')) {
        // if it's not already selected
        var parity = retrieveParity(slider);
        var selectedSlidePosition = selectedItem.index(),
        selectedSlide = slider.children('li').eq(selectedSlidePosition),
        visibleSlide = retrieveVisibleSlide(slider),
        visibleSlidePosition = visibleSlide.index(),
        direction = '';
        direction = ( visibleSlidePosition < selectedSlidePosition) ? 'next': 'prev';
        updateSlide(visibleSlide, selectedSlide, direction, svgCoverLayer, sliderNavigation, pathArray, svgPath, parity);
      }
    });
  }

  function retrieveParity(slider) {
    if (slider.find('li').index($('._visible')) % 2 === 0) {
      return 'even';
    } else {
      return 'odd';
    }
  }

  function retrieveVisibleSlide(slider) {
    return slider.find('._visible');
  }
  function updateSlide(oldSlide, newSlide, direction, svgCoverLayer, sliderNavigation, paths, svgPath, parity) {
    if( direction == 'next' ) {
      if (parity === 'even') {
        var path1 = paths[0],
        path2 = paths[1],
        path3 = paths[2];
      } else {
        var path1 = paths[2],
        path2 = paths[3],
        path3 = paths[4],
        path4 = paths[0];
      }
    } else {
      if (parity === 'odd') {
        var path1 = paths[2],
        path2 = paths[1],
        path3 = paths[0];
      } else {
        var path1 = paths[0],
        path2 = paths[4],
        path3 = paths[3],
        path4 = paths[2];
      }
    }

    $('.history__arrow._next').off("click");
    $('.history__arrow._prev').off("click");

    svgCoverLayer.addClass('is-animating');
    svgPath.attr('d', path1);
    svgPath.animate({'d': path2}, duration, firstCustomMinaAnimation, function(){
      oldSlide.removeClass('_visible');
      newSlide.addClass('_visible');
      updateNavSlide(newSlide, sliderNavigation);
      setTimeout(function() {
        if (parity === 'odd'&& direction ==='next') {
          svgPath.attr('d', path3);
          svgPath.animate({'d': path4}, duration, secondCustomMinaAnimation, function(){
            svgCoverLayer.removeClass('is-animating');
          });
        } else if (parity === 'even' && direction === 'next') {
          svgPath.animate({'d': path3}, duration, secondCustomMinaAnimation, function(){
            svgCoverLayer.removeClass('is-animating');
          });
        } else if (parity === 'odd'&& direction ==='prev') {
          svgPath.animate({'d': path3}, duration, secondCustomMinaAnimation, function(){
            svgCoverLayer.removeClass('is-animating');
          });
        } else if (parity === 'even' && direction === 'prev') {
          svgPath.attr('d', path3);
          svgPath.animate({'d': path4}, duration, secondCustomMinaAnimation, function(){
            svgCoverLayer.removeClass('is-animating');
          });
        }
      });
      $('.history__arrow._next').on('click', function(e) {
        NextBtn(e, $(this), paths);
      });
      $('.history__arrow._prev').on('click', function(e) {
        PrevBtn(e, $(this), paths);
      });
    }, delay);
  }

  function updateNavSlide(actualSlide, sliderNavigation) {
    var position = actualSlide.index();
    sliderNavigation.removeClass('_selected').eq(position).addClass('_selected');
    if (position === sliderNavigation.length - 1) {
      $(".history__arrow._next").addClass("_disable");
      $(".history__arrow._prev").removeClass("_disable");
    } else if(position === 0) {
      $(".history__arrow._prev").addClass("_disable");
      $(".history__arrow._next").removeClass("_disable");
    } else {
      $(".history__arrow").removeClass("_disable");
    }
  }

  function bezier(x1, y1, x2, y2, epsilon){
    //https://github.com/arian/cubic-bezier
    var curveX = function(t){
      var v = 1 - t;
      return 3 * v * v * t * x1 + 3 * v * t * t * x2 + t * t * t;
    };

    var curveY = function(t){
      var v = 1 - t;
      return 3 * v * v * t * y1 + 3 * v * t * t * y2 + t * t * t;
    };

    var derivativeCurveX = function(t){
      var v = 1 - t;
      return 3 * (2 * (t - 1) * t + v * v) * x1 + 3 * (- t * t * t + 2 * v * t) * x2;
    };

    return function(t){

      var x = t, t0, t1, t2, x2, d2, i;

      // First try a few iterations of Newton's method -- normally very fast.
      for (t2 = x, i = 0; i < 8; i++){
        x2 = curveX(t2) - x;
        if (Math.abs(x2) < epsilon) return curveY(t2);
        d2 = derivativeCurveX(t2);
        if (Math.abs(d2) < 1e-6) break;
        t2 = t2 - x2 / d2;
      }

      t0 = 0, t1 = 1, t2 = x;

      if (t2 < t0) return curveY(t0);
      if (t2 > t1) return curveY(t1);

      // Fallback to the bisection method for reliability.
      while (t0 < t1){
        x2 = curveX(t2);
        if (Math.abs(x2 - x) < epsilon) return curveY(t2);
        if (x > x2) t0 = t2;
        else t1 = t2;
        t2 = (t1 - t0) * .5 + t0;
      }

      // Failure
      return curveY(t2);

    };
  }
});