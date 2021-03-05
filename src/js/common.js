/* window.addEventListener('DOMContentLoaded', () => {
	const menu = document.querySelector('.menu'),
	menuItem = document.querySelectorAll('.menu_item'),
	hamburger = document.querySelector('.hamburger');

	hamburger.addEventListener('click', () => {
			hamburger.classList.toggle('hamburger_active');
			menu.classList.toggle('menu_active');
	});

	menuItem.forEach(item => {
			item.addEventListener('click', () => {
					hamburger.classList.toggle('hamburger_active');
					menu.classList.toggle('menu_active');
			});
	});
}); */

$(document).ready(function() {

	// **********  Slick carousel
  $('.carousel__inner').slick({
		dots: false,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow: '<button type="button" class="slick-prev"><img src="../icons/left.svg"></button>',
		nextArrow: '<button type="button" class="slick-next"><img src="../icons/right.svg"></button>',
		responsive: [
			{
				breakpoint: 991,
				settings: {
					arrows: false,
					dots: true
				}
			},
			{
				breakpoint: 600,
				settings: {
					arrows: false,
					dots: true
				}
			},
			{
				breakpoint: 480,
				settings: {
					arrows: false,
					dots: true
				}
			}
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
		]
	});

	// **********  Tabs
	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.wrapper').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

	// **********  Rotate item to describe and back
	function toggleSlide(itemClass) {
		$(itemClass).each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
			})
		});
	}

	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__back');
});