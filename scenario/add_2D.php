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

//Запрос
//$strSQL = "SELECT * FROM Demonstrations WHERE typeID='1'";
$strSQL = "SELECT Demonstrations.id,Demonstrations.string_parameter, Demonstrations.autor, Demonstrations.name, Demonstrations.icon, Demonstrations.commentary, DemonstrationsTypes.name FROM Demonstrations LEFT JOIN DemonstrationsTypes ON DemonstrationsTypes.id=Demonstrations.typeID WHERE DemonstrationsTypes.name='2D'";
$res = mysqli_query($link, $strSQL);
$number2D=0;
while($row = mysqli_fetch_array($res)) 
{
	$strSQL = "SELECT * FROM Demonstrations_In_Scenario WHERE id_demonstration='".$row['id']."' and id_scenario='".$idScenario."'";
	$ressub = mysqli_query($link, $strSQL);
	if (mysqli_num_rows($ressub) != 0)
	{
		if ($row['id']==0)
		{
			echo'<img id="n'. $row['id'] .'" class="inBase" src="'."../files/".$row['icon'].'" alt="IconInBase" onclick="iconClick(this)">';
		}
		else
		{
			echo'<img id="n'. $row['id'] .'" class="inBase" src="'."../repository/2D/icons/".$row['icon'].'" alt="IconInBase" onclick="iconClick(this)">';
		}
	}
	else
	{
		if ($row['id']==0)
		{
			echo'<img id="n'. $row['id'] .'" class="outBase" src="'."../files/".$row['icon'].'" alt="Icon" onclick="iconClick(this)">';
		}
		else
		{
			echo'<img id="n'. $row['id'] .'" class="outBase" src="'."../repository/2D/icons/".$row['icon'].'" alt="Icon" onclick="iconClick(this)">';
		}
	}
	$number2D++;
	$masType[$row['id']]=$row['typeID'];
	$masSlide2D[$row['id']]=$row['2Dpic'];
	$masComment[$row['id']]=$row['commentary'];
}
?>