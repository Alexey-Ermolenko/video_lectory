<?php
session_start();
$numberLection=$_GET['idLection'];
$numberScenario=$_GET['idScenario'];
$_SESSION['$numberLection']=$numberLection;
$_SESSION['$numberScenario']=$numberScenario;


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
<link rel="stylesheet" href="css/styles.css" type="text/css">
<script type="text/javascript" src="../../js/jquery-2.1.1.min.js"></script>
<script type="text/javascript" src="js/ajax.js"></script>
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
			<div id="headSub">
				<output id='timer'>0:00</output></br>
				<button id="finish" onclick='finish_timer()'>Стоп</button>
				<button id="start" onclick='start_timer()'>Старт</button>
			</div>
			<div id='subs'>
				<h4 id='text'></h4>
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
						$JSON='{"slides": [';
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

			//Нажатие кнопок
			$(window).keydown(function(event){
				if (event.keyCode == 34){
					if ($lastid=='NULL'){
						iconClick(document.getElementById($cart.slides[0].id));
					}
					else{
						for (var j=0; j<$cart.slides.length; j++){
							if ($cart.slides[j].id==$lastid && j==$cart.slides.length-1){
								//iconClick(document.getElementById(jsonID[0]));
								//alert('jango');
								break;
							}
							else if ($cart.slides[j].id==$lastid){
								iconClick(document.getElementById($cart.slides[j+1].id));
								break;
							}
						}
					}
					return false;
				}
				else if (event.keyCode == 33){
					if ($lastid=='NULL'){
						//iconClick(document.getElementById(jsonID[jsonID.length-1]));
					}
					else{
						for (var j=0; j<$cart.slides.length; j++){
							if ($cart.slides[j].id==$lastid && j==0){
								//iconClick(document.getElementById(jsonID[jsonID.length-1]));
								break;
							}
							else if ($cart.slides[j].id==$lastid){
								iconClick(document.getElementById($cart.slides[j-1].id));
								break;
							}
						}
					}
					return false;
				}
				else if (event.keyCode == 82){
					redmarker();
				}
				else if (event.keyCode == 66){
					blackmarker();
				}
				else if (event.keyCode == 87){
					whitemarker();
				}
				else if (event.keyCode == 88){
					clearBorder();
				}
				else if (event.keyCode == 76){
					loop();
				}
			});

			//удобое представление времени
			function timeFormat($fulltime) {
				$timemin = Math.floor($fulltime / 60);
				$timesec = Math.floor($fulltime) - $timemin * 60;
				if ($timesec < 10) {
					$timesec = '0' + $timesec;
				}
				return ($timemin + ':' + $timesec);
			}
			//Новое время
			function newTime(){
				 $timeres=$timeres + 0.02;
				 $('#timer').text(timeFormat($timeres));
				 
					//фунции чтения текущих команд и воспроизведения их на холсте в режиме записи команд
			//	CurrentTime = $timeres;
			//	CurrentCommand = $CurrentCommandString;
			//	console.log("CurrentCommand = " + CurrentCommand + "CurrentTime = " + CurrentTime);
			//	a = "play_current_commands" + $demoType + "(CurrentCommand, CurrentTime)";
			//	eval(a);
			}

			//Запуск таймера
			function start_timer(){
				$timeres=0;
				$res=true;
				$thistime = setInterval(newTime, 20);
				$('#start').css("display", "none");
				$('#finish').css("display", "block");
				
				$jsonString ='{"slides": [';
				
			//	$CurrentCommandString = '{';
				$TotalCommandString ='{"commands": [';
			}
			//Остановка
			function finish_timer()
			{
				clearInterval($thistime);
				$res=false;
				//blackmarker();
				$('#slide').empty();
				$('#text').empty();
				$('#start').css("display", "block");
				$('#finish').css("display", "none");
				$jsonString = ($jsonString.substr(0, $jsonString.length - 1))
				$jsonString += ']}';
				//$jsonString2 = ($jsonString2.substr(0, $jsonString2.length - 1))
				//$jsonString2 += ']}';
				
				$TotalCommandString = ($TotalCommandString.substr(0, $TotalCommandString.length - 1))
				$TotalCommandString += ']}';
				
				sendJSONs();
				$jsonString ='{"slides": [';
				
				$TotalCommandString ='{"commands": [';
				//$jsonString2 ='{"commands": [';
				$lastid='NULL';
			}
			

			

			//При изменение размера окна
			$(window).resize(function(){

				//Устанавливаем высоту div'а отображающего слайд
				$("#slide").outerHeight(Math.ceil($("#slide").innerWidth()* 0.75));
				$("#site").outerHeight(Math.ceil($("#slide").innerWidth()* 0.75));
				//Высота подсказки
				$("#subs").outerHeight(Math.ceil($("#site").innerHeight()-$("#headSub").innerHeight()));
				//Устанавливаем высоту div'а c кнопками
				$("#buttonbar2").outerHeight($("#slide").innerHeight());
				//Свойства canvas
				for (var $i = 0; $i < $cart.slides.length; $i++){
					if ($cart.slides[$i].id==$lastid){
						if ($cart.slides[$i].type=='2D'){
							canvas.width=$("#slide").outerWidth();
							canvas.height=$("#slide").outerHeight();
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
					}
				}
			});

			window.onbeforeunload = function() {
				if ($res==true){
					return 'Вы покидаете данную страницу, в случае не завершения записи данные будут утеряны';
				}
			}

			//при загрузке страницы
			$(document).ready(function(){
				
				
				statusAction=1;
				//Устанавливаем высоту div'а отображающего слайд
				$("#slide").height(Math.ceil($("#slide").width()* 0.75));
				$("#site").height(Math.ceil($("#slide").width()* 0.75));
				//Высота подсказки
				$("#subs").height(Math.ceil($("#site").height()-$("#headSub").height()));
				//Устанавливаем высоту div'а c кнопками
				$("#buttonbar2").height($("#slide").height());
				//ширина слайдлиста
				$("#inlist").width(133 * $cart.slides.length);
				//Показатели по умолчанию
				widthStart=document.getElementById('slide').offsetWidth;
				heightStart=document.getElementById('slide').offsetHeight;
				//Предлоад, иначе не отобразит с первого раза
				for (var $i = 0; $i < $cart.slides.length; $i++){
					if ($cart.slides[$i].type=='2D'){
						$("#slide").append('<img id="preload"></img>');
						$("#preload").attr("src", $cart.slides[$i].pic);
						$("#slide").empty();
					}
				}
				//Время на старте
				//timeres = 0;
			});
	</script>

</body>
</html>