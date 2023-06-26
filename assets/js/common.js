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
// 마이페이지 알림설정
function mypageNotice() {
	var all = $('#All');
	var choiceOne = $('.choice');
	all.on('click', function(){
		var checked = $(this).prop('checked');
		if($(this).is(':checked')){
			choiceOne.prop('checked', checked);
			choice.prop('checked','');
		} else {
			choiceOne.prop('checked','');
		}
	});
	choiceOne.change(function(){
		var checkedLength = $('input.choice:checked').length;
		var choiceAll = (checkedLength == 3);
		all.prop('checked', choiceAll);
	});
}
// 마이페이지 이미지 팝업
function mypageImagePopup() {
	$(document).on('click', '.mypage__inquire .image button', function(){
		var src = $(this).children('img').attr('src');
		$('.layer_mypage_image img').attr('src', src);
		layerOpen('.layer_mypage_image');
	});
} 
// 관심분야선택 (2개 이상)
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
// 카테고리 선택(1개)
function categorySelect() {
	$(document).on('click', '.interest__choice button', function(){
		$(this).addClass('is-selected');
		$('.interest__choice button').not($(this)).removeClass('is-selected');
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
		var value = $(this).data('value');
		var selectBox = $(this).closest('.select_box');
		var selectInput = selectBox.children('input[type=hidden]');
		var selectBtn = selectBox.children('.select_btn');
		selectInput.val(value).trigger('change');
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
		mypageImagePopup();
	}
	if( $('.select_box').length > 0 ) {
		select();
	}
	if( $('.detail__head--info2').length > 0 ) {
		viewPageLike();
	} 
	if( $('.layer_category').length > 0 ) {
		categorySelect();
	}
	if( $('.layer_slide').length > 0 ){
		popupSlide();
	}
	if( $('.mypage__notice').length > 0 ){
		mypageNotice();
	}
});