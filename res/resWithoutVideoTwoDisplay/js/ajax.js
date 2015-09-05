//Функция передающая рисование линий
function sendPaintAction(x1, y1, x2, y2, color)
{
	if (res==true)
	{
		var action='paint';
		var wCanvas=canvas.width;
		var hCanvas=canvas.height;
		$.ajax({
			type: "POST",
			url: "action.php",
			data:"&time="+timeres+"&action="+action+"&x1="+x1+"&y1="+y1+"&x2="+x2+"&y2="+y2+"&color="+color+"&wCanvas="+wCanvas+"&hCanvas="+hCanvas
		});
	}
}

//Функция передающая чистку доски
function sendClearBlackborder()
{
	if (res==true)
	{	
		var action='clear';
		var wCanvas=canvas.width;
		var hCanvas=canvas.height;
		$.ajax({
			type: "POST",
			url: "action.php",
			data:"&time="+timeres+"&action="+action+"&wCanvas="+wCanvas+"&hCanvas="+hCanvas
		});
	}
}

//Функция передающая создание лупы
function sendCreateLoop()
{
	if (res==true)
	{
		var action='createLoop';
		var wCanvas=canvas.width;
		var hCanvas=canvas.height;
		$.ajax({
			type: "POST",
			url: "action.php",
			data:"&time="+timeres+"&action="+action+"&wCanvas="+wCanvas+"&hCanvas="+hCanvas
		});
	}
}

//Функция передающая удаление лупы
function sendDeleteLoop()
{
	if (res==true)
	{
		var action='deleteLoop';
		var wCanvas=canvas.width;
		var hCanvas=canvas.height;
		$.ajax({
			type: "POST",
			url: "action.php",
			data:"&time="+timeres+"&action="+action+"&wCanvas="+wCanvas+"&hCanvas="+hCanvas
		});
	}
}

//Функция передающая координаты лупы на слайде
function sendLoopAction(x1, y1)
{
	if (res==true)
	{
		var action='loop';
		var wCanvas=canvas.width;
		var hCanvas=canvas.height;
		var pageX=window.pageXOffset;
		var pageY=window.pageYOffset;
		$.ajax({
			type: "POST",
			url: "action.php",
			data:"&time="+timeres+"&action="+action+"&x1="+x1+"&y1="+y1+"&wCanvas="+wCanvas+"&hCanvas="+hCanvas+"&pageX="+pageX+"&pageY="+pageY
		});
	}
}

//Функция передающая скрытие лупы
function sendHideLoop()
{
	if (res==true)
	{
		var action='hideLoop';
		var wCanvas=canvas.width;
		var hCanvas=canvas.height;
		$.ajax({
			type: "POST",
			url: "action.php",
			data:"&time="+timeres+"&action="+action+"&wCanvas="+wCanvas+"&hCanvas="+hCanvas
		});
	}
}
//Функция передающая добавление слайда
function sendAddSlide(i)
{
	if (res==true)
	{
		var action='addSlide';
		$.ajax({
			type: "POST",
			url: "action.php",
			data:"&action="+action+"&idSlide="+i+"&time="+timeres
		});
	}
}