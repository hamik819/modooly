// 메인배너슬라이드
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

// 관심분야선택
function interestSelect() {
	$(document).on('click', '.interest__choice button', function(){
		if($(this).hasClass('is-selected')){
			$(this).removeClass('is-selected');
		} else {
			if($('.interest__choice button.is-selected').length < 3){
				$(this).addClass('is-selected');
			}
		}
	});
}
// 패스워드타입변경
function passwordShow() {
	$(document).on('click', '.box.pwd .btn_password', function(){
		if($(this).hasClass('show')){
			$(this).removeClass('show').siblings('input').attr('type', 'password');
		} else {
			$(this).addClass('show').siblings('input').attr('type', 'text');
		}
	});
}
// 활동내역 문의 답변보기
function answerShow() {
	$(document).on('click', '.mypage__inquire--list .btn_answer_view', function(){
		if($(this).parents('.item').hasClass('show')){
			$(this).parents('.item').removeClass('show');
		} else {
			$(this).parents('.item').addClass('show');
		}
	});
}
$(document).ready(function() {
	passwordShow();
	if( $('.main').length > 0 ) {
		bannerSlide();
	}
	if( $('.interest').length > 0 ) {
		interestSelect();
	}
	if( $('.mypage__inquire').length > 0 ) {
		answerShow();
	}
});