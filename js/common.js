(function ($) {
	'use strict';

	function scrollTo(position) {
		$('body, html').animate({ scrollTop: position });
	}

	function eventWidgetReplace(windowWidth) {
		if ((windowWidth < 980) && (!$('html').hasClass('ie'))) {
			$('#eventWidget').insertAfter('#bioRight');
		} else {
			$('#eventWidget').insertBefore('#bioCenter');
		}
	}

	/* MENU */
	function desktopMenu() {
		var $outerNav = $('.outer-nav'),
			$innerNav = $('.inner-nav'),
			menuItems = $outerNav.children('ul').children('li'),
			id;

		var scrollItems = menuItems.map(function () {
			var item = $($(this).children().attr('href'));
			if (item.length) { return item; }
		});

		if ($(window).scrollTop() > 170) {
			$innerNav.addClass('hidden');
			$outerNav.fadeIn();
		}

		function fireActiveItem() {
			var cur = scrollItems.map(function () {
				if ($(this).offset().top < $(window).scrollTop() + 75) {
					return this;
				}
			});
			// Get the id of the current element
			cur = cur[cur.length - 1];
			id = cur && cur.length ? cur[0].id : '';

			if ($(window).scrollTop() + $(window).height() === $(document).height()) {
				id = 'menu-contacts';
			}

			menuItems
				.removeClass('active')
				.children().filter('[href=#' + id + ']').parent().addClass('active');
		}

		fireActiveItem();

		$(window).on('scroll', function () {
			fireActiveItem();

			menuItems
				.removeClass('active')
				.children().filter('[href=#' + id + ']').parent().addClass('active');

			if ($(this).scrollTop() > 170) {
				$innerNav.addClass('hidden');
				$outerNav.fadeIn();
			} else {
				$innerNav.removeClass('hidden');
				$outerNav.fadeOut();
			}
		});
	}

	function menuToggle() {
		var $menuBtn = $('.menu-toggle'),
			$outerMenu = $('.outer-menu');

		$menuBtn.on('click', function (e) {
			e.preventDefault();
			$outerMenu.slideToggle();
		});
	}

	function scrollOnClick(element, windowWidth) {
		var target = element.attr('href'),
			elemIndex = element.parent().index(),
			$outerMenu = $('.outer-menu'),
			targetPosition = parseInt($(target).offset().top, 0) - 70;

		$outerMenu
			.children().removeClass('active')
			.end()
			.children().eq(elemIndex).addClass('active');

		scrollTo(targetPosition);

		if ($outerMenu.filter(':visible') && windowWidth < 980) {
			$outerMenu.slideUp();
		}
	}
	/* MENU ENDS */

	$(document).ready(function () {
		var windowWidth = $(window).width();
		eventWidgetReplace(windowWidth);
		desktopMenu();
		menuToggle();

		$('.primary-nav').children('ul').find('a').on('click', function (e) {
			e.preventDefault();
			scrollOnClick($(this), windowWidth);
		});

		$(window).on('resize', function () {
			windowWidth = $(window).width();
			eventWidgetReplace(windowWidth);
		});
	});
}(jQuery));
