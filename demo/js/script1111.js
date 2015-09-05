//реакции нажатия кнопок
document.getElementById("play").onclick = videoPlay;
document.getElementById("audioRange").onmousedown = audioRangeStart;
document.getElementById("audioRange").onmouseup = audioRangeEnd;
document.getElementById("audioRange").ontouchstart = audioRangeStart;
document.getElementById("audioRange").ontouchend = audioRangeEnd;
document.getElementById("audioFull").onclick = volumeNull;
document.getElementById("playlink").onclick = videoPlay;
document.getElementById("video").onclick = videoPlay;
document.getElementById("videoClass").onclick = hideMenu;

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
var clickVideoRange=false;
var clickAudioRange=false;
var reloadVideo=false;
var numberSlide='ns';
var oldtime=0;
var deltaTime;
var endAction;

var oldcheck;

//переменные для доски
var canvas;
var ctx;
var deltaH;
var deltaW;
var dctrl;

//Массив для прелоэда
masPic=new Array();

function videoRange_mousedown(){
	clickVideoRange=true;
}

//перемотка видео позунком
function videoRange_mouseup(){
	video.currentTime = videoRange.value;
	clickVideoRange=false;
}

//Действие при нажатии на кнопку выбора качества
function hideMenu() 
{
    if (submenu.style.display == "none")
    { submenu.style.display = "block"; }
    else { submenu.style.display = "none"; }
}

var cart = JSON.parse(jsonString);
var cart2 = JSON.parse(paintString);

//При загрузке инфо
function info() {
	slide.innerHTML = '';
	var text = document.createElement('p');
    text.innerHTML = info1;
    slide.appendChild(text);
	var text = document.createElement('p');
    text.innerHTML = info2;
    slide.appendChild(text);
	var text = document.createElement('p');
    text.innerHTML = info3;
    slide.appendChild(text);
	var text = document.createElement('p');
    text.innerHTML = info4;
    slide.appendChild(text);
	var text = document.createElement('p');
    text.innerHTML = info5;
    slide.appendChild(text);
	var text = document.createElement('p');
    text.innerHTML = info6;
    slide.appendChild(text);
	var text = document.createElement('p');
    text.innerHTML = "Продолжительность лекции: "+timeFormat(video.duration);
    slide.appendChild(text);
	var text = document.createElement('p');
    text.innerHTML = "Количество демонстраций: "+cart.slide.length;
    slide.appendChild(text);
}

//действия при загрузке видео
function start() 
{
    fullTime.innerHTML = timeFormat(video.duration);
	//Значения для видеоползунка
    videoRange.min = 0;
    videoRange.max = video.duration;
    videoRange.step =1;
	info();
	video.removeEventListener("durationchange", start);
}

//Подключение другого файла при смене качества видео
function types(obj) 
{
	if(oldcheck!=obj.id)
	{
		oldcheck=obj.id;
		//Запоминание момента и загрузка видео
		var timeVideo = video.currentTime;
		var videoPlays;
		if (video.paused) 
		{
			videoPlays=false;
		} 
		else if (video.play) 
		{
			videoPlays=true;
		}
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
		//Заставка
		if (reloadVideo==false)
		{
			document.getElementById("loadblock").style.height =video.offsetHeight + "px";
			//document.getElementById("load").style.top =(video.offsetHeight/2-50) + "px";
		}
		reloadVideo=true;
		if (videoPlays==false)
		{
			document.getElementById("playlink").style.display = "none";
		}
		video.style.display ="none";
		document.getElementById("loadblock").style.display ="block";
		video.load();
		video.onloadeddata = function() {
			video.currentTime = timeVideo;
			if (videoPlays==true)
			{
				video.play();
			}
			else if (videoPlays==false)
			{
				video.pause();
			}
			if (video.currentTime==0)
			{
				video.style.display ="block";
				if (videoPlays==false)
				{
					document.getElementById("playlink").style.display = "block";
				}
				document.getElementById("loadblock").style.display ="none";
				reloadVideo=false;
			}
			else
			{
				//Прогрузилось
				video.oncanplay = function() {
					video.style.display ="block";
					if (videoPlays==false)
					{
						document.getElementById("playlink").style.display = "block";
					}
					document.getElementById("loadblock").style.display ="none";
					reloadVideo=false;
				}
			}
		};
		//Скрыть меню выбора
		submenu.style.display = "none";
	}
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

function audioRangeStart(){
	document.getElementById("audioRange").addEventListener("mousemove", videoVolume); //touchmove
	document.getElementById("audioRange").addEventListener("touchmove", videoVolume);}

function audioRangeEnd(){
	document.getElementById("audioRange").removeEventListener("mousemove", videoVolume); //touchmove
	document.getElementById("audioRange").removeEventListener("touchmove", videoVolume);}

//ползунок настройки звука
function videoVolume() 
{
	video.volume = audioRange.value/100;
	if (video.volume==0){
		audioFull.textContent = "+";
	}
	else if (audioFull.textContent == "+"){
		audioFull.textContent = "-";
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
		document.getElementById("playlink").style.display = "none";
        play.textContent = "||";

    } 
    else if (video.play) 
    {
        video.pause();
		document.getElementById("playlink").style.display = "block";
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
	border.style.borderWidth="2px";
	border.style.borderColor="#4D99E0";
}


//движение ползунка и отображение текущего момента видео
function timeVideo() 
{
	//Если не загружается другое разрешение видео
	if (reloadVideo==false){
		deltaTime=video.currentTime-oldtime;
		oldtime=video.currentTime;
		//время на таймере
		time.innerHTML = timeFormat(video.currentTime);
		//положение ползунка
		if (clickVideoRange==false){
			videoRange.value = video.currentTime;
		}
		//Определение слайда для данного момента
		var x=video.currentTime;
		endAction=false;
		//Если показ слайдов ещё не начат
		if (x<cart.slide[0].time && numberSlide!='ns')
		{
			slide.innerHTML = '';
			info();
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
}

//При изменение размера окна
window.onresize=function resizing()
{
	//Устанавливаем высоту div'а отображающего слайд
    //var h = site.offsetHeight;
   // h = h + "px";
    //slide.style.height = h;
	//Соотношение сторон отображения слайдов
	slide.style.height=slide.offsetWidth*0.75 + "px";
	//Высота бара
	document.getElementById("buttonbar").style.height = (document.getElementById("buttonbar").offsetWidth*0.0545454) + "px";
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
	//document.getElementsByClassName('col_6 column')[0].style.width="46.3333%";
	//document.getElementsByClassName('col_6 column')[1].style.width="50.3333%";
    //Устанавливаем высоту div'а отображающего слайд
    //var h = site.offsetHeight;
    //h = h + "px";
    //slide.style.height = h;
	//Соотношение сторон отображения слайдов
	//slide.style.height=slide.offsetWidth*0.75 + "px";
    //ширина слайдлиста
    var w = 133 * cart.slide.length + 10;
    inlist.style.width = w + "px";
    //положение меню с разрешениями
    var t = 20 * cart.video.length;
    submenu.style.top = "-" + t + "px";
	//Высота бара
	document.getElementById("buttonbar").style.height = (document.getElementById("buttonbar").offsetWidth*0.0545454) + "px";
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
			oldcheck=cart.video[i].type + 'p';
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
	time.innerHTML = "0:00";
    audioRange.value = 100;
    videoRange.value = 0;

    audioFull.textContent = "-";
    play.textContent = ">";

	fullTime.innerHTML = "0:00";

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
 videoRange.addEventListener("mousedown", videoRange_mousedown);
 videoRange.addEventListener("mouseup", videoRange_mouseup);
 videoRange.addEventListener("touchstart", videoRange_mousedown);
 videoRange.addEventListener("touchend", videoRange_mouseup);
 