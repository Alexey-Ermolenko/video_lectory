/*
$jsonString ='{"slides": [';
$jsonString2 ='{"commands": [';
*/

function onAjaxSuccess(){
	alert('Запись завершена!');
}

//Отправка на сервер результата записи
function sendJSONs(){
	console.info("sendJSONs - " + " jsonString: " + $jsonString + "TotalCommandString: " + $TotalCommandString);
	$.post( "action.php", {id:$idLection, jsonString:$jsonString, TotalCommandString:$TotalCommandString },onAjaxSuccess);
}


/*
//Записи команды вращения 3D
function send3DAction(x, y, z){
	if ($res==true){
		$jsonString2 += '{"command": "rotation_3D;'+x+';'+y+';'+z+'", "time": "'+$timeres+'"},';
	}
}

//Записи команды рисования на слайде
function sendPaintAction(x1, y1, x2, y2, color){
	if ($res==true){
		var wCanvas=canvas.width;
		var hCanvas=canvas.height;
		$jsonString2 += '{"command": "draw;'+wCanvas+';'+hCanvas+';'+x1+';'+y1+';'+x2+';'+y2+';'+color+'", "time": "'+$timeres+'"},';
	}
}

//Записи команды чистки слайда
function sendClearBlackborder(){
	if ($res==true){
		$jsonString2 += '{"command": "clear_slide", "time": "'+$timeres+'"},';
	}
}

//Записи команды создания лупы
function sendCreateLoop(){
	if ($res==true){
		var hCanvas=canvas.height;
		$jsonString2 += '{"command": "create_lens;'+hCanvas+'", "time": "'+$timeres+'"},';
	}
}

//Записи команды удаления лупы
function sendDeleteLoop(){
	if ($res==true){
		$jsonString2 += '{"command": "drop_lens", "time": "'+$timeres+'"},';
	}
}

//Записи команды перемещения лупы
function sendLoopAction(x1, y1){
	if ($res==true){
		var wCanvas=canvas.width;
		var hCanvas=canvas.height;
		var pageX=window.pageXOffset;
		var pageY=window.pageYOffset;
		$jsonString2 += '{"command": "lens;'+wCanvas+';'+hCanvas+';'+pageX+';'+pageY+';'+x1+';'+y1+'", "time": "'+$timeres+'"},';
	}
}

//Записи команды скрытия лупы
function sendHideLoop(){
	if ($res==true){
		$jsonString2 += '{"command": "hide_lens", "time": "'+$timeres+'"},';
	}
}

//Записи команды переключения демонстрации
function sendAddSlide(i){
	if ($res==true){
		$jsonString += '{"idSlide": "'+i+'", "time": "'+$timeres+'"},';
	}
}
*/