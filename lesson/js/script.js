//реакции нажатия кнопок
document.getElementById("play").onclick = videoPlay;
document.getElementById("videoRange").onclick = videoTime;
document.getElementById("audioRange").onclick = videoVolume;
document.getElementById("audioFull").onclick = volumeNull;
document.getElementById("playlink").onclick = videoPlay;
document.getElementById("videoClass").onclick = hideMenu;

//Действие при наведении
document.getElementById("playlink").onmouseover = show;
document.getElementById("video").onmouseover = show;
document.getElementById("playlink").onmouseout = hide;
document.getElementById("video").onmouseout = hide;

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
var numberSlide='ns';
var oldtime=0;
var deltaTime;
var endAction;

//переменные для доски
var canvas;
var ctx;
var deltaH;
var deltaW;
var dctrl;

//Массив для прелоэда
masPic=new Array();

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

var cart = JSON.parse(jsonString);
var cart2 = JSON.parse(paintString);

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

//Смена картинки при нажатии на иконку
function imageClick(obj) 
{
    for (var i = 0; i < cart.slide.length; i++) 
    {
        if (obj.id == cart.slide[i].id)
        {
            video.currentTime = cart.slide[i].time;
        }
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

//окончание видео
function endVideo() 
{
    play.textContent = ">";
}

//удобое представление времени
function timeFormat(time) 
{
	if (time <= 0)
	{
		return ("0:00");
	}
	else
	{
		var timemin = Math.floor(time / 60);
		var timesec = Math.floor(time) - timemin * 60;
		if (timesec < 10) {
			timesec = '0' + timesec;
		}
		return (timemin + ":" + timesec);
	}
}

//функция для установление рамки у иконки текущего слайда
function borderSlide(i)
{
	//Получаем id иконки
	var border=document.getElementById(cart.slide[i].id);
	//Удаляем рамки у всех иконок
	for (var j = 0; j < cart.slide.length; j++) 
	{
		var oldBorder=document.getElementById(cart.slide[j].id);
		oldBorder.style.border="none";
	}
	//устанавливаем рамку для нужной иконки
	border.style.border="solid";
	border.style.borderColor="yellow";
}


//движение ползунка и отображение текущего момента видео
function timeVideo() 
{
	deltaTime=video.currentTime-oldtime;
	oldtime=video.currentTime;
	//время на таймере
    time.value = timeFormat(video.currentTime);
	//положение ползунка
    videoRange.value = video.currentTime;
	//Определение слайда для данного момента
    var x=video.currentTime;
	endAction=false;
	//Если показ слайдов ещё не начат
	if (x<cart.slide[0].time && numberSlide!='ns')
	{
		slide.innerHTML = '';
		numberSlide='ns';
		for (var j = 0; j < cart.slide.length; j++) 
		{
			var oldBorder=document.getElementById(cart.slide[j].id);
			oldBorder.style.border="none";
		}
	}
	//Если пошли слайды
	else
	{
		//вывод слайда
		for (var i = 0; i < cart.slide.length; i++) 
		{
			//Если слайд последний
			if (i == cart.slide.length - 1)
			{
				//Последний слайд типа "доска"
				if (((cart.slide[i].time <= x) && (numberSlide!=cart.slide[i].id) && (cart.slide[i].type == 'blackboard')) || ((cart.slide[i].time <= x) && (statusSlide==false) && (deltaTime<0) && (cart.slide[i].type == 'blackboard')))
				{
					slide.innerHTML = '';
					var newCanvas = document.createElement('canvas');
					newCanvas.setAttribute('id', 'blackboard');
					slide.appendChild(newCanvas);
					var backgroundBoard=cart.slide[i].src;		
					blackboard(backgroundBoard);
					
					if (statusSlide==false)
					{
						statusSlide=true;
					}
					
					borderSlide(i);
					numberSlide=cart.slide[i].id;
					action(numberSlide);
				}
				//Последний слайд типа "доска" при перемотке
				else if ((cart.slide[i].time <= x) && (deltaTime<0) && (cart.slide[i].type == 'blackboard')) 
				{
					slide.innerHTML = '';
					var newCanvas = document.createElement('canvas');
					newCanvas.setAttribute('id', 'blackboard');
					slide.appendChild(newCanvas);
					var backgroundBoard=cart.slide[i].src;		
					blackboard(backgroundBoard);
					
					//borderSlide(i);
					//numberSlide=cart.slide[i].id;
					action(numberSlide);
				}
				//Последний слайд типа "3d"
				else if (((cart.slide[i].time <= x)  && (numberSlide!=cart.slide[i].id) && (cart.slide[i].type == '3d'))||((cart.slide[i].time <= x) && (statusSlide==false)  && (deltaTime<0) && (cart.slide[i].type == '3d')) )
				{
					slide.innerHTML = '';
					superX=0;
					superY=0;
					superZ=0;
					var objectPathJSON = cart.slide[i].obj,
						texturePathPNG = cart.slide[i].texture;
						bgTexturePath = "";

					var objContainer = document.getElementById('slide');

					var object = new obj2web(objContainer, objectPathJSON, texturePathPNG, bgTexturePath);

					object.setDistanceInterval(500, 500);
					object.setInitPosition(0, 15, 0);

					object.animate();
					
					if (statusSlide==false)
					{
						statusSlide=true;
					}
					
					borderSlide(i);
					numberSlide=cart.slide[i].id;
					action(numberSlide);
				}
				//Последний слайд типа "3d" при перемотке
				else if ((cart.slide[i].time <= x)  && (deltaTime<0) && (cart.slide[i].type == '3d')) 
				{
					superX=0;
					superY=0;
					superZ=0;
					action(numberSlide);
				}
				else
				{
					//Выполнение действия
					if (endAction==false)
					{
						action(numberSlide);
						endAction=true;
					}
				}
			}
			//Если слайд не последний
			else if (i != cart.slide.length - 1)
			{
				//Слайд типа "3d"
				if (((cart.slide[i].time <= x) && (cart.slide[i + 1].time > x) && (numberSlide!=cart.slide[i].id) && (cart.slide[i].type == '3d'))||((cart.slide[i].time <= x) && (cart.slide[i + 1].time > x) && (statusSlide==false) && (deltaTime<0) && (cart.slide[i].type == '3d'))) 
				{
					slide.innerHTML = '';
					superX=0;
					superY=0;
					superZ=0;
					var objectPathJSON = cart.slide[i].obj,
						texturePathPNG = cart.slide[i].texture;
						bgTexturePath = "";

					var objContainer = document.getElementById('slide');

					var object = new obj2web(objContainer, objectPathJSON, texturePathPNG, bgTexturePath);

					object.setDistanceInterval(500, 500);
					object.setInitPosition(0, 15, 0);
					
					if (statusSlide==false)
					{
						statusSlide=true;
					}
					
					object.animate();
					borderSlide(i);
					numberSlide=cart.slide[i].id;
					action(numberSlide);
				}
				//Слайд типа "3d" при перемотке
				else if ((cart.slide[i].time <= x) && (cart.slide[i + 1].time > x) && (deltaTime<0) && (cart.slide[i].type == '3d')) 
				{
					superX=0;
					superY=0;
					superZ=0;
					action(numberSlide);
				}
				//Слайд типа "доска"
				else if (((cart.slide[i].time <= x) && (cart.slide[i + 1].time > x) && (numberSlide!=cart.slide[i].id) && (cart.slide[i].type == 'blackboard')) || ((cart.slide[i].time <= x) && (cart.slide[i + 1].time > x) && (statusSlide==false) && (deltaTime<0) && (cart.slide[i].type == 'blackboard'))) 
				{
					slide.innerHTML = '';
					var newCanvas = document.createElement('canvas');
					newCanvas.setAttribute('id', 'blackboard');
					slide.appendChild(newCanvas);
					var canvas=document.getElementById('blackboard');
					var backgroundBoard=cart.slide[i].src;
					blackboard(backgroundBoard);
					
					if (statusSlide==false)
					{
						statusSlide=true;
					}
					
					borderSlide(i);
					numberSlide=cart.slide[i].id;
					action(numberSlide);
				}
				//Cлайд типа "доска" при перемотке
				else if ((cart.slide[i].time <= x) && (cart.slide[i + 1].time > x) && (deltaTime<0) && (cart.slide[i].type == 'blackboard')) 
				{
					slide.innerHTML = '';
					var newCanvas = document.createElement('canvas');
					newCanvas.setAttribute('id', 'blackboard');
					slide.appendChild(newCanvas);
					var backgroundBoard=cart.slide[i].src;		
					blackboard(backgroundBoard);
					
					//borderSlide(i);
					//numberSlide=cart.slide[i].id;
					action(numberSlide);
				}
				else
				{
					//Выполнение действия
					if (endAction==false)
					{
						action(numberSlide);
						endAction=true;
					}
				}
			}
		}
	}
}

//При изменение размера окна
window.onresize=function resizing()
{
	//Устанавливаем высоту div'а отображающего слайд
    //var h = site.offsetHeight;
   // h = h + "px";
    //slide.style.height = h;
	//Соотношение сторон отображения слайдов
	slide.style.height=slide.offsetWidth*0.75;
	//Свойства canvas
	var x=video.currentTime;
	for (var i = 0; i < cart.slide.length; i++) 
    {
		if (i == cart.slide.length - 1)
		{
			//Последний слайд типа "доска"
			if ((cart.slide[i].time <= x) && (cart.slide[i].type == 'blackboard')) 
			{
				slide.innerHTML = '';
				var newCanvas = document.createElement('canvas');
				newCanvas.setAttribute('id', 'blackboard');
				slide.appendChild(newCanvas);
				var canvas=document.getElementById('blackboard');
				var backgroundBoard=cart.slide[i].src;
				blackboard(backgroundBoard);
				
				for (var j=0; j<cart2.line.length; j++)
				{
					if (cart2.line[j].time>=cart.slide[i].time)
					{
						lastAction=j-1;
						break;
					}
				}
				
				numberSlide=cart.slide[i].id;
				action(numberSlide);
			}
		}
		//Если слайд не последний
		else if (i != cart.slide.length - 1)
		{
			//Слайд типа "доска"
			if ((cart.slide[i].time <= x) && (cart.slide[i + 1].time > x) && (cart.slide[i].type == 'blackboard')) 
			{
				slide.innerHTML = '';
				var newCanvas = document.createElement('canvas');
				newCanvas.setAttribute('id', 'blackboard');
				slide.appendChild(newCanvas);
				var canvas=document.getElementById('blackboard');
				var backgroundBoard=cart.slide[i].src;
				blackboard(backgroundBoard);
				
				for (var j=0; j<cart2.line.length; j++)
				{
					if (cart2.line[j].time>=cart.slide[i].time)
					{
						lastAction=j-1;
						break;
					}
				}
				
				numberSlide=cart.slide[i].id;
				action(numberSlide);
			}
		}
	}
}

//при загрузке страницы
function loading() 
{
	oldtime=0;
    //Устанавливаем высоту div'а отображающего слайд
    //var h = site.offsetHeight;
    //h = h + "px";
    //slide.style.height = h;
	//Соотношение сторон отображения слайдов
	slide.style.height=slide.offsetWidth*0.75;
    //ширина слайдлиста
    var w = 133 * cart.slide.length + 10;
    inlist.style.width = w + "px";
    //положение меню с разрешениями
    var t = 20 * cart.video.length;
    submenu.style.top = "-" + t + "px";
    //добавляем иконки из списка json
    for (var i = 0; i < cart.slide.length; i++)
    {
        var newPic = document.createElement('img');
        newPic.setAttribute("id", cart.slide[i].id);
        newPic.setAttribute("src", cart.slide[i].icon);
		newPic.setAttribute("alt", "Слайд  № "+(i+1));
        newPic.setAttribute("onclick", "imageClick(this)");
        pictures.appendChild(newPic);

        var newTimeList = document.createElement('p');
        newTimeList.innerHTML = timeFormat(cart.slide[i].time);
        timelist.appendChild(newTimeList);
    }
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
	//Предлоад, иначе не отобразит с первого раза
	for (var i = 0; i < cart.slide.length; i++)
    {
		if (cart.slide[i].type=="blackboard")
		{
			masPic[i]=new Image();
			masPic[i].src=cart.slide[i].src;
		}
    }
    //начальные параметры при заходе на страницу
    time.value = "0:00";
    audioRange.value = 100;
    videoRange.value = 0;

    audioFull.textContent = "-";
    play.textContent = ">";
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
