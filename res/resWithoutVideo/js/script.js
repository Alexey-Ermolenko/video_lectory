//Парсим JSON
$cart = JSON.parse($json_start);

var play_command;
alert("play_command " + play_command);
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
	CurrentTime = $timeres;
	CurrentCommand = $CurrentCommandString;
	console.log("CurrentCommand = " + CurrentCommand + "CurrentTime = " + CurrentTime);
	play_command = play_current_commands(CurrentCommand, CurrentTime);
}

//Запуск таймера
function start_timer(){
	$timeres=0;
	$res=true;
	$thistime = setInterval(newTime, 20);
	$('#start').css("display", "none");
	$('#finish').css("display", "block");
	
	$jsonString ='{"slides": [';
	
	$CurrentCommandString = '{';
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
//	$("#buttonbar2").outerHeight($("#slide").innerHeight());
/*	
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
*/
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