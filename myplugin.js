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

    function changeLeft() {
    	var newLeft = currentPosition*slideWidth*(-1);
    	sliderUl.animate(
        {left: newLeft},
        600,
        function(){
            runInterval = setTimeout(runAuto, 2600)
        });
      }

    nextControl.click(function(){
      clearTimeout(runInterval);
      sliderUl.stop(true, true);
    	if (currentPosition < sliderLength - 1) {
    		currentPosition++;
    	} else {
    		currentPosition = 0;
    	}
    	changeLeft();
    });

    prevControl.click(function(){
      clearTimeout(runInterval);
      sliderUl.stop(true, true);
    	if (currentPosition > 0) {
    		currentPosition--;
    	} else {
    		currentPosition = sliderLength - 1;
    	}
    	changeLeft();
    });

    function runAuto() {
      nextControl.trigger('click');
    }

  };
})(jQuery);