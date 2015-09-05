function onAjaxSuccess(){
	alert('Запись завершена! Повторное нажатие кнопки res начнет запись заново.');
}
//Отправка на сервер результата записи
function sendJSONs(){
	console.info("sendJSONs - " + " jsonString: " + $jsonString);
	$.post( "action.php", {id:$idLection, jsonString:$jsonString, TotalCommandString:$TotalCommandString },onAjaxSuccess);
}