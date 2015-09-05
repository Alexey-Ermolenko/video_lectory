
function iconClick(obj) 
{
	var numberSlide=obj.id.substr(1);
	console.log("numberSlide =" + numberSlide);
	document.getElementsByName('idSlide')[0].value=numberSlide;
}

function resultCreate()
{
	if (document.getElementsByName('name')[0].value!='' && document.getElementsByName('message')[0].value!='' && document.getElementsByName('autor')[0].value!='')
	{
		document.getElementById('result').style.display='block';
	}
	if(document.getElementById('result').style.display=='block')
	{
		setTimeout(hideResult, 10000)
	}
}

function hideResult()
{
	document.getElementById('result').style.display='none';
}

//при загрузке страницы
window.onload = function loading() 
{
	//Ширина всех картинок
	//Для explorer
	var ua = navigator.userAgent;
	if (ua.search(/MSIE/) > 0)
	{
		var w = 178 * number2D;
	}
	else
	{
		var w = 172 * number2D;
	}
    document.getElementById('inlist').style.width = w;
	if (ua.search(/MSIE/) > 0)
	{
		var w = 178 * number3D;
	}
	else
	{
		var w = 172 * number3D;
	}
	
	//Массивы слайдов
	jsonType = JSON.parse(jsonType);
	jsonSlide2D = JSON.parse(jsonSlide2D);
	jsonTexture3D = JSON.parse(jsonTexture3D);
	jsonObject3D = JSON.parse(jsonObject3D);
	jsonComment = JSON.parse(jsonComment);
	//Размер div'a
	document.getElementById('workplace').style.height=document.getElementById('hub').offsetHeight+document.getElementById('action').offsetHeight;
}