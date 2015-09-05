<?php
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

$strSQL = "SELECT * FROM Lections WHERE id=".$numberLection;
$res = mysqli_query($link, $strSQL);
while($row = mysqli_fetch_array($res))
{
	$name=$row['name'];
}
mysqli_close($link);
?>