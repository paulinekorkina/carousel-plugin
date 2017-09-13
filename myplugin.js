(function( $ ) {
  $.fn.myPlugin = function() {

    var sliderUl = this.children('ul');
    var sliderLi = sliderUl.children('li');
    sliderUl.wrap('<div class="myPluginWrapper" />');
    var prevControl = this.children('.prev');
    var nextControl = this.children('.next');
    var slideWidth = sliderLi.children().width();
    var slideHeight = sliderLi.children().outerHeight();
    var sliderLength = sliderLi.length;
    var currentPosition = 0;
    var sliderWrapper = this.children('.myPluginWrapper');
    sliderWrapper.width(slideWidth).height(slideHeight);

    sliderUl.width(slideWidth * sliderLength);
    sliderUl.css({
    	'position': 'absolute',
    	'top': '0',
    	'left': '0'
    });

    var runInterval = setTimeout(runAuto, 2600);

    var pagination = this.find('.myplugin-pagination span');

    pagination.eq(0).addClass('active');

    // function changeLeft() {
    // 	var newLeft = currentPosition*slideWidth*(-1);
    //   pagination.eq(currentPosition).addClass('active');
    // 	sliderUl.animate(
    //     {left: newLeft},
    //     600,
    //     function(){
    //         runInterval = setTimeout(runAuto, 2600);
    //     });
    //   }

    nextControl.click(function(){
      clearTimeout(runInterval);
      sliderUl.stop(true, true);
      pagination.eq(currentPosition).removeClass('active');
    	if (currentPosition < sliderLength - 1) {
    		currentPosition++;
    	} else {
    		currentPosition = 0;
    	}
    	// changeLeft();
      sliderUl.animate(
        {left: slideWidth*(-1)},
        600,
        function(){
          sliderUl.css('left', '0');
          sliderUl.find('li:first').appendTo(sliderUl);
          runInterval = setTimeout(runAuto, 2600);
        });
      pagination.eq(currentPosition).addClass('active');
    });

    prevControl.click(function(){
       clearTimeout(runInterval);
       sliderUl.stop(true, true);
      pagination.eq(currentPosition).removeClass('active');
    	if (currentPosition > 0) {
    		currentPosition--;
    	} else {
    		currentPosition = sliderLength - 1;
    	}
    	// changeLeft();
      sliderUl.find('li:last').prependTo(sliderUl);
      sliderUl.css('left', slideWidth*(-1)).animate(
          {left: 0},
          600,
          function(){
              runInterval = setTimeout(runAuto, 2600);
          }
        );
      pagination.eq(currentPosition).addClass('active');

    });

    pagination.click(function(){
      clearTimeout(runInterval);
      sliderUl.stop(true, true);
      pagination.eq(currentPosition).removeClass('active');
      currentPosition = pagination.index(this);
      console.log(currentPosition);
      //changeLeft();
      var prevElCount = sliderLi.eq(currentPosition).prevAll().length;
      sliderUl.animate(
        {left: prevElCount*slideWidth*(-1)},
        600,
        function(){
          sliderLi.eq(currentPosition).prevAll().appendTo(sliderUl);
          // var prevEls = sliderLi.eq(currentPosition).prevAll();

          // function compareReversed(a, b) {
          //   return b - a;
          // }

          // prevEls.sort(compareReversed);

          // prevEls.appendTo(sliderUl);

          sliderUl.css('left', '0');
        }
        );

      runInterval = setTimeout(runAuto, 2600);
      pagination.eq(currentPosition).addClass('active');
    });

    function runAuto() {
      nextControl.trigger('click');
    }

  };
})(jQuery);