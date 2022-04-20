footer = ''
footer += '<footer id="footer" class="footer">';
footer += '		<a href="#wraper" id="top" class="top">맨위로</a>';
footer += '		<a href="#floating" id="btnFloating" class="btn_floating" data-modal="ui_open">알림 더보기 <strong>13</strong>';
footer += '			<svg width="50" height="50" viewPort="0 0 25 25" version="1.1" xmlns="http://www.w3.org/2000/svg">';
footer += '				<circle class="bar" r="24" cx="25" cy="25" fill="transparent" stroke-dasharray="160"></circle>';
footer += '			</svg>';
footer += '		</a>';
footer += '		<div class="footer_btn">';
footer += '			<ul>';
footer += '				<li><a href="#none">개인정보처리방침</a></li>';
footer += '				<li><a href="#none">이용약관</a></li>';
footer += '				<li><a href="#none">신용정보활용체제</a></li>';
footer += '				<li><a href="#none">추가메뉴1</a></li>';
footer += '				<li><a href="#none">추가메뉴2</a></li>';
footer += '				<li><a href="#none">추가메뉴3</a></li>';
footer += '			</ul>';
footer += '		</div>';
footer += '		<address>고객상담센터 <a href="tel:1566-8000">1566.8000</a></address>';
footer += '		<small>HANWHA GENERAL INSURANCE CO.LTD. ALL REGHTS RESERVED</small>';
footer += '</footer>';
footer += '<aside class="floating_wrap" id="floating">';
footer += 		'<a href="#btnFloating" class="floating_close" data-modal="ui_close">닫기</a>';
footer += 		'<ul>';
footer += 			'<li>';
footer += 				'<p class="txt_float">내가 가입한 보험의<br/>서비스를 확인하세요</p>';
footer += 				'<a href="#smart_view_in" class="icon_float01" data-modal="ui_open">MY한화</a>';
footer += 			'</li>';
footer += 			'<li><a href="../MAI/HIMA_PG_MAI_1001.html" class="icon_float02">홈</a></li>';
footer += 			'<li id="pushCnt"><a href="#none" class="icon_float03">알림</a></li>';
footer += 			'<li><a href="../CUC/HIMA_PG_CUC_1001.html" class="icon_float04">고객라운지</a></li>';
footer += 			'<li><a href="../CEC/HIMA_PG_CEC_1001.html" class="icon_float05">인증센터</a></li>';
footer += 		'</ul>';
footer += '</aside>';
document.write(footer);


//푸시리스트로 이동
/*function listPush_ft(){
	var sawonNum_ft = "";
	var SampleLogin_ft ="";
   if(typeof sawonNum != 'undefined'){
	   sawonNum_ft = sawonNum;
   }
   if(typeof SampleLogin != 'undefined'){
	   SampleLogin_ft = SampleLogin;
   }
   
   hima.alert("33","footer sawonNum["+sawonNum_ft+"]SampleLogin["+SampleLogin_ft+"]");
	//정상처리시 HIMA_PG_PUS_1004.html 로 이동한다. 
	var params = {"sawonNum" : sawonNum_ft	//사원번호
			      ,"SampleLogin" : SampleLogin_ft
		};
	bizcommon.setStorageData(params, function() {
		window.location.href = "../PUS/HIMA_PG_PUS_1004.html";
	});	
}*/

function setPushCnt(){
	bizcommon.getSessionData(function(rtn) {
		/*
		var pushNotReadCnt = "";
		if( val == "0"){
			$("#pushCnt").html('<a href="../PUS/HIMA_PG_PUS_1004.html" class="noParam" >알림</a>' + pushNotReadCnt);
			return;
		}

		
		//간편로그인한 경우 처리
		var sawonNum_ft = ""; //4자리 로그인 사원번호
		var SampleLogin_ft = ""; //4자리 정상로그인 여부
		bizcommon.getStoragePrevData(function(data){
			sawonNum_ft = data.sawonNum;
			SampleLogin_ft = data.SampleLogin;
		});	
		
		
		var tmp_length = 0;
		if(sawonNum_ft != null && sawonNum_ft.length > 1){
			tmp_length =sawonNum_ft.length; 
		}
		var locationUrl = window.location.href;
		
		//간편로그인화면이면 push 건수 조회되면 안됨.
		if( locationUrl.indexOf("HIMA_PG_PUS_1010.html") >0){
			SampleLogin_ft ="N";			
		}
		*/
		//20150818 dongju preference에서 값을 가져와서 셋팅
		var preference = new hone.device.Preference();
		preference.get('HanwhaHimaPushNotReadCnt', '',
			function (value) {
				if(util.string.isEmpty(value)){
					showPushCnt("0");
				}else{
					showPushCnt(value);
				}
			},
			function (msg) {
				showPushCnt("0");
			});	// error callback
			
//		if (rtn.resCd=="00") {//로그인 상태
//			bizplugins.push.pushNotReadCnt(val,function(result){});
//			pushNotReadCnt = "<span>" + val + "</span>"; //<span>0</span> 카운트가 0보다 클 경우 해당 포맷으로 입력
//		}else if(tmp_length == 7 && SampleLogin_ft == "Y"){
//			bizplugins.push.pushNotReadCnt(val,function(result){});
//			pushNotReadCnt = "<span>" + val + "</span>"; //<span>0</span> 카운트가 0보다 클 경우 해당 포맷으로 입력
//		
//		}else{
//			pushNotReadCnt = ""; //<span>0</span> 카운트가 0보다 클 경우 해당 포맷으로 입력
//		}
//		$("#pushCnt").html('<a href="../PUS/HIMA_PG_PUS_1004.html" class="noParam" >알림</a>' + pushNotReadCnt);
		
	});
}

function showPushCnt(cnt){
	var pushNotReadCnt = "";
	
	bizplugins.push.pushNotReadCnt(cnt,function(result){});
	if( cnt != "0"){		
		pushNotReadCnt = "<strong>" + cnt + "</strong>"; //<span>0</span> 카운트가 0보다 클 경우 해당 포맷으로 입력
	}
	$("#pushCnt").html('<a href="../PUS/HIMA_PG_PUS_1004.html" class="icon_float03">알림'+pushNotReadCnt+'</a>');
	
}