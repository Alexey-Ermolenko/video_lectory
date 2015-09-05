//глобальные переменные
var site = document.getElementById('site');
var slide = document.getElementById('slide');

var statusAction;

var thistime;
var timeres;
var lastid;
var thistipe;
var lastBorder;
var widthStart;
var heightStart;
var res;
var win;

//удобое представление времени
function timeFormat(fulltime) {
    var timemin = Math.floor(fulltime / 60);
    var timesec = Math.floor(fulltime) - timemin * 60;
	if (timesec < 10) {
        timesec = '0' + timesec;
    }
    return (timemin + ':' + timesec);
}
//Новое время
function newTime()
{
	 timeres=timeres + 0.02;
	 document.getElementById('timer').innerHTML = timeFormat(timeres);
}

//Запуск таймера
function start_timer()
{
	timeres=0;
	res=true;
	thistime = setInterval(newTime, 20);
	win.postMessage("startTime",sitepath); //
	document.getElementById("start").style.display = "none";
	document.getElementById("finish").style.display = "block";
	document.getElementById("forma").style.display = "block";
}
//Остановка
function finish_timer()
{
	clearInterval(thistime);
	res=false;
	win.postMessage("stopTime",sitepath);
	document.getElementById("text").innerHTML='';
	document.getElementById("finish").style.display = "none";
	document.getElementById("forma").style.display = "none";
	document.getElementById("start").style.display = "block";
	document.getElementById('result').style.display='block';
	if(document.getElementById('result').style.display=='block')
	{
		setTimeout(hideResult, 10000)
	}
}

function hideResult()
{
	document.getElementById('result').style.display='none';
}

function messageIconClick(numberSlide)
{
	if (lastid!=numberSlide && res==true)
	{
		win.postMessage(numberSlide,sitepath);
		lastid=numberSlide; //
		document.getElementById('text').innerHTML = '';
		document.getElementById('text').innerHTML = jsonComment[numberSlide];
	}
	else if(res==true)
	{
		win.postMessage(numberSlide,sitepath);
	}
}

function iconClick(obj) 
{
	var numberSlide=obj.id.substr(1);
	messageIconClick(numberSlide);
}

//При изменение размера окна
window.onresize=function resizing()
{
	//Высота подсказки
	document.getElementById('site').style.height=400;
	document.getElementById('subs').style.height = document.getElementById('site').offsetHeight - document.getElementById('form1').offsetHeight-10;
}

//Пересылка результата обратно
function listener(event)
{
	if ( event.origin !== sitepath )
	{
		return;
	}
	else
	{
			messageIconClick(event.data);
	}
}

//Добавляем собитие получения сообщений
if (window.addEventListener)
{
	window.addEventListener("message", listener,false);
} 
else 
{
	window.attachEvent("onmessage", listener);
}

//при загрузке страницы
window.onload=function loading() 
{
	//Открытие вспомогательного окна
	win = window.open(url3, 'slide', 'q=1');
	statusAction=1;
    //Устанавливаем высоту div'а отображающего подсказку
	document.getElementById('site').style.height=400;
	//Высота подсказки
	document.getElementById('subs').style.height = document.getElementById('site').offsetHeight - document.getElementById('form1').offsetHeight;
	//Устанавливаем высоту div'а c кнопками
    //document.getElementById('buttonbar2').style.height = document.getElementById('slide').offsetHeight;
	//Отсут для результирующего сообщения
	document.getElementById('result').style.top=document.getElementsByTagName('header')[0].offsetHeight;
	//Кнопки таймера
	document.getElementById("finish").style.display = "none";
	document.getElementById("forma").style.display = "none";
	document.getElementById("start").style.display = "block";
	document.getElementById("finish").style.width=document.getElementById("start").offsetWidth;
    //ширина слайдлиста
    var w = 133 * countSlide;
    document.getElementById('inlist').style.width = w;
	//Массивы слайдов
	jsonID= JSON.parse(jsonID);
	jsonType = JSON.parse(jsonType);
	jsonSlide2D = JSON.parse(jsonSlide2D);
	jsonTexture3D = JSON.parse(jsonTexture3D);
	jsonObject3D = JSON.parse(jsonObject3D);
	jsonComment = JSON.parse(jsonComment);
	//Для переключения слайдов
	lastid='NULL';
	//Время на старте
	timeres = 0;
}