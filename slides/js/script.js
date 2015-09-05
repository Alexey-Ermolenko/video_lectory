/*
$("#2D").click(function(){
		alert("2D 2D");
		$("#blank").empty();	
		$("#blank").append("<b>Файлы демонсрационного объекта:</b>");
		$("#blank").append("Изображение:</td><td><input type=\"file\" name=\"demo_object_img\" id=\"demo_object_img\" multiple />");
		$("#blank").append("<p><input type=\"submit\" value=\"Загрузить демонстрационный объект\" onclick=\"add_demo_object_2D(demo_object_img.value)\"/></p>");
		$("#blank").css("box-shadow","0 0 3px rgba(0,0,0,0.5)");
});


$("#3D").click(function(){
		alert("3D 3D");
			$("#blank").empty();
			$("#blank").append("<b>Файлы демонсрационного объекта:</b>");
			$("#blank").append("Текстура:<input type=\"file\" name=\"demo_object_img\" id=\"demo_object_img\" multiple />");
			$("#blank").append("Объект:<input type=\"file\" name=\"demo_object\" id=\"demo_object\" multiple />");
			$("#blank").append("<p><input type=\"submit\" value=\"Загрузить демонстрационный объект\" onclick=\"add_demo_object_3D(demo_object_img.value, demo_object.value)\"/></p>");
			$("#blank").css("box-shadow","0 0 3px rgba(0,0,0,0.5)");
});



$("#new_demo").click(function(){
		alert("new_demo new_demo new_demo");	
		$("#blank").empty();	
		$("#blank").append("<b>Файлы демонсрационного объекта:</b>");
		$("#blank").append("Изображение:</td><td><input type=\"file\" name=\"demo_object_img\" id=\"demo_object_img\" multiple />");
		$("#blank").append("<p><input type=\"submit\" value=\"Загрузить демонстрационный объект\" onclick=\"add_demo_object_2D(demo_object_img.value)\"/></p>");
		$("#blank").css("box-shadow","0 0 3px rgba(0,0,0,0.5)");
});

*/



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

function thisScenario()
{
	document.location.href = 'res/index.html?idLection='+numberLection+'&idScenario='+document.getElementsByName('scenario')[0][document.getElementsByName('scenario')[0].selectedIndex].value;
}

function thisScenario2()
{
	document.location.href = 'resWithVideo/index.html?idLection='+numberLection+'&idScenario='+document.getElementsByName('scenario')[0][document.getElementsByName('scenario')[0].selectedIndex].value;
}