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
      var autoSlide = false;

      var sliderWrapper = this.children('.myPluginWrapper');
      sliderWrapper.width(slideWidth).height(slideHeight);

      sliderUl.width(slideWidth * sliderLength);
      sliderUl.css({
      	'position': 'absolute',
      	'top': '0',
      	'left': '0'
      });

      function changeLeft() {
      	var newLeft = currentPosition*slideWidth*(-1);
      	sliderUl.animate({left: newLeft}, 600, function(){setInterval(runAuto, 2600)});
      }

      nextControl.click(function(){
      	clearInterval(runInterval);
      	if (currentPosition < sliderLength - 1) {
      		currentPosition++;
      	} else {
      		currentPosition = 0;
      	}
      	changeLeft();
      });

      prevControl.click(function(){
      	clearInterval(runInterval);
      	if (currentPosition > 0) {
      		currentPosition--;
      	} else {
      		currentPosition = sliderLength - 1;
      	}
      	changeLeft();
      });

      function runAuto() {
      	if (currentPosition < sliderLength - 1) {
      		currentPosition++;
      	} else {
      		currentPosition = 0;
      	}
      	var newLeft = currentPosition*slideWidth*(-1);
      	sliderUl.animate({left: newLeft}, 600);
      }

      var runInterval = setInterval(runAuto, 2600);

  };
})(jQuery);