/* _3D  - префикс для того чтобы обозначить функции данного демонстрационного объекта от другого */
//http://www.zeali.net/mirrors/html5canvastutorials/three/html5-canvas-webgl-texture-with-three-js/index.html
resCanvasID = 'res_slide';
playCanvasID = 'play_slide';

$(document).ready(function(){ //при загрузке библиотеки происходит запуск функции добавляющей форму ввода данных о демонстрационном объекте
	alert('библиотека загружена, необходимо добавить файлы демонстрационного объекта!');
	$("#data_table").empty();
		$("#data_table").append("<b>Файлы демонсрационного объекта:</b>");
		$("#data_table").append("<tr><td>Текстура:</td><td><input type=\"file\" name=\"demo_object_img\" id=\"demo_object_img\" multiple /></td></tr>");
		$("#data_table").append("<tr><td>Объект:</td><td><input type=\"file\" name=\"demo_object\" id=\"demo_object\" multiple /></td></tr>");
		$("#data_table").append("<p><input type=\"submit\" value=\"Загрузить демонстрационный объект\" onclick=\"add_demo_object_3D(demo_object_img.value, demo_object.value)\"/></p>");
		$("#data_table").css("box-shadow","0 0 3px rgba(0,0,0,0.5)");
});
function add_demo_object_3D(demo_object_img, demo_object) {
	console.log('Файлы загружены!');
	
	demo_object_img = demo_object_img.replace(/C:\\fakepath\\/i, '');
	demo_object_img_link = 'repository/' + libName + '/' + demo_object_img;	
	  //demo_object_img_link = 'repository/3D/textures/123.png';	
	
	
	demo_object = demo_object.replace(/C:\\fakepath\\/i, '');
	demo_object_link = 'repository/' + libName + '/' + demo_object;	
	  //demo_object_link = 'repository/3D/objects/123.js';
	
		/* 1 - отрисовка кнопок управления командами */
		$("#command_button_bar").empty();
		$("#command_button_bar").append("<div id=\"3d_buttons\"</div>");
		$("#3d_buttons").append("<button id=\"loop1\">&#128270; +</button>");
		$("#3d_buttons").append("<button id=\"loop2\">&#128269; -</button>");
		
		$("#3d_buttons").append("<button id=\"res_load\">res_load</button>");
		$("#3d_buttons").append("<button id=\"play_load\">play_load</button>");

	//Создаем контейнер
	//$("#play_slide").empty();
	//load_3D_canvas(demo_object_link, demo_object_img_link, playCanvasID);
	
		//события при нажатии на кнопки панели команд 
		$('#loop1').click(loop1);
		$('#loop2').click(loop2);
		
		$('#res_load').click(function () {
/////////////////////////////////////////////		
			$("#res_slide").empty();
			$("#res_slide").css({"width":"500px", "height":"400px"});
			var objectPathJSON = demo_object_link;
			var texturePathPNG = demo_object_img_link;
			var bgTexturePath = '';
			//Строим объект
			var objContainer = document.getElementById('res_slide');
			
			//objContainer.innerHTML = objContainer.clientWidth;
			
			console.log("res_slide objContainer = " + objContainer + " .clientWidth = " + objContainer.clientWidth + " $objectPathJSON = " + objectPathJSON + " $texturePathPNG = " + texturePathPNG );
						
			object = new obj2web(objContainer, objectPathJSON, texturePathPNG, bgTexturePath);	
		
			//Задаем свойства
			object.setDistanceInterval(500, 500);
			object.setInitPosition(0, 15, 0);
			//Выводим объект
			object.animate();
/*			
/////////////////////////////////////////////		
			$("#play_slide").empty();
			$("#play_slide").css({"width":"500px", "height":"400px"});
			//Строим объект
			var objContainer_play = document.getElementById('play_slide');
			
			//objContainer.innerHTML = objContainer.clientWidth;
			
			console.log("play_slide objContainer1 = " + objContainer_play + " .clientWidth = " + objContainer_play.clientWidth + " $objectPathJSON = " + objectPathJSON + " $texturePathPNG = " + texturePathPNG );
						
			object_play = new obj2web(objContainer_play, objectPathJSON, texturePathPNG, bgTexturePath);	
		
			//Задаем свойства
			object_play.setDistanceInterval(500, 500);
			object_play.setInitPosition(0, 15, 0);
			//Выводим объект
			object_play.animate();
			
/////////////////////////////////////////////	
*/	
	
		});
		
		$('#play_load').click(function () {
/////////////////////////////////////////////		
			$("#play_slide").empty();
			$("#play_slide").css({"width":"500px", "height":"400px"});
			var objectPathJSON_play = demo_object_link;
			var texturePathPNG_play = demo_object_img_link;
			var bgTexturePath_play = '';
			//Строим объект
			var objContainer_play = document.getElementById('play_slide');
			
			//objContainer.innerHTML = objContainer.clientWidth;
			
			console.log("play_slide objContainer = " + objContainer_play + " .clientWidth = " + objContainer_play.clientWidth + " $objectPathJSON = " + objectPathJSON_play + " $texturePathPNG = " + texturePathPNG_play );
						
			object_play = new obj2web(objContainer_play, objectPathJSON_play, texturePathPNG_play, bgTexturePath_play);	
		
			//Задаем свойства
			object_play.setDistanceInterval(500, 500);
			object_play.setInitPosition(0, 15, 0);
			//Выводим объект
			object_play.animate();
		});
	
}






function loop1(){
	console.log(" loop1" );
	
}

function loop2() {
	console.log(" loop2" );
}


function send3DAction(x,y,z) {
	//"rotation_3D;   -75.55304353784044 ;  344.4763267995244 ;  354.4720703409193","time": "5.339999999999974"
	$CurrentCommandString = '{"command": "rotation_3D;'+x+';'+y+';'+z+'", "time": "'+$timeres+'"},';
	$TotalCommandString +=  '{"command": "rotation_3D;'+x+';'+y+';'+z+'", "time": "'+$timeres+'"},';
}

	/* 2 - функции записи команд в json_массив*/
	


	/* 3 - функции чтения и воспроизведения команд из json_массива	*/