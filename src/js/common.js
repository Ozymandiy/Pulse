// jQuery
$(document).ready(function() {

	// **********  Slick carousel
  $('.carousel__inner').slick({
		dots: false,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow: '<button type="button" class="slick-prev"><img src="./icons/left.svg"></button>',
		nextArrow: '<button type="button" class="slick-next"><img src="./icons/right.svg"></button>',
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
	function toggleSlide(item) {
		$(item).each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
			})
		});
	}

	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__back');

	//Progress line on the top of the document
	$(function() {
		$("body").prognroll({
			height: 5,
    	color: "#c70101"
		});
	});

	//Modal windows

	$('[data-modal=consultation]').on('click', function() {
		$('.overlay, #consultation').fadeIn();
	});

	$('.modalwin__close').on('click', function() {
		$('.overlay, #consultation, #order, #thanks').fadeOut();
	});

	$(document).keydown(function(event) { 
		if (event.keyCode == 27) { 
			$('.overlay, #consultation, #order, #thanks').fadeOut();
		}
	});

	$('.overlay').on('click', function(event) {
		if ($(event.target ).is('.overlay')) {
			$('.overlay, #consultation, #order, #thanks').fadeOut();
		}		
	});

	$('.button_mini').each(function(i) {
		$(this).on('click', function() {
			$('#order .modalwin__descr').text($('.catalog-item__sub').eq(i).text());
			$('.overlay, #order').fadeIn();
		});
	});

	// forms validation

	function validateForms(form) {
		$(form).validate({
			rules: {
				name: "required",
				phone: "required",
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: "Please specify your name",
				phone: "Please specify your phone number",
				email: {
					required: "We need your email to contact you",
					email: "Your email must be like name@domain.com"
				}
			}
		});
	}

	validateForms('#consultation .back-form');
	validateForms('#order .back-form');
	validateForms('#consultation-form');

	// mask for form inputs
	$('input[name=phone]').mask("+420 999-99-99");

	// form sending
	$("form").submit(function(e) {
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
			$("#consultation, #order").fadeOut();
			$(".overlay, #thanks").fadeIn('slow');

			$("form").trigger("reset");
		});
		return false;
	});

}); // the end document.ready

//JS
	const arrowOnTop = document.querySelector('.on-top');
	window.addEventListener('scroll', () => {
		document.documentElement.scrollTop > 300 ? arrowOnTop.style.visibility = "visible" : arrowOnTop.style.visibility = "hidden";
	});

	arrowOnTop.addEventListener('click', () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
	});