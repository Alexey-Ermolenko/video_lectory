/* _3D  - префикс для того чтобы обозначить функции данного демонстрационного объекта от другого */
//http://www.zeali.net/mirrors/html5canvastutorials/three/html5-canvas-webgl-texture-with-three-js/index.html
resCanvasID = 'res_slide';
playCanvasID = 'play_slide';



function load_form_3D(){
			$("#blank").empty();
			$("#form1").attr("action","create_demo_3D.php");
			$("#blank").append("<b>Файлы демонсрационного объекта:</b><br>");
			$("#blank").append("Автор:<input type=\"text\" name=\"demo_object_autor\" id=\"demo_object_autor\"/><br>");
			$("#blank").append("Название слайда:<input type=\"text\" name=\"demo_object_name\" id=\"demo_object_name\"/><br>");		
			$("#blank").append("Иконка для 3D слайда:<input type=\"file\" name=\"demo_object_icon\" id=\"demo_object_icon\" accept=\"image/jpg,image/jpeg,image/png\" required=\"required\"/><br> ");
			$("#blank").append("Текстура:<input type=\"file\" name=\"demo_object_img\" id=\"demo_object_img\" accept=\"image/jpg,image/jpeg,image/png\" required=\"required\"/><br> ");
			$("#blank").append("Объект:<input type=\"file\" name=\"demo_object\" id=\"demo_object\" required=\"required\"/><br> ");
			$("#blank").append("Комментарий:<input type=\"text\" name=\"demo_object_comment\" id=\"demo_object_comment\"/><br>");
			$("#blank").append("<p><input type=\"submit\" value=\"Создать новый демонстрационный объект\" onclick=\"resultCreate3D()\"/></p>");
			$("#form1").css("width","50%");
			$("#form1").css("box-shadow","0 0 3px rgba(0,0,0,0.5)");
}

function resultCreate3D()
{
	if (document.getElementsByName('demo_object_autor')[0].value!='' && document.getElementsByName('demo_object_name')[0].value!='' && document.getElementsByName('demo_object_img')[0].value!='' && document.getElementsByName('demo_object_icon')[0].value!='' && document.getElementsByName('demo_object_img')[0].value!='' && document.getElementsByName('demo_object')[0].value!='')
	{
		document.getElementById('result').style.display='block';
	}
	if(document.getElementById('result').style.display=='block')
	{
		setTimeout(hideResult, 10000)
	}
}

function load_demo_3D(objContainer, objectDemoObject, textureDemoObject) {
		/////////////////////////////////////////////	
			var objectPathJSON = objectDemoObject;
			var texturePathPNG = textureDemoObject;
			var bgTexturePath = '';
			//Строим объект
			var objContainer = objContainer; 
			console.log("slide objContainer = " + objContainer + " .clientWidth = " + objContainer.clientWidth + " $objectPathJSON = " + objectPathJSON + " $texturePathPNG = " + texturePathPNG );			
			object = new obj2web(objContainer, objectPathJSON, texturePathPNG, bgTexturePath);	
			//Задаем свойства
			object.setDistanceInterval(500, 500);
			object.setInitPosition(0, 15, 0);
			//Выводим объект
			object.animate();
		/////////////////////////////////////////////
	
}

function demoIconClick_3D(obj) {
	var numberDemoObject = obj.id.substr(1);
	
	var textureDemoObject = obj.getAttribute("texture");
	var objectDemoObject = obj.getAttribute("object");
	var commentDemoObject = obj.getAttribute("comment");
	
	var objectsURL = '../repository/3D/objects/'; 
	var texturesURL = '../repository/3D/textures/'; 
	
	objectDemoObject = objectsURL + objectDemoObject;
	textureDemoObject = texturesURL + textureDemoObject;
	var objContainer = document.getElementById('slide');
	console.log("3D numberDemoObject =" + numberDemoObject + " textureDemoObject = " + textureDemoObject + " objectDemoObject = " + objectDemoObject);
	
	$("#slide").empty();
	load_demo_3D(objContainer, objectDemoObject, textureDemoObject);	
	document.getElementById('text').innerHTML = 'Комментарий: </br> <b>' + commentDemoObject + '</b>';
	
		
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

//Позиции для 3D
function draw_3D(x,y,z) {
	superX=x;
	superY=y;
	superZ=z;
}



//---------------------------------------------------------------------------------------------------------------------------------------------------------------

function send3DAction(x,y,z) {
	//"rotation_3D;   -75.55304353784044 ;  344.4763267995244 ;  354.4720703409193","time": "5.339999999999974"
	$CurrentCommandString = '{"command": "rotation_3D;'+x+';'+y+';'+z+'", "time": "'+$timeres+'"}';
	$TotalCommandString +=  '{"command": "rotation_3D;'+x+';'+y+';'+z+'", "time": "'+$timeres+'"},';
}


/********************************************************************************************************************************************/
/*------------------------------------ Функции чтения json-команд --------------------------------------------------------*/
/********************************************************************************************************************************************/

//7) Описание функции чтения текущей команды в режиме записи.
//чтение команд в режиме записи
function play_current_3D_commands(CurrentCommand, CurrentResTime){	
		console.info(" play_current_commands  3D");	
//7.1) 	Парсинг текущей команды.
	CurrentCommandStr = JSON.parse(CurrentCommand);
//7.2) 	Определение параметров из полученной команды.	
	commandsArr = CurrentCommandStr.command.split(';');
	console.info("play_current_commands -> 3D_action = ");
//7.3) 	Отображение команды на холсте.	
		if (commandsArr[0] == "rotation_3D") {
			draw_3D(commandsArr[1],commandsArr[2],commandsArr[3]); //функция отображающая команду на холсте
		}
}
var statusSlide=true;			
function dropSlide_script(){
	document.getElementById('slide').innerHTML = '';
	statusSlide=false;
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------
function load_3D(objContainer, objectDemoObject, textureDemoObject) {
		/////////////////////////////////////////////	
			var objectPathJSON = objectDemoObject;
			var texturePathPNG = textureDemoObject;
			var bgTexturePath = '';
			//Строим объект
			var objContainer = objContainer; 
			object = new obj2web(objContainer, objectPathJSON, texturePathPNG, bgTexturePath);	
			//Задаем свойства
			object.setDistanceInterval(500, 500);
			object.setInitPosition(0, 15, 0);
			//Выводим объект
			object.animate();
		/////////////////////////////////////////////
	
}


function iconResClick_3D(obj) {
		//Парсим JSON
	$cart = JSON.parse($json_start);
	//Ищем в json
	for (var $i = 0; $i < $cart.slides.length; $i++) {
		//Нашли
		if($cart.slides[$i].id==obj.id){
			//console.log("cart.slides[$i].id = " + $cart.slides[$i].id + "type = " + $cart.slides[$i].type);
			//Если new_demo
			if ($cart.slides[$i].type=='2'){
				//console.log("111111111111111111111111111111");
				//Новый слайд и идет запись
				if ($lastid!=$cart.slides[$i].id && $res==true){
					//Запоминаем слайд как последний
					$lastid=$cart.slides[$i].id;
					//Создаем контейнер
					$("#slide").empty();
					
					var objectPathJSON = $cart.slides[$i].object;
					var texturePathPNG = $cart.slides[$i].texture;
					console.log("load_3D ->");
					//Строим объект
					var objContainer = document.getElementById('slide');
					load_3D(objContainer, objectPathJSON, texturePathPNG);
					//Меняем подсказку
					$("#text").empty();
					$("#text").html($cart.slides[$i].commentary);
					$("#subs").scrollTop(0);
					
					
					/* 1 - отрисовка кнопок управления командами */
					$("#command_button_bar").empty();
					$("#command_button_bar").append("<div id=\"3d_buttons\"</div>");
					$("#3d_buttons").append("<button id=\"loop1\">&#128270; +</button>");
					$("#3d_buttons").append("<button id=\"loop2\">&#128269; -</button>");

					//Отсылаем смену слайда
					sendAddSlide2($cart.slides[$i].id.substr(1));
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
function sendAddSlide2(i){
	if ($res==true){
		$jsonString += '{"idSlide": "'+i+'", "time": "'+$timeres+'"},';
		console.log("добавлен слайд 3D = " + $jsonString);
	}
}
/*
//Отправка на сервер результата записи
function sendJSONs(){
	console.info("Запись завершена! 3D = " + $jsonString);
	$.post( "action.php", {id:$idLection, jsonString:$jsonString, TotalCommandString:$TotalCommandString },onAjaxSuccess);
}
function onAjaxSuccess(){
	alert('Запись завершена!');
}
*/
//==============================================================================================================================================================
//========================================================ФУНКЦИИ НАХОЖДЕНИЯ ТЕКУЩЕЙ КОМАНДЫ НА ВОСПРОИЗВЕДЕНИЯ=================================================
//==============================================================================================================================================================
function createAction_3D(startAction, finishAction) {
	console.log("createAction_3D" + " startAction = " + startAction + " finishAction = " + finishAction);
}