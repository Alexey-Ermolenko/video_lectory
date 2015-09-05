//реакции нажатия кнопок
document.getElementById("play").onclick = videoPlay;
document.getElementById("videoRange").onclick = videoTime;
document.getElementById("audioRange").onclick = videoVolume;
document.getElementById("audioFull").onclick = volumeNull;
document.getElementById("playlink").onclick = videoPlay;
document.getElementById("videoClass").onclick = hideMenu;
document.getElementById("res").onclick = resAction;

//Действие при наведении
document.getElementById("playlink").onmouseover = show;
document.getElementById("video").onmouseover = show;
document.getElementById("playlink").onmouseout = hide;
document.getElementById("video").onmouseout = hide;

document.getElementById("openbar").onclick = showBar;
document.getElementById("closebar").onclick = hideBar;

var statusAction;

var thistime;
var timeres;
var lastid;
var thistipe;
var lastBorder;
var widthStart;
var heightStart;
var res;

//глобальные переменные
var site = document.getElementById("site");
var video = document.getElementById("video");
var play = document.getElementById("play");
var time = document.getElementById("time");
var fullTime = document.getElementById("fullTime");
var videoRange = document.getElementById("videoRange");
var audioRange = document.getElementById("audioRange");
var audioFull = document.getElementById("audioFull");
var videoFull = document.getElementById("videoFull");
var bar = document.getElementById("buttonbar");
var slide = document.getElementById("slide");
var inlist = document.getElementById("inlist");
var pictures = document.getElementById("pictures");
var timelist = document.getElementById("timelist");
var mp4 = document.getElementById("mp4");
var webm = document.getElementById("webm");
var submenu = document.getElementById("submenu");

var oldvolume;
var numberSlide;
var oldtime;
var endAction;

var cart = JSON.parse(jsonString);

//Массив для прелоэда
masPic=new Array();

//Показать кнопки для доски
function showBar ()
{ 
	document.getElementById("openbar").style.display = "none";
	document.getElementById("redmarker").style.display = "block"; 
	document.getElementById("blackmarker").style.display = "block";
	document.getElementById("whitemarker").style.display = "block";
	document.getElementById("clear").style.display = "block";
	document.getElementById("loop").style.display = "block";
	document.getElementById("closebar").style.display = "block";
}

//Скрыть кнопки для доски
function hideBar ()
{
	document.getElementById("openbar").style.display = "block";
	document.getElementById("redmarker").style.display = "none"; 
	document.getElementById("blackmarker").style.display = "none";
	document.getElementById("whitemarker").style.display = "none";
	document.getElementById("clear").style.display = "none";
	document.getElementById("loop").style.display = "none";
	document.getElementById("closebar").style.display = "none";
}

//Нажатие кнопок
document.onkeydown = function(event)
{
	if (event.keyCode == 34)
	{
		if (lastid=='NULL')
		{
			iconClick(document.getElementById(jsonID[0]));
		}
		else
		{
			for (var j=0; j<jsonID.length; j++)
			{
				if (jsonID[j].substr(1)==lastid && j==jsonID.length-1)
				{
					//iconClick(document.getElementById(jsonID[0]));
					break;
				}
				else if (jsonID[j].substr(1)==lastid)
				{
					iconClick(document.getElementById(jsonID[j+1]));
					break;
				}
			}
		}
		return false;
	}
	else if (event.keyCode == 33)
	{
		if (lastid=='NULL')
		{
			//iconClick(document.getElementById(jsonID[jsonID.length-1]));
		}
		else
		{
			for (var j=0; j<jsonID.length; j++)
			{
				if (jsonID[j].substr(1)==lastid && j==0)
				{
					//iconClick(document.getElementById(jsonID[jsonID.length-1]));
					break;
				}
				else if (jsonID[j].substr(1)==lastid)
				{
					iconClick(document.getElementById(jsonID[j-1]));
					break;
				}
			}
		}
		return false;
	}
	else if (event.keyCode == 82)
	{
		redmarker();
	}
	else if (event.keyCode == 66)
	{
		blackmarker();
	}
	else if (event.keyCode == 87)
	{
		whitemarker();
	}
	else if (event.keyCode == 88)
	{
		clearBorder();
	}
	else if (event.keyCode == 76)
	{
		loop();
	}
}

//Старт и остановка записи
function resAction()
{
	if (res==true)
	{
		res=false;
		video.pause();
		video.currentTime=0;
		document.getElementById('res').textContent = "res";
		lastid='NULL';
		sendFinishRes();
		blackmarker();
		slide.innerHTML='';
		/*if ($("div").is(".loop"))
		{	
			deleteLoop();
		}
		ctx.strokeStyle="#000000";*/
	}
	else
	{
		res=true;
		video.play();
		document.getElementById('res').textContent = "s";
	}
	
}

//действия при загрузке видео
function start() 
{
    fullTime.value = timeFormat(video.duration);
	//Значения для видеоползунка
    videoRange.min = 0;
    videoRange.max = video.duration;
    videoRange.step =1;
	//videoRange.step = video.duration / 1000;
}

//Воспроизведение, пауза
function videoPlay() 
{
    if (video.paused) 
    {
        video.play();
        play.textContent = "||";

    } 
    else if (video.play) 
    {
        video.pause();
        play.textContent = ">";
    }
}

//перемотка видео позунком
function videoTime() 
{
    video.currentTime = videoRange.value;
}

//ползунок настройки звука
function videoVolume() 
{
    video.volume = audioRange.value/100;
	if (video.volume==0)
	{
		audioFull.textContent = "+";
	}
}

//кнопка выключения звука
function volumeNull() 
{
    if (video.volume == 0) 
    {
        video.volume = oldvolume;
        audioRange.value = oldvolume * 100;
        audioFull.textContent = "-";
    }
    else 
    {
		if (oldvolume==0)
		{
			oldvolume=1;
		}
		else
		{
			oldvolume = video.volume;
        }
		video.volume = 0;
        audioRange.value = 0;
        audioFull.textContent = "+";
    }
}

//Показать меню с выбором качества
function show ()
{ document.getElementById("playlink").style.display = "block"; }

//Скрыть меню с выбором качества
function hide ()
{ document.getElementById("playlink").style.display = "none"; }

//Действие при нажатии на кнопку выбора качества
function hideMenu() 
{
    if (submenu.style.display == "none")
    { submenu.style.display = "block"; }
    else { submenu.style.display = "none"; }
}

//Подключение другого файла при смене качества видео
function types(obj) 
{
    if (obj.id == "360p") 
    {
        for (var i = 0; i < cart.video.length; i++) 
        {
            if (cart.video[i].type == 360) 
            {
                webm.src = cart.video[i].mp4;
                mp4.src = cart.video[i].webm;
            }
        }
    }

    else if (obj.id == "480p") 
    {
        for (var i = 0; i < cart.video.length; i++) 
        {
            if (cart.video[i].type == 480) 
            {
                webm.src = cart.video[i].mp4;
                mp4.src = cart.video[i].webm;
            }
        }
    }

    else if (obj.id == "720p") 
    {
        for (var i = 0; i < cart.video.length; i++) 
        {
            if (cart.video[i].type == 720) 
            {
                webm.src = cart.video[i].mp4;
                mp4.src = cart.video[i].webm;
            }
        }
    }

    else if (obj.id == "1080p") 
    {
        for (var i = 0; i < cart.video.length; i++) 
        {
            if (cart.video[i].type == 1080) 
            {
                webm.src = cart.video[i].mp4;
                mp4.src = cart.video[i].webm;
            }
        }
    }
	//Запоминание момента и загрузка видео
    var timeVideo = video.currentTime;
    video.load();
	/*video.onload=function (timeVideo)
	{
		video.currentTime = timeVideo;
        videoPlay();
	}*/
    setTimeout(function () {
        video.currentTime = timeVideo;
        videoPlay();
    }, 100);
	//Скрыть меню выбора
    submenu.style.display = "none";

}

//кнопка выключения звука
function volumeNull() {
    if (video.volume == 0) 
    {
        video.volume = oldvolume;
        audioRange.value = oldvolume * 100;
        audioFull.textContent = "-";
    }
    else 
    {
        oldvolume = video.volume;
        video.volume = 0;
        audioRange.value = 0;
        audioFull.textContent = "+";
    }
}

//удобое представление времени
function timeFormat(fulltime) {
    var timemin = Math.floor(fulltime / 60);
    var timesec = Math.floor(fulltime) - timemin * 60;
	if (timesec < 10) {
        timesec = '0' + timesec;
    }
    return (timemin + ':' + timesec);
}

/*//Новое время
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
	document.getElementById("start").style.display = "none";
	document.getElementById("finish").style.display = "block";
	document.getElementById("forma").style.display = "block";
}
//Остановка
function finish_timer()
{
	clearInterval(thistime);
	res=false;
	//sendFinishCreate();
	document.getElementById("finish").style.display = "none";
	document.getElementById("start").style.display = "block";
	document.getElementById('result').style.display='block';
	if(document.getElementById('result').style.display=='block')
	{
		setTimeout(hideResult, 10000)
	}
}*/

function hideResult()
{
	document.getElementById('result').style.display='none';
}

//Грузим json
//var cart = JSON.parse(jsonString);

//Смена картинки при нажатии на иконку
function iconClick(obj) 
{
	var numberSlide=obj.id.substr(1);
	if (jsonType[numberSlide]=='2D')
	{
	
		if (lastid!=numberSlide && res==true)
		{
			
			//Помечаем как используемый
			lastid=numberSlide;
			//Чистим область слайда
			slide.innerHTML = '';
			//Создаем область для отображения
			var newCanvas = document.createElement('canvas');
			newCanvas.setAttribute('id', 'blackboard');
			slide.appendChild(newCanvas);
			//Получаем ссылку на изображение
			var canvas=document.getElementById('blackboard');
			if (numberSlide==0)
			{
				var backgroundBoard=url2+jsonSlide2D[numberSlide];
			}
			else
			{
				var backgroundBoard=url+'2D/icons/'+jsonSlide2D[numberSlide];
			}
			//Отрисовываем изображение
			blackboard(backgroundBoard);
			//Меняем текст подсказки
			//document.getElementById('text').innerHTML = '';
			//document.getElementById('text').innerHTML = jsonComment[numberSlide];
			//Запоминаем изображение
			lastBorder=canvas.toDataURL();
			preload(lastBorder);
			//Отсылаем смену слайда
			sendAddSlide(numberSlide);
		}
		else if(res==true)
		{
			clearBorder();
		}
	}
	else if (jsonType[numberSlide]=='3D')
	{
	
		if (lastid!=numberSlide && res==true)
		{	
			
			//Помечаем как используемый
			lastid=numberSlide;
			//Чистим область слайда
			slide.innerHTML = '';
			//Получаем данные для 3D
			var objectPathJSON =url+'3D/objects/'+jsonObject3D[numberSlide];
			var texturePathPNG =url+'3D/textures/'+jsonTexture3D[numberSlide];
			var bgTexturePath = '';
					
			//Строим объект
			var objContainer = document.getElementById('slide');
			var object = new obj2web(objContainer, objectPathJSON, texturePathPNG, bgTexturePath);
					
			//Задаем свойства
			object.setDistanceInterval(500, 500);
			object.setInitPosition(0, 15, 0);

			//Выводим объект
			object.animate();
			//Меняем текст подсказки
			//document.getElementById('text').innerHTML = '';
			//document.getElementById('text').innerHTML = jsonComment[numberSlide];
			
			//Отсылаем смену слайда
			sendAddSlide(numberSlide);
		}
	}
}

//При изменение размера окна
window.onresize=function resizing()
{
	//Устанавливаем высоту div'а отображающего слайд
    //var h = site.offsetHeight;
    //h = h + "px";
    //slide.style.height = h;
	//Соотношение сторон отображения слайдов
	slide.style.height=slide.offsetWidth*0.75;
	//alert (lastid);
	//Свойства canvas	
	if (jsonType[lastid]=='2D')
	{
		var canvas=document.getElementById('blackboard');
		canvas.width=slide.offsetWidth;
		canvas.height=slide.offsetHeight;
		var url = lastBorder;
		//Цвет линии и размер
		ctx.strokeStyle=lastStrikStyle;
		ctx.lineWidth = canvas.width/250;
		//Создаем изображение
		var pic = new Image();
		pic.src = url;
		//Отрисовываем
		pic.onload = init(pic);
	}
	
	//if (statusLoop==true)
	//{}
}

//движение ползунка и отображение текущего момента видео
function timeVideo() 
{
	//var deltaTime=video.currentTime-oldtime;
	//oldtime=video.currentTime;
	//время на таймере
    time.value = timeFormat(video.currentTime);
	//положение ползунка
    videoRange.value = video.currentTime;
	//Определение слайда для данного момента
    //var x=video.currentTime;
}

//окончание видео
function endVideo() 
{
    play.textContent = ">";
}

window.onbeforeunload = function() 
{
	if (res==true)
	{
		return 'Вы покидаете данную страницу, в случае не завершения записи данные будут утеряны';
	}
}

//при загрузке страницы
window.onload=function loading() 
{
/*
	//Показываем и скрываем кнопки
	document.getElementById("openbar").style.display = "block";
	document.getElementById("redmarker").style.display = "none"; 
	document.getElementById("blackmarker").style.display = "none";
	document.getElementById("whitemarker").style.display = "none";
	document.getElementById("clear").style.display = "none";
	document.getElementById("loop").style.display = "none";
	document.getElementById("closebar").style.display = "none";
*/	
	
	statusAction=1;
    //Устанавливаем высоту div'а отображающего слайд
    document.getElementById('slide').style.height = Math.ceil( document.getElementById('slide').offsetWidth * 0.75 );
	document.getElementById('site').style.height = Math.ceil( document.getElementById('slide').offsetWidth * 0.75 );
	//Устанавливаем высоту div'а c кнопками
    document.getElementById('buttonbar2').style.height = document.getElementById('slide').offsetHeight;
	//Отсут для результирующего сообщения
	document.getElementById('result').style.top=document.getElementsByTagName('header')[0].offsetHeight;
    //ширина слайдлиста
    var w = 133 * countSlide;
    document.getElementById('inlist').style.width = w;
	//Показатели по умолчанию
	widthStart=document.getElementById('slide').offsetWidth;
	heightStart=document.getElementById('slide').offsetHeight;
	/*
	//Массивы слайдов
	jsonID= JSON.parse(jsonID);
	jsonType = JSON.parse(jsonType);
	jsonSlide2D = JSON.parse(jsonSlide2D);
	jsonTexture3D = JSON.parse(jsonTexture3D);
	jsonObject3D = JSON.parse(jsonObject3D);
	jsonComment = JSON.parse(jsonComment);
	*/
	/*
	//Предлоад, иначе не отобразит с первого раза
	//Если есть доска
	if (jsonID[0]=='n0')
	{
		masPic[0]=url2+jsonSlide2D[0];
		for (var i=1; i< countSlide; i++)
		{
			var num=jsonID[i].substr(1);;
			masPic[i]=new Image();
			masPic[i].src=url+jsonSlide2D[num];
		}
	}
	//Если нет доски
	else
	{
		for (var i=0; i< countSlide; i++)
		{
			var num=jsonID[i].substr(1);;
			masPic[i]=new Image();
			masPic[i].src=url+jsonSlide2D[num];
		}
	}
	*/
	/*
	//Прелоад доски
	var newCanvas = document.createElement('canvas');
	newCanvas.setAttribute('id', 'blackboard');
	slide.appendChild(newCanvas);
	var canvas=document.getElementById('blackboard');
	var backgroundBoard=url2+jsonSlide2D[0];
	blackboard(backgroundBoard);
	slide.innerHTML = '';
	*/
	//Прелоад 2D слайдов
	/*for (var i = 0; i <= countSlide; i++)
	{
		slide.innerHTML = '';
		var newCanvas = document.createElement('canvas');
		newCanvas.setAttribute('id', 'blackboard');
		slide.appendChild(newCanvas);
		var canvas=document.getElementById('blackboard');
		if (i==0)
		{
			var backgroundBoard='http://'+url2+jsonSlide2D[1];
			//alert(backgroundBoard);
		}
		else
		{
			var backgroundBoard='http://'+url+'2D/icons/'+jsonSlide2D[i];
		}
		blackboard(backgroundBoard);
	}
	slide.innerHTML = '';*/
	//Для переключения слайдов
	lastid='NULL';
	//начальные параметры при заходе на страницу
    time.value = "0:00";
    audioRange.value = 100;
    videoRange.value = 0;

	//добавляем видео из списка json
    for (var i = 0; i < cart.video.length; i++) {
        var newSubType = document.createElement('input');
        newSubType.setAttribute("id", cart.video[i].type + 'p');
        newSubType.setAttribute("type", "radio");
        newSubType.setAttribute("name", "px");
        newSubType.setAttribute("onclick", "types(this)");
        if (i == 0) 
        {
            newSubType.setAttribute("checked", "checked");
        }

        var newType = document.createElement('li');
        newType.appendChild(newSubType);
        newType.innerHTML = newType.innerHTML + cart.video[i].type+'p';
        submenu.appendChild(newType);
    }
	
    audioFull.textContent = "-";
    play.textContent = ">";
	document.getElementById('res').textContent = "res";
	fullTime.value = "0:00";

    submenu.style.display = "none";
    mp4.setAttribute("src", cart.video[0].mp4);
    webm.setAttribute("src", cart.video[0].webm);
    video.load();
}

//события
 window.addEventListener("load", loading);
 video.addEventListener("durationchange", start);
 video.addEventListener("timeupdate", timeVideo);
 video.addEventListener("ended", endVideo);