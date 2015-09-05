function result()
{
	document.getElementById('result').style.display='block';
	if(document.getElementById('result').style.display=='block')
	{
		setTimeout(hideResult, 10000)
	}
}

function hideResult()
{
	document.getElementById('result').style.display='none';
	//Переброска назад
	var url=document.location.href;
	var x = url.indexOf("/delete/");
	url=url.substring(0,x)+'/lesson/listLecture.php';
	document.location.href =url;
}