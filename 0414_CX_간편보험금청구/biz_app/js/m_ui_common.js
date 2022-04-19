$(function(){
	deviceCheck();
	common.init();
	buttonUI.init();
	tooltip.init();
	formUI.init();
	tabUI();
	Dialog.init();
	index.init();
	$(window).resize();
    $(window).scroll();
});
$(window).on('load',function(){
	common.winLoad();
	accordion();
	stepAccordion();
	tabNavi();
	step.winLoad();
	swipeUI.init();
	formUI.winLoad();
	buttonUI.winLoad();
	$('.motion').scrollAni();
});
$(window).on('resize',function(){
	step.winLoad();
	index.coachMark();
});
//focus form tag
var $focus ='a[href], area[href], input:not([disabled],[readonly]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';
//body scroll lock
var Body = {
	scrollTop :'',
	lock: function(){
		if(!$('html').hasClass('lock')){
			Body.scrollTop = window.pageYOffset;
			$('#wraper').css('top',-(Body.scrollTop));
			$('html').addClass('lock');
		}
	},
	unlock: function(){
		$('html').removeClass('lock');
		$('#wraper').removeAttr('style');
		window.scrollTo(0, Body.scrollTop);
		window.setTimeout(function (){
			Body.scrollTop = '';
		}, 0);
	}
};
//PC 디바이스 체크
var isPC = {
	window: function(){
		return navigator.userAgent.match(/windows/i) == null ? false : true;},
	mac: function(){
		return navigator.userAgent.match(/macintosh/i) == null ? false : true;},
	chrome: function(){
		return navigator.userAgent.match(/chrome/i) == null ? false : true;},
	firefox: function(){
		return navigator.userAgent.match(/firefox/i) == null ? false : true;},
	opera: function(){
		return navigator.userAgent.match(/opera|OPR/i) == null ? false : true;},
	safari: function(){
		return navigator.userAgent.match(/safari/i) == null ? false : true;},
	edge: function(){
		return navigator.userAgent.match(/edge/i) == null ? false : true;},
	msie: function(){
		return navigator.userAgent.match(/rv:11.0|msie/i) == null ? false : true;},
	ie11: function(){
		return navigator.userAgent.match(/rv:11.0/i) == null ? false : true;},
	ie10: function(){
		return navigator.userAgent.match(/msie 10.0/i) == null ? false : true;},
	ie9: function(){
		return navigator.userAgent.match(/msie 9.0/i) == null ? false : true;},
	ie8: function(){
		return navigator.userAgent.match(/msie 8.0/i) == null ? false : true;},
	any: function(){
		return (isPC.window()|| isPC.mac());},
	check: function(){
		if(isPC.any()){
			if(isPC.window())$('html').addClass('window');
			if(isPC.mac())$('html').addClass('mac');
			if(isPC.msie())$('html').addClass('msie');
			if(isPC.ie11())$('html').addClass('ie11');
			if(isPC.ie10())$('html').addClass('ie10');
			if(isPC.ie9())$('html').addClass('ie9');
			if(isPC.ie8())$('html').addClass('ie8');
			if(isPC.edge()){
				$('html').addClass('edge');
			}else if(isPC.opera()){
				$('html').addClass('opera');
			}else if(isPC.chrome()){
				$('html').addClass('chrome');
			}else if(isPC.safari()){
				$('html').addClass('safari');
			}else if(isPC.firefox()){
				$('html').addClass('firefox');
			}
		}
	}
};
//모바일 디바이스 체크
var isMobile = {
	Android: function(){
		return navigator.userAgent.match(/Android/i) == null ? false : true;
	},
	BlackBerry: function(){
		return navigator.userAgent.match(/BlackBerry/i) == null ? false : true;
	},
	iOS: function(){
		return navigator.userAgent.match(/iPhone|iPad|iPod/i) == null ? false : true;
	},
	iPhone :function(){
		return navigator.userAgent.match(/iPhone/i) == null ? false : true;
	},
	iPad :function(){
		return navigator.userAgent.match(/iPad/i) == null ? false : true;
	},
	iPhoneVersion :function(){
		var $sliceStart = navigator.userAgent.indexOf('iPhone OS') + 10,
			$sliceEnd = $sliceStart + 2,
			$version = parseFloat(navigator.userAgent.slice($sliceStart,$sliceEnd));
		return $version;
	},
	Opera: function(){
		return navigator.userAgent.match(/Opera Mini/i) == null ? false : true;
	},
	Windows: function(){
		return navigator.userAgent.match(/IEMobile/i) == null ? false : true;
	},
	tablet: function(){
		if(isMobile.any()){
			if(window.screen.width < window.screen.height){
				return window.screen.width > 760 ? true : false;
			}else{
				return window.screen.height > 760 ? true : false;
			}
		}
	},
	any: function(){
		return (isMobile.Android() || isMobile.iOS() || isMobile.BlackBerry() || isMobile.Opera() || isMobile.Windows());
	},
	check: function(){
		if(isMobile.tablet()){
			$('html').addClass('tablet');
		}else{
			$('html').addClass('mobile');
		}
		if(isMobile.iOS())$('html').addClass('ios');
		if(isMobile.Android())$('html').addClass('android');
		//if(isMobile.iPhoneVersion() == 12)$('html').addClass('ios12');
	}
};

//앱인지 체크: isAppChk(),isAppChk('ios'),isAppChk('android')
var isAppChk = function(os){
	if(typeof _isDevice != 'undefined'){
		if(_isDevice == 'A'){
			switch(os){
				case 'ios':
					if(isMobile.iOS()){
						return true;
					}else{
						return false;
					}
					break;
				case 'android':
					if(isMobile.Android()){
						return true;
					}else{
						return false;
					}
					break;
				default:
					if(os == undefined){
						return true;
					}else{
						console.log('isAppChk 함수 os 오류');
						return false;
					}
					break;
			}
		}else{
			return false;
		}
	}else{
		return false;
	}
}

var isNotch = false;
//디바이스체크 실행
var deviceCheck = function(){
	isMobile.check();
	isPC.check();
	if(isMobile.any()){
		var $pixelRatio = window.devicePixelRatio;
		if(!!$pixelRatio) $('html').addClass('pixel_ratio_'+$pixelRatio);
	}

	//아이폰X (스크린:375*812, 윈도우: 375*735)
	//아이폰8+ (스크린:414*736, 윈도우: 414*622)
	//아이폰8 (스크린:375*667, 윈도우: 375*554)
	var $iPhone8PlusH = 736,	//아이폰8+ 높이값 736(보다 크면 아이폰X 시리즈로 처리)
		$screenH = window.screen.height,
		$screenW = window.screen.width,
		//$default = 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no';
		$default = $('meta[name=viewport]').attr('content');
	
	var isIPhoneX = function(e){
		$('html').addClass('iPhoneX');
		$('meta[name=viewport]').attr('content',$default+',viewport-fit=cover');
	};
	var notIPhoneX = function(e){
		$('html').removeClass('iPhoneX');
		if(isMobile.Android()){
			$('meta[name=viewport]').attr('content',$default+',target-densitydpi=medium-dpi');
		}else{
			$('meta[name=viewport]').attr('content',$default);
		}
	};

	//아이폰X체크
	if(isMobile.iPhone() && $screenH > $iPhone8PlusH){
		//첫로딩
		if($(window).width() < $(window).height()){
			isNotch = true;
			isIPhoneX();
		}else{
			isNotch = false;
			notIPhoneX();
		}

		//가로, 세로 회전시
		$(window).on('orientationchange',function(){
			if(window.orientation == 0){
				isNotch = true;
				isIPhoneX();
			}else{
				isNotch = false;
				notIPhoneX();
			}
		});
	}
};

var sidebarAnimation = false;
var index = {
	quickMenu:function(){
		var _qsHeight = $('.quick_summary ul').height(),
			$qGuide = $('.quick_menu_guide');
		$('.quick_summary').css('height', _qsHeight);
		$(document).on('click','.btn_quick_open',function(e){
			e.preventDefault();
			var $this = $(this), 
				$closest = $this.closest('.index_quick_menu'),
				_add = 20;
			$closest.find('.quick_summary').css('height', 0).addClass('hide');
			$closest.find('.quick_menu_list').css('height', $closest.find('.quick_menu_list .inner').height()).addClass('active');
			if(isNotch)_add = 64;
			$('html,body').animate({'scrollTop':$('.index_quick_menu').offset().top-_add},400);
		});
		$(document).on('click','.btn_quick_close',function(e){
			e.preventDefault();
			var $this = $(this), 
				$closest = $this.closest('.index_quick_menu'),
				_add = 20;
			$closest.find('.quick_menu_list').css('height', 0).removeClass('active');
			//$closest.find('.quick_summary').show();
			$closest.find('.quick_summary').css('height', _qsHeight).removeClass('hide');
			if(isNotch)_add = 64;
			$('html,body').animate({'scrollTop':$('.index_quick_menu').offset().top-_add},400);
		});
		$(document).on('click','.btn_quick_toggle',function(e){
			e.preventDefault();
			var $this = $(this), 
				$closest = $this.closest('.index_quick_menu'),
				_add = 20;
			if($closest.hasClass('open')){
				changeTxt($(this),'닫기','열기');
				$closest.find('.quick_menu_list').css('height', 0).removeClass('active');
				$closest.find('.quick_summary').show();
				$closest.find('.quick_summary').css('height', _qsHeight);
			} else {
				changeTxt($(this),'열기','닫기');
				$closest.find('.quick_menu_list').show();
				$closest.find('.quick_summary').hide();
				$closest.find('.quick_menu_list').css('height', $closest.find('.quick_menu_list .inner').height()).addClass('active');
			}
			$closest.toggleClass('open');
			if(isNotch)_add = 60;
			$('html,body').animate({'scrollTop':$('.index_quick_menu').offset().top-_add},400);
		});
		$(document).on('click','.common_top_banner .btn_close',function(e){
			e.preventDefault();
			var $banner = $(this).closest('.common_top_banner');
			$banner.slideUp(300);
			setTimeout(function(){
				$banner.remove();
			},300);
		});
	},
	coachMark:function(){
		var $banner = $('.common_top_banner'), _bannerH = 0, $coachMarkContent = $('.coach_mark_content');
		if($banner.length)_bannerH = $banner.height();
		$coachMarkContent.css('margin-top', _bannerH+50)
	},
	init:function(){
		index.quickMenu();
		index.coachMark();
	}
}
var largeTxt = false;
if($('html').hasClass('zoom1')) largeTxt = true;
var common = {
	isApp:function(){
	//앱일때만 'html'에 isApp 클래스추가
	//_isDevice: A-앱,W-웹 (header.jsp 확인)
		if(typeof _isDevice != 'undefined'){
			if(_isDevice == 'A')$('html').addClass('isApp');
		}else{
			console.log('_isDevice 없음')
		}
	},
	winLoad:function(){
		//hr태그 토크백 제외
		$('hr').each(function(){
			$(this).attr('aria-hidden',true);
		});
		//페이지타이틀이 없는 화면일 경우
		if($('#header h1').length){
			var titHtml = $('#header h1').html();
			if(titHtml == ''){
				var $home = $('.btn_gnb_home'),
					$href = '/';
				if($home.length)$href = $home.attr('href');
				$('#header h1').addClass('logo center').html('<a href="'+$href+'">한화손해보험</a>');
				if($('#content .cont_logo').length)$('#content .cont_logo').remove();
			}
		}
		//버튼없는 헤더 쓸때
		if($('.fake_header').length && $('#header').length){
			$('#header').addClass("no_btn");
			$('.fake_header').remove();
		}
		// view 영역사이즈 
		if(originalPotion === false) originalPotion = $(window).width() + $(window).height();
		// As-Is 하단고정 버튼 체크
		if($('.btn_area4').length) $('.container_inner').addClass('fixed_btn');
	},
	gnbSubOpenTxt:'하위메뉴 펼치기',
	gnbSubCloseTxt:'하위메뉴 접기',
    gnbSection: '#gnb',
	gnbBgClass:'.gnb_bg',
	gnbBg:'<div class="gnb_bg" aria-hidden="true"></div>',
	gnbOutCont:'#header,#container,#floatingNavi,footer',
	gnb:function(){
		$(common.gnbSection).attr('aria-hidden',true);
		$(document).on('click','.btn_gnb',function(e){
			e.preventDefault();
			if($(common.gnbSection).hasClass('show')){
				common.gnbClose();
			}else{
				common.gnbOpen();
			}
		});
		$(document).on('click','.btn_gnb_close',function(e){
			e.preventDefault();
			common.gnbClose();
		});
	},
	gnbOpen:function(){
		if(largeTxt){ 
			$('html').removeClass('zoom1');
			dep1Swipe.update();
			dep2Swipe.update();
		}
		Body.lock();
		$(common.gnbSection).attr({'tabindex':0,'aria-hidden':false}).addClass('show').focus();
		$(common.gnbOutCont).attr('aria-hidden',true).addClass('show');
		$(common.gnbSection).before(common.gnbBg);
		$(common.gnbBgClass).addClass('show');
		Dialog.focusMove(common.gnbSection);
		changeTxt('.btn_gnb span','열기','닫기');
		var _currentNum = $('.dep2_swipe a.active').closest('.swiper-slide').index(), dep2Slide = $('.dep2_swipe .swiper-slide'),$swipeGuide = $('.swipe_guide');
		if($('.dep2_swipe a.active').length){
			dep2Swipe.slideTo(_currentNum);
			dep2Slide.each(function(){
				var $current = $(this).find('a.active');
				if($current.length){
					$(this).animate({'scrollTop':$current.position().top},400);
				}
			});
		}
		//모바일 접근성보완: 모바일일때 마지막에 닫기 버튼 추가
		var $lastCloseBtn = '<a href="#" class="btn_gnb_close last_focus"><i class="offscreen">전체메뉴 닫기</i></a>';
		if(isMobile.any() && !$(common.gnbSection).find('.btn_gnb_close.last_focus').length)$(common.gnbSection).append($lastCloseBtn);
		//메뉴 스와이프 가이드
		$(document).on('click touchend','.dep2_swipe',function(){
			$swipeGuide.fadeOut();
		});
		setTimeout(function(){
			$swipeGuide.fadeOut();
		},2000);
	},
	gnbClose:function(){
		if(largeTxt) $('html').addClass('zoom1');
		Body.unlock();
		$('.btn_gnb').focus();
		$(common.gnbSection).attr('aria-hidden',true).removeClass('show').removeAttr('tabindex style');
		$(common.gnbOutCont).removeAttr('aria-hidden').removeClass('show');
		$(common.gnbBgClass).removeClass('show');
		changeTxt('.btn_gnb span','닫기','열기');
		setTimeout(function(){
			$(common.gnbBgClass).remove();
			if($(common.gnbSection).find('.btn_gnb_close.last_focus').length)$(common.gnbSection).find('.btn_gnb_close.last_focus').remove();
			$('.dep2_swipe .swiper-slide').animate({'scrollTop':0},0);
		},410);
	},
	fixed:function(target){
	//고정(sticky)
		var $target = $(target),
			isHeader = false;
		if($target.attr('id') == 'header')isHeader = true;
		$(window).on('scroll',function(){
			var $scrollTop = $(this).scrollTop();
			$target.each(function(){
				if($(this).hasClass('no_fixed') || $(this).closest('.dialog').length) return;
				var $top = $(this).offset().top;
				if($scrollTop >= $top){
					if(!$(this).hasClass('sticky')){
						$(this).addClass('sticky');
					}
				}else{
					$(this).removeClass('sticky');
				}
			})
		});
	},
	btmFixed:function(target, std){
	//하단고정(sticky)
		var $target = $(target), $std = $(std);
		if($target.length){
			$(window).on('scroll',function(){
				var $scrollTop = $(this).scrollTop()+$(window).height()-$std.height(),
					$top = $std.offset().top;
				if($scrollTop < $top){
					if(!$target.hasClass('sticky')){
						$target.addClass('sticky')
					}
				}else{
					$target.removeClass('sticky');
				}
			});
		}
	},
	layout:function(){
		var _windowH = $(window).height(), _headerH = $('#header').height(), _bannerH = $('.guide_banner_btm').height(), _btmBtnH = $('.fixed_bottom_button').height(), _accordionH = $('.fixed_bottom_button').height();
		$(document).on('click','.btn_zoom.switch',function(){
			$(this).toggleClass('active');
		});
	},
	init:function(){
		common.gnb();
		common.layout();
		common.fixed('#header');
		if($('.tab_swipe_wrap').length){
			$('.tab_swipe_wrap').each(function(){
				if(!$(this).closest('.dialog').length)common.fixed(this);
			})
		}
	}
};

//입력요소 관련
var isPopAllAgree = false;
var formUI = {
	winLoad:function(){
		//product: checkbox
		$('.product_item>.checkbox>input').each(function(){
			if($(this).prop('checked'))$(this).parent().addClass('checked');
		});

		//이메일 입력영역
		$('.email_form').each(function(){
			var $this = $(this),
				$inp = $this.find('.i_txt'),
				$inpVal = $inp.val(),
				$sel = $this.find('select'),
				$selVal = $sel.val();
			if($inpVal != '' && ($selVal == '' || $selVal == 0 || $selVal == 'etc')){
				$this.emailFormEdit();
			}
		});
	},
	input:function(){
		//form 안에 input이 1개일때 엔터시 새로고침 현상방지
		$(document).on('keydown','form input',function(e){
			var $keyCode = (e.keyCode?e.keyCode:e.which),
				$form = $(this).closest('form'),
				$length = $form.find('input').not('[type=checkbox],[type=radio]').length;

			if($length == 1 && !$(this).closest('.search_box').length){ //.search_box 검색창은 예외
				if($keyCode==13)return false;
			}
		});
		$(document).on('focusin','input.i_txt, select, textarea',function(){
			if(!$(this).attr('readonly'))$(this).closest('.dv').addClass('focus');
		}).on('blur','input.i_txt, select, textarea',function(){
			$(this).closest('.dv').removeClass('focus');
		});
		//콤마입력창 
		$(document).on('keyup','.price input.i_txt',function(e){
			updateTextView($(this));
		});
		//키패드 이동 버튼
		$(document).on('keyup','.i_txt',function(e){
			if(e.keyCode === 13){
				var $focusForm ='input:not([disabled],[readonly],.hasDatepicker), select:not([disabled]), textarea:not([disabled]), button.ui-datepicker-trigger',
					$focus = $($focusForm),
					index = $focus.index(this),
					$next = $focus.eq(index + 1);
				if($next.length == 0){
					$(this).focusout();
				} else {
					$next.focus();
					if($next.hasClass('ui-datepicker-trigger')) {
						$next.click();
					}
					if($next.has('select')) {
						var element = $next[0], worked = false;
						var e = document.createEvent("MouseEvents");
						e.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
						worked = element.dispatchEvent(e);
					}
				}
			}
		});
		//PIN 번호
		$('.pin_num').each(function(){
			if($(this).length)$(this).append('<span class="num"><i></i><i></i><i></i><i></i><i></i><i></i></span>');
		});
		$(document).on('keyup','.pin_num > input', function(){
			var i = $(this).val().length,
				$pin = $(this).closest('.pin_num');
			$pin.removeAttr('data-pin').attr('data-pin',i);
			if(i<6)$pin.find('.num').removeClass('invalid');
		});
	},
	checkbox:function(){
		$(document).on('change','.label_form input[type="checkbox"]',function(){
			var $this = $(this);
			if($this.prop('checked') && !$this.next('label').find('.chk_ico').length){
				$this.next('label').addClass('checked');
				$this.next('label').prepend('<i class="chk_ico"><svg width="12px" height="8px" viewBox="0 0 12 8" xmlns="http://www.w3.org/2000/svg"><polyline style="fill:none;stroke:#fff;stroke-width:2" points="0.5,2.5 4.5,6.5 11.5,0.5" stroke-dasharray="21" stroke-dashoffset="0"><animate attributeName="stroke-dashoffset" values="21;0" dur="0.6s" repeatCount="0" /></polyline></svg></i>');
			} else {
				$this.next('label').removeClass('checked');
				$this.next('label').find('.chk_ico').remove();
			}
		});
		$(document).on('change','.checkbox>input',function(){
			var $this = $(this);
			if($this.prop('checked') && !$this.closest('.checkbox').find('.chk_ico').length){
				$this.closest('.checkbox').addClass('checked');
				$this.closest('.checkbox').prepend('<i class="chk_ico"><svg width="12px" height="8px" viewBox="0 0 12 8" xmlns="http://www.w3.org/2000/svg"><polyline style="fill:none;stroke:#fff;stroke-width:2" points="0.5,2.5 4.5,6.5 11.5,0.5" stroke-dasharray="21" stroke-dashoffset="0"><animate attributeName="stroke-dashoffset" values="21;0" dur="0.6s" repeatCount="0" /></polyline></svg></i>');
			} else {
				$this.closest('.checkbox').removeClass('checked');
				$this.closest('.checkbox').find('.chk_ico').remove();
			}
		});
		//checkbox toggle
		$(document).on('change','.js_toggle input',function(e){
			var $this = $(this), $target = $this.data('target');
			if(!$this.closest('.toggle_is').length){
				($this.prop('checked'))?$($target).slideDown():$($target).slideUp();
			} else {
				$('.toggle_is').slideUp();
				$('.toggle_as').show(300);
				$($target).find('.chk').text($this.next('label').text());
			}
		});
		$(document).on('click','button.toggle_as',function(e){
			$('.toggle_is').slideDown();
			$('.toggle_as').hide();
		});
		//checkbox my toggle
		$(document).on('click','.my_toggle li>label',function(e){
			var $this = $(this);
			$this.closest('li').addClass('active').siblings('li').slideToggle().removeClass('active');
			$('.toggle_is, .toggle_as').slideToggle();
		});
		//.product_item checkbox
		$(document).on('change','.product_item>.checkbox>input',function(){
			var $type = $(this).attr('type'),
				$closest = $(this).closest('.checkbox');
			if($type == 'checkbox'){
				if($(this).prop('checked')){
					$(this).parent().addClass('checked');
					$closest.find('.chk_btn>input').prop('checked',true);
					$closest.find('.rdo_swipe .bar').removeClass('off');
					$closest.find('.rdo_swipe .btn_radio li').eq(0).find('input').prop('checked',true);
					var $panel = $closest.find('.rdo_swipe .btn_radio li').eq(0).find('input').attr('data-target');
					formUI.rdoSwipe();
					$($panel).addClass('active');
				}else{
					$(this).parent().removeClass('checked');
					$closest.find('.chk_btn>input').prop('checked',false);
					$closest.find('.rdo_swipe .bar').addClass('off');
					$closest.find('.rdo_swipe .btn_radio li, .tab_rdo_panel').removeClass('active');
					$closest.find('.rdo_swipe .btn_radio li input').prop('checked',false);
				}
			}else if($type == 'radio'){
				if($(this).prop('checked')){
					$(this).parent().addClass('checked').closest('.product_item').siblings('.product_item').children('.checkbox').removeClass('checked');
				}
			}
		});
		$(document).on('change','.chk_btn>input',function(){
			var $this = $(this),
				$pChk = $this.closest('.product_item').find('>.checkbox>input'),
				$btnChk = $this.closest('.product_item').find('.chk_btn>input'),
				_chkNum = $this.closest('.chk_date').find('.chk_btn>input:checked').length;
			if(_chkNum == 0) {
				$pChk.prop('checked',false);
				$this.closest('.checkbox').removeClass('checked');
				$this.closest('.checkbox').find('.chk_ico').remove();
			} else if($this.closest('.chk_btn').index() == 0 && $this.prop('checked',true)) {
				$pChk.prop('checked',false);
				$this.closest('.checkbox').removeClass('checked');
				$this.closest('.checkbox').find('.chk_ico').remove();
				$btnChk.prop('checked',false);
			} else {
				$pChk.prop('checked',true);
			}
		});
		$(document).on('change','.user_info_list>.product_item>.checkbox>input',function(){
			var $type2 = $(this).attr('type');
			if($type2 == 'checkbox'){
				if($(this).prop('checked')){
					$(this).parent().addClass('checked');
					$(this).parents('.product_item').removeClass('unchecked');
				}else{
					$(this).parent().removeClass('checked');
					$(this).parents('.product_item').addClass('unchecked');
				}
			}
		});
	},
	rdoSwipe:function(){
		$('.rdo_swipe input').each(function(){
			var $this = $(this),
				$rdoSwipe = $this.closest('.rdo_swipe'),
				rdoNum = $this.closest('ul').find('li').length;
			$(window).resize(function(){
				if($this.prop('checked')){
					$this.closest('li').addClass('active').siblings('li').removeClass('active');
					var $bar = $this.closest('.rdo_swipe').find('.bar'),
						_w = $this.closest('ul').width(),
						_x = $this.closest('li').position().left;
					$bar.css({'width':_w/rdoNum,'left':_x,'opacity':1,'transform':'scale(1)'});
				}
			});
			$(window).resize();
		});
		$(document).on('change','.rdo_swipe input[type=radio]',function(e){
			var $this = $(this),
				rdoNum = $this.closest('ul').find('li').length,
				$bar = $this.closest('.rdo_swipe').find('.bar');
			$bar.removeClass('off');
			$this.closest('li').addClass('active').siblings('li').removeClass('active');
			if($this.closest('.product_item').length)$this.closest('.product_item').find('>.checkbox>input').prop('checked',true);
			var _w = $this.closest('ul').width(),
				_x = $this.closest('li').position().left;
			$bar.css({'width':_w/rdoNum,'left':_x,'opacity':1,'transform':'scale(1)'});
		});
	},
	textarea:function(){
		//textarea
		$(document).on('focusin','textarea',function(){
			$(this).closest('.textarea').addClass('hover');
		}).on('focusout','textarea',function(){
			$(this).closest('.textarea').removeClass('hover');
		});
	},
	invalid:function(targetID, message){
		$('span.dv').removeClass('invalid');
		var $invalidHtml = '<div id="invalid'+targetID+'" class="dialog modal alert">';
				$invalidHtml += '<div class="dialog_wrap">';
					$invalidHtml += '<div class="dialog_content">';
						$invalidHtml += '<div class="section">';
							$invalidHtml += '<div class="message">';
								$invalidHtml += '<div>'+message+'</div>';
							$invalidHtml += '</div>';
						$invalidHtml += '</div>';
					$invalidHtml += '</div>';
				$invalidHtml += '<div class="dialog_btn btn_flex">';
					$invalidHtml += '<div><a href="#" class="btn ui_dialog_close">확인</a></div>';
				$invalidHtml += '</div>';
			$invalidHtml += '</div>';
		$invalidHtml += '</div>';
		$('body').append($invalidHtml);
		Dialog.open('#invalid'+targetID,function(){
			$('#invalid'+targetID).find('.message > div').html(message);
		});
		$('#invalid'+targetID).find('.dialog_btn>div>a').attr('id','btn'+targetID);
		$(document).on('click','#btn'+targetID,function(){
			(!$('#'+targetID).parent('.form_date').length)?$('#'+targetID).focus():$('#'+targetID).next('button').focus();
			toggleScroll($('#'+targetID).closest('.form_item'));//스크롤이동
			$('#'+targetID).closest('span.dv').addClass('invalid');
		});
	},
	invalidDel:function(){
		//invalid 클래스 삭제
		$(document).on('propertychange change keyup paste input','.form_item .i_txt',function(){
			var $parents = $(this).closest('.invalid');
			if($parents.length){
				$parents.removeClass('invalid');
			}
		});
		$(document).on('change','.form_item select.sel',function(){
			var $parents = $(this).closest('.invalid');
			if($parents.length){
				$parents.removeClass('invalid');
			}
		});
	},
	delBtn:function(){
		//input 삭제버튼
		$(document).on('keyup focus','input.i_txt',function(){
			var $this = $(this), $val = $this.val();
			if($this.prop('readonly') || $this.prop('disabled') || $this.hasClass('no_del') || $this.hasClass('i_datepicker')){
				return false;
			}
			if($val != ''){
				if(!$this.next('.inp_del').length && !$this.next('.datepicker').length){
					$this.after('<a href="#" class="inp_del"><span class="offscreen">입력내용삭제</span></a>');
				}
				if($this.next('.inp_del').length)setTimeout(function(){$this.closest('.dv').addClass('on')},5);
			}else{
				if($this.next('.inp_del').length){
					$this.closest('.dv').removeClass('on');
					setTimeout(function(){$this.closest('.dv').find('.inp_del').remove()},400);
				}
			}
		}).on('focusout','.i_txt',function(){
			var $this = $(this);
			if($this.next('.inp_del').length){
				$this.closest('.dv').removeClass('on');
				setTimeout(function(){$this.closest('.dv').find('.inp_del').remove()},400);
			}
		});

		$(document).on('click','.inp_del',function(e){
			e.preventDefault();
			var $this = $(this), $inp = $this.prev('.i_txt');
			$this.closest('.dv').removeClass('on');
			setTimeout(function(){$this.closest('.dv').find('.inp_del').remove()},400);
			$inp.val('').change().focus();
		});
	},
	range:function(){
		if($('.range_slider').length){
			$('.range_slider').each(function(){
				var $slider = $(this).find('.slider'),
					$list = $(this).find('.list'),
					$inp = $(this).find('input[type=hidden]'),
					$unit = $list.data('unit'),
					$title= $list.attr('title'),
					//$sel = $(this).find('.i_val'),
					$min = parseInt($slider.data('min')),
					$max = parseInt($slider.data('max')),
					$val = parseInt($slider.data('value')),
					$step = parseInt($slider.data('step'));

				if(!$min)$min = 0;
				if(!$max)$max = 5;
				if(!$step)$step = 1;
				if(!$val)$val = $min;

				if($list.length){
					$list.empty();
					if(!!$title)$list.removeAttr('title').append('<strong class="offscreen">'+$title+'</strong>');
					$list.append('<ul></ul>');
					for(var i = $min;i <= ($max/$step);i++){
						$list.find('ul').append('<li><a href="#">'+i*$step+'<span class="offscreen">'+$unit+'</span></a></li>');
						//$sel.append('<option value="'+i*$step+'">'+i*$step+'</option>');
					}
				}

				if($inp.length)$inp.val($val);
				var range = $slider.slider({
					min:$min,
					max:$max,
					value:$val,
					step:$step,
					range:'min',
					create:function(e){
						$slider.find('.ui-slider-handle').attr({'tabindex':-1}).html('<span class="offscreen">선택한 값은</span><i>'+$val+'</i><span class="offscreen">'+$unit+'입니다.</span>');
						//$sel.val($val).change();
						$list.find('li').eq($val/$step).addClass('on').find('a').attr('title','현재선택');
					},
					stop:function(event,ui){
						$(ui.handle).find('i').html(ui.value);
						//$sel.val(ui.value).change();
						if($inp.length)$inp.val(ui.value).change();
						$slider.data('value',ui.value);
						$list.find('li').eq(ui.value/$step).siblings().removeClass('on').removeAttr('title');
						$list.find('li').eq(ui.value/$step).addClass('on').find('a').attr('title','현재선택');
					}
				});

				$list.find('a').click(function(e){
					e.preventDefault();
					var $txt = parseInt($(this).text());
					range.slider('value',$txt);
					$slider.find('.ui-slider-handle i').text($txt);
					if($inp.length)$inp.val($txt).change();
					//$sel.val($txt).change();
					$(this).parent().addClass('on').attr('title','현재선택').siblings().removeClass('on').removeAttr('title');
				});

			});
		}
	},
	emailFormEdit:function(target, val){
		var $this = target;
		if(val ==  false){
			$this.find('.email_inp').hide();
			$this.find('.email_sel').show();
		}else{
			$this.find('.email_sel').hide();
			$this.find('.email_inp').show();
		}		
	},	
	etc:function(){
		//계좌 직접 입력
		$(document).on('click','.form_item .bank_wrap .btn_inp_change',function(){
			var $closest = $(this).closest('.bank_wrap'),
				$lbl = $closest.closest('.form_item').children('label'),
				$selectId = $closest.siblings('.bank_wrap').find('select').attr('id');

			$closest.hide().siblings('.bank_wrap').show().find($focus).first().focus();
			$lbl.attr('for',$selectId);
		});

		//이메일 직접 입력
		$(document).on('change', '.email_form .email_sel select', function(){
			var $closest = $(this).closest('.email_form'),
				$inp = $closest.find('.email_inp .i_txt');
			if($(this).find(':selected').text() == '직접입력'){
				formUI.emailFormEdit($closest, true);
				$inp.val('').focus();
			}else{
				formUI.emailFormEdit($closest, false);
			}
		});
		$(document).on('click', '.email_form .email_inp .btn_sel', function(){
			var $closest = $(this).closest('.email_form'),
				$emlSel = $closest.find('.email_sel select');
			formUI.emailFormEdit($closest, false);
			$emlSel.find('option').eq(0).prop('selected',true);
			$emlSel.change().focus();
		});
		$(document).on('keyup', '.email_form .email_inp .i_txt', function(e){
			var $keyCode = (e.keyCode?e.keyCode:e.which),
				$closest = $(this).closest('.email_form'),
				$emlSel = $closest.find('.email_sel select'),
				$val = $(this).val();
			if($keyCode == 38 || ($keyCode == 37 && $val == '')){
				$emlSel.find(':selected').prev().prop('selected',true);
				formUI.emailFormEdit($closest, false);
			}
		});

		//버튼 스위치
		var $swichBtn = $('.btn_switch input');
		$swichBtn.each(function(){
			var $txt = $(this).next('label').find('.offscreen').text();
			if($(this).prop('checked')){
				$txt = $txt.replace('해제','등록');
				$(this).next('label').find('.offscreen').text($txt);
			}else{
				$txt = $txt.replace('등록','해제');
				$(this).next('label').find('.offscreen').text($txt);
			}
		});
		$swichBtn.on('change',function(){
			var $txt = $(this).next('label').find('.offscreen').text();
			if($(this).prop('checked')){
				$txt = $txt.replace('해제','등록');
				$(this).next('label').find('.offscreen').text($txt);
			}else{
				$txt = $txt.replace('등록','해제');
				$(this).next('label').find('.offscreen').text($txt);
			}
		});
	},
	sortTable:function(elements){
		var isArea;
		$(elements).find('.item').on('click', function() {
			$(this).toggleClass('selected');
		});
		$(elements).sortable({
			//placeholder:"ui_state",
			connectWith:".sort_table",
			cancel:".no_data",
			revert: true,
			delay: 150,
			classes:{"ui-sortable":"focus"},
			helper: function (e, item) {
				if(!item.hasClass('selected'))item.addClass('selected');
				var el = $('.selected').not('.ui-sortable-placeholder').clone();
				var helper = $('<ul/>');
				item.siblings('.selected').addClass('hidden');
				return helper.append(el);
			},
			start: function (e, ui) {
				ui.item.toggleClass('active');
				isArea = ui.item.closest('.sort_table');
				var el = ui.item.siblings('.selected.hidden').not('.ui-sortable-placeholder');
            	ui.item.data('items', el);
			},
			receive: function (e, ui) {
				ui.item.before(ui.item.data('items'));
			},
			stop: function (e, ui) {
				ui.item.toggleClass('active');
				if(ui.item.siblings('.no_data').length)ui.item.siblings('.no_data').remove();
				if(!isArea.find('li').length)isArea.append('<li class="no_data">첨부된 서류가 없습니다.</li>');
				ui.item.siblings('.selected').removeClass('hidden');
            	$('.selected').removeClass('selected');
				ui.item.closest('.attach_img').removeClass('focus');
			}
		});
		$(elements).disableSelection();
		$(elements).droppable({
			over: function (e, ui) {
				$('.attach_img').removeClass('focus');
				$(this).closest('.attach_img').addClass('focus');
			}
		});
	},
	init:function(){
		agreeItemUI();
		formUI.input();
		formUI.checkbox();
		formUI.rdoSwipe();
		formUI.textarea();
		formUI.invalidDel();
		formUI.delBtn();
		formUI.range();
		formUI.etc();
	}
}
$.fn.emailFormEdit = function(val){
	var $this = $(this);
	if(val ==  false){
		$this.find('.email_inp').hide();
		$this.find('.email_sel').show();
	}else{
		$this.find('.email_sel').hide();
		$this.find('.email_inp').show();
	}
};

//1뎁스 탭 swipe
var $tabNavis = [];
var tabNavi = function(){
	$('.tab_track').each(function(i){
		var $navi = $(this),
			$widthSum = 0,
			$class = 'ui-tabnavi-'+i;

		$navi.find('.tab').each(function(){
			$widthSum = $widthSum + $(this).outerWidth();
		});

		$navi.addClass($class);
		var $tabNavi = new Swiper('.'+$class,{
			slidesPerView: 'auto',
			wrapperClass:'tab_swiper',
			slideClass:'tab',
			resizeReInit:true,
			on: {
				touchMove:function(){
					if($isCenter == true){
						$tabNavi.params.centeredSlides = false;
						$tabNavi.update();
					}
				}
			}
		});

		var $isCenter = false;
		var activeMove = function(idx,speed){
			var $windowCenter = $(window).width()/2,
				$activeTab = $navi.find('.tab').eq(idx),
				$tabLeft = $activeTab.position().left,
				$tabWidth = $activeTab.outerWidth(),
				$tabCenter = $tabLeft + ($tabWidth/2);
			if(speed == undefined)speed=300;
			if($windowCenter < $tabCenter && $tabCenter < ($widthSum-$windowCenter)){
				$tabNavi.params.centeredSlides = true;
				$isCenter = true;
				$tabNavi.update();
			}else{
				$tabNavi.params.centeredSlides = false;
				$isCenter = false;
				$tabNavi.update();
			}
			if($windowCenter < $tabCenter){
				$tabNavi.slideTo(idx,speed);
			}else{
				$tabNavi.slideTo(0,speed);
			}

		}

		var $activeCheckNum = 0;
		var $activeCheck = setInterval(function(e){
			$activeCheckNum++;
			var $active = $navi.find('.tab.active'),
				$activeIdx = $active.index();
			if($activeIdx >= 0){
				activeMove($activeIdx,0);
				clearInterval($activeCheck);
			}
			if($activeCheckNum >= 20)clearInterval($activeCheck);
		},100);

		$tabNavis.push($tabNavi);

		$(window).resize(function(){
			var $parenW = $navi.parent().width();
			if($parenW > $widthSum){
				$navi.find('.tab_nav').addClass('center');
				$tabNavi.params.followFinger = false;
				$tabNavi.update();
			}else{
				$navi.find('.tab_nav').removeClass('center');
				$tabNavi.params.followFinger = true;
				$tabNavi.update();
			}
		});

		$navi.on('click','a',function(e){
			var $jstab = $(this).closest('.js_tab'), $syncTab = $(this).closest('.sync_tab');
			if($jstab.length || $syncTab.length){
				e.preventDefault();
				var $liIdx = Math.max($(this).closest('li').index());
				activeMove($liIdx)
			}
		});
	});
}

//툴팁
var tooltip = {
	position:function(tar){
		var $tar = $(tar),
			$btn = $tar.closest('.tooltip_layer').find('.tooltip_btn');
		if(!$tar.children('.arr').length)$tar.prepend('<i class="arr" aria-hidden="true"></i>');
		if(!$tar.children('.tooltip_close').length)$tar.append('<a href="#" class="tooltip_close"><span class="offscreen">툴팁닫기</span></a>');
		$(window).resize(function(){
			var $btnX	= $btn.offset().left,
				$btnW	= $btn.width(),
				$winW	= $(window).width(),
				$scrollEnd	= $(window).height()+$(window).scrollTop();
			$tar.children('.arr').css({
				'left': $btnX-20+($btnW/2)
			});
			$tar.css({
				'width': $winW-40,
				'left': -($btnX-20)
			});
			var $tarH = $tar.outerHeight(),
				$tarY = $tar.closest('.tooltip_layer').offset().top + parseInt($tar.css('margin-top'));
			if($scrollEnd < ($tarH+$tarY)){
				$tar.addClass('bottom');
			}else{
				$tar.removeClass('bottom');
			}
		});
	},
	init:function(){
		//열기
		$(document).on('click','.tooltip_btn',function(e){
			e.preventDefault();
			var $cont = $(this).closest('.tooltip_layer').find('.tooltip_txt');
			$('.tooltip_txt').fadeOut();
			tooltip.position($cont);
			$(window).resize();
			$('.tooltip_btn').removeClass('on');
			$(this).addClass('on');
			$cont.stop(true,false).fadeIn();
		});
		//닫기
		$(document).on('click','.tooltip_close',function(e){
			e.preventDefault();
			var $cont = $(this).closest('.tooltip_txt');
			$cont.stop(true,false).fadeOut();
			$(this).closest('.tooltip_layer').find('.tooltip_btn').removeClass('on');
		});
		$(document).on('click touchend',function(e){
			$('.tooltip_txt').stop(true,false).fadeOut();
			$('.tooltip_btn').removeClass('on');
		}).on('click','.tooltip_layer',function(e){
			e.stopPropagation();
		});

		$('.tooltip_layer').each(function(e){
			var $btn = $(this).find('.tooltip_btn'),
				$cont = $(this).find('.tooltip_txt'),
				$contId = $cont.attr('id'),
				$closeBtn = $(this).find('.tooltip_close');
			if(!$contId)$contId = 'tt_cont_'+e;
			$btn.attr({
				'role':'button',
				'aria-describedby':$contId
			});
			$cont.attr({
				'id':$contId,
				'role':'tooltip'
			});
			$closeBtn.attr('role','button');
		});
	}
};

//탭메뉴 기능
var tabUI = function(){
	var $tab = $('.js_tab'),
		$onText = '현재선택';

	if($('html').attr('lang') == 'en')$onText = 'Activation Menu';
	
	$(document).on('click','.js_tab a',function(e){
		e.preventDefault();
		var $this = $(this),
			$idx = $this.closest('li').index(),
			$closest = $this.closest('.js_tab'),
			$isNoHash = $closest.hasClass('no_hash') || isAppChk('ios') ? true: false,
			$isFirst = $closest.data('isFirst'),
			$href = $this.attr('href'),
			$target = $closest.data('target'),
			$winScrollTop = $(window).scrollTop(),
			$tabs = $this.closest('ul').find('li').filter(function(){
				return $(this).css('display')!='none';
			}),
			tabNum = $tabs.length;
		toggleScroll($(this),100);//스크롤 상단 이동
		// Tab 모션타입
		if($this.closest('.js_tab').hasClass('tabswipe')){
			$(window).resize(function(){
				var $bar = $this.closest('.js_tab').find('.bar'),
					_w = $this.closest('ul').width(),
					_x = $this.closest('li').position().left;
				$bar.css({'width':_w/tabNum-2,'left':_x,'opacity':1,'transform':'scale(1)'});
			});
			$(window).resize();
		}
		if($($href).length){
			var $accordionCurrent = $($href).find('.accordion_item .title.open>a');
			if($isFirst == true)$closest.data('isFirst', false) ;
			if($target == undefined){
				$($href).addClass('active').attr('aria-expanded',true).siblings('.tab_panel').attr('aria-expanded',false).removeClass('active');
			}else{
				$($target).attr('aria-expanded',false).removeClass('active');
				$($href).addClass('active').attr('aria-expanded',true);
			}
			if($accordionCurrent.length){
				$accordionCurrent.eq(0).parent('.title').removeClass('open');
				$accordionCurrent.eq(0).attr('aria-expanded',true).addClass('active').closest('.accordion_item').addClass('active').find('.panel').attr('aria-hidden','false').slideDown(500);
				changeTxt($accordionCurrent.eq(0).find('.ico'),'열기','닫기');
			}
			$this.attr('title',$onText).parent().addClass('active').siblings().removeClass('active').find('a').removeAttr('title');
			$this.attr('aria-selected',true).closest('li').siblings().find('[role=tab]').attr('aria-selected',false);
		}
		if($($href).find('.rdo_swipe').length)formUI.rdoSwipe();//탭안에 스와이프형 라디오버튼있는지 체크하고 실행
	});

	var $hash = location.hash;
	if($tab.length){
		$tab.each(function(e){
			$(this).find('ul').attr('role','tablist');
			var isHash =false;
			var tarAry = [];
			var isHashClk = '';
			var $li = $(this).find('li');
			var $active = $(this).find('li.active');
			$li.each(function(f){
				$(this).attr('role','presentation');
				var _a = $(this).find('a'),
					_aId = _a.attr('id'),
					_href = _a.attr('href');
				if(!_aId) _aId = 'tab_btn_'+e+'_'+f;
				tarAry.push(_href);
				_a.attr({
					'id' :_aId,
					'role' :'tab',
					'aria-controls': _href.substring(1),
					'aria-selected':'false'
				});
				$(_href).attr({
					'role':'tabpanel',
					'aria-labelledby':_aId,
					'aria-expanded':'false'
				});
				if(_href == $hash || $(_href).find($hash).length){
					isHash = true;
					isHashClk = _a;
				}
			});
			$(this).data('target',tarAry.join(','));
			if(isHash == false && !$li.hasClass('active') && !$tab.hasClass('default')){
				$(this).data('isFirst',true);
				var $tPanel = $li.eq(0).addClass('active').find('a').attr('href'),
					$tabs = $li.closest('ul').find('li').filter(function(){
						return $(this).css('display')!='none';
					}),
					tabNum = $tabs.length;
				$($tPanel).addClass('active').attr('aria-expanded','true').siblings('.tab_panel').removeClass('active').attr('aria-expanded','false');
				if($li.closest('.js_tab').hasClass('tabswipe')){
					var $bar = $li.closest('.js_tab').find('.bar'),
						_w = $li.closest('ul').width(),
						_x = $li.closest('li').position().left;
					$bar.css({'width':_w/tabNum-2,'left':_x,'opacity':1,'transform':'scale(1)'});
				}
			} else {
				var $tPanel = $active.find('a').attr('href'),
					$tabs = $li.closest('ul').find('li').filter(function(){
						return $(this).css('display')!='none';
					}),
					tabNum = $tabs.length;
				$($tPanel).addClass('active').attr('aria-expanded','true').siblings('.tab_panel').removeClass('active').attr('aria-expanded','false');
				if($active.closest('.js_tab').hasClass('tabswipe')){
					var $bar = $active.closest('.js_tab').find('.bar'),
						_w = $active.closest('ul').width(),
						_x = $active.closest('li').position().left;
					$bar.css({'width':_w/tabNum-2,'left':_x,'opacity':1,'transform':'scale(1)'});
				}
			}
		});
	}
	if($('.tab_nav').not('.js_tab').length){
		$('.tab_nav').not('.js_tab').each(function(){
			$(this).find('.tab.active > a').attr('title',$onText);
		});
	}

	if($('.tabmenu').length){
		$(document).on('click','.tabmenu.js_tab a',function(e){
			e.preventDefault();
			scrollUI.center($(this).parent());
		});

		$('.tabmenu').each(function(){
			var $active = $(this).find('.active');
			scrollUI.center($active);
		});
	}
	
	if($('.js_tab_rdo').length){
		$('.js_tab_rdo').each(function(){
			var tarAry = [];
			$(this).find('input[type=radio]').each(function(){
				var $tar = $(this).data('target');
				if(tarAry.indexOf($tar) < 0 && !!$tar)tarAry.push($tar);
				if($(this).is(':checked')){
					$($tar).addClass('active');
				}
			});
			$(this).data('targets',tarAry.join(','));
		});
	}
};

//radio tab
$(document).on('change','.js_tab_rdo input',function(e){
	var $this = $(this),
		$target = $this.attr('data-target'),
		$targets = $($target).siblings('.tab_rdo_panel');
	$($targets).removeClass('active');
	$($target).addClass('active');
	if($($target).find('.rdo_swipe').length)formUI.rdoSwipe();
});

//레이어팝업(dialog): 레이어 팝업은 #container 밖에 위치해야함
var Dialog = {
	id:'uiDialog',
	alertClass:'alert',
	focusClass:'dialog_focused',
	selectId:'uiSelectDialog',
	selectClass:'ui-pop-select',
	headClass:'dialog_header',
	contClass:'dialog_content',
	footerClass:'dialog_footer',
	etcCont:'#skipNavi,#header,#container,#floatingNavi,#footer',
	beforeCont:[],
	content:'',
	check: function(){
		//focus 이벤트 시 중복열림 방지
		var $focus = $(':focus');
		if(!!event){
			if(event.type === 'focus' && $($focus).hasClass(Dialog.focusClass)){
				return false;
			}
		}
		//같은 내용 중복열림 방지
		if(Dialog.beforeCont.indexOf(Dialog.content) == -1){
			Dialog.beforeCont.push(Dialog.content);
		}else{
			return false;
		}
	},
	alert:function(popId, message){
		var $alertHtml = '<div id="'+popId+'" class="dialog modal alert">';
				$alertHtml += '<div class="dialog_wrap">';
					$alertHtml += '<div class="dialog_content">';
						$alertHtml += '<div class="section">';
							$alertHtml += '<div class="message">';
								$alertHtml += '<div>'+message+'</div>';
							$alertHtml += '</div>';
						$alertHtml += '</div>';
					$alertHtml += '</div>';
				$alertHtml += '<div class="dialog_btn btn_flex">';
					$alertHtml += '<div><a href="#" class="btn ui_dialog_close">확인</a></div>';
				$alertHtml += '</div>';
			$alertHtml += '</div>';
		$alertHtml += '</div>';
		$('body').append($alertHtml);
		Dialog.open('#'+popId,function(){
			$('#'+popId).find('.message > div').html(message);
		});
	},
	keyEvt:function(){
		//컨펌팝업 버튼 좌우 방할기로 포거스 이동
		$(document).on('keydown', '.'+Dialog.alertClass+' .dialog_btn .btn',function(e){
			var $keyCode = (e.keyCode?e.keyCode:e.which),
				$tar = '';
			if($keyCode == 37)$tar = $(this).parent().prev();
			if($keyCode == 39)$tar = $(this).parent().next();
			if (!!$tar)$tar.find('.btn').focus();
		});
	},
	select:function(target,col,id){
		var $target = $(target),
			$targetVal = $target.val(),
			$title = $target.attr('title'),
			$length = $('.' +Dialog.selectClass).length,
			//$popId = Dialog.selectId+$length,
			$popId = id+'Dialog',
			$length = $target.children().length,
			$opTxt = '',
			$opVal = '',
			$popHtml = '',
			$isBank = false,
			$isBankTy2 = false;

		if($target.hasClass('finance')){
			$isBank = true;
			if($targetVal >= 200)$isBankTy2 = true;
		}
		$popHtml += '<div id="'+$popId+'" class="dialog bottom '+Dialog.selectClass+'" role="dialog" aria-hidden="true">';
			$popHtml += '<div class="dialog_wrap">';
				$popHtml += '<div class="'+Dialog.headClass+'">';
					$popHtml += '<h2>'+$title+'</h2>';
					$popHtml += '<a href="#" class="dialog_close ui_dialog_close"><span class="offscreen">팝업창 닫기</span></a>';
				$popHtml += '</div>';
				$popHtml += '<div class="'+Dialog.contClass+'">';
					$popHtml += '<div class="section">';
					if($isBank){
						$popHtml += '<div class="tabmenu2 no_hash js_tab">';
							$popHtml += '<ul>';
								$popHtml += '<li role="presentation"'+(!$isBankTy2 ? ' class="active"' : '')+'><a href="#bankPanel1" id="tab_bank_1" role="tab" aria-controls="bankPanel1" aria-selected="'+(!$isBankTy2 ? 'true" title="현재선택"' : 'false"')+'>은행</a></li>';
								$popHtml += '<li role="presentation"'+($isBankTy2 ? ' class="active"' : '')+'><a href="#bankPanel2" id="tab_bank_2" role="tab" aria-controls="bankPanel2" aria-selected="'+($isBankTy2 ? 'true" title="현재선택"' : 'false"')+'>증권</a></li>';
							$popHtml += '</ul>';
						$popHtml += '</div>';
						$popHtml += '<div id="bankPanel1" class="tab_panel'+(!$isBankTy2 ? ' active' : '')+'" role="tabpanel" aria-labelledby="tab_bank_1" aria-expanded="'+(!$isBankTy2 ? 'true' : 'false')+'">';
					}

					$popHtml += '<ul class="user_info_item_wrap';
					if($isBank){
						$popHtml += ' bank';
					}else{
						if(!!col)$popHtml += ' col'+col;
					}
					$popHtml += '">';
					for(var i=0;i<$length;i++){
						$opTxt = $target.children().eq(i).text();
						$opVal = $target.children().eq(i).attr('value');
						if($opVal != ''){
							if($isBank){
								$popHtml += '<li class="'+($opVal >= 200 ? 'ty2' : 'ty1')+'">';
							}else{
								$popHtml += '<li>';
							}
							$popHtml += '<div class="user_info_item'+($targetVal == $opVal ? ' selected' : '')+'">';
								$popHtml += '<a href="#" class="ui-pop-select-btn" role="button" data-value="'+$opVal+'">';
									if($isBank)$popHtml += '<i class="bk_'+$opVal+'" aria-hidden="true"></i>';
									$popHtml += '<span>'+$opTxt+'</span>';
								$popHtml += '</a>';
							$popHtml += '</div>';
							$popHtml += '</li>';
						}
					}
					$popHtml += '</ul>';
					if($isBank){
						$popHtml += '</div>';
						$popHtml += '<div id="bankPanel2" class="tab_panel'+($isBankTy2 ? ' active' : '')+'" role="tabpanel" aria-labelledby="tab_bank_2" aria-expanded="'+($isBankTy2 ? 'true' : 'false')+'">';
							$popHtml += '<ul class="user_info_item_wrap bank"></ul>';
						$popHtml += '</div>';
					}
					$popHtml += '</div>';
				$popHtml += '</div>';
			$popHtml += '</div>';
		$popHtml += '</div>';
		$('#wraper').append($popHtml);
		if($('#gWrap').length)$('#gWrap').append($popHtml);//퍼블가이드에서 적용시
		if($isBank){
			var isType2 = false;
			$('#'+$popId+' .user_info_item_wrap.bank>li').each(function(){
				if($(this).hasClass('ty2')){
					isType2 = true;
					var $wrap = $(this).closest('.tab_panel').next().find('.user_info_item_wrap')
					//if($wrap.find('.none').length)$wrap.find('.none').remove();
					$(this).appendTo($wrap);
				}
			});

			if(isType2 == false){ //증권사가 없으면
				$('#'+$popId).find('.tabmenu2').remove();
				$('#'+$popId).find('#bankPanel2').remove();
				$('#'+$popId).find('.user_info_item_wrap.bank').unwrap();
			}
		}
		$target.data('dialog','#'+$popId);
		$('#'+$popId).on('click','.ui-pop-select-btn',function(e){
			e.preventDefault();
			var $btnVal = $(this).data('value'),
				$btnTxt = $(this).text();
			$(this).parent().addClass('selected').siblings().removeClass('selected');
			target.val($btnVal).change();
			target.siblings('.ui_select_open').find('span').text($btnTxt+'입니다.');
			Dialog.close('#'+$popId);
		});
	},
	selectFirst:function(){
		$('.ui_select_open').each(function(){
			var $select = $(this).siblings('select'),
				$selected = $select.find(':selected');
			$select.attr({
				'tabindex':-1,
				'aria-hidden':true
			});
			if($selected.text().indexOf('선택') < 0 || $selected.val() != ''){
				$(this).find('span').text($selected.text()+'입니다.');
			}
		});
	},
	selectUI:function(){
		//셀렉트 팝업버튼 포커스
		$(document).on('focusin','.select_btn',function(){
			$(this).prev('select').addClass('focus');
		});
		$(document).on('focusout','.select_btn',function(){
			$(this).prev('select').removeClass('focus');
		});

		$(document).on('click','.ui_select_open',function(e){
			e.preventDefault();
			var $select = $(this).siblings('select');
			var $selectID = $(this).siblings('select').attr('id');
			var $txtLengthArry = [];
			$select.find('option').each(function(){
				var $optVal = $(this).val(),
					$optTxt = $(this).text();
				if($optVal != ''){
					$txtLengthArry.push($optTxt.length);
				}
			});
			var $maxTxtLength = Math.max.apply(null, $txtLengthArry);
			if($maxTxtLength <= 4){
				Dialog.select($select,3,$selectID);
			}else if($maxTxtLength <= 8){
				Dialog.select($select,2,$selectID);
			}else{
				Dialog.select($select,0,$selectID);
			}

			var $pop = $select.data('dialog'),
				$currentTarget = $(e.currentTarget);
			Dialog.open($pop,function(){
				$($pop).data('returnFocus',$currentTarget);
			});
		});
	},
	selectOpen:function(id, e){
		var $select = $('#'+id);
		var $selectID = id;
		var $txtLengthArry = [];
		$select.find('option').each(function(){
			var $optVal = $(this).val(),
				$optTxt = $(this).text();
			if($optVal != ''){
				$txtLengthArry.push($optTxt.length);
			}
		});
		var $maxTxtLength = Math.max.apply(null, $txtLengthArry);
		if($maxTxtLength <= 4){
			Dialog.select($select,3,$selectID);
		}else if($maxTxtLength <= 8){
			Dialog.select($select,2,$selectID);
		}else{
			Dialog.select($select,0,$selectID);
		}

		var $pop = $select.data('dialog');
		Dialog.open($pop);
	},
	open:function(tar,ruleNum,callback){
		if(!$(tar).length || !$(tar).children('.dialog_wrap').length) return console.log('해당팝업없음');
		var $idx = $(tar).index('.dialog'),
			$show = $('.dialog.show').length,
			$id = $(tar).attr('id'),
			_url = $(tar).find('.dialog_header .dialog_close').attr('href'),
			$lastCloseBtn = '<a href="'+_url+'" class="dialog_close last_focus ui_dialog_close"><span class="offscreen">팝업창 닫기</span></a>';
		if($show > 0)$(tar).css('z-index','+='+$show);
		if($id == undefined){
			$id = Dialog.id+$idx;
			$(tar).attr('id',$id);
		}
		//포커스
		var $focusEl = '';
		try{
			if(event.currentTarget != document){
				$focusEl = $(event.currentTarget);
			}else{
				$focusEl = $(document.activeElement);
			}
		}catch(error){
			$focusEl = $(document.activeElement);
		}
		$(tar).data('returnFocus',$focusEl);
		$focusEl.addClass(Dialog.focusClass);
		if($focusEl.closest('.dialog').length){
			var $lastPop = $focusEl.closest('.dialog'),
				$lastPopId = $lastPop.attr('id');
			$(tar).data('lastpop',$lastPopId);
			$lastPop.attr('aria-hidden',true);
		}
		var $openDelay = 10;
		if($(tar).data('ishtml') != true && isMobile.iOS())$openDelay = 300;
		setTimeout(function(){
			//리턴 포커스
			if(isMobile.iOS()){
				var $focusEl2 = $(document.activeElement);
				if(!$focusEl2.hasClass(Dialog.focusClass)){
					$focusEl.removeClass(Dialog.focusClass);
					$(tar).data('returnFocus',$focusEl2);
					$focusEl2.addClass(Dialog.focusClass);
				}
			}

			$(tar).attr({'tabindex':0}).focus();

			//웹접근성
			$(Dialog.etcCont).attr({'aria-hidden':'true','tabindex':'-1'});
			$(tar).attr('aria-hidden','false');
			var $tit = $(tar).find('.'+Dialog.headClass+' h2');
			if($tit.length && $(tar).attr('aria-labelledby') == undefined){
				if($tit.attr('id') == undefined){
					$tit.attr('id',$id+'Label');
					$(tar).attr('aria-labelledby', $id+'Label');
				}else{
					$(tar).attr('aria-labelledby', $tit.attr('id'));
				}
			}

			//열기
			if(!$('html').hasClass('lock'))Body.lock();
			$(tar).addClass('show');
			
			//dialog 상하단 여백 체크
			if($(tar).find('.dialog_header').length){
				var top = $(tar).find('.dialog_header').outerHeight();
				$(tar).find('.dialog_wrap').css('padding-top', top);
			}
			if($(tar).find('.dialog_footer').length){
				var bottom = $(tar).find('.dialog_footer').height();
				$(tar).find('.dialog_wrap').css('padding-bottom', bottom+10);
			}
			
			//약관팝업일 경우
			if($(tar).find('.rule_container').length){
//				var _h = $(tar).find('.dialog_header').height();
//				var _top = $(tar).find('.rule_container .rule_section').eq(ruleNum-1).position().top;
//				(ruleNum>1)?_top=_top+20:_top=_top;
//				$(tar).find('.dialog_content').animate({'scrollTop':_top},300);
			}
			
			$(tar).find('.'+Dialog.contClass).scrollTop(0);

			Dialog.focusMove(tar);
			if(!!callback){
				callback();
			}
			Dialog.position(tar);
			$(window).resize();
		}, $openDelay);
		//모바일 접근성보완: 모바일일때 마지막에 닫기 버튼 추가
		if(isMobile.any() && !$(tar).find('.dialog_close.last_focus').length && $(tar).find('.dialog_close').length)$(tar).children('.dialog_wrap').append($lastCloseBtn);
	},
	close:function(tar,callback){
		var $closeDelay = 700,
			$visible = $('.dialog.show').length,
			$lastPopId = $(tar).data('lastpop');
		if($visible == 1){
			Body.unlock();
			$(Dialog.etcCont).removeAttr('aria-hidden');
		}
		if($lastPopId != undefined){
			$('#'+$lastPopId).attr('aria-hidden',false);
		}

		//닫기
		//약관팝업일 경우
		if($(tar).find('.rule_section').length){
			$(tar).find('.dialog_content').animate({'scrollTop':0},0);
		}
        $(tar).removeClass('show');
		isPopAllAgree = false;
		$(tar).attr('aria-hidden','true').removeAttr('style tabindex');
		$(tar).find('.'+Dialog.headClass).removeAttr('style').removeClass('shadow');
		$(tar).find('.'+Dialog.contClass).removeAttr('tabindex style');
		if($(tar).find('.dialog_close.last_focus').length)$(tar).find('.dialog_close.last_focus').remove();

		//알럿창
		if($(tar).hasClass(Dialog.alert)){
			setTimeout(function(){
				var $content = $(tar).find('.message>div').html();
				$(tar).remove();
				Dialog.beforeCont.splice(Dialog.beforeCont.indexOf($content),1);
			},$closeDelay);
		}

		//select팝업
		if($(tar).hasClass(Dialog.selectClass)){
			setTimeout(function(){
				$(tar).remove();
			},$closeDelay);
		}

		//callback
		if(!!callback){
			setTimeout(function(){
				callback();
			},$closeDelay);
		}
	},
	position:function(tar){
		if(!$(tar).hasClass('show'))return false;
		if($(tar).data('popPosition') == true)return false;
		$(tar).data('popPosition',true);
		var $head = $(tar).find('.'+Dialog.headClass),
			$tit = $head.find('h2'),
			$content = $(tar).find('.'+Dialog.contClass),
			$footer = $(tar).find('.'+Dialog.footerClass);

		$(window).resize(function(){
			$head.removeAttr('style').removeClass('shadow');
			$content.removeAttr('tabindex style');

			//타이틀이 두줄 이상이 될때
			var $headH = $head.outerHeight(),
				$titH = $tit.outerHeight();
			if(30 < $titH && $headH < $titH && !$head.hasClass('offscreen')){
				var $cabH = $titH-$headH;
				$head.css('height','+='+$cabH);
				$(tar).find('.'+Dialog.contClass).css('padding-top','+='+$cabH);
			}

			//컨텐츠 스크롤이 필요할때
			var $height = $(tar).height(), $top = 0, $bottom = 0;
			if($(tar).find('.dialog_header').length)$top = $head.outerHeight();
			if($(tar).find('.dialog_footer').length)$bottom = $footer.height();
			if($(tar).hasClass('modal')){
				$content.css('max-height',$height-$top-$bottom-70);
			} else if($(tar).hasClass('bottom')){
				$content.css('max-height',$height-$top-$bottom-10);
			}

			//팝업 헤더 shadow
			var $contScrollTop = $content.scrollTop();
			if($contScrollTop > 50){
				$head.addClass('shadow');
			}else{
				$head.removeClass('shadow');
			}
		});

		//팝업 헤더 shadow
		$content.scroll(function(){
			var $contScrollTop = $(this).scrollTop();
			if($contScrollTop > 50){
				$head.addClass('shadow');
			}else{
				$head.removeClass('shadow');
			}
		});
	},
	focusMove:function(tar){
		if(!$(tar).hasClass('show'))return false;
		if($(tar).data('focusMove') == true)return false;
		$(tar).data('focusMove',true);
		var $tar = $(tar),
			$focuss = $tar.find($focus);
		
		var $isFirstBackTab = false;

		$(document).on('focusin',$tar.selector+' .last_focus',function(e){
			var $focusable = $tar.find($focus).not('.last_focus'),
				$firstFocus = $focusable.first(),
				$lastFocus = $focusable.last();
			if($isFirstBackTab){
				$lastFocus.focus();
			}else{
				$firstFocus.focus();
			}
		});
	},
	init:function(){
		$('.dialog').attr({
			'aria-hidden':'true',
			'data-ishtml':'true'
		});
		$('#container .dialog').each(function(){
			$('#container').after(this);
		});

		//열기
		$(document).on('click','.ui_dialog_open',function(e){
			e.preventDefault();
			var $pop = $(this).attr('href'),
				$currentTarget = $(e.currentTarget);
			Dialog.open($pop,function(){
				$($pop).data('returnFocus',$currentTarget);
			});
		});

		//닫기
		$(document).on('click', '.ui_dialog_close',function(e){
			var $pop = $(this).attr('href');
			if ($pop == '#' || $pop == '#none' || $pop == undefined){
				e.preventDefault();
				$pop = $(this).closest('.dialog');
			}
			Dialog.close($pop);
		});

		Dialog.keyEvt();
		Dialog.selectFirst();
		Dialog.selectUI();
	}
};

//토스트팝업
var toastBox = function(txt){
	var $delay = 3000,
		$speed = 500,
		$className = '.toast_box';

	var $boxHtml = '<div class="'+$className.substring(1)+'">';
		$boxHtml += '<div class="txt">'+txt+'</div>';
		$boxHtml += '</div>';

	$('body').prepend($boxHtml);

	var $height = $($className).outerHeight();
	$($className).stop(true,false).removeAttr('style').css({'height':0}).animate({'height':$height},$speed).delay($delay).animate({'height':0},$speed);
};

//accordion
var accordion = function(){
	var $accordion = $('.accordion'),
		$item = $accordion.find('.accordion_item'),
		$title = $accordion.find('.title'),
		$panel = $accordion.find('.panel');
	$panel.hide();
	$accordion.attr({
		role: 'tablist',
		multiselectable: 'true'
	});
	$panel.attr('id', function(IDcount){
		return 'panel-' + IDcount;
	});
	$panel.attr('aria-labelledby', function(IDcount){
		return 'control-panel-' + IDcount;
	});
	$panel.attr('aria-hidden','true');
	$panel.attr('role','tabpanel');
	$title.each(function(){
		var $this = $(this), speed = 300, delay = 0;
		$target = $this.next('.panel')[0].id;
		$link = $('<a>',{
			'href':'#'+$target,
			'aria-expanded':'false',
			'aria-controls':$target,
			'id':'control-'+ $target
		});
		$this.wrapInner($link);
		if($this.closest('.dialog_content').length) delay = 600;
		if($this.hasClass('open')){
			setTimeout(function(){
				$this.find('a').attr('aria-expanded',true).addClass('active').closest('.accordion_item').addClass('active').find('.panel').attr('aria-hidden','false').slideDown(500);
				$this.find('a').append('<span class="ico"><span class="offscreen">내용닫기</span></span>');
			},delay);
		} else {
			$this.find('a').append('<span class="ico"><span class="offscreen">내용열기</span></span>');
		}
		if(!$this.closest('.tab_panel.active').length){
			if($this.closest('.dialog_content').length) delay = 700;
			var $open = $this.closest('.tab_panel').find('.title.open').closest('.accordion_item');
			setTimeout(function(){
				$open.removeClass('active').find('.title.open a').attr('aria-expanded',false).removeClass('active').find('.offscreen').text('내용열기');
				$open.find('.panel').attr('aria-hidden','true').slideUp(0);
			},delay);
		}
	});
	$('.accordion .title a').on('click', function (e){
		e.preventDefault();
		var $this = $(this),
			$title = $this.closest('.title'),
			$panel = $title.next('.panel');
		if($this.attr('aria-expanded') == 'false'){
			if(!$this.closest('.accordion').hasClass('toggle')){
				$this.closest('.accordion').find('[aria-expanded=true]').attr('aria-expanded',false).removeClass('active').parent().next('.panel').attr('aria-hidden','true').slideUp(200);
				$this.closest('.accordion_item').removeClass('active');
			}
			$this.attr('aria-expanded',true).addClass('active').find('.ico .offscreen').text('내용닫기');
			$this.closest('.accordion_item').addClass('active').siblings('.accordion_item').removeClass('active');
			$panel.attr('aria-hidden',false).slideDown(200,function(){
				toggleScroll($title);//열렸을때 스크롤
			});
			if($panel.find('.tbl_scroll').length){
				tblUI.guide('.tbl_scroll');
			}
			if($('.common_swipe').length){
				$('.common_swipe').each(function(index){
					$commonSliders[index].update();
				});
			}
		}else{
			$this.attr('aria-expanded',false).removeClass('active').find('.ico .offscreen').text('내용열기');
			$panel.attr('aria-hidden',true).slideUp(200);
			$this.closest('.accordion_item').removeClass('active');
			$this.closest('.title').removeClass('open');
		}
	});
	$(document).on('click', '.more_toggle .title a', function (e){
		e.preventDefault();
		var $this = $(this),
			$panel = $this.closest('.title').next('.panel');
		$this.toggleClass('active');
		$panel.slideToggle(200);
	});
	$(document).on('click', '.h_accordion .btn_more', function (){
		var $this = $(this),
			$viewer = $this.closest('.h_accordion').find('.viewer'),
			_h = $viewer.find('.view').height();
		toggleScroll($this.closest('.h_accordion'));//스크롤 상단 이동
		if(!$this.hasClass('active')) {
			$viewer.css('height', _h)
			changeTxt($this.find('.offscreen'),'더보기','숨기기');
		} else {
			$viewer.removeAttr('style');
			changeTxt($this.find('.offscreen'),'숨기기','더보기');
		}
		$this.toggleClass('active');
	});
};
var stepAccordion = function(){
	$(document).on('click', '.step_accordion_item .btn_step', function (e){
		e.preventDefault();
		var $this = $(this),
			$currentStep = $this.closest('.step_accordion_item'),
			$chkTxt = $currentStep.find('.chk_txt'),
			href = $this.attr('href'),
			$target = $(href),
			$step = $target.closest('.step_accordion_item'),
			$panel = $step.find('.step_panel');
		if(!$step.hasClass('active') && $step.hasClass('chk')){
			$step.addClass('active').siblings('.step_accordion_item').removeClass('active');
			$this.find('.ico .offscreen').text('내용닫기').siblings('.step_accordion_item').find('.ico .offscreen').text('내용보기');
			$panel.slideDown(200,function(){
				toggleScroll($this);//열렸을때 스크롤
			}).closest('.step_accordion_item').siblings('.step_accordion_item').find('.step_panel').slideUp(200);
			if($panel.find('.rdo_swipe').length)formUI.rdoSwipe();
		} else if(href != '#'+$currentStep.attr('id')){
			$step.addClass('active chk').siblings('.step_accordion_item').removeClass('active');
			$('.step_accordion_item').find('.ico .offscreen').text('내용보기');
			$step.find('.ico .offscreen').text('내용닫기');
			$panel.slideDown(200,function(){
				toggleScroll($this);//열렸을때 스크롤
			}).closest('.step_accordion_item').siblings('.step_accordion_item').find('.step_panel').slideUp(200);
			$currentStep.addClass('on');
			if($panel.find('.rdo_swipe').length)formUI.rdoSwipe();
		} else {
			$step.removeClass('active').find('.ico .offscreen').text('내용보기');
			$panel.slideUp(200);
		}
	});
	$(document).on('click', '.step_accordion_item .list.box>a', function (e){
		$(this).addClass('active').closest('.list.box').siblings('.list.box').find('>a').removeClass('active');
	});
};

//step
var step = {
	winLoad: function(){
		var $track = $('.step_track'), 
			$item = $track.find('.step_item'), 
			numS = $item.length,
			_w = $(window).width(),
			cNum = $track.find('.step_item.current').index();
		$track.css('width',numS*_w)
		$item.each(function(){
			var $this = $(this);
			$this.css('width',_w);
			if($this.hasClass('current'))$this.closest('.step_wraper').height($this.height());
		});
		$indicatorHtml = ''
		$indicatorHtml += '<ol class="t_step">';
			for(var i=0;i<numS;i++){
				$indicatorHtml += '<li '+(i==cNum?'class="current"':'')+'><span class="offscreen">'+(i==cNum?'현재':'')+(i+1)+'단계</span></li>';
			}
		$indicatorHtml += '</ol>';
		if(!$('.t_step').length)$track.closest('.step_wraper').append($indicatorHtml);
	},
	goto: function(num){
		var $track = $('.step_track'),
			$indicator = $track.closest('.step_wraper').find('.t_step li'),
			_n =  num-1,
			$itemC = $track.find('.step_item').eq(_n),
			_t = $track.find('.step_item').length,
			_w = $track.find('.step_item').outerWidth(),
			_h = $itemC.height();
		if(_n>=0 && _n<_t){
			$track.css('left',-_w*_n);
			$track.find('.step_item').eq(_n).addClass('current').siblings('.step_item').removeClass('current');
			$track.closest('.step_wraper').height(_h);
			$indicator.eq(_n).addClass('current').siblings('li').removeClass('current');
			//console.log($indicator.eq(_n).text());
		} else {
			console.log('해당화면이 없습니다.');
		}
	}
};

//버튼 관련
var buttonUI ={
	winLoad: function(){
		$('html').addClass('load');
		//링크없는 a태그 role=button 추가
		$('a').each(function(e){
			var $href = $(this).attr('href');
			if(!$(this).hasClass('no-button')){
				if($href == undefined){
					$(this).attr({'href':'#'});
					if($(this).attr('role') == undefined)$(this).attr('role','button');
				}else{
					if(($href.charAt(0) == '#') && $(this).attr('role') == undefined)$(this).attr('role','button');
				}
			}
		});
	},
	default: function(){
		//href가 #시작할때 a태그 클릭 시 기본속성 죽이기
		$(document).on('click','a',function(e){
			var $href = $(this).attr('href');
			if(!$(this).hasClass('no-button') && $(this).attr('role') == 'button'){ //기본속성 살리는 클래스(스킵네비 등)
				e.preventDefault();
			}
		});
	},
	effect: function(){
		//버튼 클릭 효과
		var btnInEfList = 'a.btn, button.btn,.accordion .title a, a.ta_btn, .list>a, .btn_ico a';
		$(document).on('click', btnInEfList,function(e){
			var $btnEl = $(this),
				$delay = 650;

			if(!$btnEl.is('.disabled')){
				if(!$btnEl.find('.btn_click_in').length)$btnEl.append('<em class="btn_click_in"></em>');
				var $btnIn = $btnEl.find('.btn_click_in'),
					$btnMax = Math.max($btnEl.outerWidth(), $btnEl.outerHeight()),
					$btnX = e.pageX - $btnEl.offset().left - $btnMax/2,
					$btnY = e.pageY - $btnEl.offset().top - $btnMax/2;
				$btnIn.css({
					'left':$btnX,
					'top':$btnY,
					'width':$btnMax,
					'height':$btnMax
				}).addClass('animate').delay($delay).queue(function(next){
					$btnIn.remove();
					next();
				});
			}
		});
	},
	etc: function(){
		// 자기자신 토글 
		$(document).on('click','a.self_toggle',function(e){
			e.preventDefault();
			var $this = $(this);
			$this.toggleClass('active');
		});
		// 토글 리스트
		$(document).on('click','a.list_toggle',function(e){
			e.preventDefault();
			var $this = $(this);
			$this.addClass('active');
			if($this.parent('li').length || $this.parent('div').length)$this.parent().siblings().find('a').removeClass('active');
		});
	},
	init: function(){
		buttonUI.default();
		buttonUI.effect();
		buttonUI.etc();
	}
};

//로딩함수
var Loading ={
	open:function(type){
		var $html = '';
			$html += '<div id="loading">';
			if(type == 'data'){
				$html += '<div class="data"><i class="loading_s"></i></div>';
			}else if(type == 'page'){
				$html += '<div class="page"><div class="progress"></div></div>';
			}else if(type == 'loan'){
				$html += '<div class="loan">';
					$html += '<div class="inner">';
						$html += '<div class="loading_ani">';
							$html += '<div class="device">';
								$html += '<div class="scroller">';
									$html += '<div class="item">';
										$html += '<span class="chart ico"><span class="pie ico"></span></span>';
										$html += '<span class="txt"></span>';
									$html += '</div>';
									$html += '<div class="item">';
										$html += '<span class="hand ico"><span class="heart ico"></span></span>';
										$html += '<span class="txt"></span>';
									$html += '</div>';
									$html += '<div class="item">';
										$html += '<span class="chk">';
											$html += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 21 21" style="enable-background:new 0 0 21 21;" xml:space="preserve">';
												$html += '<circle style="fill:none;stroke:#555555;stroke-miterlimit:10;stroke-dasharray:64;stroke-dashoffset:64" cx="10.5" cy="10.5" r="10"/>';
												$html += '<polyline style="fill:none;stroke:#555555;stroke-miterlimit:10;stroke-dasharray:14;stroke-dashoffset:14" points="5.5,9.5 9.5,12.5 14.5,7.5"/>';
											$html += '</svg>';
										$html += '</span>';
										$html += '<span class="handshake">';
											$html += '<span class="left ico"></span>';
											$html += '<span class="right ico"></span>';
										$html += '</span>';
									$html += '</div>';
									$html += '<div class="item">';
										$html += '<span class="plants ico"><span class="mask"></span></span>';
										$html += '<span class="txt d2"></span>';
									$html += '</div>';
									$html += '<div class="item">';
										$html += '<div class="calculator">';
											$html += '<span class="plus"><i></i></span>';
											$html += '<span class="minus"><i></i></span>';
											$html += '<span class="eq"><i></i></span>';
											$html += '<span class="mul"><i></i></span>';
										$html += '</div>';
										$html += '<div class="won">';
											$html += '<span><i></i></span>';
											$html += '<span><i></i></span>';
										$html += '</div>';
									$html += '</div>';
								$html += '</div>';
							$html += '</div>';
							$html += '<div class="particle"></div>';
						$html += '</div>';
						$html += '<div class="txt_toggle">';
							$html += '<p class="txt1">대출 가능 금액을 조회하고 있습니다</p>';
							$html += '<p class="txt2">잠시만 기다려 주세요</p>';
						$html += '</div>';
					$html += '</div>';
				$html += '</div>';
			}
			$html += '</div>';
		if(!$('#loading').length)$('body').prepend($html);
		if(type == 'loan')loadingAni();
		Body.lock();
	},
	close:function(){
		$('#loading').stop(true,false).fadeOut(Loading.speed,function(){
			$(this).remove();
		});
		Body.unlock();
	}
};

//스크롤 관련
var loadingAni = function(){
	var $item = $('.loading_ani .device').find('.item');
	particle('.particle');
	$item.eq(0).addClass('active');
	rotateItem = function() {
		var $active = $('.loading_ani .device').find('.item.active');
		var $next = $active.next();
		if($next.length === 0) $next = $item.eq(0);
		$active.addClass('up');
		$next.addClass('active');
		setTimeout(function(){$active.removeClass('active up')},1000);
	}
	setInterval(rotateItem, 4000);
};

//스크롤 관련
var scrollUI = {
	center: function(el){
		var $parent = $(el).parent(),
			$parentWidth = $parent.outerWidth(),
			$parentScrollW = $parent.get(0).scrollWidth,
			$thisLeft = $(el).position().left,
			$thisWidth = $(el).outerWidth(),
			$scrollLeft = $thisLeft - ($parentWidth/2) + ($thisWidth/2),
			$speed = Math.max(300,Math.abs($scrollLeft * 2));
		if($parentWidth < $parentScrollW)$parent.animate({'scrollLeft':'+='+$scrollLeft},$speed);
	}
};

//이용약관 UI
var agreeItemUI = function(){
	var $agreeChk = '.agree_item>.checkbox>input';
	var $agreeTitChk = '.agree_tit .checkbox>input';

	//접근성으로 포커스안가게 처리
	$($agreeChk+','+$agreeTitChk).each(function(){
		if($(this).siblings('.bt').length && !$(this).prop('checked')){
			$(this).attr({'tabindex':-1,'aria-hidden':true});
			$(this).siblings('.bt').attr('role','button');
		}
	});
	$(document).on('focus',$agreeChk+','+$agreeTitChk,function(){
		if($(this).siblings('.bt').length && !$(this).prop('checked')){
			$(this).attr({'tabindex':-1,'aria-hidden':true});
			$(this).siblings('.bt').focus();
		}
	});

	//agree_item:checkbox
	$(document).on('click',$agreeChk+','+1,function(){
		var $btn = $(this).siblings('.bt');
		if($(this).prop('checked') && $btn.length){
			setTimeout(function(){
				if(!!$btn.attr('onclick')){
					$btn[0].onclick();
				}
				$btn.click();
			},10);
			return false;
		}
		if($(this).attr('id') == 'agreeMember'){
			agreeMember();
		}
	});
	$(document).on('click','.agree_item>.checkbox>.bt',function(){
		if(!$(this).hasClass('pop_all_agree')){
			isPopAllAgree = false;
		}
	});
	//isPopAllAgree 세팅
	$(document).on('change',$agreeTitChk,function(){
		var $closest = $(this).closest('.agree_tit'),
			$list = $closest.closest('.agree').find('.agree_list'),
			$myForm = $(this).closest('.section').next('.my_form');
		if($(this).prop('checked')){
			$list.find($agreeChk).prop('checked',true).change();
			if(!$closest.hasClass('no_form')){
				$list.slideUp(300);
				if($myForm.length){
					$myForm.slideDown(100);
					setTimeout(function(){
						if(!$myForm.hasClass('is_val'))$myForm.find($focus).first().focus();
					},300);
					$('#btnNext').hide().next('#btnMyIns').show();
				}
			}
		}else{
			if($(this).siblings('label').find('span').text('회원가입 약관동의')){
				$(this).siblings('label').find('span').text('전체동의');
			}
			$list.find('>'+$agreeChk).prop('checked',false).change();
			$list.find('>'+$agreeChk).closest('.checkbox').removeClass('checked').find('.chk_ico').remove();
			$list.slideDown(300);
			if($myForm.length){
				$myForm.slideUp(100);
			}
			$('#btnMyIns').hide().prev('#btnNext').show().find('button').attr('disabled','disabled');
		}
	});
	$(document).on('click','.pop_all_agree',function(){
		isPopAllAgree = true;
	});
};
//회원가입 약관동의
function agreeMember(){
	if(document.getElementById('agreeMember').checked){
		$('#btnNext').find('button').removeAttr('disabled');
	} else {
		$('#btnNext').find('button').attr('disabled','disabled');
	}
}
var cardSlider, docuSlider, chartSlider, dep1Swipe, dep2Swipe, bannerSlider, myProductSlider, myFPSlider, appGuideSlider; //스와이프 전역선언
var $commonSliders = [];
var swipeUI = {
	card : function(){
		if($('.card_swipe').length){
			$('.card_swipe').each(function(){
				var $this = $(this);
				var cardOptions = {
					slidesPerView: 'auto',
					spaceBetween: 20,
					pagination: {
						el: '.card_pagination',
						clickable: true,
						renderBullet:function(index, className) {
							return '<button type="button" class="'+className+'">'+(index+1)+'번째 슬라이드</button>';
						}
					},
					speed:300,
					on:{
						transitionEnd:function(e){
							if(cardSlider.isEnd){
								$this.find('.swiper-slide').removeClass('swiper-slide-active');
								$this.find('.swiper-slide:last-child').addClass('swiper-slide-active');
							}
						}
					}
				};
				var sHeight = $this.find('.swiper-wrapper').outerHeight();
				$this.find('.swiper-slide').each(function(i){
					$(this).height(sHeight-50);
				});
				if($this.find('.swiper-slide').length>1){
					cardSlider = new Swiper($this, cardOptions);
				}
			});
		}
	},
	docu : function(){
		var docuSelector = '.docu_swipe';
		var docuOptions = {
			slidesPerView: 1,
			speed:300,
			navigation: {
				nextEl: '.docu_next',
				prevEl: '.docu_prev'
			}
		};
		docuSlider = new Swiper(docuSelector, docuOptions);
	},
	chart : function(){
		var chartSelector = '.chart_swipe';
		var chartOptions = {
			slidesPerView: 1,
			speed: 300,
			autoHeight: true
		};
		if($('.chart_swipe').length){
			chartSlider = new Swiper(chartSelector, chartOptions);
			$('.sync_tab>li>a').on('click', function(){
				var $this = $(this), myIndex = $this.parent().index();
				$this.parent('li').addClass('active').siblings('li').removeClass('active');
				chartSlider.slideTo(myIndex);
				toggleScroll($this,100);
			});
			chartSlider.on('slideChangeTransitionStart', function () {
				var tabIndex = $(chartSelector).find('.swiper-slide.swiper-slide-active').index();
				$('.sync_tab>li').eq(tabIndex).addClass('active').siblings('li').removeClass('active');
			});
			chartSlider.on('slideChangeTransitionEnd', function () {
				chartH();
			});
		}
	},
	gnbSwipe:function(){
		var dep1Selector = '.dep1_swipe', dep2Selector = '.dep2_swipe';
		var dep1Options = {
			direction:'vertical',
			slidesPerView:'auto',
			freeMode:true,
			speed: 300
		};
		var dep2Options = {
			slidesPerView: 1,
			speed: 300,
			autoHeight: true
		};
		if($('.dep1_swipe').length && $('.dep2_swipe').length){
			dep1Swipe = new Swiper(dep1Selector, dep1Options);
			dep2Swipe = new Swiper(dep2Selector, dep2Options);
			$(document).on('click','.dep1_swipe a',function() {
				var $this = $(this), $li = $this.parent('li');
				if(!$li.hasClass('active')){
					dep2Swipe.slideTo($li.index());
					$li.addClass('active').siblings('li').removeClass('active');
				}
			});
			dep2Swipe.on('slideChangeTransitionStart', function () {
				var tabIndex = $(dep2Selector).find('.swiper-slide.swiper-slide-active').index();
				$('.dep1_swipe li').eq(tabIndex).addClass('active').siblings('li').removeClass('active');
				$('.dep2_swipe .swiper-slide').eq(tabIndex).animate({'scrollTop':0},0);
			});
		}
	},
	bannerSwipe:function(){
		if($('.index_banner_swipe').length){
			$('.index_banner_swipe').each(function(){
				var $this = $(this);
				var indexBannerOptions = {
					slidesPerView: 1,
					pagination: {
						el: '.banner_pagination',
						clickable: true,
						renderBullet:function(index, className) {
							return '<button type="button" class="'+className+'">'+(index+1)+'번째 슬라이드</button>';
						}
					},
					speed: 300,
					loop: true,
					autoplay : {delay:5000},
					autoHeight: true
				};
				bannerSlider = new Swiper($this, indexBannerOptions);
			});
		}	
	},
	myProductSwipe:function(){
		if($('.my_ins_product_swipe').length){
			$('.my_ins_product_swipe').each(function(){
				var $this = $(this);
				var myProductOptions = {
					slidesPerView: 'auto',
					spaceBetween: 15,
					pagination: {
						el: '.product_pagination',
						clickable: true,
						type: 'progressbar',
						renderBullet:function(index, className) {
							return '<button type="button" class="'+className+'">'+(index+1)+'번째 슬라이드</button>';
						}
					},
					speed: 300,
					autoHeight: true
				};
				myProductSlider = new Swiper($this, myProductOptions);
			});
		}
	},
	myFPSwipe:function(){
		var myFPSelector = '.my_fp_swipe';
		var myFPOptions = {
			slidesPerView: 1,
			navigation: {
				nextEl: '.my_fp_next',
				prevEl: '.my_fp_prev'
			},
			speed: 300
		};
		if($('.my_fp_swipe .swiper-slide').length){
			myFPSlider = new Swiper(myFPSelector, myFPOptions);
		}
	},
	appGuideSwipe:function(){
		var appGuideSelector = '.app_guide_swipe';
		var appGuideOptions = {
			slidesPerView: 1,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
				renderBullet:function(index, className) {
					return '<button type="button" class="'+className+'">'+(index+1)+'번째 슬라이드</button>';
				}
			},
			navigation: {
				nextEl: '.guide_next',
				prevEl: '.guide_prev'
			},
			speed: 300
		};
		if($('.app_guide_swipe').length){
			appGuideSlider = new Swiper(appGuideSelector, appGuideOptions);
			appGuideSlider.on('slideChange', function () {
				var _num = appGuideSlider.activeIndex;
				if(_num == 1){
					$('.app_guide_loan_total').addClass('active');
				} else if(_num == 3){
					$('.app_guide_fixed').addClass('active')
				} else {
					$('.app_guide_loan_total').removeClass('active');
					$('.app_guide_fixed').removeClass('active');
				}
			});
		}
	},
	arsSwipe:function(){
		if($('.capture_slide').length){
			$('.capture_slide').each(function(){
				var $this = $(this);
				var arsOptions = {
					slidesPerView: 1,
					pagination: {
						el: '.swiper-pagination',
						clickable: true,
						renderBullet:function(index, className) {
							return '<button type="button" class="'+className+'">'+(index+1)+'번째 슬라이드</button>';
						}
					}
				};
				var $arsSlider = new Swiper($this, arsOptions);
			});
		}
	},
	commonSwipe:function(){
		if($('.common_swipe').length){
			$('.common_swipe').each(function(){
				var $this = $(this);
				var commonOptions = {
					slidesPerView: 1,
					pagination: {
						el: '.swiper-pagination',
						clickable: true,
						renderBullet:function(index, className) {
							return '<button type="button" class="'+className+'">'+(index+1)+'번째 슬라이드</button>';
						}
					}
				};
				var commonSlider = new Swiper($this, commonOptions);
				$commonSliders.push(commonSlider);
			});
		}
	},
	init : function(){
		swipeUI.card();
		swipeUI.docu();
		swipeUI.chart();
		swipeUI.gnbSwipe();
		swipeUI.bannerSwipe();
		swipeUI.myProductSwipe();
		swipeUI.myFPSwipe();
		swipeUI.appGuideSwipe();
		swipeUI.arsSwipe();
		swipeUI.commonSwipe();
	}
}

//토글 열릴때 스크롤 함수
var toggleScroll = function(target, speed){
	var $target = target, _sH = $('#header').outerHeight()+20, _wHH = $(window).height()/2, _dHH = $('.dialog').height()/2;
	var $scroll = $target.offset().top-_sH,
		$scrollDialog = $target.position().top-2;
	var userHasScrolled = true;
	if(speed == undefined)speed=400;
	if($('html').hasClass('ios'))$scroll=$scroll;
	if(isNotch)$scroll=$scroll-44;
	$('.dialog_content').scroll(function(){
		userHasScrolled = false;
	});
	(!$target.closest('.dialog_wrap').length)?$('html,body').animate({'scrollTop':$scroll},speed):$target.closest('.dialog_content').animate({'scrollTop':$scrollDialog},speed);
};

//글자바꾸기: changeTxt(바꿀텍스트,바낄텍스트)
//changeTxt('.txt','열기','닫기');
var changeTxt = function(target, beforeTxt, afterTxt){
	return $(target).each(function(){
		var element = $(this);
		element.html(element.html().split(beforeTxt).join(afterTxt));
	});
};

//resize가 끝나면: resizeEnd
//$(window).resizeEnd(function(){console.log('resizeEnd');},300);
var resizeEndCut = 0;
$.fn.resizeEnd = function(callback, timeout){
	resizeEndCut = resizeEndCut+1;
	var cut = resizeEndCut;
	return this.each(function(){
		var $this = $(this);
		$this.resize(function(){
			if($this.data('resizeTimeout'+cut)){
				clearTimeout($this.data('resizeTimeout'+cut));
			}
			$this.data('resizeTimeout'+cut, setTimeout(callback,timeout));
		});
	});
};

//scroll이 끝나면: scrollEnd
//$(window).scrollEnd(function(){console.log('scrollEnd');},300);
var scrollEndCut = 0;
$.fn.scrollEnd = function(callback, timeout){
	scrollEndCut = resizeEndCut+1;
	var cut = scrollEndCut;
	return this.each(function(){
		var $this = $(this);
		$this.scroll(function(){
			if($this.data('scrollTimeout'+cut)){
				clearTimeout($this.data('scrollTimeout'+cut));
			}
			$this.data('scrollTimeout'+cut, setTimeout(callback,timeout));
		});
	});
};

(function($) {
	function visible(element) {
		return $.expr.filters.visible(element) && !$(element).parents().addBack().filter(function() {
			return $.css(this, 'visibility') === 'hidden';
		}).length;
	}

	function focusable(element, isTabIndexNotNaN) {
		var map, mapName, img, nodeName = element.nodeName.toLowerCase();
		if ('area' === nodeName) {
			map = element.parentNode;
			mapName = map.name;
			if (!element.href || !mapName || map.nodeName.toLowerCase() !== 'map') {
				return false;
			}
			img = $('img[usemap=#' + mapName + ']')[0];
			return !!img && visible(img);
		}
		return (/input|select|textarea|button|object/.test(nodeName) ?
			!element.disabled :
			'a' === nodeName ?
				element.href || isTabIndexNotNaN :
				isTabIndexNotNaN) &&
			// the element and all of its ancestors must be visible
			visible(element);
	}

	$.extend($.expr[':'], {
		focusable: function(element) {
			return focusable(element, !isNaN($.attr(element, 'tabindex')));
		}
	});
})(jQuery);

//애니메이트숫자
//animateNumber('.number','123',1000,true,ture,1000);
var animateNumber = function(target,number,speed,isComma,useScroll,setTime){
	return $(target).each(function(){
		var $this = $(this);
		if(number == '')number = $this.text();
		var $number = onlyNumber(number);
		if(speed == undefined)speed = 500;
		if(isComma == undefined)isComma = false;
		if(useScroll == undefined)useScroll = false;
		if(setTime == undefined)setTime = false;
		var animateInit = function(){
			$({now:0}).stop(true,false).animate({now:$number},{
				duration: speed,
				step: function(now,e){
					if(isComma){
						$this.text(addComma(Math.floor(now)));
					}else{
						$this.text(Math.floor(now));
					}
				}
			});
			$this.data('first',false);
		}
		if(useScroll){
			$this.data('first',true);
			$(window).scroll(function(){
				if($this.data('first') && isScreenIn($this) && setTime>0){
					$this.data('first',false);
					setTimeout(function(){
						animateInit();
					},setTime);
				} else if($this.data('first') && isScreenIn($this)){
					animateInit();
				}
			});
			$(window).scroll();
		}else{
			animateInit();
		}
	});
};
//숫자만
var onlyNumber = function(num){
	return num.toString().replace(/[^0-9]/g,'');
};

//콤마넣기
var addComma = function(num){
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
};

//콤마빼기
var removeComma = function(num){
	return num.toString().replace(/,/gi,'');
};

function updateTextView(_obj){
  var num = getNumber(_obj.val());
  if(num==0 && _obj.hasClass('zero')){
    _obj.val('0');
  }else if(num==0){
   _obj.val('');
  }else{
    _obj.val(num.toLocaleString());
  }
}

function getNumber(_str){
  var arr = _str.split('');
  var out = new Array();
  for(var cnt=0;cnt<arr.length;cnt++){
    if(isNaN(arr[cnt])==false){
      out.push(arr[cnt]);
    }
  }
  return Number(out.join(''));
}

//스크린안에 있는지 확인
var isScreenIn = function(target, add){
	if(add == undefined)add = 0;
	var $window = $(window),
		$wHeight = $window.height()+add,
		$scrollTop = $window.scrollTop(),
		$winBottom = ($scrollTop + $wHeight);
	var $el = $(target),
		$elHeight = $($el).outerHeight(),
		$elTop = $($el).offset().top,
		$elCenter = $elTop + ($elHeight/2),
		$elBottom = $elTop + $elHeight;

	if(($elCenter >= $scrollTop) && ($elCenter <= $winBottom)){
		return true;
	}else{
		return false;
	}
}
//scroll motion
$.fn.scrollAni = function(){
	return this.each(function(){
		var $this = $(this), $tab2 = $this.closest('.tab_panel').siblings('.tabmenu2'), _add = 0;
		if($tab2.length)_add = $tab2.height()+40;
		$(window).scroll(function(){
			if(isScreenIn($this, _add)){
				$this.addClass('animated');
			}
		});
		$(window).scroll();
	});
};
//chart
var chartV = function(){
	var $chart = $('.chart_item_v');
	$chart.each(function(e){
		var $target = $(this),
			$tag = $target.find('.tag'),
			$bar = $target.find('.bar span'),
			_per = $target.find('.bar').attr('per');
		if(_per>=30&&_per<=99){
			$tag.text('양호');
			$target.addClass('c2');
		} else if(_per<30){
			$tag.text('부족');
			$target.addClass('c3');
		} else {
			$tag.text('충분');
			$target.addClass('c1');
		}
		$target.data('first',true);
		$(window).scroll(function(){
			if(isScreenIn($target)){
				$target.data('first',false);
				$target.addClass('animated');
				$bar.css('height',_per+'%');
			}
		});
	});
	$(window).scroll();
};
var chartH = function(){
	var $chart = $('.chart_item_h');
	$chart.each(function(e){
		var $target = $(this);
		var $bar = $(this).find('.bar span');
		var $my = $(this).find('.my_amount').text().replace(/[^0-9]/g,"");
		var $total = $(this).find('.total_amount').text().replace(/[^0-9]/g,"");
		var _per = Math.min(100, Math.floor(($my/$total)*100));
		if(_per>=30&&_per<=99){
			$target.addClass('c2');
		} else if(_per<30){
			$target.addClass('c3');
		} else {
			$target.addClass('c1');
		}
		$target.data('first',true);
		$(window).scroll(function(){
			if(isScreenIn($target) && $target.closest('.swiper-slide-active').length){
				$target.data('first',false);
				$target.addClass('animated');
				$bar.css('width',Math.ceil(_per)+'%');
			}
		});
	});
	$(window).scroll();
};
//랜덤값 추출
var randomNumber = function(min,max,point){
	return ((Math.random() * (max-min)) + min).toFixed(point);
};
/* ***********************************************
 * Particle
*********************************************** */
var particle = function(wrap){
	$(wrap).each(function(){
		var $this = $(this),
			$itemLength = 10,
			rdLeft, rdTop, rdDelay, rdSpeed,childAry,rdType,rdChild,rdRotate
			$html ='',
			rdLeftAry = [],
			animationName1 = 'comAniBalloon';

		$this.html('');

		for(var i = 0; i < $itemLength;i++){
			rdSize = randomNumber(1,3,0);
			rdColor = (i%3) + 1;
			rdDelay = randomNumber(0,10,0) * 200;
			rdDirection = randomNumber(1,2,0);
			rdSpeed = randomNumber(10,15,0) * 200;
			rdLeft = randomNumber(1,15,0) * 6;
			if(rdLeft < 25){
				rdTop = randomNumber(12,18,0) * 5;
			}else if(rdLeft > 75){
				rdTop = randomNumber(3,18,0) * 5;
			}else{
				rdTop = randomNumber(3,8,0) * 5;
			}

			if(rdLeftAry.indexOf(rdLeft) >= 0 || rdLeft == ''){		//left 랜덤값 겹치지않게
				i--;
			}else{
				rdLeftAry.push(rdLeft);
				childAry = ['circle','line'];
				rdType = randomNumber(1,3,0);
				rdChild = randomNumber(0,1,0);
				rdSpeed = rdSpeed*4;

				$html = '<span class="item color'+rdColor+' size'+rdSize+'" style="left:'+rdLeft+'%;top:'+rdTop+'%;">';
					$html += '<span class="'+childAry[rdChild]+'" style="';
						$html += '-webkit-animation:'+animationName1+rdType+' '+rdSpeed+'ms infinite '+rdDelay+'ms;';
						$html += 'animation:'+animationName1+rdType+' '+rdSpeed+'ms infinite '+rdDelay+'ms;';
					$html += '"></span>';
				$html += '</span>';
				$this.prepend($html);
			}
		}
	});
};
/* ***********************************************
 * keypad detect
*********************************************** */
var originalPotion = false;
function applyAfterResize() {
    if ($('html').hasClass('android')) {
        if (originalPotion !== false) {
            var wasWithKeyboard = $('html').hasClass('keypad_open');
            var nowWithKeyboard = false;
			if (originalPotion !== $(window).width() + $(window).height()) nowWithKeyboard = true;
            $('html').toggleClass('keypad_open', nowWithKeyboard);
        }
   }
}
$(window).on('resize orientationchange', function(){
    applyAfterResize();
});