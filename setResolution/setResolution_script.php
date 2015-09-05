<?php
session_start();
$numberLection=$_SESSION['$numberLection'];
$video360=$_POST['video360'];
$video480=$_POST['video480'];
$video720=$_POST['video720'];
$video1080=$_POST['video1080'];

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
//Удаляем старые значения
$strSQL = "UPDATE Video SET resolution=NULL WHERE number_lection=".$_SESSION['$numberLection'];
$res = mysqli_query($link, $strSQL);
//Записываем новые
if ($video360==true)
{
	$strSQL = "UPDATE Video SET resolution=". 360 ." WHERE number_lection=".$_SESSION['$numberLection']." AND id=".$_POST['mp4360'];
	$res = mysqli_query($link, $strSQL);
	$strSQL = "UPDATE Video SET resolution=". 360 ." WHERE number_lection=".$_SESSION['$numberLection']." AND id=".$_POST['webm360'];
	$res = mysqli_query($link, $strSQL);
}
if ($video480==true)
{
	$strSQL = "UPDATE Video SET resolution=". 480 ." WHERE number_lection=".$_SESSION['$numberLection']." AND id=".$_POST['mp4480'];
	$res = mysqli_query($link, $strSQL);
	$strSQL = "UPDATE Video SET resolution=". 480 ." WHERE number_lection=".$_SESSION['$numberLection']." AND id=".$_POST['webm480'];
	$res = mysqli_query($link, $strSQL);
}
if ($video720==true)
{
	$strSQL = "UPDATE Video SET resolution=". 720 ." WHERE number_lection=".$_SESSION['$numberLection']." AND id=".$_POST['mp4720'];
	$res = mysqli_query($link, $strSQL);
	$strSQL = "UPDATE Video SET resolution=". 720 ." WHERE number_lection=".$_SESSION['$numberLection']." AND id=".$_POST['webm720'];
	$res = mysqli_query($link, $strSQL);
}
if ($video1080==true)
{
	$strSQL = "UPDATE Video SET resolution=". 1080 ." WHERE number_lection=".$_SESSION['$numberLection']." AND id=".$_POST['mp41080'];
	$res = mysqli_query($link, $strSQL);
	$strSQL = "UPDATE Video SET resolution=". 1080 ." WHERE number_lection=".$_SESSION['$numberLection']." AND id=".$_POST['webm1080'];
	$res = mysqli_query($link, $strSQL);
}
mysqli_close($link);

echo '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
echo '<link rel="stylesheet" href="styles.css" type="text/css">';
echo '<div id="backgroundResult">';
echo '<p>&nbsp;</p>';
echo '<p><center>Разрешения определены</center></p>';
echo '<p>&nbsp;</p>';
echo '</div>';
//echo '<a href="' . $home . 'timeCorrection/index.html?id=' . $numberLection . '">Перейти к синхронизации слайдов и видео</a></br>';
//echo '<a href="' . $home . '">Вернуться на главную</a>';
?>