function typeSlide(obj)
{
	if (obj.value=='2D')
	{
		document.getElementById('blank').innerHTML = '';
		
		var newBox = document.createElement('p');
		document.getElementById('blank').appendChild(newBox);
		newBox.innerHTML = 'Автор:';
		
		var newBox = document.createElement('input');
		newBox.setAttribute('type', 'text');
		newBox.setAttribute('name', 'autor');
		newBox.setAttribute('required', 'required');
		document.getElementById('blank').appendChild(newBox);
		
		var newBox = document.createElement('p');
		document.getElementById('blank').appendChild(newBox);
		newBox.innerHTML = 'Название слайда:';
		
		var newBox = document.createElement('input');
		newBox.setAttribute('type', 'text');
		newBox.setAttribute('name', 'name');
		newBox.setAttribute('required', 'required');
		document.getElementById('blank').appendChild(newBox);
		
		var newBox = document.createElement('p');
		document.getElementById('blank').appendChild(newBox);
		newBox.innerHTML = 'Загрузите слайд (jpg, jpeg и png):';
		
		var newBox = document.createElement('input');
		newBox.setAttribute('type', 'file');
		newBox.setAttribute('name', 'slide2D');
		newBox.setAttribute('accept', 'image/jpg,image/jpeg,image/png');
		newBox.setAttribute('required', 'required');
		document.getElementById('blank').appendChild(newBox);
		
		var newBox = document.createElement('p');
		document.getElementById('blank').appendChild(newBox);
		newBox.innerHTML = 'Введите комментарий:';
		
		var newBox = document.createElement('textarea');
		newBox.setAttribute('name', 'message');
		newBox.setAttribute('rows', '5');
		newBox.setAttribute('cols', '55');
		newBox.setAttribute('required', 'required');
		document.getElementById('blank').appendChild(newBox);
		
		var newBox = document.createElement('p');
		document.getElementById('blank').appendChild(newBox);
		
		var newBox = document.createElement('input');
		newBox.setAttribute('type', 'submit');
		newBox.setAttribute('value', 'Создать слайд');
		newBox.setAttribute('onclick', 'resultCreate2D()');
		document.getElementById('blank').appendChild(newBox);
		
		var w1=document.getElementById('form1').offsetWidth;
		var w2=window.innerWidth;
		document.getElementById('slides').style.width=w2-w1-100;
	}
	else if (obj.value=='3D')
	{
		document.getElementById('blank').innerHTML = '';
		
		var newBox = document.createElement('p');
		document.getElementById('blank').appendChild(newBox);
		newBox.innerHTML = 'Автор:';
		
		var newBox = document.createElement('input');
		newBox.setAttribute('type', 'text');
		newBox.setAttribute('name', 'autor');
		newBox.setAttribute('required', 'required');
		document.getElementById('blank').appendChild(newBox);
		
		var newBox = document.createElement('p');
		document.getElementById('blank').appendChild(newBox);
		newBox.innerHTML = 'Название слайда:';
		
		var newBox = document.createElement('input');
		newBox.setAttribute('type', 'text');
		newBox.setAttribute('name', 'name');
		newBox.setAttribute('required', 'required');
		document.getElementById('blank').appendChild(newBox);
		
		var newBox = document.createElement('p');
		document.getElementById('blank').appendChild(newBox);
		newBox.innerHTML = 'Загрузите иконку для 3D слайда (jpg, jpeg и png):';
		
		var newBox = document.createElement('input');
		newBox.setAttribute('type', 'file');
		newBox.setAttribute('name', 'iconSlide3D');
		newBox.setAttribute('accept', 'image/jpg,image/jpeg,image/png');
		newBox.setAttribute('required', 'required');
		document.getElementById('blank').appendChild(newBox);
		
		var newBox = document.createElement('p');
		document.getElementById('blank').appendChild(newBox);
		newBox.innerHTML = 'Загрузите текстуру для 3D слайда (jpg, jpeg и png):';
		
		var newBox = document.createElement('input');
		newBox.setAttribute('type', 'file');
		newBox.setAttribute('name', 'textureSlide3D');
		newBox.setAttribute('accept', 'image/jpg,image/jpeg,image/png');
		newBox.setAttribute('required', 'required');
		document.getElementById('blank').appendChild(newBox);
		
		var newBox = document.createElement('p');
		document.getElementById('blank').appendChild(newBox);
		newBox.innerHTML = 'Загрузите объект для 3D слайда (в виде javascript файла):';
		
		var newBox = document.createElement('input');
		newBox.setAttribute('type', 'file');
		newBox.setAttribute('name', 'objectSlide3D');
		newBox.setAttribute('required', 'required');
		document.getElementById('blank').appendChild(newBox);
		
		var newBox = document.createElement('p');
		document.getElementById('blank').appendChild(newBox);
		newBox.innerHTML = 'Введите комментарий:';
		
		var newBox = document.createElement('textarea');
		newBox.setAttribute('name', 'message');
		newBox.setAttribute('rows', '5');
		newBox.setAttribute('cols', '55');
		newBox.setAttribute('required', 'required');
		document.getElementById('blank').appendChild(newBox);
		
		var newBox = document.createElement('p');
		document.getElementById('blank').appendChild(newBox);
		
		var newBox = document.createElement('input');
		newBox.setAttribute('type', 'submit');
		newBox.setAttribute('value', 'Создать слайд');
		newBox.setAttribute('onclick', 'resultCreate3D()');
		document.getElementById('blank').appendChild(newBox);
		
		var w1=document.getElementById('form1').offsetWidth;
		var w2=window.innerWidth;
		document.getElementById('slides').style.width=w2-w1-100;
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

function resultCreate2D()
{
	if (document.getElementsByName('name')[0].value!='' && document.getElementsByName('message')[0].value!='' && document.getElementsByName('autor')[0].value!='' && document.getElementsByName('slide2D')[0].value!='')
	{
		document.getElementById('result').style.display='block';
	}
	if(document.getElementById('result').style.display=='block')
	{
		setTimeout(hideResult, 10000)
	}
}

function resultCreate3D()
{
	if (document.getElementsByName('name')[0].value!='' && document.getElementsByName('message')[0].value!='' && document.getElementsByName('autor')[0].value!='' && document.getElementsByName('iconSlide3D')[0].value!='' && document.getElementsByName('textureSlide3D')[0].value!='' && document.getElementsByName('objectSlide3D')[0].value!='')
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

function iconClick(obj) 
{
	var numberSlide=obj.id.substr(1);
	if (jsonType[numberSlide]=='2D')
	{
		document.getElementById('slide').innerHTML = '';
		var newSlide = document.createElement('img');
		newSlide.setAttribute("src", 'http://'+url+'2D/icons/'+jsonSlide2D[numberSlide]);
		newSlide.setAttribute('width', '100%');
		//newSlide.setAttribute('height', '100%');
		document.getElementById('slide').appendChild(newSlide);
		document.getElementById('text').innerHTML='Коментарий: </br>' + jsonComment[numberSlide];
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
		document.getElementById('text').innerHTML='Коментарий: </br>' + jsonComment[numberSlide];
	}
}

function showSlides()
{
	document.getElementById('scenarioSlides').innerHTML='';
	document.getElementById('scenarioSlides').innerHTML='<p>Слайды сценария: </p>';
	for (i=0;i<masSlides.length;i++)
	{
		if(masScenario[i]==document.getElementsByName('scenario')[0][document.getElementsByName('scenario')[0].selectedIndex].value)
		{
			var newPic = document.createElement('img');
			newPic.setAttribute("class", "slide");
			if (masSlides[i]==0)
			{
				newPic.setAttribute("src", 'http://'+url2+masIconSlides[i]);
			}
			else
			{
				newPic.setAttribute("src", 'http://'+url+'2D/icons/'+masIconSlides[i]);
			}
			newPic.setAttribute("alt", "Слайд  № "+(i+1));
			document.getElementById('scenarioSlides').appendChild(newPic);
		}
	}
}

function thisScenario()
{
	document.location.href = 'res/index.php?idLection='+numberLection+'&idScenario='+document.getElementsByName('scenario')[0][document.getElementsByName('scenario')[0].selectedIndex].value;
}

function thisScenario2()
{
	document.location.href = 'resWithVideo/index.php?idLection='+numberLection+'&idScenario='+document.getElementsByName('scenario')[0][document.getElementsByName('scenario')[0].selectedIndex].value;
}