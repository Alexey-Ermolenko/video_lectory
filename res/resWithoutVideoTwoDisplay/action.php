<?php
session_start();

$action=$_POST['action'];
//Если добавляем слайд
if ($action=='addSlide')
{
	$_SESSION['idSlide'][] = $_POST['idSlide'];
	$_SESSION['timeSlide'][] = $_POST['time'];
}
else if ($action=='paint')
{
	$_SESSION['action'][]=$_POST['action'];
	$_SESSION['width'][]=$_POST['wCanvas'];
	$_SESSION['height'][]=$_POST['hCanvas'];
	$_SESSION['xold'][]=$_POST['x1'];
	$_SESSION['yold'][]=$_POST['y1'];
	$_SESSION['x'][]=$_POST['x2'];
	$_SESSION['y'][]=$_POST['y2'];
	$_SESSION['color'][]=$_POST['color'];
	$_SESSION['timeAction'][]=$_POST['time'];
}
else if ($action=='clear' || $action=='createLoop' || $action=='deleteLoop' || $action=='hideLoop')
{
	$_SESSION['action'][]=$_POST['action'];
	$_SESSION['width'][]=$_POST['wCanvas'];
	$_SESSION['height'][]=$_POST['hCanvas'];
	$_SESSION['xold'][]='NULL';
	$_SESSION['yold'][]='NULL';
	$_SESSION['x'][]='NULL';
	$_SESSION['y'][]='NULL';
	$_SESSION['color'][]='NULL';
	$_SESSION['timeAction'][]=$_POST['time'];
}
else if ($action=='loop')
{
	$_SESSION['action'][]=$_POST['action'];
	$_SESSION['width'][]=$_POST['wCanvas'];
	$_SESSION['height'][]=$_POST['hCanvas'];
	$_SESSION['xold'][]=$_POST['pageX'];
	$_SESSION['yold'][]=$_POST['pageY'];
	$_SESSION['x'][]=$_POST['x1'];
	$_SESSION['y'][]=$_POST['y1'];
	$_SESSION['color'][]='NULL';
	$_SESSION['timeAction'][]=$_POST['time'];
}


function stop($i)
{
	//Параметры
	include $_SERVER['DOCUMENT_ROOT'] . "/connectionSettings.php";
	//Соединение
	$link = mysqli_connect($server, $username, $password);
	if (!$link) 
	{
		die(mysqli_connect_error());
	}		
	//Выбор базы
	mysqli_select_db($link, $DB) or die(mysqli_error($link));

	echo '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
	//Удаляем старые данные
	$strSQL = "DELETE FROM Actions WHERE number_lection=".$i;
	mysqli_query($link, $strSQL);
	$strSQL = "DELETE FROM SlidesTime WHERE number_lection=".$i;
	mysqli_query($link, $strSQL);
	for ($j=0;$j<count($_SESSION['timeSlide']);$j++)
	{
		$strSQL = "INSERT INTO SlidesTime(id_slide, number_lection, time) VALUES('".$_SESSION['idSlide'][$j]."','".$i."','".$_SESSION['timeSlide'][$j]."')"; 
		mysqli_query($link, $strSQL) or die(mysqli_error($link));
	}
	unset($_SESSION['idSlide']);
	unset($_SESSION['timeSlide']);
	
	for ($j=0;$j<count($_SESSION['timeAction']);$j++)
	{
		if ($_SESSION['action'][$j]=='paint' && $_SESSION['xold'][$j]!='undefined')
		{
			$strSQL = "INSERT INTO Actions(action, number_lection, height, width, xold, yold, x, y, color, time) VALUES('".$_SESSION['action'][$j]."','".$i."','".$_SESSION['height'][$j]."','".$_SESSION['width'][$j]."','".$_SESSION['xold'][$j]."','".$_SESSION['yold'][$j]."','".$_SESSION['x'][$j]."','".$_SESSION['y'][$j]."','".$_SESSION['color'][$j]."','".$_SESSION['timeAction'][$j]."')"; 
			mysqli_query($link, $strSQL) or die(mysqli_error($link));
		}
		else if ($_SESSION['action'][$j]=='clear' || $_SESSION['action'][$j]=='createLoop' || $_SESSION['action'][$j]=='deleteLoop' || $_SESSION['action'][$j]=='hideLoop')
		{
			$strSQL = "INSERT INTO Actions(action, number_lection, height, width, time) VALUES('".$_SESSION['action'][$j]."','".$i."','".$_SESSION['height'][$j]."','".$_SESSION['width'][$j]."','".$_SESSION['timeAction'][$j]."')"; 
			mysqli_query($link, $strSQL) or die(mysqli_error($link));
		}
		else if ($_SESSION['action'][$j]=='loop')
		{
			$strSQL = "INSERT INTO Actions(action, number_lection, height, width, xold, yold, x, y, time) VALUES('".$_SESSION['action'][$j]."','".$i."','".$_SESSION['height'][$j]."','".$_SESSION['width'][$j]."','".$_SESSION['xold'][$j]."','".$_SESSION['yold'][$j]."','".$_SESSION['x'][$j]."','".$_SESSION['y'][$j]."','".$_SESSION['timeAction'][$j]."')"; 
			mysqli_query($link, $strSQL) or die(mysqli_error($link));
		}
	}
	unset($_SESSION['action']);
	unset($_SESSION['height']);
	unset($_SESSION['width']);
	unset($_SESSION['xold']);
	unset($_SESSION['yold']);
	unset($_SESSION['x']);
	unset($_SESSION['y']);
	unset($_SESSION['color']);
	unset($_SESSION['timeAction']);
	
	mysqli_close($link);
	//Web путь до главной страницы
	//include $_SERVER['DOCUMENT_ROOT'] . "/homepage.php";
	echo '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
	echo '<link rel="stylesheet" href="css/styles.css" type="text/css">';
	echo '<div id="backgroundResult">';
	echo '</br>';
	echo '<p><center>Лекция успешно записана</center></p>';
	echo '</br>';
	echo '</div>';
	//echo '<a href="' . $home . 'addVideo/addVideo.html?id=' . $i . '">Перейти к добавлению видео</a></br>';
	//echo '<a href="' . $home . '">Вернуться на главную</a>';
}

//Проверка нажатой кнопки
if($_POST['finish'])
{
	$numberLection=$_SESSION['$numberLection'];
	stop($numberLection);
}
 
 ?>