
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
/*
function iconClick(obj) 
{
	alert("sadasdasdasdda");
	var numberSlide=obj.id.substr(1);
	if (jsonType[numberSlide]=='2D')
	{
		document.getElementById('slide').innerHTML = '';
		var newSlide = document.createElement('img');
		newSlide.setAttribute("src", url+'2D/icons/'+jsonSlide2D[numberSlide]);
		newSlide.setAttribute('width', '100%');
		//newSlide.setAttribute('height', '100%');
		document.getElementById('slide').appendChild(newSlide);
		document.getElementById('text').innerHTML='Коментарий: </br>' + jsonComment[numberSlide];
	}
	else if (jsonType[numberSlide]=='3D')
	{
		document.getElementById('slide').innerHTML = '';
		slide.innerHTML = '3D слайд, отображение в процессе разработки';
	
		document.getElementById('text').innerHTML='Коментарий: </br>' + jsonComment[numberSlide];
	}
}
*/
function showSlides()	{
	console.log("masTypesDemo = " + masTypesDemo);
	console.log("masSlides = " + masSlides);	
	document.getElementById('scenarioSlides').innerHTML='';
	document.getElementById('scenarioSlides').innerHTML='<p>Слайды сценария: </p>';
	for (i = 0; i < masSlides.length; i++)	{
		if	(masScenario[i] == document.getElementsByName('scenario')[0][document.getElementsByName('scenario')[0].selectedIndex].value)	{
			var newPic = document.createElement('img');
			newPic.setAttribute("class", "slide");

			if (masSlides[i]==0)	{
				newPic.setAttribute("src", url2+masIconSlides[i]);
			} else {
				newPic.setAttribute("src", url+masTypesDemo[i]+'/icons/'+masIconSlides[i]);
				newPic.setAttribute("alt", "Слайд  № "+(i+1));
				document.getElementById('scenarioSlides').appendChild(newPic);
			}
		}
	}
}
	/*
	console.log("masSlides = " + masSlides);
	document.getElementById('scenarioSlides').innerHTML='';
	document.getElementById('scenarioSlides').innerHTML='<p>Слайды сценария: </p>';
	for (i = 0; i < masSlides.length; i++)	{
		if	(masScenario[i] == document.getElementsByName('scenario')[0][document.getElementsByName('scenario')[0].selectedIndex].value)	{
			var newPic = document.createElement('img');
			newPic.setAttribute("class", "slide");
				//добавление атрибута определяющего тип демонстрационного объекта
				//newPic.setAttribute("type", "22D");
			
			if (masSlides[i]==0)	{
				newPic.setAttribute("src", url2+masIconSlides[i]);
			}	else if (masType[i]=='1')	{
					newPic.setAttribute("src", url+'2D/icons/'+masIconSlides[i]);
			}	else if (masType[i]=='2')	{
					newPic.setAttribute("src", url+'3D/icons/'+masIconSlides[i]);
			}	else if (masType[i]=='3')	{
					newPic.setAttribute("src", url+'new_demo/icons/'+masIconSlides[i]);
			}
			newPic.setAttribute("alt", "Слайд  № "+(i+1));
			document.getElementById('scenarioSlides').appendChild(newPic);
		}
	}
	*/

function thisScenario()
{
	document.location.href = 'resWithoutVideo/index.php?idLection='+numberLection+'&idScenario='+document.getElementsByName('scenario')[0][document.getElementsByName('scenario')[0].selectedIndex].value;
}

function thisScenario2()
{
	document.location.href = 'resWithVideo/index.php?idLection='+numberLection+'&idScenario='+document.getElementsByName('scenario')[0][document.getElementsByName('scenario')[0].selectedIndex].value;
}

function thisScenario3()
{
	document.location.href = 'resWithoutVideoTwoDisplay/index.php?idLection='+numberLection+'&idScenario='+document.getElementsByName('scenario')[0][document.getElementsByName('scenario')[0].selectedIndex].value;
}




