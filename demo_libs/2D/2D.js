/* _2D  - префикс для того чтобы обозначить функции данного демонстрационного объекта от другого */
var thisSlide;
var play_command;
var statusAction;

var LoopViewCanvas;
var canvas;
var ctx;
var deltaH;
var deltaW;
var dctrl;
var oldStrokeStyle ="#000000";
var lastStrikStyle="#000000";
color_2D = "#000000";


function load_form_2D(){

		$("#blank").empty();
		$("#form1").attr("action","create_demo_2D.php");
		$("#blank").append("<b>Файлы демонсрационного объекта:</b><br>");
		$("#blank").append("Автор:<input type=\"text\" name=\"demo_object_autor\" id=\"demo_object_autor\"/><br>");
		$("#blank").append("Название слайда:<input type=\"text\" name=\"demo_object_name\" id=\"demo_object_name\"/><br>");			
		$("#blank").append("Изображение:<input type=\"file\" name=\"demo_object_img\" id=\"demo_object_img\" accept=\"image/jpg,image/jpeg,image/png\" required=\"required\"/><br>");
		$("#blank").append("Комментарий:<input type=\"text\" name=\"demo_object_comment\" id=\"demo_object_comment\"/><br>");
		$("#blank").append("<p><input type=\"submit\" value=\"Создать новый демонстрационный объект\" onclick=\"resultCreate2D()\"/></p>");
		$("#form1").css("width","50%");
		$("#form1").css("box-shadow","0 0 3px rgba(0,0,0,0.5)");
		
}


function resultCreate2D()
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

function demoIconClick_2D(obj) {
	var numberDemoObject = obj.id.substr(1);
	var imgDemoObject = obj.getAttribute("img");
	var commentDemoObject = obj.getAttribute("comment");
	var url = '../repository/2D/images/'; 
	imgDemoObject = url + imgDemoObject;
	//console.log("2D  numberDemoObject = " + numberDemoObject + " imgDemoObject = " + imgDemoObject);
	//Создаем контейнер
	$("#slide").empty();
	$("#slide").append('<canvas id="blackboard"></canvas>');	
	
	//создать контейнер прелоад 
		$("#canvasPreload").remove();
		$('body').append('<canvas id="canvasPreload"></canvas>');	
		$("#canvasPreload").css("display", "none");
	
	//Рисуем
	load_demo_2D(imgDemoObject);	
	document.getElementById('text').innerHTML = 'Комментарий: </br> <b>' + commentDemoObject + '</b>';
}
//Прелоад
function preload_2D(lastBorder)	{
	console.log("preload_2D -> lastBorder = " +  lastBorder);
	//Заполнение canvas для прелоад
	canvasPreload = document.getElementById("canvasPreload");
	var ctxL = canvasPreload.getContext('2d');
	var picL = new Image();
	picL.src = lastBorder;
	canvasPreload.width = canvas.width;
	canvasPreload.height = canvas.height;
	picL.onload = function()	{
		var yL = canvasPreload.height;
		var xL = canvasPreload.width;
		ctxL.drawImage(picL, 0, 0, xL, yL);
	}
}

	
		//Главная функция
function load_demo_2D(imgDemoObject)  {
		//Обращаемся к canvas
		canvas = document.getElementById("blackboard");
		//Работаем с 2d
		ctx = canvas.getContext('2d');	
	
		
		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;
		
		//Задний фон
		var pic = new Image();
		pic.src = imgDemoObject;
		thisSlide = imgDemoObject;
		pic.onload = function () {//При загрузке картинки
				dctrl = { drawing: false };
				//Размер картинки
			ctx.drawImage(pic, 0, 0, canvas.width, canvas.height);
		}
}


//---------------------------------------------------------------------------------------------------------------------------------------------------------------
/* 2 - функции записи команд в json_массив ------------------------------------------- */

	
//Красный цвет
function redmarker_2D()	{
	if (statusAction==2) {
		deleteLoop_2D();
	}
	statusAction=1;
	
	$timeres = $timeres;

	color_2D = "#FF0000";;
	lastStrikStyle  = color_2D;
	//курсор
	//$('#res_slide').css('cursor', 'url(images/2D/redmarker.png), auto' );

}
//Черный цвет
function blackmarker_2D()	{
	if (statusAction==2) {
		deleteLoop_2D();
	}
	statusAction=1;
	
	$timeres = $timeres;

	color_2D = "#000000";
	lastStrikStyle  = color_2D;
	//$('#res_slide').css('cursor', 'url(images/2D/blackmarker.png), auto' );
}
//белый цвет
function whitemarker_2D()	{
	if (statusAction==2)  {
		deleteLoop_2D();
	}
	statusAction=1;
	
	$timeres = $timeres;

	color_2D = "#FFFFFF";
	lastStrikStyle  = color_2D;
	//$('#res_slide').css('cursor', 'url(images/2D/whitemarker.png), auto' );
	
}
//включение лупы
function loop_2D()  {
	statusLoop=true;
		//Проверяем создана ли уже лупа
    if (statusAction==2)  {
		deleteLoop_2D();
		statusAction=1;
	} else {
		statusAction=2;
		statusLoop=true;	
		var hCanvas=canvas.height;
		$CurrentCommandString = '{"command": "create_lens;'+hCanvas+'", "time": "'+$timeres+'"}';
		play_current_2D_commands($CurrentCommandString);
		$TotalCommandString  += '{"command": "create_lens;'+hCanvas+'", "time": "'+$timeres+'"},';	
	}
}


//отчистить доску
function clearBorder_2D()	{
	if (statusAction==2)  {
		deleteLoop_2D();
	}
	statusAction=1;
	
	$timeres = $timeres;
	$CurrentCommandString = '{"command": "clear_slide", "time": "'+$timeres+'"}';
	play_current_2D_commands($CurrentCommandString);
	$TotalCommandString +=  '{"command": "clear_slide", "time": "'+$timeres+'"},';

}

function res_draw_line_2D(x1, y1, x2, y2, color_2D) {
	if ($res==true){
			var wCanvas = canvas.width;
			var hCanvas = canvas.height;
			$CurrentCommandString = '{"command": "draw;'+wCanvas+';'+hCanvas+';'+x1+';'+y1+';'+x2+';'+y2+';'+color_2D+'", "time": "'+$timeres+'"}';	
			play_current_2D_commands($CurrentCommandString);
			$TotalCommandString  += '{"command": "draw;'+wCanvas+';'+hCanvas+';'+x1+';'+y1+';'+x2+';'+y2+';'+color_2D+'", "time": "'+$timeres+'"},';
	}
	
	
}
//позиция для лупы
function res_loop_position(loop, x1, y1) {

	if ($res==true){
		if (loop == 2) {
			//console.log("res_loop_position = " + "loop =" + loop );
			var wCanvas=canvas.width;
			var hCanvas=canvas.height;
			var pageX=window.pageXOffset;
			var pageY=window.pageYOffset;
			$CurrentCommandString = '{"command": "lens;'+wCanvas+';'+hCanvas+';'+pageX+';'+pageY+';'+x1+';'+y1+'", "time": "'+$timeres+'"}';
			play_current_2D_commands($CurrentCommandString);
			$TotalCommandString  += '{"command": "lens;'+wCanvas+';'+hCanvas+';'+pageX+';'+pageY+';'+x1+';'+y1+'", "time": "'+$timeres+'"},';
		}
		
	}
}
//удалеине лупы
function deleteLoop_2D()	{
		statusAction == 1;
		statusLoop=false;
		$CurrentCommandString = '{"command": "drop_lens", "time": "'+$timeres+'"}';
		play_current_2D_commands($CurrentCommandString);		
		$TotalCommandString  += '{"command": "drop_lens", "time": "'+$timeres+'"},';	
}


//При нажатой кнопке
function draw_line_ev_2D(event, statusAction) {
	if (statusAction == 1) {
		//console.log("draw_line_ev_2D event = " + event + "statusAction = " + statusAction);
		draw_color = color_2D;
		//Получаем координаты
		var rect = event.target.getBoundingClientRect();
		var mouse_x = event.clientX - rect.left;
		var mouse_y = event.clientY - rect.top;
		//Рисуем линию
		res_draw_line_2D(dctrl.prevx, dctrl.prevy, mouse_x, mouse_y, draw_color);
		dctrl.prevx = mouse_x;
		dctrl.prevy = mouse_y;
	} else {
		//console.log("222222222222 draw_line_ev_2D + statusAction = " + statusAction);
		//Получаем координаты
		var rect = event.target.getBoundingClientRect();
		var mouse_x = event.clientX - rect.left;
		var mouse_y = event.clientY - rect.top;
		
		res_loop_position(statusAction, mouse_x, mouse_y);
	}

}

//Нажатие мышки
function canvas_mousedown_2D(event) {
	if ($res==true){
		if (statusAction==1)
		{
			//console.log("canvas_mousedown_2D event = " + event.type);
			var rect = event.target.getBoundingClientRect();
			dctrl.drawing = true;
			
			res_draw_line_2D();
			
			dctrl.prevx = event.clientX - rect.left;
			dctrl.prevy = event.clientY - rect.top;
		}
	}	
}

//При движении мышки
function canvas_mousemove_2D(event) {	
	//console.log("canvas_mousemove_2D event = " + event.type);
	if ($res==true){
		if (statusAction==1)	{
			if(dctrl.drawing) 		{
				draw_line_ev_2D(event, statusAction);
			}
		} else {
			//console.log("statusAction = " + statusAction);
			draw_line_ev_2D(event, statusAction);
		}
	}	
}

//Отпускаем конопку мышки
function canvas_mouseup_2D(event) {
	if (statusAction==1)
	{
		//console.log("canvas_mouseup_2D event = " + event.type);
		dctrl.drawing = false;
	}

}
//Вышли за пределы дем. объекта
function canvas_mouseout_2D(event) {
	//убираем лупу
	if (statusAction == 2) {
		//console.log("canvas_mouseout_2D event = " + event.type);
		if ($res==true){
			$CurrentCommandString = '{"command": "hide_lens", "time": "'+$timeres+'"}';	
			play_current_2D_commands($CurrentCommandString);
			$TotalCommandString  += '{"command": "hide_lens", "time": "'+$timeres+'"},';	

		}
	}
}

//------------------------------------------------------------------------------------------------------------------------------------------------------
//9) Описание функции отображающей команду на холсте.


//9.1
function draw_2D_draw(width,height,x1,y1,x2,y2,color_2D) {
	//console.log("1111111111111111111111111111111111111111111111111111111111111111111111111 draw_2D_draw "+ width + height + x1 + y1 + x2 + y2 + color_2D + demoMode);
	//9.1.1 Определение контекста рисования в зависимости от режима работы демонстрационного объекта.
	ctx = canvas.getContext('2d');
	//9.1.2 Рисование на холсте.
	var widthRatioSize=canvas.offsetWidth/width;  //canvas.offsetWidth/width;
	var heightRatioSize=canvas.offsetHeight/height; //canvas.offsetHeight/height;
	ctx.strokeStyle = color_2D;
	ctx.beginPath();
	ctx.moveTo(x1*widthRatioSize, y1*heightRatioSize);
	ctx.lineTo(x2*widthRatioSize, y2*heightRatioSize);
	ctx.stroke();
}
//9.2
function draw_2D_clear_slide() {
	console.log("draw_2D_clear_slide thisSlide = " + thisSlide);
	//9.2.1 Определение контекста рисования в зависимости от режима работы демонстрационного объекта.
	ctx = canvas.getContext('2d');
	//9.2.2 Рисование на холсте.
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	var clear_pic = new Image();
	clear_pic.src = thisSlide;
	
	clear_pic.onload = function () {
				dctrl = { drawing: false };
			//События мышки
	
		console.log("clear_pic.onload = " + thisSlide);
		ctx.drawImage(clear_pic, 0, 0, canvas.width, canvas.height);  //рисованеие на вкладке
	}
		//Удаляем лупу если есть
	if (statusAction==2)
	{
		draw_2D_drop_lens();
	}
	statusAction=1;
	//Меняем изображение для смены размера
	lastBorder=canvas.toDataURL();
	preload_2D(lastBorder);
}


//9.3
function draw_2D_create_lens(height) {
//9.3.1 Определение контекста рисования в зависимости от режима работы демонстрационного объекта.
		ctx = canvas.getContext('2d');
		var LoopViewCanvas = document.getElementById("blackboard");
	//9.3.2 Рисование на холсте.
	


	var heightRatioSize = LoopViewCanvas.offsetHeight/height;  //canvas.offsetHeight/height;
		canvasLoop = document.getElementById("canvasLoop");
		var ctxL = canvasLoop.getContext('2d');
		var picL = new Image();
		picL.crossOrigin = "anonymous";
		
		picL.src = LoopViewCanvas.toDataURL("image/png");

		canvasLoop.width = LoopViewCanvas.width*2;
		canvasLoop.height = LoopViewCanvas.height*2;
		//Получение картинки из canvas для лупы
		picL.onload=function(){
			ctxL.drawImage(picL, 0, 0, canvasLoop.width, canvasLoop.height);
			$("div.loop").remove()
			$("img.loopimg").remove()
			$(LoopViewCanvas).imageLens(heightRatioSize);
		}
}
//9.4
function draw_2D_drop_lens() {
	$("div.loop").remove()
	$("img.loopimg").remove()
}
//9.5
function draw_2D_lens(width,height,x1,y1,x2,y2) {
//9.3.1 Определение контекста рисования в зависимости от режима работы демонстрационного объекта и определение холста рисования 
		ctx = canvas.getContext('2d');
		var LoopViewCanvas = document.getElementById("blackboard");
	//var loopDemoBlock = document.getElementById("blackboard");
	//console.warn("context = " + context + " LoopViewCanvas = " + LoopViewCanvas + " LoopViewCanvas.offsetWidth = " + LoopViewCanvas.offsetWidth);
	
	var widthRatioSize = LoopViewCanvas.offsetWidth/width;
	var heightRatioSize = LoopViewCanvas.offsetHeight/height;
	
	var leftPos;
	var topPos;
	var leftPos2;
	var topPos2;
	//Масштаб лупы
	var widthRatio=2;
	var heightRatio=2;
	//Обращаемся к лупе
	var target=$('.loop');
	//Получаем кординаты краев слайда
	var rectCanvas = LoopViewCanvas.getBoundingClientRect();
	//Показываем лупу
    target.show();
	//Получаем координаты внутри слайда
	//alert(widthRatioSize+'\r\n'+heightRatioSize+'\r\n'+x1+'\r\n'+y1+'\r\n'+x2+'\r\n'+y2);
	var x=parseFloat(x2);
	var y=parseFloat(y2);
	var pageX=parseFloat(x1);
	var pageY=parseFloat(y1);
	//alert(widthRatioSize+'\r\n'+heightRatioSize+'\r\n'+x+'\r\n'+y+'\r\n'+pageX+'\r\n'+pageY);
	
	//Устанавливаем позицию картинки в лупе
	leftPos = String((x * widthRatio * widthRatioSize - target.width() / 2) * (-1));
    topPos = String((y * heightRatio * heightRatioSize - target.height() / 2) * (-1));
    target.css({ backgroundPosition: leftPos + 'px ' + topPos + 'px' });
	
	//Устанавливаем позицию лупы
	/*leftPos2 = String((x*1 * widthRatioSize + rectCanvas.left) - target.width() / 2 + window.pageXOffset + pageX);
    topPos2 = String((y*1 * heightRatioSize + rectCanvas.top)  - target.height() / 2 + window.pageYOffset + pageY);
    target.css({ left: leftPos2 + 'px', top: topPos2 + 'px' });*/
	leftPos2 = String((x - target.width() / 2)*widthRatioSize+rectCanvas.left + window.pageXOffset);
    topPos2 = String((y - target.height() / 2)*heightRatioSize+rectCanvas.top + window.pageYOffset);
    target.css({ left: leftPos2 + 'px', top: topPos2 + 'px' });
}
//9.6
function draw_2D_hide_lens() {
		var target=$('.loop');
		target.hide();
}
	var statusSlide=true;			
function dropSlide_script(){
	console.log("dropSlide_script");
	document.getElementById('slide').innerHTML = '';
	statusSlide=false;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// Функции чтения json-команд //////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//7) Описание функции чтения текущей команды в режиме записи.
//чтение команд в режиме записи
function play_current_2D_commands(CurrentCommand){
//7.1) 	Парсинг текущей команды.
	CurrentCommandStr = JSON.parse(CurrentCommand);
	//7.2) 	Определение параметров из полученной команды.	
	var CommandArray = CurrentCommandStr.command.split(';');
	//var action_time_2D = CurrentCommandStr.time;
	var commandName = CommandArray[0];
	//7.3) 	Отображение команды на холсте.	
		if (commandName=='draw')	{
			//console.info("demoMode=" + demoMode +  " draw 11111" );
			draw_2D_draw(CommandArray[1],CommandArray[2],CommandArray[3],CommandArray[4],CommandArray[5],CommandArray[6],CommandArray[7]); //функция отображающая команду на холсте
		}
		else if(commandName=='clear_slide')	{
			//console.info("demoMode=" + demoMode +  " clear_slide 2222" );
			draw_2D_clear_slide(); //функция отображающая команду на холсте
		}
		else if(commandName=='create_lens')	{
			//console.info("demoMode=" + demoMode +  " create_lens 3333" );
			draw_2D_create_lens(CommandArray[1]); //функция отображающая команду на холсте
		} 
		else if(commandName=='drop_lens')	{
			//console.info("demoMode=" + demoMode +  " drop_lens 4444" );
			draw_2D_drop_lens();	//функция отображающая команду на холсте
		}
		else if(commandName=='lens')	{
			//console.info("demoMode=" + demoMode + "команда = " +CommandArray[0]  + " 1= " + CommandArray[1]+" 2= "+CommandArray[2]+" 3= "+CommandArray[3]+" 4= "+CommandArray[4]+" 5= "+CommandArray[5]+" 6= "+CommandArray[6]);
			draw_2D_lens(CommandArray[1],CommandArray[2],CommandArray[3],CommandArray[4],CommandArray[5],CommandArray[6]); //функция отображающая команду на холсте
		}
		else if(commandName=='hide_lens')	{
			//console.info("demoMode=" + demoMode +  " hide_lens 6666" );
			draw_2D_hide_lens(); //функция отображающая команду на холсте
		}
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Описание функции рисующей дем. объект на холсте.	

function load_2D(imgDemoObject) {
						//Создаем контейнер для лупы
						$("#canvasLoop").remove();
						$('body').append('<canvas id="canvasLoop"></canvas>');	
						$("#canvasLoop").css("display", "none");
	
	//Определение холста дем. объекта для режиме записи.		
		canvas = document.getElementById("blackboard");
		//Работаем с 2d
		ctx = canvas.getContext('2d');
		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;
		//Толщина рисующей линии
		ctx.lineWidth = canvas.width/250;
		//Задний фон
		var pic = new Image();
		pic.src = imgDemoObject;
		thisSlide = imgDemoObject;
	//Запуск функции рисования дем. объекта на холсте.		
		pic.onload = function () {//При загрузке картинки
			dctrl = { drawing: false };
			$('#slide').unbind();
			$('#blackboard').unbind();
			//События мышки
			$('#blackboard').on('mousedown', canvas_mousedown_2D);
			$('#blackboard').on('mousemove', canvas_mousemove_2D);
			$('#blackboard').on('mouseup', canvas_mouseup_2D);
			$('#blackboard').on('mouseout', canvas_mouseout_2D);
			//Размер картинки
			//Отображение дем. объекта.	
			console.log("load_2D -> onload -> pic.src = "+ pic.src);
			ctx.drawImage(pic, 0, 0, canvas.width, canvas.height);  //рисованеие на вкладке записи
		}
}


function iconResClick_2D(obj) {
		//Парсим JSON
	$cart = JSON.parse($json_start);
	//Ищем в json
	for (var $i = 0; $i < $cart.slides.length; $i++) {
		//Нашли
		if($cart.slides[$i].id==obj.id){
			//console.log("cart.slides[$i].id = " + $cart.slides[$i].id + "type = " + $cart.slides[$i].type);
			//Если new_demo
			if ($cart.slides[$i].type=='1'){
				//console.log("111111111111111111111111111111");
				//Новый слайд и идет запись
				if ($lastid!=$cart.slides[$i].id && $res==true){
					//Запоминаем слайд как последний
					$lastid=$cart.slides[$i].id;
					//Создаем контейнер
					$("#slide").empty();
					$("#slide").append('<canvas id="blackboard"></canvas>');
					//Рисуем
					load_2D($cart.slides[$i].pic);
					//Меняем подсказку
					$("#text").empty();
					$("#text").html($cart.slides[$i].commentary);
					$("#subs").scrollTop(0);
					/* 1 - отрисовка кнопок управления командами */
					$("#command_button_bar").empty();
					$("#command_button_bar").append("<div id=\"2d_buttons\"</div>");
					$("#2d_buttons").append("<button id=\"redmarker\">redmarker</button>");
					$("#2d_buttons").append("<button id=\"blackmarker\">blackmarker</button>");
					$("#2d_buttons").append("<button id=\"whitemarker\">whitemarker</button>");
					$("#2d_buttons").append("<button id=\"clear\">clear</button>");
					$("#2d_buttons").append("<button id=\"loop\">&#128270;</button>");
					
						//Создаем контейнер для лупы
						$("#canvasLoop").remove();
						$('body').append('<canvas id="canvasLoop"></canvas>');	
						$("#canvasLoop").css("display", "none");
					
					//создать контейнер прелоад 
					$("#canvasPreload").remove();
					$('body').append('<canvas id="canvasPreload"></canvas>');	
					$("#canvasPreload").css("display", "none");
						//события при нажатии на кнопки панели команд 
						$('#redmarker').click(redmarker_2D);
						$('#blackmarker').click(blackmarker_2D);
						$('#whitemarker').click(whitemarker_2D);
						$('#clear').click(clearBorder_2D);
						$('#loop').click(loop_2D);
						statusAction = 1;
					
					
					//
					//Запоминаем изображение
					lastBorder=document.getElementById('blackboard').toDataURL();
					preload_2D(lastBorder);
					//Отсылаем смену слайда
					sendAddSlide1($cart.slides[$i].id.substr(1));
				}
				else if($res==true){
					clearBorder_2D();
				}
			}
		}
	}
} 


//==============================================================================================================================================================
//Записи команды переключения демонстрации
function sendAddSlide1(i){
	if ($res==true){
		$jsonString += '{"idSlide": "'+i+'", "time": "'+$timeres+'"},';
		console.log("добавлен слайд 2D = " + $jsonString);
	}
}
/*
//Отправка на сервер результата записи
function sendJSONs(){
	console.info("Запись завершена! 2D = " + $jsonString);
	$.post( "action.php", {id:$idLection, jsonString:$jsonString, TotalCommandString:$TotalCommandString },onAjaxSuccess);
}
function onAjaxSuccess(){
	alert('Запись завершена!');
}
*/
//==============================================================================================================================================================
//========================================================ФУНКЦИИ НАХОЖДЕНИЯ ТЕКУЩЕЙ КОМАНДЫ НА ВОСПРОИЗВЕДЕНИЯ=================================================
//==============================================================================================================================================================
function createAction_2D(startAction, finishAction) {
	//alert(startAction +' '+ finishAction);
	for (var i=startAction; i<=finishAction;i++)
	{
		commandsArr = cart2.commands[i].command.split(';');
		if(commandsArr[0]=='drop_slide')
		{
			dropSlide_script();
		}
		else if (commandsArr[0]=='draw')
		{
			draw_2D_draw(commandsArr[1],commandsArr[2],commandsArr[3],commandsArr[4],commandsArr[5],commandsArr[6],commandsArr[7]); //функция отображающая команду на холсте
		}
		else if(commandsArr[0]=='clear_slide')
		{
			draw_2D_clear_slide(); //функция отображающая команду на холсте
		}
		else if(commandsArr[0]=='create_lens')
		{
			draw_2D_create_lens(commandsArr[1]); //функция отображающая команду на холсте
		}
		else if(commandsArr[0]=='drop_lens')
		{
			if ($("div").is(".loop"))
			{		
				draw_2D_drop_lens();	//функция отображающая команду на холсте
			}
		}
		else if(commandsArr[0]=='lens')
		{
			draw_2D_lens(commandsArr[1],commandsArr[2],commandsArr[3],commandsArr[4],commandsArr[5],commandsArr[6]); //функция отображающая команду на холсте
		}
		else if(commandsArr[0]=='hide_lens')
		{
			draw_2D_hide_lens(); //функция отображающая команду на холсте
		}
	}
}