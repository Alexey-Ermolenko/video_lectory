/* _new_demo  - префикс для того чтобы обозначить функции данного демонстрационного объекта */

var thisSlide;
var play_command;

function load_form_new_demo(){
		
		$("#blank").empty();
		$("#form1").attr("action","create_demo_new_demo.php");	
		$("#blank").append("<b>Файлы демонсрационного объекта:</b><br>");
		$("#blank").append("Автор:<input type=\"text\" name=\"demo_object_autor\" id=\"demo_object_autor\"/><br>");
		$("#blank").append("Название слайда:<input type=\"text\" name=\"demo_object_name\" id=\"demo_object_name\"/><br>");	
		$("#blank").append("Изображение:</td><td><input type=\"file\" name=\"demo_object_img\" id=\"demo_object_img\" accept=\"image/jpg,image/jpeg,image/png\" required=\"required\"/><br>");
		$("#blank").append("Комментарий:<input type=\"text\" name=\"demo_object_comment\" id=\"demo_object_comment\"/><br>");		
		$("#blank").append("<p><input type=\"submit\" value=\"Создать новый демонстрационный объект\" onclick=\"resultCreate_new_demo()\"/></p>");
		$("#form1").css("width","50%");
		$("#form1").css("box-shadow","0 0 3px rgba(0,0,0,0.5)");
}

function resultCreate_new_demo()
{
	if (document.getElementsByName('demo_object_autor')[0].value!='' && document.getElementsByName('demo_object_name')[0].value!='' && document.getElementsByName('demo_object_img')[0].value!='' && document.getElementsByName('demo_object_comment')[0].value!='')
	{
		document.getElementById('result').style.display='block';
	}
	if(document.getElementById('result').style.display=='block')
	{
		setTimeout(hideResult, 10000)
	}
}

function demoIconClick_new_demo(obj) {
	var numberDemoObject = obj.id.substr(1);
	var imgDemoObject = obj.getAttribute("img_new_demo");
	var commentDemoObject = obj.getAttribute("comment");
	var url = '../repository/new_demo/images/'; 
	imgDemoObject = url + imgDemoObject;
	//Создаем контейнер
	$("#slide").empty();
	$("#slide").append('<canvas id="blackboard"></canvas>');	
	//Рисуем
	load_demo_new_demo(imgDemoObject);
		document.getElementById('text').innerHTML = 'Комментарий: </br> <b>' + commentDemoObject + '</b>';
}
//Прелоад
function preload_new_demo(lastBorder)
{
	//Заполнение canvas для прелоад
	canvasPreload = document.getElementById("canvasPreload");
	var ctxL = canvasPreload.getContext('2d');
	var picL = new Image();
	picL.src = lastBorder;
	canvasPreload.width=canvas.width;
	canvasPreload.height=canvas.height;
	picL.onload=function()	{
		var yL= canvasPreload.height;
		var xL= canvasPreload.width;
		ctxL.drawImage(picL, 0, 0, xL, yL);
	}
}
//4) Описание функции рисующей дем. объект на холсте. 	на странице показа слайдов 


		//Главная функция
function load_demo_new_demo(imgDemoObject)  {
//3.1) 	Определение холста дем. объекта для режиме записи.		
		canvas = document.getElementById("blackboard");
		//Работаем с 2d
		ctx = canvas.getContext('2d');
		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;
		//Задний фон
		var pic = new Image();
		pic.src = imgDemoObject;
		thisSlide = imgDemoObject;
//3.3) 	Запуск функции рисования дем. объекта на холсте.		
		pic.onload = function () {//При загрузке картинки
			//4.1) 	Отображение дем. объекта в режиме записи.	
			
			ctx.drawImage(pic, 0, 0, canvas.width, canvas.height);  //рисованеие на вкладке записи

		}
}


//5) Описание функций запускаемых с панели команд.
	
//убрать цвет
function original_new_demo()	{

	$timeres = $timeres;


	color = 'original_color';
	res_draw_new_demo(color);
}
//Красный цвет
function red_new_demo()	{

	$timeres = $timeres;

	color = '#ff0000';
	res_draw_new_demo(color);

}
//Черный цвет
function blue_new_demo()	{

	$timeres = $timeres;

	color = '#0000ff';
	res_draw_new_demo(color);

}
//6) Описание функций записывающей команды.
//функция записи команд
function res_draw_new_demo(color) {
	console.log("res_draw_new_demo = " + color);
//6.1) 	Запись текущей (последней) команды. (Для режима записи)
	$CurrentCommandString = '{"command": "paint_over;' + color + '", "time": "' + $timeres + '"}';	 //текущая команда для режима записи
//6.2) 	Запись массива команд. (Для режима воспроизведения)	
	$TotalCommandString += '{"command": "paint_over;' + color + '", "time": "' + $timeres + '"},';	//итоговая команда для режима воспроизведения
}

//9) Описание функции отображающей команду на холсте.
function draw_new_demo(color) {
		context = canvas.getContext('2d');
//9.2) 	Рисование на холсте.
		if (color == 'original_color') {
			console.log("original_color ------------------------------------------------------------------------ original_color color = " + color);
			context.clearRect(0, 0, canvas.width, canvas.height);
			var pic = new Image();
			pic.src = thisSlide;
			//pic.onload = init_new_demo(pic);
			pic.onload = function(){
				console.log("------------------------------------------------------------------------ original_color pic = " + pic);
				context.drawImage(pic, 0, 0, canvas.width, canvas.height);  //рисованеие на вкладке записи
			}
		} else {
		// Рисуем окружность 
			context.strokeStyle = "#000";
			//context.globalAlpha = 0.2; //прозрачность
			context.fillStyle = color;  //"rgba(255,0,0,0.1)"; 
			context.beginPath();
			context.arc(100,100,50,0,Math.PI*2,true);
			context.closePath();
			context.stroke();
			context.fill();
			// Рисуем левый глаз 
			context.fillStyle = "#fff";
			context.beginPath();
			context.arc(84,90,8,0,Math.PI*2,true);
			context.closePath();
			context.stroke();
			context.fill();
			// Рисуем правый глаз 
			context.beginPath();
			context.arc(116,90,8,0,Math.PI*2,true);
			context.closePath();
			context.stroke();
			context.fill();
			// Рисуем рот
			context.beginPath();
			context.moveTo(70,115);
			context.quadraticCurveTo(100,130,130,115);
			context.quadraticCurveTo(100,150,70,115); 
			context.closePath();
			context.stroke();
			context.fill();		
		}
}

var statusSlide=true;			
function dropSlide_script(){
	document.getElementById('slide').innerHTML = '';
	statusSlide=false;
}

/********************************************************************************************************************************************/
/*------------------------------------ Функции чтения json-команд --------------------------------------------------------*/
/********************************************************************************************************************************************/

//7) Описание функции чтения текущей команды в режиме записи.
//чтение команд в режиме записи
function play_current_commands3(CurrentCommand, CurrentResTime){	
		console.info(" play_current_commands3  new_demo");	
//7.1) 	Парсинг текущей команды.
	CurrentCommandStr = JSON.parse(CurrentCommand);
//7.2) 	Определение параметров из полученной команды.	
	CommandArray_command_name = CurrentCommandStr.command.split(';');
	
	var new_demo_action = CommandArray_command_name[0];
	var new_demo_action_color = CommandArray_command_name[1];
	var new_demo_action_time = CurrentCommandStr.time;
	var demoMode = "res_ctx"; //контекст для определения режима записи
	console.info("play_current_commands -> new_demo_action = " + new_demo_action + " color = " + new_demo_action_color + " new_demo_action_time =" + new_demo_action_time);
//7.3) 	Отображение команды на холсте.	
		if (new_demo_action == "paint_over") {
			draw_new_demo(new_demo_action_color, demoMode); //функция отображающая команду на холсте
		}
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
//Описание функции рисующей дем. объект на холсте.	

function load_new_demo(imgDemoObject) {
	console.log("load_new_demo imgDemoObject = "+ imgDemoObject);
	//Определение холста дем. объекта для режиме записи.		
		canvas = document.getElementById("blackboard");
		//Работаем с 2d
		ctx = canvas.getContext('2d');
		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;
		//Задний фон
		var pic = new Image();
		pic.src = imgDemoObject;
		thisSlide = imgDemoObject;
		
	//Запуск функции рисования дем. объекта на холсте.		
		pic.onload = function () { //При загрузке картинки
//Отображение дем. объекта в режиме записи.	
	$('#slide').unbind();
		console.log("pic.onload new_demo ");
	ctx.drawImage(pic, 0, 0, canvas.width, canvas.height);  //рисованеие на вкладке записи
}
}



function iconResClick_new_demo(obj) {
	//Парсим JSON
	$cart = JSON.parse($json_start);
	//Ищем в json
	for (var $i = 0; $i < $cart.slides.length; $i++) {
		//Нашли
		if($cart.slides[$i].id==obj.id){
			//console.log("cart.slides[$i].id = " + $cart.slides[$i].id + "type = " + $cart.slides[$i].type);
			//Если new_demo
			if ($cart.slides[$i].type=='3'){
				//console.log("111111111111111111111111111111");
				//Новый слайд и идет запись
				if ($lastid!=$cart.slides[$i].id && $res==true){
					//Запоминаем слайд как последний
					$lastid=$cart.slides[$i].id;
					//Создаем контейнер
					$("#slide").empty();
					$("#slide").append('<canvas id="blackboard"></canvas>');
					//Рисуем
					load_new_demo($cart.slides[$i].pic);
					//Меняем подсказку
					$("#text").empty();
					$("#text").html($cart.slides[$i].commentary);
					$("#subs").scrollTop(0);
					
					//2.2) 	Создание панели команд для дем. объекта.
					$("#command_button_bar").empty();
					$("#command_button_bar").append("<div id=\"new_buttons\"</div>");
					$("#new_buttons").append("<button id=\"red\">red</button>");
					$("#new_buttons").append("<button id=\"blue\">blue</button>");
					$("#new_buttons").append("<button id=\"original\">original</button>");	
					
					
					//2.5) 	Прикрепление событий к элементам панели команд.	
					//события при нажатии на кнопки панели команд 
					$('#red').click(red_new_demo);
					$('#blue').click(blue_new_demo);
					$('#original').click(original_new_demo);
					//
					//Запоминаем изображение
					lastBorder=document.getElementById('blackboard').toDataURL();
					preload_new_demo(lastBorder);
					//Отсылаем смену слайда
					sendAddSlide3($cart.slides[$i].id.substr(1));
				}
				else if($res==true){
					//clearBorder();
				}
			}
		}
	}
} 


//==============================================================================================================================================================
//Записи команды переключения демонстрации
function sendAddSlide3(i){
	if ($res==true){
		$jsonString += '{"idSlide": "'+i+'", "time": "'+$timeres+'"},';
		console.log("jsonString new_demo = " + $jsonString);
	}
}
//Отправка на сервер результата записи
function sendJSONs(){
	$.post( "action.php", {id:$idLection, jsonString:$jsonString, TotalCommandString:$TotalCommandString },onAjaxSuccess);
}
function onAjaxSuccess(){
	alert('Запись завершена!');
}

//==============================================================================================================================================================
//========================================================ФУНКЦИИ НАХОЖДЕНИЯ ТЕКУЩЕЙ КОМАНДЫ НА ВОСПРОИЗВЕДЕНИЯ=================================================
//==============================================================================================================================================================
function createAction_new_demo(startAction, finishAction) {
	console.log("createAction_new_demo" + " startAction = " + startAction + " finishAction = " + finishAction);
}
/*
	//Последний слайд типа "доска"
	if (((cart.slides[i].time <= x) && (numberSlide!=cart.slides[i].id) && (cart.slides[i].type == 'new_demo')) || ((cart.slides[i].time <= x) && (statusSlide==false) && (deltaTime<0) && (cart.slides[i].type == 'new_demo')))	{
		slide.innerHTML = '';
		var newCanvas = document.createElement('canvas');
		newCanvas.setAttribute('id', 'blackboard');
		slide.appendChild(newCanvas);
		var backgroundBoard=cart.slides[i].src;		
		load_new_demo(backgroundBoard);
					
		if (statusSlide==false)	{
			statusSlide=true;
		}			
		borderSlide(i);
		numberSlide=cart.slides[i].id;
		action(numberSlide);
	} else if ((cart.slides[i].time <= x) && (deltaTime<0) && (cart.slides[i].type == 'new_demo')) 	{ //Последний слайд типа "доска" при перемотке
		slide.innerHTML = '';
		var newCanvas = document.createElement('canvas');
		newCanvas.setAttribute('id', 'blackboard');
		slide.appendChild(newCanvas);
		var backgroundBoard=cart.slides[i].src;		
		load_new_demo(backgroundBoard);
		borderSlide(i);
		numberSlide=cart.slide[i].id;
		action(numberSlide);
	}

*/

