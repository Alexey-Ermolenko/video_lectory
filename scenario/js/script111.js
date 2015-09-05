function iconClick(obj) 
{
	var numberSlide=obj.id.substr(1);
	console.log("numberSlide =" + numberSlide);
	document.getElementsByName('idSlide')[0].value=numberSlide;
	if (jsonType[numberSlide]=='2D')
	{
		if (numberSlide==0)
		{
			document.getElementById('slide').innerHTML = '';
			var newSlide = document.createElement('img');
			newSlide.setAttribute("src", url2+jsonSlide2D[numberSlide]);
			newSlide.setAttribute('width', '100%');
			//newSlide.setAttribute('height', '100%');
			document.getElementById('slide').appendChild(newSlide);
			document.getElementById('text').innerHTML=jsonComment[numberSlide];

		}
		else
		{
			document.getElementById('slide').innerHTML = '';
			var newSlide = document.createElement('img');
			newSlide.setAttribute("src", url+'2D/icons/'+jsonSlide2D[numberSlide]);
			newSlide.setAttribute('width', '100%');
			//newSlide.setAttribute('height', '100%');
			document.getElementById('slide').appendChild(newSlide);
			document.getElementById('text').innerHTML=jsonComment[numberSlide];
		}
	}
	else if (jsonType[numberSlide]=='3D')
	{
		document.getElementById('slide').innerHTML = '';
		slide.innerHTML = '3D слайд, отображение в процессе разработки';
		//Временно закрыто
		/*var objectPathJSON = 'http://'+url+'3D/objects/'+jsonObject3D[numberSlide];
		var texturePathPNG = 'http://'+url+'3D/textures/'+jsonTexture3D[numberSlide];
		bgTexturePath = "";	

		var objContainer = document.getElementById('slide');

		var object = new obj2web(objContainer, objectPathJSON, texturePathPNG, bgTexturePath);
			
		object.setDistanceInterval(500, 500);
		object.setInitPosition(0, 15, 0);

		object.animate();*/
		document.getElementById('text').innerHTML=jsonComment[numberSlide];
	}
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
    document.getElementById('inlist2').style.width = w;
	
	//Массивы слайдов
	jsonType = JSON.parse(jsonType);
	jsonSlide2D = JSON.parse(jsonSlide2D);
	jsonTexture3D = JSON.parse(jsonTexture3D);
	jsonObject3D = JSON.parse(jsonObject3D);
	jsonComment = JSON.parse(jsonComment);
	//Размер div'a
	document.getElementById('workplace').style.height=document.getElementById('hub').offsetHeight+document.getElementById('action').offsetHeight;
}