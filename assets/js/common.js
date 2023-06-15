function bannerSlide() {
	var slickElement = $('.main__banner--slide');
	var pageCurrent = $('.main__banner .current');
	var pageTotal = $('.main__banner .total');
	slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
		var i = (currentSlide ? currentSlide : 0) + 1;
		// pageCurrent.text(`${i} / ${slick.slideCount}`);
		pageCurrent.text(i);
		pageTotal.text(slick.slideCount);
	});
	slickElement.slick({
		slidesToShow: 1,
		arrows: false,
	});
}
// function infoSlide() {
// 	var slickElement = $('.main__info--slide');
// 	var progressSection = $('.main__info--progress');
// 	var progressBar = $('.main__info--progress span');

// 	slickElement.on('init reInit', function (event, slick, currentSlide, nextSlide) {
// 	var i = (currentSlide ? currentSlide : 0) + 1;
// 	var currentPercent = (100 / slick.slideCount) * i + '%';
// 	progressBar.css({width: currentPercent});
// 	if(currentPercent === '100%'){
// 		progressSection.addClass('full');
// 	} else {
// 		progressSection.removeClass('full');
// 	}
// 	});
// 	slickElement.on('beforeChange', function (event, slick, currentSlide, nextSlide){
// 		var i = (nextSlide + 1);
// 		var currentPercent = (100 / slick.slideCount) * i + '%';
// 		progressBar.css({width: currentPercent});
// 		if(currentPercent === '100%'){
// 			progressSection.addClass('full');
// 		} else {
// 			progressSection.removeClass('full');
// 		}
// 	});
// 	slickElement.slick({
// 		slidesToShow: 1,
// 		arrows: false,
// 	});
// }
$(document).ready(function() {
	if( $('.main').length > 0 ) {
		bannerSlide();
	}
});