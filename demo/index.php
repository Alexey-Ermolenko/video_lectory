<?php
session_start();
$numberLection=$_GET['id'];
$_SESSION['$numberLection']=$numberLection;
include "createJSON.php";
include "about_script.php";

	//Параметры
	//include "../connectionSettings.php";
	//Соединение
	$mysqli = new mysqli($server, $username, $password, $DB);
	if ($mysqli->connect_errno) {
		printf("Не удалось подключиться: %s\n", $mysqli->connect_error);
		exit();
	}
	//utf8
	$mysqli->set_charset('utf8');

	
	////////////
	$result1 = $mysqli->query("SELECT * FROM DemonstrationsTypes");	
	$libs_array = array();
	$libs_array_count = 0;
	while ($lib_row = $result1->fetch_assoc()) {
		$libs_array[$libs_array_count] = ($lib_row['library_file_links']);
		$link_str =  $link_str. $libs_array[$libs_array_count];
		$libs_array_count++;
	}
	$link_str  = explode(";", $link_str);	
	
	////////////
	$count_demo_types = $mysqli->query("SELECT COUNT(1) FROM `DemonstrationsTypes`");	
		while ($row = $count_demo_types->fetch_assoc()) {
			$type_count = $row["COUNT(1)"];
		}
		
	$demo_numbers = Array();
	$quantity = 0;	
	
	//--------------------------------------------------------------------------//
	$decodedJSON = json_decode($JSON);
	$demoTypeArray = array();
	$resu = $decodedJSON->slides;
	for ($i = 0; $i < count($resu); $i++) {
		$demoTypeArray[$i] = $resu[$i]->type;

    }
	$demoTypeArray = array_unique($demoTypeArray);
	$demoTypeArr  = implode(",", $demoTypeArray);
	$demoTypeArr =  explode(",", $demoTypeArr);
	//print_r ($demoTypeArr); //массив всех типов демонстрационных объектов на странице
	

	
?>
<!DOCTYPE html>
<html>
<head>
	<!-- META -->
	<title>ML Studio</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	<meta name="description" content="" />
	
	<link rel="shortcut icon" href="../lib/kickstart/css/img/favicon.ico">
	<!-- CSS -->
	<link rel="stylesheet" type="text/css" href="../lib/kickstart/css/kickstart.css" media="all" />
	<link rel="stylesheet" type="text/css" href="../lib/kickstart/css/style.css" media="all" /> 

	<link rel="stylesheet" type="text/css" href="css/styles.css" media="all" /> 
	
	<!-- Javascript -->
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script type="text/javascript" src="../lib/kickstart/js/kickstart.js"></script>


	<script type="text/javascript" src="js/jquery-2.1.1.min.js"></script>
	<script type="text/javascript" src="js/createActions.js"></script>
	<script type="text/javascript" src="js/script_info.js"></script>	
	
				<?php 	for ($i = 0;$i <= count($link_str); $i++) {	?>
						<script type="text/javascript" src="<?php echo $link_str[$i];?>"></script>
				<?php 	}	?>
</head>
<body>
	<nav class="navbar">
		<ul>
			<li><a href="../"><span>ML</span>Studio</a></li>
		</ul>
	</nav>
	<div class="grid" style="padding-top: 50px;">
		<h2><?php include "createName.php"; ?></h2>

		<div class="lecture clearfix">

			<div class="col_6 column">
				<div id="videoblock">
					<video id="video" poster="<?php echo $poster; ?>">
						<source id="mp4" src="">
						<source id="webm" src="">
					</video>
					<div id="loadblock">
						<img id="load" src="../files/load.gif">
					</div>
					<img id="playlink" src="../files/play.png" alt="" />
				</div>
				<div id="buttonbar">
				<button class="small" id="play"></button>
				<output id="time"></output>
				<input type="range" id='videoRange'/>
				<output id="fullTime"></output>

				<ul id="menu">
					<li>
						<button class="small" id="videoClass"><i class="fa fa-cog"></i></button>
						<ul id="submenu">
						</ul>
					</li>
				</ul>
				<input type="range" id='audioRange'/>
				<button class="small" id="audioFull"></button>
			</div>
			</div>
			<div class="col_6 column">
				<div id="slide">		
				</div>

			</div>
		</div>
	<div id="list">
		<div id="inlist">
			<div id="pictures"></div> 
			<div id="timelist"></div>
		</div>
	</div>
	</div>
	<div id="site"></div>

	<!-- <canvas id='canvasLoop'></canvas> -->
	<script type="text/javascript">
		var info1 = '<?php echo $info1; ?>';
		var info2 = '<?php echo $info2; ?>';
		var info3 = '<?php echo $info3; ?>';
		var info4 = '<?php echo $info4; ?>';
		var info5 = '<?php echo $info5; ?>';
		var info6 = '<?php echo $info6; ?>';
			
		var jsonString = <?php echo json_encode($JSON); ?>;
		var commandsString = <?php echo json_encode($JSON2); ?>;
	$idLection= <?php echo $_GET['id']; ?>;
	$demoType ='';
	$res = false;
	
	
	var cart = JSON.parse(jsonString);
	var cart2 = JSON.parse(commandsString);
	//--------------------------------------------------------------------------------------------------------------------------------------
		//реакции нажатия кнопок
	document.getElementById("play").onclick = videoPlay;
	document.getElementById("videoRange").onclick = videoTime;
	document.getElementById("audioRange").onclick = videoVolume;
	document.getElementById("audioFull").onclick = volumeNull;
	document.getElementById("playlink").onclick = videoPlay;
	document.getElementById("videoClass").onclick = hideMenu;
	//Действие при наведении
	document.getElementById("playlink").onmouseover = show;
	document.getElementById("video").onmouseover = show;
	document.getElementById("playlink").onmouseout = hide;
	document.getElementById("video").onmouseout = hide;

	//глобальные переменные
	var site = document.getElementById("site");
	var video = document.getElementById("video");
	var play = document.getElementById("play");
	var time = document.getElementById("time");
	var fullTime = document.getElementById("fullTime");
	var videoRange = document.getElementById("videoRange");
		var audioRange = document.getElementById("audioRange");
		var audioFull = document.getElementById("audioFull");
	var videoFull = document.getElementById("videoFull");
	var bar = document.getElementById("buttonbar");
	var slide = document.getElementById("slide");
	var inlist = document.getElementById("inlist");
	var pictures = document.getElementById("pictures");
	var timelist = document.getElementById("timelist");
	var mp4 = document.getElementById("mp4");
	var webm = document.getElementById("webm");
	var submenu = document.getElementById("submenu");

	var oldvolume;
	var numberSlide='ns';
	var oldtime=0;
	var deltaTime;
	var endAction;

	//переменные для доски
	var canvas;
	var ctx;
	var deltaH;
	var deltaW;
	var dctrl;

	//Массив для прелоэда
	masPic=new Array();

	function videoRange_mousedown(){
		clickVideoRange=true;
	}
	//перемотка видео позунком
	function videoRange_mouseup(){
		video.currentTime = videoRange.value;
		clickVideoRange=false;
	}

	//действия при загрузке видео
	function start() 
	{
		fullTime.value = timeFormat(video.duration);
		//Значения для видеоползунка
		videoRange.min = 0;
		videoRange.max = video.duration;
		videoRange.step = 1;
		info();
		video.removeEventListener("durationchange", start);
	}

	function audioRangeStart(){
		document.getElementById("audioRange").addEventListener("mousemove", videoVolume); //touchmove
		document.getElementById("audioRange").addEventListener("touchmove", videoVolume);}

	function audioRangeEnd(){
		document.getElementById("audioRange").removeEventListener("mousemove", videoVolume); //touchmove
		document.getElementById("audioRange").removeEventListener("touchmove", videoVolume);}



	//Показать меню с выбором качества
	function show ()
	{ document.getElementById("playlink").style.display = "block"; }

	//Скрыть меню с выбором качества
	function hide ()
	{ document.getElementById("playlink").style.display = "none"; }

	//Действие при нажатии на кнопку выбора качества
	function hideMenu() 
	{
		if (submenu.style.display == "none")
		{ submenu.style.display = "block"; }
		else { submenu.style.display = "none"; }
	}


	//Подключение другого файла при смене качества видео
	function types(obj) 
	{
		if (obj.id == "360p") 
		{
			for (var i = 0; i < cart.videos.length; i++) 
			{
				if (cart.videos[i].type == 360) 
				{
					webm.src = cart.videos[i].mp4;
					mp4.src = cart.videos[i].webm;
				}
			}
		}

		else if (obj.id == "480p") 
		{
			for (var i = 0; i < cart.videos.length; i++) 
			{
				if (cart.videos[i].type == 480) 
				{
					webm.src = cart.videos[i].mp4;
					mp4.src = cart.videos[i].webm;
				}
			}
		}

		else if (obj.id == "720p") 
		{
			for (var i = 0; i < cart.videos.length; i++) 
			{
				if (cart.videos[i].type == 720) 
				{
					webm.src = cart.videos[i].mp4;
					mp4.src = cart.videos[i].webm;
				}
			}
		}

		else if (obj.id == "1080p") 
		{
			for (var i = 0; i < cart.videos.length; i++) 
			{
				if (cart.videos[i].type == 1080) 
				{
					webm.src = cart.videos[i].mp4;
					mp4.src = cart.videos[i].webm;
				}
			}
		}
		//Запоминание момента и загрузка видео
		var timeVideo = video.currentTime;
		video.load();

		setTimeout(function () {
			video.currentTime = timeVideo;
			videoPlay();
		}, 100);
		//Скрыть меню выбора
		submenu.style.display = "none";

	}
	//Смена картинки при нажатии на иконку
	function imageClick(obj) 	{
		console.log("imageClick");
		for (var i = 0; i < cart.slides.length; i++) {
			if (obj.id == cart.slides[i].id)	{
				video.currentTime = cart.slides[i].time;
				
					$demoType = cart.slides[i].type;
					console.log("demoType = " + $demoType);
			}
		}
	}
	//перемотка видео позунком
	function videoTime() {
		video.currentTime = videoRange.value;
	}

	//ползунок настройки звука
	function videoVolume() {
		video.volume = audioRange.value/100;
		if (video.volume==0){
			audioFull.textContent = "+";
		}
	}



	//кнопка выключения звука
	function volumeNull() {
		if (video.volume == 0)   {
			video.volume = oldvolume;
			audioRange.value = oldvolume * 100;
			audioFull.textContent = "-";
		} else  {
			if (oldvolume==0){
				oldvolume=1;
			}else{
				oldvolume = video.volume;
			}
			video.volume = 0;
			audioRange.value = 0;
			audioFull.textContent = "+";
		}
	}


	//Воспроизведение, пауза
	function videoPlay() {
		if (video.paused)   {
			video.play();
			video.volume = 0;
			play.textContent = "||";

		}  else if (video.play)  {
			video.pause();
			play.textContent = ">";
		}
	}

	//окончание видео
	function endVideo() {
		play.textContent = ">";
	}

	//удобое представление времени
	function timeFormat(time) {
		if (time <= 0){
			return ("0:00");
		}else{
			var timemin = Math.floor(time / 60);
			var timesec = Math.floor(time) - timemin * 60;
			if (timesec < 10) {
				timesec = '0' + timesec;
			}
			return (timemin + ":" + timesec);
		}
	}

	//функция для установление рамки у иконки текущего слайда
	function borderSlide(i) {
		//Получаем id иконки
		var border=document.getElementById(cart.slides[i].id);
		console.log("borderSlide = " + border.id);
		//Удаляем рамки у всех иконок
		for (var j = 0; j < cart.slides.length; j++) 
		{
			var oldBorder=document.getElementById(cart.slides[j].id);
			oldBorder.style.border="none";
		}
		//устанавливаем рамку для нужной иконки
		border.style.border="ridge";
		border.style.borderColor="red";
		
	}



	//движение ползунка и отображение текущего момента видео
	function timeVideo() {
		deltaTime = video.currentTime-oldtime;
		oldtime = video.currentTime;
		//время на таймере
		time.value = timeFormat(video.currentTime);
		//положение ползунка
		videoRange.value = video.currentTime;
		//Определение слайда для данного момента
		var x = video.currentTime;
		endAction = false;
		
		if (x<cart.slides[0].time && numberSlide!='ns')	{ //Если показ слайдов ещё не начат
			slide.innerHTML = '';
			info();
			numberSlide='ns';
			for (var j = 0; j < cart.slides.length; j++) {
				var oldBorder=document.getElementById(cart.slides[j].id);
				oldBorder.style.border="none";
			}
		} else {	//Если пошли слайды
			//вывод слайда
			for (var i = 0; i < cart.slides.length; i++) {
					$demoType = cart.slides[i].type;
					//Если слайд последний
					if (i == cart.slides.length - 1)	{
					//подключние кода для каждого дем. объекта
					<?php 
						
						for ($i = 0; $i < count($demoTypeArr);$i++) {
							$demoTypeName[$i] = $demoTypeArr[$i];
								if ($demoTypeName[$i] == ""){
									
								} else {
									include ("../demo_libs/".$demoTypeName[$i]."/load_last_DemoObject_".$demoTypeName[$i].".js");
								}
						}
					?>
					//Последний слайд при перемотке
					
					//Если слайд не последний
					} else if (i != cart.slides.length - 1) { 
						//подключние кода для каждого дем. объекта
						<?php
							
							for ($i = 0; $i < count($demoTypeArr);$i++) {
								$demoTypeName[$i] = $demoTypeArr[$i];
									if ($demoTypeName[$i] == ""){
										
									} else {
										include ("../demo_libs/".$demoTypeName[$i]."/load_notlast_DemoObject_".$demoTypeName[$i].".js");
									}
							}
						?>
						// слайд при перемотке
						
					}//проверка последний ли слайд в массиве
			}//проход по массиву
		}//проверка на наличие слайдов
	}//функция

	//При изменение размера окна
	window.onresize=function resizing()	{
		//Соотношение сторон отображения слайдов
		slide.style.height=slide.offsetWidth*0.75;
		//Свойства canvas
		var x=video.currentTime;
		/*
		for (var i = 0; i < cart.slides.length; i++) 	{
			if (i == cart.slides.length - 1)	{
				//Последний слайд типа "доска"
				if ((cart.slides[i].time <= x) && (cart.slides[i].type == '2d')) 	{
					slide.innerHTML = '';
					var newCanvas = document.createElement('canvas');
					newCanvas.setAttribute('id', 'blackboard');
					slide.appendChild(newCanvas);
					var canvas=document.getElementById('blackboard');
					var backgroundBoard=cart.slides[i].src;
					blackboard(backgroundBoard);
					
					for (var j=0; j<cart2.commands.length; j++)		{
						if (cart2.commands[j].time>=cart.slides[i].time)	{
							lastAction=j-1;
							break;
						}
					}
					numberSlide=cart.slides[i].id;
					action(numberSlide);
				}
			}
			//Если слайд не последний
			else if (i != cart.slides.length - 1)	{
				//Слайд типа "доска"
				if ((cart.slides[i].time <= x) && (cart.slides[i + 1].time > x) && (cart.slides[i].type == '2d')) 	{
					slide.innerHTML = '';
					var newCanvas = document.createElement('canvas');
					newCanvas.setAttribute('id', 'blackboard');
					slide.appendChild(newCanvas);
					var canvas=document.getElementById('blackboard');
					var backgroundBoard=cart.slides[i].src;
					blackboard(backgroundBoard);
					for (var j=0; j<cart2.commands.length; j++)	{
						if (cart2.commands[j].time>=cart.slides[i].time)	{
							lastAction=j-1;
							break;
						}
					}
					numberSlide=cart.slides[i].id;
					action(numberSlide);
				}
			}
		}
		*/
	}
	//при загрузке страницы

	function loading() 	{


		oldtime=0;
		//Соотношение сторон отображения слайдов
		slide.style.height=slide.offsetWidth*0.75;
		//ширина слайдлиста
		var w = 133 * cart.slides.length + 10;
		inlist.style.width = w + "px";
				//положение меню с разрешениями
				var t = 20 * cart.videos.length;
				submenu.style.top = "-" + t + "px";
		//добавляем иконки из списка json
		for (var i = 0; i < cart.slides.length; i++)	{

			var newPic = document.createElement('img');
			newPic.setAttribute("id", cart.slides[i].id);
			newPic.setAttribute("src", cart.slides[i].icon);
			newPic.setAttribute("alt", "Слайд  № "+(i+1));
			newPic.setAttribute("onclick", "imageClick(this)");
			pictures.appendChild(newPic);
			var newTimeList = document.createElement('p');
			newTimeList.innerHTML = timeFormat(cart.slides[i].time);
			timelist.appendChild(newTimeList);

		}
		//добавляем видео из списка json
		for (var i = 0; i < cart.videos.length; i++) 	{
			var newSubType = document.createElement('input');
			newSubType.setAttribute("id", cart.videos[i].type + 'p');
			newSubType.setAttribute("type", "radio");
			newSubType.setAttribute("name", "px");
			newSubType.setAttribute("onclick", "types(this)");
			if (i == 0) 	{
				newSubType.setAttribute("checked", "checked");
			}
			
			var newType = document.createElement('li');
			newType.appendChild(newSubType);
			newType.innerHTML = newType.innerHTML + cart.videos[i].type+'p';
			submenu.appendChild(newType);
			
		}
		//Предлоад, иначе не отобразит с первого раза
		for (var i = 0; i < cart.slides.length; i++)	{
			if (cart.slides[i].type=="2d")	{
				masPic[i]=new Image();
				masPic[i].src=cart.slides[i].src;
			}
		}
		//начальные параметры при заходе на страницу
		time.value = "0:00";
		audioRange.value = 0;
		videoRange.value = 0;
		audioFull.textContent = "-";
		play.textContent = ">";
		fullTime.value = "0:00";
		submenu.style.display = "none";
		mp4.setAttribute("src", cart.videos[0].mp4);
		webm.setAttribute("src", cart.videos[0].webm);
		video.load();
		
		
	}
		//события
		window.addEventListener("load", loading);
		video.addEventListener("durationchange", start);
		video.addEventListener("timeupdate", timeVideo);
		video.addEventListener("ended", endVideo);	
		
		
		videoRange.addEventListener("mousedown", videoRange_mousedown);
		videoRange.addEventListener("mouseup", videoRange_mouseup);
		videoRange.addEventListener("touchstart", videoRange_mousedown);
		videoRange.addEventListener("touchend", videoRange_mouseup);
	</script>

</body>
</html>