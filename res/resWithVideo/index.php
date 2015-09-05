<?php
session_start();
$numberLection=$_GET['idLection'];
$numberScenario=$_GET['idScenario'];
$_SESSION['$numberLection']=$numberLection;
$_SESSION['$numberScenario']=$numberScenario;
include "createJSON.php";




	//Параметры
	include "../../connectionSettings.php";
	//Соединение
	$mysqli = new mysqli($server, $username, $password, $DB);
	if ($mysqli->connect_errno) {
		printf("Не удалось подключиться: %s\n", $mysqli->connect_error);
		exit();
	}
	//utf8
	$mysqli->set_charset('utf8');
	$result = $mysqli->query("SELECT * FROM DemonstrationsTypes");	
	
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
	
?>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link rel="stylesheet" href="css/styles.css" type="text/css"/>

	<script type="text/javascript" src="js/ajax.js"></script>
	<script type="text/javascript" src="../../js/jquery-2.1.1.min.js"></script>

					<?php 	for ($i = 0;$i <= count($link_str); $i++) {	?>
							<script type="text/javascript" src="../<?php echo $link_str[$i];?>"></script>
					<?php 	}	?>
	<title>ML studio: Запись лекции</title>
</head>
<body>
	<header>
		<div id='opheader'>
			<center><h1>ML studio</h1></center>
		</div>
		<nav id='firsrNav'>
			<a class="firstNavLink" href='../../welcome.php'>О проекте</a>
			<a id="thisLink" href='../../lesson/listLecture.php'>Лекции</a>
		</nav>
		<nav id='secondNav'>
			<a class="secondNavLink" href='../../lesson/listLecture.php'>Лекции</a>
			<a class="secondNavLink" href='../../slides/listSlides.php'>Слайды</a>
			<a class="secondNavLink" href='../../scenario/listScenarios.php'>Сценарии</a>
			<a id="thisLink2" href='../../res/listLectureForRes.php'>Запись лекции</a>
			<a class="secondNavLink" href='../../addVideo/listLectureForVideo.php'>Добавление видео</a>
			<a class="secondNavLink" href='../../timeCorrection/listLectureForCorrection.php'>Синхронизация лекции</a>
			<a class="secondNavLink"  href='../../export/listLecture.php'>Экспорт</a>
		</nav>
	</header>
	<article>
		<div id="site">
			<div id="videoblock">
				<video id="video">
					<source id="mp4" src="">
					<source id="webm" src="">
				</video>
				<img id="playlink" src='../../files/play.png' alt="" />
			</div>
			<div id="buttonbar">
				<button id="res"></button>
				<button id="play"></button>
				<output id="time"></output>
				<input type="range" id='videoRange'>
				<output id="fullTime"></output>
				<ul id="menu">
					<li><button id="videoClass">&#9784;</button>
						<ul id="submenu">
						</ul>
					</li>
				</ul>
				
				<input type="range" id='audioRange'>
				<button id="audioFull"></button>
			</div> 
		</div>

		<div id="slide">
		</div>
		<div id="command_button_bar">
				<!--Место куда нужно добавлять кнопки для создания команд демонстрационного объекта -->
		</div>
		<div id="list">
			<div id="inlist">
				<div id="pictures"> 
					<?php 
						$JSON.='"slides": [';
						while ($row = $result->fetch_assoc()) {							
									$demo_type = $row["name"]; 
									//include "loading_". $row["name"]. ".php";
									include "loading_".$demo_type. ".php";
									
							}
						$JSON=substr($JSON, 0, -1);
						$JSON.=']}';
	
					?> 
				</div> 
			</div>
		</div>
		<iframe id='result' name="iframe-name" frameborder='no' src="#"></iframe>
	<article>
	<script type="text/javascript">
			$idLection=<?php echo $_GET['idLection']; ?>;
			$json_start=<?php echo json_encode($JSON); ?>;

			//Парсим JSON
			$cart = JSON.parse($json_start);
			$demoType = '';
			countSlide = $cart.slides.length;
			console.log("countSlide = " + countSlide);
			//Определения типа демонстрационного объекта
			function iconClick(obj) {
				//Ищем в json
				for (var $i = 0; $i < $cart.slides.length; $i++) {
					//Нашли
					if	($cart.slides[$i].id==obj.id)	{
							$demoType = $cart.slides[$i].type;
							console.log("demoType = " + $demoType);
					}
				}
			}
			var play_command;
			//alert("play_command " + play_command);
			//глобальные переменные
			var statusAction;
			$thistime=0;
			$timeres=0;
			$lastid='NULL';
			//var thistipe;
			var lastBorder;
			$res=false;
//--------------------------------------------------------------------------------------------

			
			
			//реакции нажатия кнопок
			document.getElementById("play").onclick = videoPlay;
			document.getElementById("videoRange").onclick = videoTime;
			document.getElementById("audioRange").onclick = videoVolume;
			document.getElementById("audioFull").onclick = volumeNull;
			document.getElementById("playlink").onclick = videoPlay;
			document.getElementById("videoClass").onclick = hideMenu;
			document.getElementById("res").onclick = resAction;

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
			var numberSlide;
			var oldtime;
			var endAction;
//--------------------------------------------------------------------------------------------
//Нажатие кнопок
document.onkeydown = function(event)
{
	if (event.keyCode == 34)
	{
		if (lastid=='NULL')
		{
			iconClick(document.getElementById(jsonID[0]));
		}
		else
		{
			for (var j=0; j<jsonID.length; j++)
			{
				if (jsonID[j].substr(1)==lastid && j==jsonID.length-1)
				{
					//iconClick(document.getElementById(jsonID[0]));
					break;
				}
				else if (jsonID[j].substr(1)==lastid)
				{
					iconClick(document.getElementById(jsonID[j+1]));
					break;
				}
			}
		}
		return false;
	}
	else if (event.keyCode == 33)
	{
		if (lastid=='NULL')
		{
			//iconClick(document.getElementById(jsonID[jsonID.length-1]));
		}
		else
		{
			for (var j=0; j<jsonID.length; j++)
			{
				if (jsonID[j].substr(1)==lastid && j==0)
				{
					//iconClick(document.getElementById(jsonID[jsonID.length-1]));
					break;
				}
				else if (jsonID[j].substr(1)==lastid)
				{
					iconClick(document.getElementById(jsonID[j-1]));
					break;
				}
			}
		}
		return false;
	}
	else if (event.keyCode == 82)
	{
		redmarker();
	}
	else if (event.keyCode == 66)
	{
		blackmarker();
	}
	else if (event.keyCode == 87)
	{
		whitemarker();
	}
	else if (event.keyCode == 88)
	{
		clearBorder();
	}
	else if (event.keyCode == 76)
	{
		loop();
	}
}

//Старт и остановка записи
function resAction(){
	if ($res==true){
		$res=false;
		video.pause();
		video.currentTime=0;
		document.getElementById('res').textContent = "res";
		lastid='NULL';
		slide.innerHTML='';
				$jsonString = ($jsonString.substr(0, $jsonString.length - 1))
				$jsonString += ']}';
				//$jsonString2 = ($jsonString2.substr(0, $jsonString2.length - 1))
				//$jsonString2 += ']}';
				$TotalCommandString = ($TotalCommandString.substr(0, $TotalCommandString.length - 1))
				$TotalCommandString += ']}';
				sendJSONs();		
	}else{
		$res=true;
		video.play();
		document.getElementById('res').textContent = "s";
		$timeres = video.currentTime;
				$jsonString ='{"slides": [';
				$CurrentCommandString = '{';
				$TotalCommandString ='{"commands": [';
	}
	
}
//--------------------------------------------------------------------------------------------

//действия при загрузке видео
function start() {
    fullTime.value = timeFormat(video.duration);
	//Значения для видеоползунка
    videoRange.min = 0;
    videoRange.max = video.duration;
    videoRange.step = 1;
}

//Воспроизведение, пауза
function videoPlay() {
    if (video.paused)  {
        video.play();
        play.textContent = "||";	
    }  else if (video.play)  {
        video.pause();
        play.textContent = ">";
    }
}			
//--------------------------------------------------------------------------------------------

//перемотка видео позунком
function videoTime() {
    video.currentTime = videoRange.value;
	console.log("videoTime ->->-> video.currentTime = " +  video.currentTime);
	
	/*
				$jsonString ='{"slides": [';
				
				$CurrentCommandString = '{';
				$TotalCommandString ='{"commands": [';
	*/
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
    if (video.volume == 0)  {
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

//Показать меню с выбором качества
function show (){ 
	document.getElementById("playlink").style.display = "block"; 
}

//Скрыть меню с выбором качества
function hide (){ 
	document.getElementById("playlink").style.display = "none"; 
}

//Действие при нажатии на кнопку выбора качества
function hideMenu() {
    if (submenu.style.display == "none"){ submenu.style.display = "block"; 
	} else { 
	submenu.style.display = "none"; 
	}
}



//Подключение другого файла при смене качества видео
function types(obj) {
    if (obj.id == "360p") {
        for (var i = 0; i < $cart.videos.length; i++)  {
            if ($cart.videos[i].type == 360) {
                webm.src = $cart.videos[i].mp4;
                mp4.src = $cart.videos[i].webm;
            }
        }
    } else if (obj.id == "480p") {
        for (var i = 0; i < $cart.videos.length; i++)  {
            if ($cart.videos[i].type == 480)  {
                webm.src = $cart.videos[i].mp4;
                mp4.src = $cart.videos[i].webm;
            }
        }
    } else if (obj.id == "720p")  {
        for (var i = 0; i < $cart.videos.length; i++)  {
            if ($cart.videos[i].type == 720)  {
                webm.src = $cart.videos[i].mp4;
                mp4.src = $cart.videos[i].webm;
            }
        }
    }

    else if (obj.id == "1080p")  {
        for (var i = 0; i < $cart.videos.length; i++)  {
            if ($cart.videos[i].type == 1080)  {
                webm.src = $cart.videos[i].mp4;
                mp4.src = $cart.videos[i].webm;
            }
        }
    }
	//Запоминание момента и загрузка видео
    var timeVideo = video.currentTime;
    video.load();
	/*video.onload=function (timeVideo)
	{
		video.currentTime = timeVideo;
        videoPlay();
	}*/
    setTimeout(function () {
        video.currentTime = timeVideo;
        videoPlay();
    }, 100);
	//Скрыть меню выбора
    submenu.style.display = "none";

}

//кнопка выключения звука
function volumeNull() {
    if (video.volume == 0) {
        video.volume = oldvolume;
        audioRange.value = oldvolume * 100;
        audioFull.textContent = "-";
    } else {
        oldvolume = video.volume;
        video.volume = 0;
        audioRange.value = 0;
        audioFull.textContent = "+";
    }
}

//удобое представление времени
function timeFormat(fulltime) {
    var timemin = Math.floor(fulltime / 60);
    var timesec = Math.floor(fulltime) - timemin * 60;
	if (timesec < 10) {
        timesec = '0' + timesec;
    }
    return (timemin + ':' + timesec);
}

/*//Новое время
function newTime()
{
	 timeres=timeres + 0.02;
	 document.getElementById('timer').innerHTML = timeFormat(timeres);
}

//Запуск таймера
function start_timer()
{
	timeres=0;
	res=true;
	thistime = setInterval(newTime, 20);
	document.getElementById("start").style.display = "none";
	document.getElementById("finish").style.display = "block";
	document.getElementById("forma").style.display = "block";
}
//Остановка
function finish_timer()
{
	clearInterval(thistime);
	res=false;
	//sendFinishCreate();
	document.getElementById("finish").style.display = "none";
	document.getElementById("start").style.display = "block";
	document.getElementById('result').style.display='block';
	if(document.getElementById('result').style.display=='block')
	{
		setTimeout(hideResult, 10000)
	}
}*/

function hideResult() {
	document.getElementById('result').style.display='none';
}
//--------------------------------------------------------------------------------------------



//--------------------------------------------------------------------------------------------
//При изменение размера окна
window.onresize=function resizing()
{
	//Устанавливаем высоту div'а отображающего слайд
    //var h = site.offsetHeight;
    //h = h + "px";
    //slide.style.height = h;
	//Соотношение сторон отображения слайдов
	slide.style.height=slide.offsetWidth*0.75;
	//alert (lastid);
	//Свойства canvas	
	if (jsonType[lastid]=='2D')
	{
		var canvas=document.getElementById('blackboard');
		canvas.width=slide.offsetWidth;
		canvas.height=slide.offsetHeight;
		var url = lastBorder;
		//Цвет линии и размер
		ctx.strokeStyle=lastStrikStyle;
		ctx.lineWidth = canvas.width/250;
		//Создаем изображение
		var pic = new Image();
		pic.src = url;
		//Отрисовываем
		pic.onload = init(pic);
	}
	
	//if (statusLoop==true)
	//{}
}

//движение ползунка и отображение текущего момента видео
function timeVideo() 
{
	//var deltaTime=video.currentTime-oldtime;
	//oldtime=video.currentTime;
	//время на таймере
    time.value = timeFormat(video.currentTime);
	$timeres = video.currentTime;
	//положение ползунка
    videoRange.value = video.currentTime;
	//Определение слайда для данного момента
    //var x=video.currentTime;
		//	console.log("videoPlay ->->-> jsonString = " +  $jsonString );
		//	console.log("videoPlay ->->-> CurrentCommandString = " +  $CurrentCommandString );
		//	console.log("videoPlay ->->-> TotalCommandString = " +  $TotalCommandString );
		//if ($res == true) {
		//		//фунции чтения текущих команд и воспроизведения их на холсте в режиме записи команд
		//		CurrentTime = $timeres;
		//		CurrentCommand = $CurrentCommandString;
		//		if ($demoType != '') {
		//			a = "play_current_commands" + $demoType + "(CurrentCommand, CurrentTime)";
		//			eval(a);
		//		} else {
		//			
		//		}
		//
		//}
}

//окончание видео
function endVideo() 
{
    play.textContent = ">";
}

window.onbeforeunload = function() 
{
	if ($res==true)
	{
		return 'Вы покидаете данную страницу, в случае не завершения записи данные будут утеряны';
	}
}
//--------------------------------------------------------------------------------------------
//при загрузке страницы
window.onload = function loading() {	
	statusAction=1;
    //Устанавливаем высоту div'а отображающего слайд
    document.getElementById('slide').style.height = Math.ceil( document.getElementById('slide').offsetWidth * 0.75 );
	document.getElementById('site').style.height = Math.ceil( document.getElementById('slide').offsetWidth * 0.75 );

	//Отсут для результирующего сообщения
	document.getElementById('result').style.top=document.getElementsByTagName('header')[0].offsetHeight;
    //ширина слайдлиста
    var w = 133 * countSlide;
    document.getElementById('inlist').style.width = w;
	//Показатели по умолчанию
	widthStart=document.getElementById('slide').offsetWidth;
	heightStart=document.getElementById('slide').offsetHeight;
	/*
	//Массивы слайдов
	jsonID= JSON.parse(jsonID);
	jsonType = JSON.parse(jsonType);
	jsonSlide2D = JSON.parse(jsonSlide2D);
	jsonTexture3D = JSON.parse(jsonTexture3D);
	jsonObject3D = JSON.parse(jsonObject3D);
	jsonComment = JSON.parse(jsonComment);
	*/
	/*
	//Предлоад, иначе не отобразит с первого раза
	//Если есть доска
	if (jsonID[0]=='n0')
	{
		masPic[0]=url2+jsonSlide2D[0];
		for (var i=1; i< countSlide; i++)
		{
			var num=jsonID[i].substr(1);;
			masPic[i]=new Image();
			masPic[i].src=url+jsonSlide2D[num];
		}
	}
	//Если нет доски
	else
	{
		for (var i=0; i< countSlide; i++)
		{
			var num=jsonID[i].substr(1);;
			masPic[i]=new Image();
			masPic[i].src=url+jsonSlide2D[num];
		}
	}
	*/
	/*
	//Прелоад доски
	var newCanvas = document.createElement('canvas');
	newCanvas.setAttribute('id', 'blackboard');
	slide.appendChild(newCanvas);
	var canvas=document.getElementById('blackboard');
	var backgroundBoard=url2+jsonSlide2D[0];
	blackboard(backgroundBoard);
	slide.innerHTML = '';
	*/
	//Прелоад 2D слайдов
	/*for (var i = 0; i <= countSlide; i++)
	{
		slide.innerHTML = '';
		var newCanvas = document.createElement('canvas');
		newCanvas.setAttribute('id', 'blackboard');
		slide.appendChild(newCanvas);
		var canvas=document.getElementById('blackboard');
		if (i==0)
		{
			var backgroundBoard='http://'+url2+jsonSlide2D[1];
			//alert(backgroundBoard);
		}
		else
		{
			var backgroundBoard='http://'+url+'2D/icons/'+jsonSlide2D[i];
		}
		blackboard(backgroundBoard);
	}
	slide.innerHTML = '';*/
	//Для переключения слайдов
	lastid='NULL';
	//начальные параметры при заходе на страницу
    time.value = "0:00";
    audioRange.value = 100;
    videoRange.value = 0;

	//добавляем видео из списка json
    for (var i = 0; i < $cart.videos.length; i++) {
        var newSubType = document.createElement('input');
        newSubType.setAttribute("id", $cart.videos[i].type + 'p');
        newSubType.setAttribute("type", "radio");
        newSubType.setAttribute("name", "px");
        newSubType.setAttribute("onclick", "types(this)");
        if (i == 0) 
        {
            newSubType.setAttribute("checked", "checked");
        }

        var newType = document.createElement('li');
        newType.appendChild(newSubType);
        newType.innerHTML = newType.innerHTML + $cart.videos[i].type+'p';
        submenu.appendChild(newType);
    }
	
    audioFull.textContent = "-";
    play.textContent = ">";
	document.getElementById('res').textContent = "res";
	fullTime.value = "0:00";

    submenu.style.display = "none";
    mp4.setAttribute("src", $cart.videos[0].mp4);
    webm.setAttribute("src", $cart.videos[0].webm);
    video.load();
}			
	//события
	 //window.addEventListener("load", loading);
	 video.addEventListener("durationchange", start);
	 video.addEventListener("timeupdate", timeVideo);
	 video.addEventListener("ended", endVideo);			
	</script>
	
	<!--<script type="text/javascript" src="js/script.js"></script>-->
</body>
</html>