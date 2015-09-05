<?php
session_start();
$numberLection=$_SESSION['$numberLection'];

ini_set('max_file_uploads', "50");
ini_set("upload_max_filesize","1000M");
ini_set("post_max_size","1000M");

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

echo '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
echo '<link rel="stylesheet" href="styles.css" type="text/css">';
echo '<div id="backgroundResult">';
foreach ($_FILES['video']['name'] as $k=>$v)
{
	//Старое имя
	$oldname[$k]=$_FILES['video']['name'][$k];;
	//директория загрузки
	$uploaddir = "../repository/video/";
	//имя видео
	if($_FILES['video']['type'][$k] == "video/webm")
	{
		$newName[$k]=date('YmdHis').rand(10,100).'.webm';
		$videoType[$k]='webm';
	}
	else if ($_FILES['video']['type'][$k] == "video/mp4")
	{
		$newName[$k]=date('YmdHis').rand(10,100).'.mp4';
		$videoType[$k]='mp4';
	}
	//путь к изображению
	$uploadfile = "$uploaddir$newName[$k]";
	
	//Проверка расширений загружаемых изображений
	if($_FILES['video']['type'][$k] == "video/webm" || $_FILES['video']['type'][$k] == "video/mp4")
	{
		//перемещаем файл из временного хранилища
		if (move_uploaded_file($_FILES['video']['tmp_name'][$k], $uploadfile))
		{
			echo "<center><br>Файл (".$oldname[$k].") успешно загружен.</center>";
		}
		else
		{
			echo "<center><br>Файл (".$oldname[$k].") не загружен.</center>";
			echo '<p>&nbsp;</p>';
			echo '</div>';
			exit;
		}
	}
	else
	{
		echo "<center><br>Можно загружать только видеофайлы в форматах mp4 и webm. Файл (" . $oldname[$k] . ") не подходит.</center>";
		echo '<p>&nbsp;</p>';
		echo '</div>';
		exit;
	}
}
//Записываем новые данные
for ($j=0;$j<count($oldname);$j++)
{
	$strSQL = "INSERT INTO Video(number_lection, name, realname, type) VALUES('".$numberLection."','".$oldname[$j]."','".$newName[$j]."','".$videoType[$j]."')"; 
	mysqli_query($link, $strSQL) or die(mysqli_error($link));
}
//Закрытие соединения
mysqli_close($link);

//Web путь до главной страницы
echo '<p>&nbsp;</p>';
echo '</div>';
?>