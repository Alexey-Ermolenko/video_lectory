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
//Открытие списка
echo '<table id="table1" border="1" cellpadding="5" style="border-collapse: collapse; border: 0px; width:100%;"><tr style="background-color: silver"><td width=20%;><center>Название лекции</center></td><td width=60%;><center>Описание лекции</center></td><td width=20%;><center>Автор</center></td></tr>';
//Получение лекций
$strSQL = "SELECT * FROM Lections";
$rs = mysqli_query($link, $strSQL);
//Вывод лекций в таблицу
while($row = mysqli_fetch_array($rs)) 
{
	echo '<tr><td><a class="links" href="addVideo.php?id='.$row['id'].'">'.$row['name'].'</a></td><td>' . $row['specification'] .'</td><td>' . $row['autor'] .'</td></tr>';
}
echo '</table>';
//Закрытие соединения
mysqli_close($link);
?>