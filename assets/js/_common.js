var Norinamu = window.Norinamu || {};
Norinamu = (function($) {
	'use strict';
	var common = {
		layerOpen: function(target) {
			var el = $(target);
			el.removeClass('is-hidden').addClass('is-open');
			$('html').addClass('layer-opens');
			return false;
		},
		layerClose: function(target) {
			var el = $(target);
			el.removeClass('is-open').addClass('is-hidden');
			$('html').removeClass('layer-opens');
			return false;
		},
		layerToggle: function (target) {
            var el = $(target);
            if (el.hasClass('is-active')) {
                el.removeClass('is-active');
            } else {
                el.addClass('is-active');
            }
        },
		moveTop: function(){
			$(document).on('click', '.btn_top', function(){
				$('html, body').animate({'scrollTop' : 0});
			});
		},
		navHover: function(){
			$('header .nav > li').hover(function(){
				if(window.innerWidth > 768){
					$('header').addClass('is-hover');
				}
			}, function(){
				$('header').removeClass('is-hover');
			});
		},
		navOpen: function(){
			$(document).on('click', '.btn_menu', function(){
				$('body').addClass('nav-opens');
			});
		},
		navClose: function(){
			$(document).on('click', '.btn_close', function(){
				$('body').removeClass('nav-opens');
				$('.nav > .with_sub_menu > a').removeClass('is-open');
			});
		},
		mobileSubmenuOpen: function(){
			$(document).on('click', '.nav > .with_sub_menu > a', function(e){
				if(window.innerWidth <= 768){
					var item = $(this);
					var allItem = $('.nav > .with_sub_menu > a');
					e.preventDefault();
					if(!item.hasClass('is-open')){
						allItem.removeClass('is-open');
						item.addClass('is-open');
					} else {
						allItem.removeClass('is-open');
					}
				}
			});
		},
		init: function() {
			common.moveTop();
			common.navHover();
			common.navOpen();
			common.navClose();
			common.mobileSubmenuOpen();
		}
	};

	var main = {
		slidePortfolio: function(){
			$('.main_portfolio-slide').slick({
				centerMode: false,
				// centerPadding: '80px',
				slidesToShow: 3.67,
				prevArrow: $('.main_portfolio-btn .btn_prev'),
				nextArrow: $('.main_portfolio-btn .btn_next'),
				autoplay: true,
				autoplaySpeed: 2000,
				pauseOnHover: false,
				speed:800,
				// variableWidth: true,
				responsive: [
				    {
				        breakpoint: 768,
				        settings: {
				            // arrows: false,
				            centerMode: true,
				            // centerPadding: '40px',
				            slidesToShow: 1
				        }
				    },
				]
			});
		},
		slideWebzine: function(){
			$('.main_webzine-slide').slick({
				centerMode: false,
				// centerPadding: '80px',
				slidesToShow: 3.67,
				prevArrow: $('.main_webzine-btn .btn_prev'),
				nextArrow: $('.main_webzine-btn .btn_next'),
				// autoplay: true,
				autoplaySpeed: 2000,
				pauseOnHover: false,
				speed:800,
				// variableWidth: true
				responsive: [
				    {
				        breakpoint: 768,
				        settings: {
				            // arrows: false,
				            centerMode: true,
				            // centerPadding: '40px',
				            slidesToShow: 1
				        }
				    },
				]
			});
		},
		slidePlayPause: function(){
			$(document).on('click','.btn_pause',function(){
				if ($(this).hasClass('on')) {
					$(this).removeClass('on');
					$(this).parent().siblings('.slick-slider').slick('slickPlay');
				} else {
					$(this).addClass('on');
					$(this).parent().siblings('.slick-slider').slick('slickPause');
				}
			});
		},
		init: function() {
			main.slidePortfolio();
			main.slideWebzine();
			main.slidePlayPause();
		}
	};

	var brand = {
		showEvent: function(){
			$(window).on('scroll', function () {
				// text
				$('.is-motion').each(function(){
					var top = $(this).offset().top;
					var scrollTop = $(window).scrollTop();
					var windowHeight = $(window).height();
					if( scrollTop > top - (windowHeight - (windowHeight * 0.25)) ){
						$(this).addClass('on');
					}else if( scrollTop < top ){
						$(this).removeClass('on');
					}
				});
				// image
				$('.is-show').each(function(){
					var top = $(this).offset().top;
					var scrollTop = $(window).scrollTop();
					var windowHeight = $(window).height();
					if( scrollTop > top - (windowHeight - (windowHeight * 0.25)) ){
						$(this).addClass('on');
					}
				});
			});
		},
		init: function() {
			brand.showEvent();
			var MotionElement = $('.is-motion');
			var ShowElement = $('.is-show');
			for (var i=0; i<4; i++){
				MotionElement.eq(i).addClass('on');
			}
			ShowElement.eq(0).addClass('on');
		}
	};

	var history = {
		yearChange: function(){
			var scrollTop = $(window).scrollTop();
			var windowHeight = $(window).height();
			var bigYear = $('.fixframe'); 
			var LastYear = $('.history_work:nth-last-of-type(1)');
			var LastTop = LastYear.offset().top;
			$('.history_work').not('.fixframe').each(function(){
				var top = $(this).offset().top;
				if(scrollTop > top - (windowHeight - (windowHeight * 0.5))){
					var year = $(this).children('.history_work-year').text();
					bigYear.children('.year').text(year);
				}
			});
			if(scrollTop > windowHeight * 0.08){
				bigYear.addClass('fixed');
				if(scrollTop > LastTop - (windowHeight * 0.35)){
					bigYear.addClass('end');
				} else {
					bigYear.removeClass('end');
				}
			} else {
				bigYear.removeClass('fixed');
			}
		},
		init: function(){
			$(window).on('scroll',function(){
				history.yearChange();
			});
		}
	};

	var portfolio = {
		galleryMade: function(){
			$('.grid').each(function(){
				var $container = $(this),
				$loadMoreButton = $('.btn_more'),
				$filter = $('#gallery-filter'),
				addItemCount = 3,
				addedd = 0,
				allData = [],
				filteredData = [];
			
				$container.masonry({
					itemSelector: '.grid-item',
					columnWidth: '.grid-sizer',
					percentPosition:true,
					// horizontalOrder: true,
					gutter:'.gutter-sizer',
					transitionDuration: '0.3s'
				});
			
				// 'https://api.unsplash.com/photos?client_id=_kaFDQwQ9N0aQQiIc3si9-_GcW61AXZcv4NSMrUgarg'
				$.getJSON('https://api.unsplash.com/photos?client_id=_kaFDQwQ9N0aQQiIc3si9-_GcW61AXZcv4NSMrUgarg', initGallery);
			
				function initGallery(data) {
					allData = data;
					filteredData = allData;
					addItems();
					$loadMoreButton.on('click', addItems);
					$filter.on('change', 'input[type="radio"]', filterItems);
				}
			
				function addItems(filter) {
					var elements = [];
					if(window.innerWidth <=768){
						addItemCount = 1;
					}
					var slicedData = filteredData.slice(addedd, addedd + addItemCount);
			
					$.each(slicedData, function(i, item){
						var itemHTML =
						'<li class="grid-item">' +
						'<a href="">' +
						'<img src="' + item.urls.small +'" alt="">'+
						'<p>' + item.color + '</p>'+
						'<span>' + item.user.first_name + '</span>'+
						'</a>'+
						'</li>';
						elements.push($(itemHTML).get(0));
					});
					$container
						.append(elements)
						.imagesLoaded(function() {
							$(elements).removeClass('is-loading');
							$container.masonry('appended', elements);
							if(filter){
								$container.masonry();
							}
						});
			
					addedd += slicedData.length;
					if (addedd < filteredData.length) {
						$loadMoreButton.show();
					} else {
						$loadMoreButton.hide();
					}
				}
				function filterItems() {
					var key = $(this).val(),
					masonryItems = $container.masonry('getItemElements');
					$container.masonry('remove', masonryItems);
					filteredData = [];
					addedd = 0;
			
					if(key === 'all') {
						filteredData = allData;
					} else {
						// 배열의 모든 항목을 받아 콜백 함수에 의해 필터 함수를 만족하는 배열을 반환
						filteredData = $.grep(allData, function(item){
							return item.id === key;
						});
					}
					addItems(true);
				}
			});
		}
	};

	var news = {
		scrollEvent: function(element){
			var offset = element.offset().top;
			var header = $('header').height();
			$('html').animate({scrollTop : offset - header }, 300);
		},
		listOpen: function(){
			$(document).on('click', '.press .news_list-title', function(){
				var item = $(this).parent();
				var allItem = $('.press .news_list-title').parent();
				if(!item.hasClass('is-active')){
					allItem.removeClass('is-active');
					item.addClass('is-active');
					news.scrollEvent(item);
				} else {
					allItem.removeClass('is-active');
				}
			});
		},
		init: function(){
			news.listOpen();
		}
	};

	$(document).ready(function() {
		common.init();

		if( $('.main').length > 0 ){
			main.init();
		}

		if( $('.brand').length > 0  && window.innerWidth > 768 ){
			brand.init();
		}
		
		if( $('.page_history').length > 0 && window.innerWidth > 768 ){
			history.init();
			var initYear = $('.history_work').not('.fixframe').eq(0).children('.history_work-year').text();
			$('.fixframe').children('.year').text(initYear);
		}

		if( $('.portfolio').length > 0 ){
			portfolio.galleryMade();
		}

		if( $('.press').length > 0 ){
			news.init();
		}

		if( $('.contact').length > 0 ){
			var $input = $('.is-require input[type!=checkbox]');
			var $textarea = $('.is-require textarea');
			var $checkBox = $('.is-require input[type=checkbox]');
			var $button = $('.btn_request');
			var $form = $('.contact_form');
			function inputBlankChecked() {
				var inputLen = $input.length;
				var checkCount = 0;
				$input.each(function(){
					if($(this).val() !== '') checkCount++;
				});
				if((inputLen == checkCount) && ($textarea.val() !== '') && $checkBox.is(':checked')){
					$button.attr('disabled', false);
				} else {
					$button.attr('disabled', true);
				}
			}
			// $form.on('change', function(){
			// 	inputBlankChecked();
			// });
			inputBlankChecked();

			$input.on('propertychange change keyup paste input', function(){
			    inputBlankChecked();
			});
			$textarea.on('propertychange change keyup paste input', function(){
			    inputBlankChecked();
			});
			$checkBox.on('click', function(){
			    setTimeout(inputBlankChecked, 50);
			});  
		}

		// if( $('nav').length > 0 && window.innerWidth > 768){
		// 	$('.nav_btn button').on('mouseenter',function(){
		// 		$(this).css({opacity:1});
		// 	})
		// 	$('.nav_btn button').on('mouseleave',function(){
		// 		$(this).css({opacity:0.5});
		// 	})
		// }

		// if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > -1) {
		// 	$('body').addClass('ie');
		// }

	});

	return {
		layerOpen: common.layerOpen,
		layerClose: common.layerClose,
	};
})($);

var timer;
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

$(window).resize(function() {
	
});
