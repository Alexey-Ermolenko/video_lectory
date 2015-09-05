<?php
$name=$_POST['name'];
$mesage=$_POST['message'];
$autor=$_POST['autor'];

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

$datetime = date('Y-m-d h:i:s');

//Добавление записи
$strSQL = "INSERT INTO Scenario(";
$strSQL = $strSQL . "name, ";
$strSQL = $strSQL . "specification, ";
$strSQL = $strSQL . "autor, ";
$strSQL = $strSQL . "dateCreate) ";
$strSQL = $strSQL . "VALUES (";
$strSQL = $strSQL . "'". $_POST['name'] ."', ";
$strSQL = $strSQL . "'". $_POST['message'] ."', ";
$strSQL = $strSQL . "'". $_POST['autor'] ."', ";
$strSQL = $strSQL . "'". $datetime ."')";
mysqli_query($link, $strSQL) or die(mysqli_error($link));
//$lastid=mysqli_insert_id($link);
//Закрытие соединения
mysqli_close($link);
//Web путь до главной страницы
//include $_SERVER['DOCUMENT_ROOT'] . "/homepage.php";

//Сообщение об успехе и ссылки
echo '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
echo '<link rel="stylesheet" href="css/styles.css" type="text/css">';
echo '<div id="backgroundResult">';
echo "<center><br><H2>Сценарий успешно сформирован</H2></center>";
echo '</br>';
echo '</div>';
//echo '<a href="' . $home . 'newSlide.html">Перейти к созданию слайдов для лекции</a></br>';
//echo '<a href="' . $home . 'admin/index.html?id=' . $lastid . '">Перейти к редактированию лекции</a></br>';
//echo '<a href="' . $home . '">Вернуться на главную</a>';
?>