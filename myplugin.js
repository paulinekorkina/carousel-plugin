(function( $ ) {
  $.fn.myPlugin = function(options) {

    var settings = $.extend( {
      'slideCount' : 1,
      'autoScroll' : true
    }, options);

    return this.each(function() {

      var $this = $(this);

      var sliderUl = $this.children('ul');
      var sliderLi = sliderUl.children('li');
      sliderUl.wrap('<div class="myPluginWrapper" />');
      var prevControl = $this.children('.prev');
      var nextControl = $this.children('.next');
      var slideWidth = sliderLi.children().width();
      var slideHeight = sliderLi.children().outerHeight();
      var sliderLength = sliderLi.length;
      var currentPosition = 0;
      var sliderWrapper = $this.children('.myPluginWrapper');
      sliderWrapper.width(slideWidth * settings.slideCount).height(slideHeight);
      sliderUl.width(slideWidth * sliderLength);
      sliderUl.css({
      	'position': 'absolute',
      	'top': '0',
      	'left': '0'
      });
      startAuto();
      var pagination = $this.find('.myplugin-pagination span');
      pagination.eq(0).addClass('active');

      nextControl.click(function(){
        stopAuto();
        sliderUl.stop(true, true);
        pagination.eq(currentPosition).removeClass('active');
      	if (currentPosition < sliderLength - 1) {
      		currentPosition++;
      	} else {
      		currentPosition = 0;
      	}
        sliderUl.animate(
          {left: slideWidth*(-1)},
          600,
          function(){
            sliderUl.css('left', '0');
            sliderUl.find('li:first').appendTo(sliderUl);
            startAuto();
          });
        pagination.eq(currentPosition).addClass('active');
      });

      prevControl.click(function(){
         stopAuto();
         sliderUl.stop(true, true);
        pagination.eq(currentPosition).removeClass('active');
      	if (currentPosition > 0) {
      		currentPosition--;
      	} else {
      		currentPosition = sliderLength - 1;
      	}
        sliderUl.find('li:last').prependTo(sliderUl);
        sliderUl.css('left', slideWidth*(-1)).animate(
          {left: 0},
          600,
          startAuto
        );
        pagination.eq(currentPosition).addClass('active');

      });

      pagination.click(function(){
        stopAuto();
        sliderUl.stop(true, true);
        pagination.eq(currentPosition).removeClass('active');
        currentPosition = pagination.index(this);
        var prevElCount = sliderLi.eq(currentPosition).prevAll().length;
        // var prevEls = sliderLi.eq(currentPosition).prevAll();
        // var newUl = $('<ul class="myplugin-new-ul"></ul>');
        // sliderUl.parent().append(newUl);
        // prevEls.clone().appendTo(newUl);
        // var newEls = $('.myplugin-new-ul li');
        // newEls.sort(function(a, b){
        //   var an = $(a).index();
        //   var bn = $(b).index();
        //   return bn - an;
        // });
        // newEls.detach().appendTo(sliderUl);
        sliderUl.animate(
          {left: prevElCount*slideWidth*(-1)},
          600,
          function(){
            var prevEls = sliderLi.eq(currentPosition).prevAll();
            var newUl = $('<ul class="myplugin-new-ul"></ul>');
            sliderUl.parent().append(newUl);
            prevEls.detach().appendTo(newUl);
            var newEls = $('.myplugin-new-ul li');
            newEls.sort(function(a, b){
              var an = $(a).index();
              var bn = $(b).index();
              return bn - an;
            });
            newEls.detach().appendTo(sliderUl);
            //prevEls.remove();
            sliderUl.css('left', '0');
            newUl.remove();
          }
        );
        startAuto();
        pagination.eq(currentPosition).addClass('active');
      });

      function runAuto() {
        nextControl.trigger('click');
      }

      function stopAuto() {
        if (settings.autoScroll) {
          clearTimeout(runInterval);
        }
      }

      function startAuto() {
        if (settings.autoScroll) {
          runInterval = setTimeout(runAuto, 2600);
        }
      }

      // Обработка событий тачскрина

      var touchPosition; // Координата нажатия

      sliderLi.on('touchstart', function(event){
        touchPosition = event.touches[0].pageX;
      });
      sliderLi.on('touchmove', function(event){
        // При движении нажатия отслеживать направление движения
        var tmpMove = touchPosition - event.touches[0].pageX;
        // Сдвиг достаточный?
        if (Math.abs(tmpMove) < 10) {
          return false;
        }
        if (tmpMove < 0) {
          // Листаем вправо
          prevControl.trigger('click');
          console.log('right');
        }
        else {
          // Листаем влево
          nextControl.trigger('click');
          console.log('left');
        }
      });

    });
  };
})(jQuery);