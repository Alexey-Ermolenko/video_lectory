var canvas;
var ctx;
var deltaH;
var deltaW;
var dctrl;


//При загрузке картинки
function init(pic) 
{
	//Запрет на рисование
	dctrl = { drawing: true };
	ctx.drawImage(pic, 0, 0, canvas.width, canvas.height);
}

//Главная функция
function blackboard (backgroundBoard)
{
	//Обращаемся к canvas
	canvas = document.getElementById("blackboard");
	//Работаем с 2d
	ctx = canvas.getContext('2d');
	//Задний фон
	var pic = new Image();
	pic.src = backgroundBoard;
	//Погрешности в координатах
	canvas.width=canvas.offsetWidth;
	canvas.height=canvas.offsetHeight;
	//Толщина рисующей линии
	ctx.lineWidth = 2;
	//Загрузка картинки
	pic.onload = init(pic);
}
