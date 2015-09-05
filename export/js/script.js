document.getElementById("play").onclick = videoPlay;
document.getElementById("videoRange").onclick = videoTime;
document.getElementById("audioRange").onclick = videoVolume;
document.getElementById("audioFull").onclick = volumeNull;
document.getElementById("playlink").onclick = videoPlay;
document.getElementById("video").onclick = videoPlay;
document.getElementById("videoClass").onclick = hideMenu;

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
var reloadVideo=false;
var numberSlide='ns';
var oldtime=0;
var deltaTime;
var endAction;

var oldcheck;

var canvas;
var ctx;
var deltaH;
var deltaW;
var dctrl;

masPic=new Array();

function videoRange_mousedown(){
	clickVideoRange=true;
}

function videoRange_mouseup(){
	clickVideoRange=false;
}

function hideMenu() 
{
    if (submenu.style.display == "none")
    { submenu.style.display = "block"; }
    else { submenu.style.display = "none"; }
}

var cart = JSON.parse(jsonString);
var cart2 = JSON.parse(paintString);

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

function start() 
{
    fullTime.innerHTML = timeFormat(video.duration);
    videoRange.min = 0;
    videoRange.max = video.duration;
    videoRange.step =1;
	info();
	video.removeEventListener("durationchange", start);
}

function types(obj) 
{
	if(oldcheck!=obj.id)
	{
		oldcheck=obj.id;
		//Запоминание момента и загрузка видео
		var timeVideo = video.currentTime;
		var videoPlays;
		reloadVideo=true;
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
		document.getElementById("loadblock").style.height =video.offsetHeight + "px";
		document.getElementById("load").style.top =(video.offsetHeight/2-50) + "px";
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

function videoTime() 
{
    video.currentTime = videoRange.value;
}

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

function endVideo() 
{
    play.textContent = ">";
}

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

function borderSlide(i)
{
	var border=document.getElementById(cart.slide[i].id);
	for (var j = 0; j < cart.slide.length; j++) 
	{
		var oldBorder=document.getElementById(cart.slide[j].id);
		oldBorder.style.border="none";
	}
	border.style.border="solid";
	border.style.borderColor="yellow";
}

function timeVideo() 
{
	if (reloadVideo==false){
		deltaTime=video.currentTime-oldtime;
		oldtime=video.currentTime;
		time.innerHTML = timeFormat(video.currentTime);
		if (clickVideoRange==false){
			videoRange.value = video.currentTime;
		}
		var x=video.currentTime;
		endAction=false;
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
		else
		{
			for (var i = 0; i < cart.slide.length; i++) 
			{
				if (i == cart.slide.length - 1)
				{
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
					else if ((cart.slide[i].time <= x)  && (deltaTime<0) && (cart.slide[i].type == '3d')) 
					{
						superX=0;
						superY=0;
						superZ=0;
						action(numberSlide);
					}
					else
					{
						if (endAction==false)
						{
							action(numberSlide);
							endAction=true;
						}
					}
				}
				else if (i != cart.slide.length - 1)
				{
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
					else if ((cart.slide[i].time <= x) && (cart.slide[i + 1].time > x) && (deltaTime<0) && (cart.slide[i].type == '3d')) 
					{
						superX=0;
						superY=0;
						superZ=0;
						action(numberSlide);
					}
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

window.onresize=function resizing()
{
	slide.style.height=slide.offsetWidth*0.75 + "px";
	var x=video.currentTime;
	for (var i = 0; i < cart.slide.length; i++) 
    {
		if (i == cart.slide.length - 1)
		{
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
		else if (i != cart.slide.length - 1)
		{
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

function loading() 
{
	oldtime=0;
	slide.style.height=slide.offsetWidth*0.75 + "px";
    var w = 133 * cart.slide.length + 10;
    inlist.style.width = w + "px";
    var t = 20 * cart.video.length;
    submenu.style.top = "-" + t + "px";
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
	for (var i = 0; i < cart.slide.length; i++)
    {
		if (cart.slide[i].type=="blackboard")
		{
			masPic[i]=new Image();
			masPic[i].src=cart.slide[i].src;
		}
    }
	
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

 window.addEventListener("load", loading);
 video.addEventListener("durationchange", start);
 video.addEventListener("timeupdate", timeVideo);
 video.addEventListener("ended", endVideo);
 videoRange.addEventListener("mousedown", videoRange_mousedown);
 videoRange.addEventListener("mouseup", videoRange_mouseup);
 videoRange.addEventListener("ontouchstart", videoRange_mousedown);
 videoRange.addEventListener("ontouchend", videoRange_mouseup);
 