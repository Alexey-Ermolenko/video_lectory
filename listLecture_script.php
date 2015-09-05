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
//Открытие списка
//echo '<table id="table1" border="0" cellpadding="5" style="border-collapse: collapse; border: 0px;  width:100%;"><tr style="background-color: silver"><td width=150px;><center>Название лекции</center></td><td><center>Автор</center></td></tr>'; //<td width=1%;></td>
//echo '<table>';
//Получение лекций
$strSQL = "SELECT * FROM Lections WHERE active='1'";
$rs = mysqli_query($link, $strSQL);
//Вывод лекций в таблицу
while($row = mysqli_fetch_array($rs)) 
{
	//$strSQL = "SELECT * FROM Slides, SlidesTime WHERE number_lection='".$row['id']."' AND SlidesTime.id_slide=Slides.id ORDER BY time";
	//$res = mysqli_query($link, $strSQL);
	//if (mysqli_num_rows($res) > 0)
	//{
	//	while($subrow = mysqli_fetch_array($res)) 
	//	{
	//		if ($subrow['type']=='2D')
	//		{
	//			$img="<img height='150px' width='200px' src='repository/2D/icons/".$subrow['2Dicon']."'/>";
	//		}
	//		else if ($subrow['type']=='3D')
	//		{
	//			$img="<img height='150px' width='200px' src='repository/3D/icons/".$subrow['3Dicon']."'/>";
	//		}
	//		break;
	//	}
	//}
	//echo '<tr><td rowspan="2"><a class="links" href="demo/index.html?id='.$row['id'].'" target="_blank">'.$img.'</a></td><td>' . $row['name'] .'</td></tr><tr><td>'.$row['autor'].'</td></tr>';
	$img="<img height='150px' width='267px' src='repository/posters/".$row['poster']."'/>";
	echo '<div class="span4"><a class="download" href="repository/archiver/'.$row['id'].'.zip"><img src="files/save.png" alt="Save"></a><a class="links" href="demo/index.html?id='.$row['id'].'" target="_blank"><div>'.$img.'<span class="links">'.$row['name'].'</span><span class="links">'.$row['autor'].'</span></div></a></div>';
}
//echo '</table>';
echo '</br>';
//Закрытие соединения
mysqli_close($link);
?>