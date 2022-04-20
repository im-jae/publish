header = '';

header += '<header id="header">';
	header += '<div class="inner">';
		header += '<a href="#" class="btn_prev"><i></i><span class="offscreen">이전 화면으로 이동</span></a>';
		header += '<h1>UI GUIDE</h1>';
        header += '<a href="#" class="btn_zoom switch"><i></i><span class="offscreen">큰글씨서비스</span></a>';
		header += '<a id="btnGnb" class="btn_gnb" href="#gnb">';
			header += '<span class="offscreen">전체메뉴 열기</span>';
			header += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="30px" viewBox="0 0 30 30" xml:space="preserve">';
				header += '<path class="bar b1" d="M0,22h20c0,0,9,0,9-12s-9-5-9-5L2,22"/>';
				header += '<path class="bar b2" d="M0,8h2h18c0,0,9,0,9,10s-5,11-11,5S2,8,2,8"/>';
				header += '<line class="bar b3" x1="0" y1="15" x2="20" y2="15"/>';
			header += '</svg>';
		header += '</a>';
	header += '</div>';
header += '</header>';

document.write(header);