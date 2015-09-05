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
echo '<table id="table1" border="1" cellpadding="5" style="border-collapse: collapse; border: 0px; width:100%;"><tr style="background-color: silver"><td width=20%;><center>Название сценария</center></td><td width=40%;><center>Описание сценария</center></td><td width=20%;><center>Автор</center></td><td width=10%;><center>Дата создания</center></td><td width=10%;><center>Дата изменения</center></td></tr>';
//Получение лекций
$strSQL = "SELECT * FROM Scenario";
$rs = mysqli_query($link, $strSQL);
//Вывод лекций в таблицу
while($row = mysqli_fetch_array($rs)) 
{
	echo '<tr><td><a class="links" href="../scenario/index.php?id='.$row['id'].'">'.$row['name'].'</a></td><td>' . $row['specification'] .'</td><td>' . $row['autor'] .'</td><td>' . $row['dateCreate'] .'</td><td>' . $row['dateAlter'] .'</td></tr>';
}
//echo '<tr border="0"><td><a class="links" href="newScenario.html">Создать новый сценарий</a></td><td></td><td></td><td></td><td></td></tr>';
echo '</table>';
echo '<table>';
echo '<tr border="0"><td><a class="links" href="newScenario.php">Создать новый сценарий</a></td></tr>';
echo '</table>';
//Закрытие соединения
mysqli_close($link);
?>