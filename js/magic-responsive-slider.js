(function ($) {
	'use strict';

	$(window).on('resize', function () {
		if (this.resizeTO) clearTimeout(this.resizeTO);
		this.resizeTO = setTimeout(function () {
			$(this).trigger('resizeEnd');
		}, 200);
	});

	function Slider(element, options) {
		var defaults = {
			width : 100,
			maxWidth : 273,
			controls : true
		};

		this.element = element;
		this.options = $.extend({}, defaults, options);
	}

	Slider.prototype.init = function () {
		var self = this,
			$slider = self.element,
			totalSlides = $slider.children('li').length;

		$slider.wrap('<div class="magic-slider" />');

		if (self.options.width > self.options.maxWidth) {
			self.options.width = self.options.maxWidth;
		}

		$slider.parent('.magic-slider').css({
			overflow : 'hidden',
			width : self.options.width
		});
		$slider.css('width', self.options.width * totalSlides);
		$slider.children().width(self.options.width);
		$slider.children().first().addClass('active');

		$(window).on('resizeEnd', function () {
			var currentWidth = $('.slider-b').width(),
				currentActiveItem = $slider.children().filter('.active').index();

			if (currentWidth > self.options.maxWidth) {
				currentWidth = self.options.maxWidth;
			}
			$slider.parent('.magic-slider').css({
				overflow : 'hidden',
				width : currentWidth
			});
			$slider.css({
				width : currentWidth * totalSlides,
				marginLeft : currentWidth * (-currentActiveItem)
			});
			$slider.children().width(currentWidth);
		});

		if (self.options.controls) {
			self.controls();
		}
	};

	Slider.prototype.controls = function () {
		var self = this,
			$slider = self.element,
			totalSlides = $slider.children('li').length,
			controls,
			left,
			right,
			counter,
			currentPosition = 0,
			$magicSlider = $slider.parent('.magic-slider');

		left     = '<li class="controls-item controls-l"><a href="#" rel="left"> < </a></li>';
		right    = '<li class="controls-item controls-r"><a href="#" rel="right"> > </a></li>';
		counter  = '<li class="controls-info"><span class="current"></span>/<span class="total">' + totalSlides + '</span></li>';
		controls = '<ul class="list controls">' + left + counter + right + '</ul>';

		$magicSlider.after(controls);

		function printCurrentPosition() {
			$magicSlider.next('.controls').find('.current').text(currentPosition + 1);
		}
		printCurrentPosition();

		var sliderWidth = self.options.width;
		$(window).on('resizeEnd', function () {
			sliderWidth = $slider.children().first().width();
		});

		function slideGo(slider, direction) {
			if (currentPosition === 0 && direction === 'left') {
				return;
			}
			if (currentPosition === totalSlides - 1) {
				currentPosition = 0;
				slider.children().removeClass('active');
				slider.children().eq(currentPosition).addClass('active');
				printCurrentPosition();
			} else {
				if (direction === 'right') {
					currentPosition += 1;
				} else {
					currentPosition -= 1;
				}

				printCurrentPosition();
				slider.children().filter('.active').removeClass('active');
				slider.children().eq(currentPosition).addClass('active');
			}

			slider.animate({
				'marginLeft' : sliderWidth * (-currentPosition)
			});
		}

		$magicSlider.next('.controls').find('a').on('click', function (e) {
			e.preventDefault();
			slideGo($slider, $(this).attr('rel'));
		});
	};

	$(document).ready(function () {
		$('.slider-b').each(function () {
			var slider = new Slider($(this).children('.slider'), {
				width : $(this).width(),
				maxWidth: 273
			});
			slider.init();
		});
	});
}(jQuery));