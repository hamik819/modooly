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
function interestSelect(num) {
	$(document).on('click', '.interest__choice button', function(){
		if($(this).hasClass('is-selected')){
			$(this).removeClass('is-selected');
		} else {
			if($('.interest__choice button.is-selected').length < num){
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
// 뷰단 응원하기 버튼
function viewPageLike() {
	$(document).on('click', '.detail__head--info2 .like', function(){
		if($(this).hasClass('is-active')){
			$(this).removeClass('is-active');
		} else {
			$(this).addClass('is-active');
		}
	});
}
// select
function select() {
	$(document).on('click','.select_box .select_btn', function(){
		if($(this).parent('.select_box').hasClass('is-active')){
			$(this).parent('.select_box').removeClass('is-active');
			// $('.select_box').removeClass('is-active');
		} else {
			$(this).parent('.select_box').addClass('is-active');
		}
	});
	$(document).on('click', '.select_box .item', function(){
		var text = $(this).text();
		var selectBox = $(this).closest('.select_box');
		var selectInput = selectBox.children('input[type=hidden]');
		var selectBtn = selectBox.children('.select_btn');
		selectInput.val(text).trigger('change');
		selectBtn.text(text);
		selectBox.removeClass('is-active');
	});
	$(document).on('click', function(e){
		var target = $(e.target);
		if( !target.hasClass('select_box') && !target.parents().hasClass('select_box') ) {
			$('.select_box').removeClass('is-active');
		}
	});
}
// 팝업 열기
function layerOpen(target) {
	var el = $(target);
	el.removeClass('is-hidden').addClass('is-open');
	$('body').addClass('layer-opens');
}
// 팝업 닫기
function layerClose(target) {
	var el = $(target);
	el.removeClass('is-open').addClass('is-hidden');
	$('body').removeClass('layer-opens');
	if( el.find('.select_box').length > 0 ) {
		var initialMessage = el.find('.select_box').children('.select_btn').data('initial');
		el.find('.select_box').removeClass('is-open').children('input').val('');
		el.find('.select_box').children('.select_btn').text(initialMessage);
	}
}
$(document).ready(function() {
	passwordShow();
	if( $('.main').length > 0 ) {
		bannerSlide();
	}
	if( $('.interest').length > 0 ) {
		interestSelect(3);
	}
	if( $('.mypage__inquire').length > 0 ) {
		answerShow();
	}
	if( $('.select_box').length > 0 ) {
		select();
	}
	if( $('.detail__head--info2').length > 0 ) {
		viewPageLike();
	}
	if( $('.layer_category').length > 0 ) {
		interestSelect(1);
	}
});