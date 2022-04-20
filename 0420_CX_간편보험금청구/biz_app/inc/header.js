header = '';

header += '<header id="header">';
	header += '<div class="inner">';
		header += '<a href="#" class="btn_prev"><i></i><span class="offscreen">이전 화면으로 이동</span></a>';
		header += '<h1>UI GUIDE</h1>';
		header += '<a id="btnGnb" class="btn_gnb" href="#gnb">';
			header += '<span class="offscreen">전체메뉴 열기</span>';
			header += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="44px" height="44px" viewBox="0 0 44 44" xml:space="preserve">';
				header += '<g>';
					header += '<path class="bar b1" d="M16,17c6.667,0,13.333,0,20,0c-0.11-0.011-0.222-0.021-0.332-0.032c3.697,0.051,8.477,3.324,8.538,7.323c0.001-0.127,0.002-0.255,0.003-0.383c0.429,3.229-0.066,1.237,0.179,3.842v-0.462c0.232-6.836,1.165,17.024-11.644,4.917C27.541,27.289,22.602,22.063,17.539,17"/>';
				header += '</g>';
				header += '<g>';
					header += '<path class="bar b2" d="M16,32.93c6.667,0,13.333,0,20,0c-0.11,0.011-0.222,0.021-0.332,0.031c3.697-0.051,8.477-3.324,8.538-7.321c0.001,0.127,0.002,0.255,0.003,0.383c0.429-3.229-0.066-1.237,0.179-3.842v0.462c0.232,6.835,1.165-17.024-11.644-4.917c-5.203,4.916-10.143,10.142-15.205,15.204"/>';
				header += '</g>';
				header += '<g>';
					header += '<path class="bar b3" d="M46,25c0,11.051-8.949,20-20,20C14.95,45,6,36.051,6,25C6,13.95,14.95,5,26,5C37.051,5,46,13.95,46,25z"/>';
					header += '<path class="bar b4" d="M44,16c0,4.975-4.025,9-9,9h1H16"/>';
				header += '</g>';
			header += '</svg>';
		header += '</a>';
	header += '</div>';
header += '</header>';

document.write(header);