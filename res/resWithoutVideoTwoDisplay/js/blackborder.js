var canvas;
var ctx;
var deltaH;
var deltaW;
var dctrl;
var thisSlide;
var lastStrikStyle;

document.getElementById("redmarker").onclick = redmarker;
document.getElementById("blackmarker").onclick = blackmarker;
document.getElementById("whitemarker").onclick = whitemarker;
document.getElementById("clear").onclick=clearBorder;

//Прелоад
function preload(lastBorder)
{
	//Заполнение canvas для прелоад
	canvasPreload = document.getElementById("canvasPreload");
	var ctxL = canvasPreload.getContext('2d');
	var picL = new Image();
	picL.src = lastBorder;
	canvasPreload.width=canvas.width;
	canvasPreload.height=canvas.height;
	picL.onload=function()
	{
		var yL= canvasPreload.height;
		var xL= canvasPreload.width;
		ctxL.drawImage(picL, 0, 0, xL, yL);
	}
}

//Красный маркер
function redmarker()
{
	ctx.strokeStyle="#FF0000";
	if (statusAction==2)
	{
		deleteLoop();
	}
	statusAction=1;
	//Запоминаем цвет
	lastStrikStyle="#FF0000";
}

//Черный маркер
function blackmarker()
{
	ctx.strokeStyle="#000000";
	if (statusAction==2)
	{
		deleteLoop();
	}
	statusAction=1;
	//Запоминаем цвет
	lastStrikStyle="#000000";
}
//Белый маркер
function whitemarker()
{
	ctx.strokeStyle="#FFFFFF";
	if (statusAction==2)
	{
		deleteLoop();
	}
	statusAction=1;
	//Запоминаем цвет
	lastStrikStyle="#FFFFFF";
}

//Отчистка доски
function clearBorder()
{
	//Чистим слайд
	ctx.clearRect(0, 0, 300, 150);
	//Отрисовываем оригинальное изображение
	var pic = new Image();
	pic.src = thisSlide;
	pic.onload = init(pic);
	//Удаляем лупу если есть
	if (statusAction==2)
	{
		deleteLoop();
	}
	statusAction=1;
	//Запись о чистке
	sendClearBlackborder();
	//Меняем изображение для смены размера
	lastBorder=canvas.toDataURL();
	preload(lastBorder);
}

//Рисуем линию
function draw_line(x1, y1, x2, y2) 
{
	ctx.beginPath();
	//Корекция если меняли размер окна
	//x1=x1*widthStart/document.getElementById('slide').offsetWidth;
	//y1=y1*heightStart/document.getElementById('slide').offsetHeight;
	//x2=x2*widthStart/document.getElementById('slide').offsetWidth;
	//y2=y2*heightStart/document.getElementById('slide').offsetHeight;
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
	//Запись о рисовании
	sendPaintAction (x1,y1,x2,y2,ctx.strokeStyle);
}

//При нажатой кнопке
function draw_line_ev(event) 
{
	//Получаем координаты
	var rect = event.target.getBoundingClientRect();
	var mousex = event.clientX - rect.left;
	var mousey = event.clientY - rect.top;
	//Рисуем линию
	draw_line(dctrl.prevx, dctrl.prevy, mousex, mousey);
	dctrl.prevx = mousex;
	dctrl.prevy = mousey;
}

//Нажатие мышки
function canvas_mousedown(event) 
{
	if (statusAction==1)
	{
		var rect = event.target.getBoundingClientRect();
		dctrl.drawing = true;
		
		draw_line();
		
		dctrl.prevx = event.clientX - rect.left;
		dctrl.prevy = event.clientY - rect.top;
	}
}

//При движении мышки
function canvas_mousemove(event) 
{
	if (statusAction==1)
	{
		if(dctrl.drawing) 
		{
			draw_line_ev(event);
		}
	}
}

//Отпускаем конопку мышки
function canvas_mouseup(event) 
{
	if (statusAction==1)
	{
		dctrl.drawing = false;
	}
	lastBorder=canvas.toDataURL();
	//Обновляем область прелоад
	preload(lastBorder);
}

//При загрузке картинки
function init(pic) 
{
	
	//Запрет на рисование
	dctrl = { drawing: false };
	//События мышки
	canvas.addEventListener("mousedown", canvas_mousedown);
	canvas.addEventListener("mousemove", canvas_mousemove);
	canvas.addEventListener("mouseup", canvas_mouseup);
	//Размер картинки
	var y= canvas.height;
	var x= canvas.width;
	ctx.drawImage(pic, 0, 0, x, y);
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
	thisSlide = backgroundBoard;
	//Погрешности в координатах
	canvas.width=canvas.offsetWidth;
	canvas.height=canvas.offsetHeight;
	//Толщина рисующей линии
	ctx.lineWidth = canvas.width/250;
	//Цвет линии
	ctx.strokeStyle=lastStrikStyle;
	//Загрузка картинки
	pic.onload = init(pic);
}
