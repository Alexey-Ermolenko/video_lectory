<?php
function videoWeb()
{
	//Параметры
	include "../connectionSettings.php";
	//Соединение
	$link = mysqli_connect($server, $username, $password);
	if (!$link) 
	{
		die(mysqli_connect_error());
	}		
	//utf8
	mysqli_set_charset($link, "utf8");	
	//Выбор базы
	mysqli_select_db($link, $DB) or die(mysqli_error($link));

	$strSQL = "SELECT name, id FROM Video WHERE number_lection=".$_SESSION['$numberLection']." and type='webm'";
	$res = mysqli_query($link, $strSQL);
	while($row = mysqli_fetch_array($res)) 
	{
		echo'<option value="' . $row['id'] .'">' . $row['name'] . '</option>';
	}
	mysqli_close($link);
}

function videoMP4()
{
	//Параметры
	include "../connectionSettings.php";
	//Соединение
	$link = mysqli_connect($server, $username, $password);
	if (!$link) 
	{
		die(mysqli_connect_error());
	}		
	//utf8
	mysqli_set_charset($link, "utf8");	
	//Выбор базы
	mysqli_select_db($link, $DB) or die(mysqli_error($link));

	$strSQL = "SELECT name, id FROM Video WHERE number_lection=".$_SESSION['$numberLection']." and type='mp4'";
	$res = mysqli_query($link, $strSQL);
	while($row = mysqli_fetch_array($res)) 
	{
		echo'<option value="' . $row['id'] .'">' . $row['name'] . '</option>';
	}
	mysqli_close($link);
}
?>