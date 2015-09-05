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
}