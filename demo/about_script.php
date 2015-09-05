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
//Получение лекций
$strSQL = "SELECT * FROM Lections WHERE id='".$numberLection."'";
$rs = mysqli_query($link, $strSQL);
//Вывод лекций в таблицу
while($row = mysqli_fetch_array($rs)) 
{
	$info1='Название: '.$row['name'];
	$info2='Автор: '.$row['autor'];
	$info3='Анотация: '.$row['specification'];
	$info4='Ключевые слова: '.$row['keys'];
	$info5='Содержание лекции: '.$row['content'];
	$info6='Целевая группа: '.$row['task_group'];
	$poster='../repository/posters/'.$row['poster'];
	
	//echo '<tr><td><a class="links" href="index.html?id='.$row['id'].'" target="_blank">'.$row['name'].'</a></td><td>' . $row['specification'] .'</td><td>' . $row['autor'] .'</td><td><a class="links" href="../repository/archiver/'.$row['name'].'.zip"><img src="save.png" alt="Save"></a></td></tr>';
}
//echo '</br>';
//Закрытие соединения
mysqli_close($link);
?>