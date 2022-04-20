if( publishIsHome == undefined) var publishIsHome = false;
if( $("#popupAlert").length == 0 ){
	var hima = {
		ui : {
			_popupCnt : 0
		}
	};
	var bizcommon = {
		_progressCnt : 0
	};
}

//SM-N910S : 갤노트4 SKT
/* 푸터 변경으로 인해 삭제 (문제없을시 완전 삭제)
var ua = navigator.userAgent;
	//ua = "Mozilla/5.0 (Linux;Android 4.4.4;SM-N910S Build/KTU84P) AppleWebki/537.36 (KHTML, like Gecko) Version/4.0 Chrome/33.0.0.0 Mobile Safari/537.36 Hone Mobile/2.0(Hanwha S&C)"
var regex = /Android(.*);\s*(.*)SM-N910[sklSKL]\sBuild/;
var match = regex.exec(ua);
if(match){
	$("footer .footer div > ul > li a").css("line-height","70px"); // +5 !
	$("footer .footer div > ul > li:nth-child(3) a").css("line-height","140px"); //+12
	$(".main_list li:lt(5) a span").css("line-height","108px"); //+10
	$(".main_list li:nth-child(6) a span").css("line-height","33px"); //+5 !
}
*/

/* ***********************************************
 * SCROLL END EVENT
 * 스크롤 이벤트
*********************************************** */
$.fn.scrollEnd = function(callback,timeout){
	$(this).scroll(function(){
		var $this = $(this);
		if($this.data('scrollTimeout')){
			clearTimeout($this.data('scrollTimeout'));
		}
		$this.data('scrollTimeout', setTimeout(callback,timeout));
	});
};

/* ***********************************************
 * Ui navi event
 * 전체메뉴 클릭 이벤트
*********************************************** */
function uiNaviTab(el){
	if(!$(el).hasClass('active')){
		var n = $(el).attr('class').replace('t_tabs','');
		$('[class^=t_tabn]').hide();
		$('.t_tabn'+n).show();
		$("[class^=t_tabs]").removeClass("active");
		$(el).addClass("active");
	}
}

/* ***********************************************
 * Ui TAB
 * 탭 버튼 컨텐츠
*********************************************** */
var tab = {
	$tab_btn : '',
	$tab_btn_all : '',
	$tab_con : '',
	$tab_con_all : '',
	$tab_class : '',
	set : function(){
		$tab_class = 'active';
	},
	/* --------------------------------------------------------------------------------------------
		tab.init('탭버튼 영역') : 로드 후 첫 컨텐츠 open
	-------------------------------------------------------------------------------------------- */
	init : function(el){
		tab.set();
		
		$tab_btn = $(el).find('> li');
		
		if(!$tab_btn.hasClass($tab_class) || $tab_btn.eq(0).hasClass($tab_class)) {
			$tab_btn.eq(0).addClass($tab_class);
			$tab_con = $(el).next().find('> div').eq(0);
		}else{
			$tab_con = $($tab_btn.filter('.' + $tab_class).find('> a').attr('href'));
		}
		
		$tab_con.show();
	},
	/* --------------------------------------------------------------------------------------------
		tab.open(this) : 클릭이벤트
	-------------------------------------------------------------------------------------------- */
	open : function(el) {
		tab.set();
		
		$tab_btn_all = $(el).parents('ul').find('li');
		$tab_con = $(el).attr('href');
		$tab_con_all = $($tab_con).parent().find('> div');

		$tab_btn_all.removeClass($tab_class);
		$(el).parent().addClass($tab_class);
		
		$tab_con_all.hide();
		$($tab_con).show();
	}
};

/* ***********************************************
 * Ui Toggle
 * 토글 유형
*********************************************** */
var uiToggleCont = {
	$tog_all : '',
	$tog_btn : '',
	$tog_btn_all : '',
	$tog_cont : '',
	$tog_class_open : '',
	$tog_class_on : '',
	$tog_data_btn : '',
	$tog_data_wrap : '',
	$tog_li : '',
	$tog_wrap : '',
	set:function(){
		$tog_class_open = 'open';
		$tog_class_on = 'on';
		$tog_data_btn = '[data-ui-toggle="btn"]';
		$tog_data_wrap = '[data-ui-toggle="wrap"]';
	},
	/* --------------------------------------------------------------------------------------------
		uiToggleCont.init('토글 영역') : 오픈할 컨텐츠가 존재할 경우
	-------------------------------------------------------------------------------------------- */
	init:function(el){
		uiToggleCont.set();
		$tog_li = $(el).find('>li');
		if($tog_li.filter('.'+$tog_class_on).length > 0) {
			$tog_li.filter('.'+$tog_class_on).find('.heading > a').addClass($tog_class_open);
			$tog_li.filter('.'+$tog_class_on).find('> .con').addClass($tog_class_open);
		};
	},
	
	/* --------------------------------------------------------------------------------------------
		uiToggleCont.click(this) : 클릭이벤트
	-------------------------------------------------------------------------------------------- */
	click:function(el){
		uiToggleCont.set();
		
		$tog_wrap = $(el).parents($tog_data_wrap);
		
		if($(el).hasClass($tog_class_open)){
			uiToggleCont.close(el,$tog_wrap);
		}else{
			if($tog_wrap.is('ol') || $tog_wrap.is('ul')) {
				uiToggleCont.open(el,$tog_wrap);
			}else{
				uiToggleCont.open(el);
			}
		};
	},
	
	/* --------------------------------------------------------------------------------------------
		uiToggleCont.open('토글버튼','토글영역') : 오픈이벤트
	-------------------------------------------------------------------------------------------- */
	open:function(el,wrap){
		uiToggleCont.set();
		
		$tog_all = $(wrap).find(' li > .con');
		$tog_cont = $($(el).attr('href'));
		
		if($(wrap).is('ol') || $(wrap).is('ul')) $tog_btn = $(wrap).find(' li > .heading > a');
		else $tog_btn = $tog_data_btn;
		$tog_btn_all = $(wrap).find($tog_btn);
		
		$tog_btn_all.removeClass($tog_class_open);
		$tog_all.removeClass($tog_class_open);
		$(el).addClass($tog_class_open);
		$tog_cont.addClass($tog_class_open);
		
		if($(wrap).is('ol') || $(wrap).is('ul')) {
			$(wrap).find('>li').removeClass($tog_class_on);
			$(el).parents('li').addClass($tog_class_on);
		};
	},
	
	/* --------------------------------------------------------------------------------------------
		uiToggleCont.loadOpen('컨텐츠ID') : 클릭요소없이 오픈 될 이벤트
	-------------------------------------------------------------------------------------------- */
	loadOpen:function(id){
		uiToggleCont.set();
		
		$tog_wrap = $(id).parents($tog_data_wrap);
		
		uiToggleCont.open('[href="'+id+'"]',$tog_wrap);
	},
	
	/* --------------------------------------------------------------------------------------------
		uiToggleCont.close('토글버튼','토글영역') : 닫기 이벤트
	-------------------------------------------------------------------------------------------- */
	close:function(el,wrap){
		uiToggleCont.set();
		
		$tog_cont = $($(el).attr('href'));
		
		$(el).removeClass($tog_class_open);
		$tog_cont.removeClass($tog_class_open);
		
		if($(wrap).is('ol') || $(wrap).is('ul')) {
			$(el).parents('li').removeClass($tog_class_on);
		};
	}
};

/* ***********************************************
 * UI filter
 * 보험계약조회 > 목록 사용 : uiFilter(this)
*********************************************** */
function uiFilter(el){
	var $btn_filter = $('.ui_filter_wrap dd > button');
	var $btn_close = $('.ui_filter_wrap dt > button');
	$('.ui_filter_wrap').show();
	$btn_filter.off('click').on('click',function(){
		$btn_filter.removeClass();
		$(this).addClass('on');
		$('.ui_filter_wrap').hide();
		$(el).find('>span').text($(this).text());
	});
	$btn_close.on('click',function(){
		$('.ui_filter_wrap').hide();
	});
}

/* ***********************************************
 * UI select box
 * 셀렉트박스 레이어팝업 : UI modal으로 open, close
*********************************************** */
var uiSelectBox = {
	$sel_active : '',
	$sel_cont : '',
	$sel_close : '',
	$sel_el : '',
	$sel_sel : '',

	/* --------------------------------------------------------------------------------------------
		uiSelectBox.init($(this),컨텐츠ID) : 초기설정 
	-------------------------------------------------------------------------------------------- */
	init : function(el,id) {
		$sel_el = el;
		$sel_cont = id;
		$sel_close = $($sel_cont).find('.ui-close');
		
		uiSelectBox.check();
		
		$sel_close.off('click').on('click',function(){
			uiModal.close($sel_close);
		});
	},
	
	/* --------------------------------------------------------------------------------------------
		uiSelectBox.check() : selected 매칭
	-------------------------------------------------------------------------------------------- */
	check : function(){
		$sel_sel = $($sel_el).parent().find('select > option:selected').val();
		$sel_active = $($sel_cont).find('.list_type1 > li > button');
		$sel_active.removeClass('active');
		$($sel_cont).find('.list_type1 > li > button[value="'+$sel_sel+'"]').addClass('active');
		uiSelectBox.click();
	},
	
	/* --------------------------------------------------------------------------------------------
		uiSelectBox.click() : button 클릭 이벤트
	-------------------------------------------------------------------------------------------- */
	click : function() {
		$sel_active.off('click').on('click',function(){
			var $sel_val = $(this).val();
			uiSelectBox.change($sel_val);
		});
	},
	
	/* --------------------------------------------------------------------------------------------
		uiSelectBox.change() : select change 이벤트
	-------------------------------------------------------------------------------------------- */
	change : function(n) {
		//모달팝업 닫기 이벤트
		uiModal.close($sel_close);
		
		//셀렉트내용 변경
		$($sel_el).next('select').change(function(){
			$(this).find('option[value="'+n+'"]').prop('selected', true);
		}).trigger('change');
		
	}
};

/* **********************************************
 * UI modal
 * 모달팝업, 툴팁컨텐츠, 셀렉트박스
*********************************************** */
var uiModal = {
	$pop_bg : '',
	$pop_class : '',
	$pop_data : '',
	$pop_el : '',
	$pop_id : '',
	$pop_num : '',
	$pop_toggle : '',
	$pop_wraper : '',
	$pop_wraper_height : '',
	$win_height : '',
	$win_top : '',
	set : function(){
		$pop_bg = '<div class="modal_bg"></div>';
		$pop_class = 'layer_open';
		$pop_data = 'data-ui-layer';
		$pop_wraper = $('#wraper');
	},
	/* --------------------------------------------------------------------------------------------
		uiModal.init() : 초기설정 : bg 필요 없을 경우 : false
	-------------------------------------------------------------------------------------------- */
	init : function(bg){
		uiModal.set();
		$pop_num = $('['+$pop_data+']').length; // 열려져 있는 팝업의 갯수
		$pop_wraper_height = $pop_wraper.outerHeight(); // 전체 컨텐츠 높이
		$win_height = $(window).height(); //현재 width 의 높이

		$($pop_id).attr($pop_data,$pop_num); //열릴 팝업의 index 적용
		
		if(bg == false) $($pop_id).attr('data-ui-bg','false'); //bg가 필요 없는 객체에 속성 추가
		
		//다중 팝업의 경우 숨김처리, modal bg 1개만 노출
		if($pop_num > 0){
			$('['+$pop_data+'="'+($pop_num-1)+'"]').hide(); //이전 팝업 숨김
			
			//bg가 필요 없는 객체가 제일 먼저 오픈할 경우 : bg 삭제
			if($('['+$pop_data+'="'+$pop_num+'"]').attr('data-ui-bg') == 'false'){
				$('.modal_bg').hide();
			} else {
				$('.modal_bg').show();
			}
			
			if($('['+$pop_data+'="'+($pop_num-1)+'"]').attr('data-ui-bg') == 'false'){
				if(bg != false) {
					if($('.modal_bg').length == 0) $pop_wraper.append($pop_bg);
				}
			}
		}else{
			$win_top = $(window).scrollTop(); //현재 scroll top 위치 한번만 체크
			if(bg != false) $pop_wraper.append($pop_bg);
		}
		
		//바닥페이지 스크롤 막음.
		if($pop_wraper_height > $win_height){
			$pop_wraper.addClass('fixed');
			if($win_top > 0) $pop_wraper.css('top','-' + $win_top + 'px');
		}
	},
	
	/* --------------------------------------------------------------------------------------------
		uiModal.loadopen('팝업ID',false) : 강제 레이어팝업 오픈 : bg 필요 없을 경우 : false
	-------------------------------------------------------------------------------------------- */
	loadopen : function(id,bg){
		$pop_id = id;
		uiModal.init(bg);
		$($pop_id).addClass($pop_class);
	},
	
	/* --------------------------------------------------------------------------------------------
		uiModal.open(this,true) : 오픈이벤트 : tooltip의 경우 : true
	-------------------------------------------------------------------------------------------- */
	open : function(el,tooltip) {
		uiModal.set();
		
		$pop_el = el;
		
		//팝업 ID : a가 아닐경우 data-href로 팝업 ID 정함.
		if($($pop_el).is('[href]')) $pop_id = $($pop_el).attr('href');
		else $pop_id = $($pop_el).attr('data-href');
		
		//툴팁이 아닐 경우 모달팝업 초기 설정 띄움
		if(tooltip != true) {
			uiModal.init();
			$pop_toggle = false;
		}else{
			$pop_toggle = true;
			if($($pop_id).hasClass('tooltip_cont')) $('.tooltip_cont').removeClass($pop_class);
		}
		
		$($pop_id).addClass($pop_class);

		//셀렉트박스의 경우
		if($($pop_el).is('[data-select]')) uiSelectBox.init($(el),$pop_id);
		
	},
	
	/* --------------------------------------------------------------------------------------------
		uiModal.close(this,팝업ID) : 닫기 이벤트
	-------------------------------------------------------------------------------------------- */
	close : function(el,id) {
		$pop_el = el;
		uiModal.set();
		
		//닫기 객체 정의
		if(!id=='') {
			$pop_id = $(id);
		}else{
			$pop_id = $($pop_el).parents('.'+$pop_class);
		}

		// 열려져 있는 팝업의 갯수
		$pop_num = $('['+$pop_data+']').length;

		//열려져 있는 팝업 모두 닫기
		if($($pop_el).attr('data-modal') == 'ui_all_close'){
			$('.'+$pop_class).removeAttr('style').removeAttr($pop_data).removeClass($pop_class);
			if($('.modal_bg').length == 1) $('.modal_bg').fadeOut(50,function(){$(this).remove();});
			$pop_wraper.removeClass('fixed').removeAttr('style');
			if($pop_toggle != true) $(window).scrollTop($win_top);
		}else{
			//열려져 있는 팝업의 갯수 1 보다 많을 경우
			if($pop_num > 1){
				var $prevEl = $($pop_id).attr($pop_data);
				
				//bg가 필요 없는 객체가 열릴 경우 : bg 삭제
				if($('['+$pop_data+'="'+($prevEl-1)+'"]').attr('data-ui-bg') == 'false') $('.modal_bg').hide();
				else $('.modal_bg').show();
				
				$('['+$pop_data+'="'+($prevEl-1)+'"]').show().removeAttr('style');
			}
			
			//열려져 있는 팝업의 갯수 1와 같을 경우
			if($pop_num == 1){
				if($('.modal_bg').length == 1) $('.modal_bg').fadeOut(50,function(){$(this).remove();});
				$pop_wraper.removeClass('fixed').removeAttr('style');
				$(window).scrollTop($win_top);
			}
			
			$pop_id.removeAttr($pop_data).removeClass($pop_class);
		}
	}
};

/* ***********************************************
 * Ui Datepicker
 * ui.lib.js 
 * e.datepicker._shouldFocusInput(i)&&i.input.focus() 주석표시
 * autofocus 막음.
 * data-ui-mindate : 최소일
 * data-ui-maxdate : 최대일
*********************************************** */
function uiDatepicker(){
	var prevYrBtn = $('<button type="button" class="ui-datepicker-prev-y" title="이전년도"><span>이전년도</span></button>');
	var nextYrBtn = $('<button type="button" class="ui-datepicker-next-y" title="다음년도"><span>다음년도</span></button>');
	var today = new Date();
	var date = today.getDate();
	var month = today.getMonth()+1;
	var year = today.getFullYear();
	var viewDate;
	function getTodayLabel(){
		var week = new Array('일요일','월요일','화요일','수요일','목요일','금요일','토요일');
		var today = new Date().getDay();
		var todayLabel = week[today];
		return todayLabel;
	}
	$(".form_date").each(function(){
		if(!$(this).attr("id")){
			var $that= $(this);
			var $buttonText = $that.find(">.hd").text();
			if($(this).find("input.text").prop('disabled')) {
				$(this).find("input.text").datepicker('option','disabled',true);
			}else {
				if($that.find("input.text").length>1){
					/* ----------------------------------------------------------------------
						시작일, 종료일 경우
					------------------------------------------------------------------------ */
					var $minDate1 = '-10y';
					var $minDate2 = '-10y';
					var $maxDate1 = '+0y';
					var $maxDate2 = '+1y';
					var $defaultDate = new Date();
					if($(this).find("input.text").eq(0).is('[data-ui-mindate]')) $minDate1 = $(this).find("input.text").eq(0).attr('data-ui-mindate');
					if($(this).find("input.text").eq(0).is('[data-ui-maxdate]')) $maxDate1 = $(this).find("input.text").eq(0).attr('data-ui-maxdate');
					if($(this).find("input.text").eq(1).is('[data-ui-mindate]')) $minDate2 = $(this).find("input.text").eq(1).attr('data-ui-mindate');
					if($(this).find("input.text").eq(1).is('[data-ui-maxdate]')) $maxDate2 = $(this).find("input.text").eq(1).attr('data-ui-maxdate');
					$(this).find("input.text").eq(0).datepicker({
						dateFormat : "yy.mm.dd",
						showOn: "button",
						showOtherMonths : true,
						showMonthAfterYear : true,
						showButtonPanel: true,
						changeYear : true,
						changeMonth : true,
						minDate : $minDate1,
						maxDate : $maxDate1,
						dayNamesMin : ['일','월','화','수','목','금','토'],
						monthNamesShort : ['01','02','03','04','05','06','07','08','09','10','11','12'],
						buttonText : $buttonText+" 검색시작일 달력으로 선택<span></span>",
						beforeShow: function(el,ob){
							Body.lock();
							var $cal = $('#'+ob.dpDiv[0].id);
							$('body').append('<div class="datepicker-dimmed"></div>');
							setTimeout(function(){
								var $header = $cal.find('.ui-datepicker-header'),
									$selected = $cal.find('.ui-datepicker-year option:selected'),
									selYear = $cal.find('.ui-datepicker-year option:selected').val(),
									selMonth = $cal.find('.ui-datepicker-month option:selected').text(),
									selDate = $cal.find('.ui-state-active').text(),
									dateIndex = $cal.find('.ui-state-active').parent().index(),
									selWeek = $cal.find('th').eq(dateIndex).find('span').text();
								(!$cal.find('.ui-state-active').length) ? viewDate = year+'년 '+month+'월 '+date+'일 '+getTodayLabel() : viewDate = selYear+'년 '+selMonth+'월 '+selDate+'일 '+selWeek+'요일';
								$header.find('.ui-datepicker-prev').before(prevYrBtn);
								$header.find('.ui-datepicker-next').after(nextYrBtn);
								$cal.find('.ui-datepicker-year').wrap('<div class="sel_year"></div>');
								$cal.find('.ui-datepicker-month').wrap('<div class="sel_month"></div>');
								$cal.find('.ui-datepicker-year').after('<span>년</span>');
								$cal.find('.ui-datepicker-month').after('<span>월</span>');
								$cal.prepend('<div class="ui-datepicker-header-today">'+viewDate+'</div>');
								prevYrBtn.unbind('click').bind('click',function(){
									var _current = Number($selected.val());
									if($selected.prev().val()>0){
										$cal.find('.ui-datepicker-year').val(_current-1);
										document.querySelector('.ui-datepicker-year').dispatchEvent(new Event('change'));
									}
									
								});
								nextYrBtn.unbind('click').bind('click',function(){
									var _current = Number($selected.val());
									if($selected.next().val()>0){
										$cal.find('.ui-datepicker-year').val(_current+1);
										document.querySelector('.ui-datepicker-year').dispatchEvent(new Event('change'));
									}
								});
								$('.ui-datepicker-prev, .ui-datepicker-next').attr('href','#');
								$('.datepicker-dimmed').addClass('active');
								$cal.addClass('active').attr('tabindex',0).focus();
								Dialog.focusMove($cal);
							},1);
						},
						onChangeMonthYear: function(y,m,ob){
							//달력 바뀔때
							var $cal = $('#'+ob.dpDiv[0].id);
							setTimeout(function(){
								var $header = $cal.find('.ui-datepicker-header'),
									$selected = $cal.find('.ui-datepicker-year option:selected');
								$header.find('.ui-datepicker-prev').before(prevYrBtn);
								$header.find('.ui-datepicker-next').after(nextYrBtn);
								$cal.find('.ui-datepicker-year').wrap('<div class="sel_year"></div>');
								$cal.find('.ui-datepicker-month').wrap('<div class="sel_month"></div>');
								$cal.find('.ui-datepicker-year').after('<span>년</span>');
								$cal.find('.ui-datepicker-month').after('<span>월</span>');
								$cal.prepend('<div class="ui-datepicker-header-today">'+viewDate+'</div>');
								prevYrBtn.unbind('click').bind('click',function(){
									var _current = Number($selected.val());
									if($selected.prev().val()>0){
										$cal.find('.ui-datepicker-year').val(_current-1);
										document.querySelector('.ui-datepicker-year').dispatchEvent(new Event('change'));
									}
									
								});
								nextYrBtn.unbind('click').bind('click',function(){
									var _current = Number($selected.val());
									if($selected.next().val()>0){
										$cal.find('.ui-datepicker-year').val(_current+1);
										document.querySelector('.ui-datepicker-year').dispatchEvent(new Event('change'));
									}
								});
								$('.ui-datepicker-prev, .ui-datepicker-next').attr('href','#');
								$cal.focus();
								Dialog.focusMove($cal);
							},1);
						},
						onSelect: function(d,ob){
							Body.unlock();
							var $cal = $('#'+ob.dpDiv[0].id);
							$('.datepicker-dimmed').removeClass('active');
							$cal.removeClass('active').removeAttr('tabindex');
							setTimeout(function(){
								$('.datepicker-dimmed').remove();
							},500);
							var $parents = $(this).closest('.invalid');
							if($parents.length)$parents.removeClass('invalid');
							if($(this).hasClass('on_select'))dateOnSelect();
						},
						onClose: function(selectedDate,ob) {
							Body.unlock();
							var $cal = $('#'+ob.dpDiv[0].id);
							$('.datepicker-dimmed').removeClass('active');
							$cal.removeClass('active').removeAttr('tabindex');
							setTimeout(function(){
								$('.datepicker-dimmed').remove();
							},500);
							var maxDate3, myDate;
							var date = parseInt($maxDate2.replace(/[^0-9]/g,'') - 1);
							if($maxDate2.indexOf('d') != -1){
								myDate = new Date(selectedDate);
								maxDate3 = myDate.getDate();
								myDate.setDate(maxDate3 + date);
							}				
							$that.find("input.text").eq(1).datepicker( "option", "minDate", selectedDate);
							$that.find("input.text").eq(1).datepicker( "option", "maxDate", myDate);
							$(this).removeClass("blank");
						}
					});
					$(this).find("input.text").eq(1).datepicker({
						dateFormat : "yy.mm.dd",
						showOn: "button",
						showOtherMonths : true,
						showMonthAfterYear : true,
						showButtonPanel: true,
						changeYear : true,
						changeMonth : true,
						defaultDate : $defaultDate,
						minDate : $minDate2,
						maxDate : $maxDate2,
						dayNamesMin : ['일','월','화','수','목','금','토'],
						monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'],
						monthNamesShort : ['01','02','03','04','05','06','07','08','09','10','11','12'],
						buttonText : $buttonText+"검색종료일 달력으로 선택<span></span>",
						beforeShow: function(el,ob){
							Body.lock();
							var $cal = $('#'+ob.dpDiv[0].id);
							$('body').append('<div class="datepicker-dimmed"></div>');
							setTimeout(function(){
								var $header = $cal.find('.ui-datepicker-header'),
									$selected = $cal.find('.ui-datepicker-year option:selected'),
									selYear = $cal.find('.ui-datepicker-year option:selected').val(),
									selMonth = $cal.find('.ui-datepicker-month option:selected').text(),
									selDate = $cal.find('.ui-state-active').text(),
									dateIndex = $cal.find('.ui-state-active').parent().index(),
									selWeek = $cal.find('th').eq(dateIndex).find('span').text();
								(!$cal.find('.ui-state-active').length) ? viewDate = year+'년 '+month+'월 '+date+'일 '+getTodayLabel() : viewDate = selYear+'년 '+selMonth+'월 '+selDate+'일 '+selWeek+'요일';
								$header.find('.ui-datepicker-prev').before(prevYrBtn);
								$header.find('.ui-datepicker-next').after(nextYrBtn);
								$cal.find('.ui-datepicker-year').wrap('<div class="sel_year"></div>');
								$cal.find('.ui-datepicker-month').wrap('<div class="sel_month"></div>');
								$cal.find('.ui-datepicker-year').after('<span>년</span>');
								$cal.find('.ui-datepicker-month').after('<span>월</span>');
								$cal.prepend('<div class="ui-datepicker-header-today">'+viewDate+'</div>');
								prevYrBtn.unbind('click').bind('click',function(){
									var _current = Number($selected.val());
									if($selected.prev().val()>0){
										$cal.find('.ui-datepicker-year').val(_current-1);
										document.querySelector('.ui-datepicker-year').dispatchEvent(new Event('change'));
									}
									
								});
								nextYrBtn.unbind('click').bind('click',function(){
									var _current = Number($selected.val());
									if($selected.next().val()>0){
										$cal.find('.ui-datepicker-year').val(_current+1);
										document.querySelector('.ui-datepicker-year').dispatchEvent(new Event('change'));
									}
								});
								$('.ui-datepicker-prev, .ui-datepicker-next').attr('href','#');
								$('.datepicker-dimmed').addClass('active');
								$cal.addClass('active').attr('tabindex',0).focus();
								Dialog.focusMove($cal);
							},1);
						},
						onChangeMonthYear: function(y,m,ob){
							//달력 바뀔때
							var $cal = $('#'+ob.dpDiv[0].id);
							setTimeout(function(){
								var $header = $cal.find('.ui-datepicker-header'),
									$selected = $cal.find('.ui-datepicker-year option:selected');
								$header.find('.ui-datepicker-prev').before(prevYrBtn);
								$header.find('.ui-datepicker-next').after(nextYrBtn);
								$cal.find('.ui-datepicker-year').wrap('<div class="sel_year"></div>');
								$cal.find('.ui-datepicker-month').wrap('<div class="sel_month"></div>');
								$cal.find('.ui-datepicker-year').after('<span>년</span>');
								$cal.find('.ui-datepicker-month').after('<span>월</span>');
								$cal.prepend('<div class="ui-datepicker-header-today">'+viewDate+'</div>');
								prevYrBtn.unbind('click').bind('click',function(){
									var _current = Number($selected.val());
									if($selected.prev().val()>0){
										$cal.find('.ui-datepicker-year').val(_current-1);
										document.querySelector('.ui-datepicker-year').dispatchEvent(new Event('change'));
									}
									
								});
								nextYrBtn.unbind('click').bind('click',function(){
									var _current = Number($selected.val());
									if($selected.next().val()>0){
										$cal.find('.ui-datepicker-year').val(_current+1);
										document.querySelector('.ui-datepicker-year').dispatchEvent(new Event('change'));
									}
								});
								$('.ui-datepicker-prev, .ui-datepicker-next').attr('href','#');
								$cal.focus();
								Dialog.focusMove($cal);
							},1);
						},
						onSelect: function(d,ob){
							Body.unlock();
							var $cal = $('#'+ob.dpDiv[0].id);
							$('.datepicker-dimmed').removeClass('active');
							$cal.removeClass('active').removeAttr('tabindex');
							setTimeout(function(){
								$('.datepicker-dimmed').remove();
							},500);
							var $parents = $(this).closest('.invalid');
							if($parents.length)$parents.removeClass('invalid');
							if($(this).hasClass('on_select'))dateOnSelect();
						},
						onClose: function(selectedDate,ob) {
							Body.unlock();
							var $cal = $('#'+ob.dpDiv[0].id);
							$('.datepicker-dimmed').removeClass('active');
							$cal.removeClass('active').removeAttr('tabindex');
							setTimeout(function(){
								$('.datepicker-dimmed').remove();
							},500);
							$that.find("input.text").eq(0).datepicker( "option", "maxDate", selectedDate );
							$(this).removeClass("blank");
						}
					});
				}else{
					/* ----------------------------------------------------------------------
						단일선택
					------------------------------------------------------------------------ */
					var $maxDate = '+100y';
					var $minDate = '-100y';
					var $defaultDate = new Date();
					if($(this).find("input.text").eq(0).is('[data-ui-maxdate]')) $maxDate = $(this).find("input.text").eq(0).attr('data-ui-maxdate');
					if($(this).find("input.text").eq(0).is('[data-ui-mindate]')) $minDate = $(this).find("input.text").eq(0).attr('data-ui-mindate');
					if($(this).find("input.text").eq(0).is('[data-ui-default]')) $defaultDate = new Date($(this).find("input.text").eq(0).attr('data-ui-default'));
					$that.find("input.text").eq(0).datepicker({
						dateFormat : "yy.mm.dd",
						showOn: "button",
						showOtherMonths : true,
						showMonthAfterYear : true,
						showButtonPanel: true,
						changeYear : true,
						changeMonth : true,
						yearRange:'-100:+100',
						selectOtherMonths: true,
						defaultDate : $defaultDate,
						minDate : $minDate,
						maxDate : $maxDate,
						dayNamesMin : ['일','월','화','수','목','금','토'],
						monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'],
						monthNamesShort : ['01','02','03','04','05','06','07','08','09','10','11','12'],
						buttonText : $buttonText+" 달력으로 선택<span></span>",
						beforeShow: function(el,ob){
							Body.lock();
							var $cal = $('#'+ob.dpDiv[0].id);
							$('body').append('<div class="datepicker-dimmed"></div>');
							setTimeout(function(){
								var $header = $cal.find('.ui-datepicker-header'),
									$selected = $cal.find('.ui-datepicker-year option:selected'),
									selYear = $cal.find('.ui-datepicker-year option:selected').val(),
									selMonth = $cal.find('.ui-datepicker-month option:selected').text(),
									selDate = $cal.find('.ui-state-active').text(),
									dateIndex = $cal.find('.ui-state-active').parent().index(),
									selWeek = $cal.find('th').eq(dateIndex).find('span').text();
								(!$cal.find('.ui-state-active').length) ? viewDate = year+'년 '+month+'월 '+date+'일 '+getTodayLabel() : viewDate = selYear+'년 '+selMonth+'월 '+selDate+'일 '+selWeek+'요일';
								$header.find('.ui-datepicker-prev').before(prevYrBtn);
								$header.find('.ui-datepicker-next').after(nextYrBtn);
								$cal.find('.ui-datepicker-year').wrap('<div class="sel_year"></div>');
								$cal.find('.ui-datepicker-month').wrap('<div class="sel_month"></div>');
								$cal.find('.ui-datepicker-year').after('<span>년</span>');
								$cal.find('.ui-datepicker-month').after('<span>월</span>');
								$cal.prepend('<div class="ui-datepicker-header-today">'+viewDate+'</div>');
								prevYrBtn.unbind('click').bind('click',function(){
									var _current = Number($selected.val());
									if($selected.prev().val()>0){
										$cal.find('.ui-datepicker-year').val(_current-1);
										document.querySelector('.ui-datepicker-year').dispatchEvent(new Event('change'));
									}
									
								});
								nextYrBtn.unbind('click').bind('click',function(){
									var _current = Number($selected.val());
									if($selected.next().val()>0){
										$cal.find('.ui-datepicker-year').val(_current+1);
										document.querySelector('.ui-datepicker-year').dispatchEvent(new Event('change'));
									}
								});
								$('.ui-datepicker-prev, .ui-datepicker-next').attr('href','#');
								$('.datepicker-dimmed').addClass('active');
								$cal.addClass('active').attr('tabindex',0).focus();
								Dialog.focusMove($cal);
							},1);
						},
						onChangeMonthYear: function(y,m,ob){
							//달력 바뀔때
							var $cal = $('#'+ob.dpDiv[0].id);
							setTimeout(function(){
								var $header = $cal.find('.ui-datepicker-header'),
									$selected = $cal.find('.ui-datepicker-year option:selected');
								$header.find('.ui-datepicker-prev').before(prevYrBtn);
								$header.find('.ui-datepicker-next').after(nextYrBtn);
								$cal.find('.ui-datepicker-year').wrap('<div class="sel_year"></div>');
								$cal.find('.ui-datepicker-month').wrap('<div class="sel_month"></div>');
								$cal.find('.ui-datepicker-year').after('<span>년</span>');
								$cal.find('.ui-datepicker-month').after('<span>월</span>');
								$cal.prepend('<div class="ui-datepicker-header-today">'+viewDate+'</div>');
								prevYrBtn.unbind('click').bind('click',function(){
									var _current = Number($selected.val());
									if($selected.prev().val()>0){
										$cal.find('.ui-datepicker-year').val(_current-1);
										document.querySelector('.ui-datepicker-year').dispatchEvent(new Event('change'));
									}
									
								});
								nextYrBtn.unbind('click').bind('click',function(){
									var _current = Number($selected.val());
									if($selected.next().val()>0){
										$cal.find('.ui-datepicker-year').val(_current+1);
										document.querySelector('.ui-datepicker-year').dispatchEvent(new Event('change'));
									}
								});
								$('.ui-datepicker-prev, .ui-datepicker-next').attr('href','#');
								$cal.focus();
								Dialog.focusMove($cal);
							},1);
						},
						onSelect: function(d,ob){
							Body.unlock();
							var $cal = $('#'+ob.dpDiv[0].id);
							$('.datepicker-dimmed').removeClass('active');
							$cal.removeClass('active').removeAttr('tabindex');
							setTimeout(function(){
								$('.datepicker-dimmed').remove();
							},500);
							var $parents = $(this).closest('.invalid');
							if($parents.length)$parents.removeClass('invalid');
							if($(this).hasClass('on_select'))dateOnSelect();
							if($(this).hasClass('chk_disabled'))$('.next_disabled').removeAttr('disabled');
						},
						onClose: function(d,ob){
							Body.unlock();
							var $cal = $('#'+ob.dpDiv[0].id);
							$('.datepicker-dimmed').removeClass('active');
							$cal.removeClass('active').removeAttr('tabindex');
							setTimeout(function(){
								$('.datepicker-dimmed').remove();
							},500);
						}
					});
				}
			}
		}
	});
}

/* ***********************************************
 * Ui Slider
 * Swiper.js 사용
*********************************************** */
var uiSlider = {
	$slider : '',
	init:function(slider){
		if(slider == 'slider1'){
			/* ----------------------------------------------------------------------
				uiSlider.init('slider1')
				*기본셋팅 : centeredSlides로 지정, width는 auto, slide간격 10, pagination 있음.
				*data-slider-option=center : $initialSlide = slide.length / 2
//				*data-slider-option=none : Swiper 기본으로 변경
			------------------------------------------------------------------------ */
			$('[data-slider="slider1"]').each(function(index){
				var $initialSlide = 0;
				var $slidesPerView = 'auto';
				var $spaceBetween = 10;
				var $centeredSlides = true;
				var $slideNum = $(this).find(".ui_sliderwrap > .ui_slider").length;
				if($(this).attr('data-slider-option') == 'center') $initialSlide = Math.floor($slideNum/2);
				if($(this).attr('data-slider-option') == 'none') {
					$slidesPerView = 1;
					$spaceBetween = 0;
					$centeredSlides = false;
				}
				if($slideNum>1){
					$slider = new Swiper('[data-slider="slider1"]', {
						wrapperClass : 'ui_sliderwrap',
						slideClass: 'ui_slider',
						slidesPerView: $slidesPerView,
						spaceBetween: $spaceBetween,
						initialSlide : $initialSlide,
						centeredSlides: $centeredSlides,
						slideActiveClass: 'active',
						bulletClass: 'bul',
						bulletActiveClass: 'active',
						buttonDisabledClass: 'disabled',
						paginationCurrentClass: 'current',
						pagination: '.ui_paging'
					});
				}
			});
		}else if (slider == 'slider2'){
			/* ----------------------------------------------------------------------
				uiSlider.init('slider2')
				*기본셋팅 : prevButton, nextButton, zoom
				*서류상세보기, 제출상세확인
			------------------------------------------------------------------------ */
			var Android = navigator.userAgent.match(/Android/i);
			var lazy = true;
			if(Android == "Android") lazy = false;
			$slider = new Swiper('[data-slider="slider2"]', {
				wrapperClass : 'ui_sliderwrap',
				slideClass: 'ui_slider',
				prevButton : '.ui_prev',
				nextButton : '.ui_next',
				speed: 400,
				lazyLoading : lazy,
				loop: false,
				zoom:true
			});
		}
	},
	move:function(num){
		$slider.slideTo(num);
	}
};

/* ***********************************************
	UI getParameter
	큰글씨 페이지
	console.log(getParameter('class'));
*********************************************** */
function getParameter(paramName){
	var strURL = location.search;
	var tmpParam = strURL.substring(1).split("&");
	if(strURL.substring(1).length > 0){
		var Params = new Array;
		for(var i=0;i<tmpParam.length;i++){
			Params = tmpParam[i].split("=");
			if(paramName == Params[0]){
				return Params[1];
			}
		}
	}
	return "";
}
var zoom = getParameter('class');
var htmlstr = window.document.getElementsByTagName('html');
$(htmlstr).addClass(zoom);

/* ***********************************************
 * Ui input checked
 * 카드형리스트 체크박스 선택 시 
*********************************************** */
$(document).on('click', '.box_managelist .label_form input', function(){
	var $that = $(this);
	if ($that.is('[type="checkbox"]')) {
		if($that.prop('checked')) {
			$that.parents('li').addClass('on');
			$that.parents('li').find('.sub_cont2').addClass('open');
		}
		else {
			$that.parents("li").removeClass('on');
			$that.parents('li').find('.sub_cont2').removeClass('open');
		}
	} else if ($that.is('input[type="radio"]')) {
		$('input[name="'+ $that.attr('name') +'"]').each(function() {
			if ($(this).prop('checked')) {
				$(this).parents("li").addClass('on');
				$(this).parents('li').find('.sub_cont2').addClass('open');
			}else{
				$(this).parents("li").removeClass('on');
				$(this).parents('li').find('.sub_cont2').removeClass('open');
			}
		});
	}
});

/* ***********************************************
 * Document ready 
 * 온로드 이벤트
*********************************************** */
$(document).ready(function() {
	/* ----------------------------------------------------------------------
		header 타이틀 변경
	------------------------------------------------------------------------ */
	var titlename = $("#sub_section:eq(0) .blind").text();
	$("#header>.inner h1").text(titlename);
	if($('.pop_header').length)$(".pop_header>.header_inner h1 strong:last-child").text(titlename);
	
	/* ----------------------------------------------------------------------
		table 처리
	------------------------------------------------------------------------ */
	if(!$("table").closest('.table').length)$("table").wrap('<div class="tableborder"></div>');
	$("table").each(function() {
		var $this    = $(this),
			thText   = "",
			count    = 0,
			thLength = $this.find("th").length,
			thList = null;
		if( !$this.hasClass("ui_summary_on") ) {
			if($this.find('thead').length>0){
				thList = $this.find("thead th");
			}else{
				thList = $this.find("th");
			}
			thList.each(function() {
				var $this = $(this);
				count += 1;
				thText += $this.text() + ( thLength === count ? "": ", " );
			});
			$this.attr("summary", $this.find('caption').eq(0).text()+"("+thText+")").addClass("ui_summary_on");
		}
	});
	
	/* ----------------------------------------------------------------------
		uiDatepicker() : datepicker 실행
	------------------------------------------------------------------------ */
	uiDatepicker();
	
	/* ----------------------------------------------------------------------
		tab.init() : 탭버튼 실행
	------------------------------------------------------------------------ */
	if($('.tabs').length > 0) {
		var dataTab = $('.tabs').attr('data-tab');
		if (dataTab == undefined || dataTab != "false") {
			$('.tabs').each(function(i){
				tab.init($(this));
			});
		}
	}
	if($('.intabs').length > 0) {
		var dataTab = $('.intabs').attr('data-tab');
		if (dataTab == undefined || dataTab != "false") {
			$('.intabs').each(function(i){
				tab.init($(this));
			});
		}
	}
	if($('.coatabs').length > 0){
		var dataTab = $('.coatabs').attr('data-tab');
		if (dataTab == undefined || dataTab != "false") {
			$('.coatabs').each(function(i){
				tab.init($(this));
			});
		}
	}
	if($('[data-ui-tab="tab"]').length > 0){
		var id = $('[data-ui-tab="tab"]').parent('li').filter('.active').find('>a').attr('href');
		// anchor 주소에 javascript:; 들어갈때 처리 못해 예외 처리.
		try {
			$(id).show();
		} catch (e) {
		}
	}
	
	/* ----------------------------------------------------------------------
		uiToggleCont.init : 토글 초기 화면
	------------------------------------------------------------------------ */
	$("[data-ui-toggle=wrap]").each(function(){
		if($(this).find(' > li').hasClass('on')){
			uiToggleCont.init($(this));
		};
	});
	
	/* ----------------------------------------------------------------------
		uiSlider.init() : slider 실행
	------------------------------------------------------------------------ */
	if($('[data-slider="slider1"]').length > 0) uiSlider.init('slider1');
	
	/* ----------------------------------------------------------------------
		메인 : 서비스 바로가기 slider 실행
	------------------------------------------------------------------------ */
	if($('.main_menu2[data-slider="slider2"]').length > 0) {
		if($('.main_menu2[data-slider="slider2"] .ui_slider').length > 1){
			var $htmlBtn = "<div class='ui_prev'></div><div class='ui_next'></div>";
			$('.main_menu2').append($htmlBtn);
			uiSlider.init('slider2');
		}
	}
	
	/* ----------------------------------------------------------------------
		보험금납입회차
	------------------------------------------------------------------------ */
	$(".insu_count").each(function(){
		var $this    = $(this),
			thList	 = $this.find('li');
		thList.find('button').on('click', function() {
			thList.removeClass('on');
			$(this).parent().parent().addClass('on');
			$(this).parent().parent().prevAll().addClass('on');
		});
	});
	
	/* ----------------------------------------------------------------------
		스크롤 이벤트
	------------------------------------------------------------------------ */
	$(window).scroll(function(event){
		var st = $(this).scrollTop();
		if(st > 0){
			$('header').addClass('scroll');
			$('#footer .top').addClass('on');
		}else{
			$('header').removeClass('scroll');
			$('#footer .top').removeClass('on');
		}
	});
	$(window).scrollEnd(function(){
		$('#footer .top').removeClass('on');
	},1000);
});

/* ***********************************************
 * Document On Click Event
 * 클릭이벤트
*********************************************** */
var $btn_modal_open = '[data-modal="ui_open"], [data-select="btn"]';
var $btn_tootip_open = '[data-modal="tooltip"], .tooltip_icon';
var $btn_modal_close = '[data-modal="ui_close"], [data-modal="ui_all_close"], #closeMysmart, #closePicker';
var $btn_filter = '.ui_filter > a';
var $btn_toggle = '[data-ui-toggle="btn"]';
var $btn_tab = '.tabs > li > a, [data-ui-tab="tab"], .intabs > li > a';
var $btn_navi = '[class^=t_tabs]';
var $btn_top = '#footer .top';

$(document).on('click', 
	$btn_modal_open+','+
	$btn_tootip_open+','+
	$btn_modal_close+','+
	$btn_toggle+','+
	$btn_tab+','+
	$btn_navi+','+
	$btn_top+','+
	$btn_filter,
	function() {
	/* ----------------------------------------------------------------------
		uiModal.open : 모달팝업오픈
	------------------------------------------------------------------------ */
	if($(this).is($btn_modal_open)){
		if($(this).hasClass('btn_floating')){//하단 플로팅메뉴
			uiModal.open(this);
			setTimeout(function(){
				$('.floating_wrap ul > li').addClass('move');
			},50);
		}else{//기본
			uiModal.open(this);
		}
	}else if($(this).is($btn_tootip_open)){ //툴팁버튼
		uiModal.open(this,true);
	}
	/* ----------------------------------------------------------------------
		uiModal.close : 모달팝업닫기
	------------------------------------------------------------------------ */
	else if($(this).is($btn_modal_close)){
		if($(this).hasClass('floating_close')){//하단 플로팅메뉴
			$('.floating_wrap ul > li').removeClass('move').addClass('close');
			setTimeout(function(){
				$('.floating_wrap ul > li').removeClass();
				uiModal.close('.floating_close');
			},500);
		}else if($(this).attr('id') == 'closeMysmart'){//마이 한화
			var pop_wrap = $(this).parent();
			pop_wrap.addClass('close');
			setTimeout(function(){
				pop_wrap.removeClass('close');
				uiModal.close('#closeMysmart');
			},500);
		}else if($(this).attr('id') == 'closePicker'){//완전판매모니터링 피커
			var pop_wrap = $(this).parent();
			pop_wrap.addClass('close');
			setTimeout(function(){
				pop_wrap.removeClass('close');
				uiModal.close('#closePicker');
			},500);
		}else{//기본
			uiModal.close(this);
		}
	}
	/* ----------------------------------------------------------------------
		uiFilter(this) : 필터오픈
	------------------------------------------------------------------------ */
	else if($(this).is($btn_filter)){
		uiFilter(this);
	}
	/* ----------------------------------------------------------------------
		uiToggleCont.click($(this)) : 토글제어
	------------------------------------------------------------------------ */
	else if($(this).is($btn_toggle)){
		uiToggleCont.click($(this));
	}
	/* ----------------------------------------------------------------------
		tab.open($(this)) : 탭버튼
	------------------------------------------------------------------------ */
	else if($(this).is($btn_tab)){
		tab.open($(this));
	}
	/* ----------------------------------------------------------------------
		uiNaviTab(this) : 전체메뉴
	------------------------------------------------------------------------ */
	else if($(this).is($btn_navi)){
		uiNaviTab(this);
	}
	/* ----------------------------------------------------------------------
		window top : top메뉴
	------------------------------------------------------------------------ */
	else if($(this).is($btn_top)){
		$(window).scrollTop(0);
	}
	return false;
});

/* ***********************************************
 * Document On keyup Event
 * 핀번호 이벤트
*********************************************** */
$(document).on('keyup','.input_pin > input', function(){
	var i = $(this).val().length;
	$('.input_pin').removeAttr('data-pin').attr('data-pin',i);
});

/* **********************************************
 * UI Main Event
 * 메인페이지 배너 이벤트
*********************************************** */
function uiMainEvent(){
	/* --------------------------------------------------------------------------------------------
		HTML : animation을 위한 태그 추가
	-------------------------------------------------------------------------------------------- */
	//auto play loading bar
	var circleHtml = "";
	circleHtml += '<div class="circle_wrap">';
	circleHtml += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 33" width="100%" height="100%">';
	circleHtml += '<circle class="circle_obj" stroke-width="0.3" stroke-dasharray="100, 100" stroke-linecap="round" fill="none"  cx="16.91549431" cy="16.91549431" r="15.91549431"/>';
	circleHtml += '</svg>';
	circleHtml += '</div>';
	//auto play btn
	var stopBtn = "";
	stopBtn += '<button type="button" class="stop">정지</button>';
	
	/* --------------------------------------------------------------------------------------------
		Swiper : 배너가 1개 이상일 경우 실행
	-------------------------------------------------------------------------------------------- */
	var $sliderMain = $('[data-slider="slider4"]');
	if($sliderMain.length > 0) {
		if($sliderMain.find('.ui_slider').length > 1){
			var $bgHtml = '<div class="bg"></div><div class="bg2"></div><div class="bg3"></div>';
			$sliderMain.append($bgHtml);
			$sliderMain.find('.ui_slider').append(circleHtml);
			var $slider = new Swiper('[data-slider="slider4"]', {
				wrapperClass : 'ui_sliderwrap',
				slideClass: 'ui_slider',
				slideActiveClass: 'active',
				bulletClass: 'bul',
				bulletActiveClass: 'active',
				buttonDisabledClass: 'disabled',
				paginationCurrentClass: 'current',
				pagination: '.ui_paging',
				autoplay : 5000,
				autoplayStopOnLast : false,
				disableOnInteraction : true,
				loop : true,
				speed : 1000,
				onInit : function(swiper){
					setTimeout(function(){
						$sliderMain.find('.ui_paging').append(stopBtn);
					},500);
				}
			});
			
			//정지,재생 버튼 이벤트
			$(document).on('click','.ui_paging > button',function(){
				if($(this).hasClass('stop')){
					$(this).removeClass('stop').addClass('play').html('재생');
					$('.circle_wrap').fadeOut();
					$slider.stopAutoplay();
				}else{
					$(this).removeClass('play').addClass('stop').html('정지');
					$('.circle_wrap').fadeIn();
					$slider.startAutoplay();
				}
			});
		}
	}
	
	/* --------------------------------------------------------------------------------------------
		APP : WEB, APP 구분하여 class 추가
	-------------------------------------------------------------------------------------------- */
	if(window.honeSystemInfo != undefined) {
		if(window.honeSystemInfo.isHoneMobile) { //APP
			if($('.circle_wrap').length > 0) $('.circle_wrap').addClass('app');
		}
	}
}