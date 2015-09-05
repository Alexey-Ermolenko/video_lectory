<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<?php
//include 'deleteOldFile.php';
$id=$_GET['id'];
//Параметры
include "../connectionSettings.php";
//Соединение
/*$link = mysqli_connect($server, $username, $password);
if (!$link) 
{
	die(mysqli_connect_error());
}		
//utf8
mysqli_set_charset($link, "utf8");	
//Выбор базы
mysqli_select_db($link, $DB) or die(mysqli_error($link));

//$strSQL = "SELECT  name  FROM Lections WHERE id=".$id;
//$res = mysqli_query($link, $strSQL);
//$name = mysqli_fetch_array($res);
//$name=$name['name'];
mysqli_close($link);*/

include 'createZip.php';
//include 'download.php';

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

$strSQL = "UPDATE Lections SET active=1 WHERE id=".$id;
mysqli_query($link, $strSQL);

mysqli_close($link);
?>