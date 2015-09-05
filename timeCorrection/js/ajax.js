function onAjaxSuccess(){
	alert('Изменения успешно внесены. Перезагрузите страницу чтобы увидеть изменения.');
}

//Отправка на сервер результата записи
function send($delta){
	$.post( "correction.php", {id:$idLection, delta:$delta},onAjaxSuccess);
}