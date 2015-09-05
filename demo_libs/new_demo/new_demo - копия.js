
/* _new_demo  - префикс для того чтобы обозначить функции данного демонстрационного объекта */


//1) При загрузке библиотеки происходит запуск функции добавляющей форму ввода данных о демонстрационном объекте.
$(document).ready(function(){ //при загрузке библиотеки происходит запуск функции добавляющей форму ввода данных о демонстрационном объекте
	alert('библиотека загружена, необходимо добавить файлы демонстрационного объекта!');	
//1.1)	Создание формы загрузки демонстрационного объекта.
	$("#data_table").empty();
		$("#data_table").append("<b>Файлы демонсрационного объекта:</b>");
		$("#data_table").append("<tr><td>Изображение:</td><td><input type=\"file\" name=\"demo_object_img\" id=\"demo_object_img\" multiple /></td></tr>");
//1.2)	Создание кнопки загрузки дем. объекта.	
		$("#data_table").append("<p><input type=\"submit\" value=\"Загрузить демонстрационный объект\" onclick=\"add_demo_object_new_demo(demo_object_img.value)\"/></p>");
		$("#data_table").css("box-shadow","0 0 3px rgba(0,0,0,0.5)");
});
//2) Функция загрузки демонстрационного объекта. 
function add_demo_object_new_demo(demo_object_img) {
	alert('демонстрационный объект загружен, можно приступать!');
//2.1) 	Чтение директории файлов дем. объекта.	
	demo_object_img = demo_object_img.replace(/C:\\fakepath\\/i, '');
	demo_object_img_link = 'repository/' + libName + '/' + demo_object_img;
	
//2.2) 	Создание панели команд для дем. объекта.
		$("#command_button_bar").empty();
		$("#command_button_bar").append("<div id=\"new_buttons\"</div>");
		$("#new_buttons").append("<button id=\"red\">red</button>");
		$("#new_buttons").append("<button id=\"blue\">blue</button>");
		$("#new_buttons").append("<button id=\"original\">original</button>");	
//2.3) 	Создание контейнера, где отображается дем. объект.
//2.3.1) 	Контейнер для записи команд.
	//Создаем контейнер
	$("#res_slide").empty();
	$("#res_slide").append('<canvas id="res_blackboard"></canvas>');	
//2.3.2) 	Контейнер для воспроизведения команд.	
	//Создаем контейнер
	$("#play_slide").empty();
	$("#play_slide").append('<canvas id="play_blackboard"></canvas>');	
//2.4) 	Запуск функции отображающей дем. объект в контейнере.	
	//Рисуем
	load_new_demo(demo_object_img_link);
//2.5) 	Прикрепление событий к элементам панели команд.	
	//события при нажатии на кнопки панели команд 
	$('#red').click(red_new_demo);
	$('#blue').click(blue_new_demo);
	$('#original').click(original_new_demo);
}

//4) Описание функции рисующей дем. объект на холсте.	
//При загрузке картинки
function init_new_demo(pic) {
//4.1) 	Отображение дем. объекта в режиме записи.	
	res_ctx.drawImage(pic, 0, 0, res_canvas.width, res_canvas.height);  //рисованеие на вкладке записи
//4.2) 	Отображение дем. объекта в режиме воспроизведения.
	play_ctx.drawImage(pic, 0, 0, play_canvas.width, play_canvas.height); //рисованеие на вкладке вопроизведения
}

//3) Описание функции отображающей дем. объект в контейнере.	
		//Главная функция
function load_new_demo(demo_object_img_link)  {
//3.1) 	Определение холста дем. объекта для режиме записи.		
		res_canvas = document.getElementById("res_blackboard");
//3.2) 	Определение холста дем. объекта для режиме воспроизведения.		
		play_canvas = document.getElementById("play_blackboard");
		
		//Работаем с 2d
		res_ctx = res_canvas.getContext('2d');
		play_ctx = play_canvas.getContext('2d');
		
		play_canvas.width=500;
		play_canvas.height=400;
		
		//Задний фон
		var pic = new Image();
		pic.src = demo_object_img_link;
		res_canvas.width=500;
		res_canvas.height=400;
//3.3) 	Запуск функции рисования дем. объекта на холсте.		
		pic.onload = init_new_demo(pic);
		
		
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
//6.1) 	Запись текущей (последней) команды. (Для режима записи)
	$CurrentCommandString = '{"command": "paint_over;' + color + '", "time": "' + $timeres + '"}';	 //текущая команда для режима записи
//6.2) 	Запись массива команд. (Для режима воспроизведения)	
	$TotalCommandString += '{"command": "paint_over;' + color + '", "time": "' + $timeres + '"},';	//итоговая команда для режима воспроизведения
}

//9) Описание функции отображающей команду на холсте.
function draw_new_demo(color, demoMode) {
//9.1) 	Определение контекста рисования в зависимости от режима работы демонстрационного объекта.
	
	if (demoMode == "res_ctx") {
		context = res_canvas.getContext('2d');
	} else if (demoMode == "play_ctx") {
		context = play_canvas.getContext('2d');
	}
//9.2) 	Рисование на холсте.
		if (color == 'original_color') {
			context.clearRect(0, 0, res_canvas.width, res_canvas.height);
			var pic = new Image();
			pic.src = demo_object_img_link;
			pic.onload = init_new_demo(pic);
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
/********************************************************************************************************************************************/
/*------------------------------------ Функции чтения json-команд --------------------------------------------------------*/
/********************************************************************************************************************************************/

//7) Описание функции чтения текущей команды в режиме записи.
//чтение команд в режиме записи
function play_current_commands(CurrentCommand, CurrentResTime){
//7.1) 	Парсинг текущей команды.
	CurrentCommandStr = JSON.parse(CurrentCommand);
//7.2) 	Определение параметров из полученной команды.	
	CommandArray_command_name = CurrentCommandStr.command.split(';');
	
	var new_demo_action = CommandArray_command_name[0];
	var new_demo_action_color = CommandArray_command_name[1];
	var new_demo_action_time = CurrentCommandStr.time;
	var demoMode = "res_ctx"; //контекст для определения режима записи
	console.info(" new_demo_action = " + new_demo_action + " color = " + new_demo_action_color + " new_demo_action_time =" + new_demo_action_time);
//7.3) 	Отображение команды на холсте.	
		if (new_demo_action == "paint_over") {
			draw_new_demo(new_demo_action_color, demoMode); //функция отображающая команду на холсте
		}
}
//8) Описание функции чтения массива команд в режиме воспроизведения.
//чтение команд в режиме воспроизведения
function play_total_commands(TotalCommand, CurrentPlayTime)	{
//8.1) 	Парсинг массива команд.
	TotalCommandStr = JSON.parse(TotalCommand);
	var commandsArrLength = TotalCommandStr.commands.length; //количество команд в json-строке - длинна массива команд
//8.2) 	Проход по массиву команд циклом.	
		for (var i = 0; i <= commandsArrLength; i++) {
//8.3) 	Определение параметров из полученной команды.		
			//разбор команды из json-строки
			commandsArr = TotalCommandStr.commands[i].command.split(';'); 
				var new_demo_action = commandsArr[0];
				var new_demo_action_color = commandsArr[1];
				var new_demo_action_time = TotalCommandStr.commands[i].time;
				var demoMode = "play_ctx"; //контекст для определения режима воспроизведения
//8.4) 	Отображение команды на холсте.				
			if 	(new_demo_action_time == CurrentPlayTime) {
				console.info(" команда i= " + i + " " + new_demo_action + "  "  + new_demo_action_color +" " + new_demo_action_time); //вывод текущей команды согласно времени таймера воспроизведения
				
				if (new_demo_action == "paint_over") {
					//alert("action=" + new_demo_act+" draw_new_demo("+new_demo_action_color+")");
					draw_new_demo(new_demo_action_color, demoMode); //функция отображающая команду на холсте
				}
			}
		}
}
