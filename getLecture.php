<?php
//Параметры
include "connectionSettings.php";


//Соединение
$link = mysqli_connect($server, $username, $password);
if (!$link) 
{
	die(mysqli_connect_error());
}
//Пробный utf8
mysqli_set_charset($link, "utf8");
//Выбор базы
mysqli_select_db($link, $DB) or die(mysqli_error($link));
//Получение лекций
$strSQL = "SELECT * FROM Lections WHERE active='1'";
$rs = mysqli_query($link, $strSQL);
//Вывод лекций в таблицу
while($row = mysqli_fetch_array($rs)) $lectArray[] = $row;
//Закрытие соединения
mysqli_close($link);
?>