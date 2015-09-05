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
//$strSQL = "SELECT * FROM Demonstrations WHERE typeID='2'";
//$strSQL = "SELECT * FROM Demonstrations LEFT JOIN DemonstrationsTypes ON DemonstrationsTypes.id=Demonstrations.typeID WHERE DemonstrationsTypes.name='3D'";
$strSQL = "SELECT Demonstrations.id,Demonstrations.string_parameter, Demonstrations.autor, Demonstrations.name, Demonstrations.icon, Demonstrations.commentary, DemonstrationsTypes.name FROM Demonstrations LEFT JOIN DemonstrationsTypes ON DemonstrationsTypes.id=Demonstrations.typeID WHERE DemonstrationsTypes.name='3D'";

$res = mysqli_query($link, $strSQL);
$number3D=0;
while($row = mysqli_fetch_array($res)) 
{
	$strSQL = "SELECT * FROM Demonstrations_In_Scenario WHERE id_demonstration='".$row['id']."' and id_scenario='".$idScenario."'";
	$ressub = mysqli_query($link, $strSQL);
	if (mysqli_num_rows($ressub) != 0)
	{
		echo'<img id="n'. $row['id'] .'" class="inBase" src="'."../repository/3D/icons/".$row['icon'].'" alt="IconInBase" onclick="iconClick(this)">';
	}
	else
	{
		echo'<img id="n'. $row['id'] .'" class="outBase" src="'."../repository/3D/icons/".$row['icon'].'" alt="Icon" onclick="iconClick(this)">';
	}
	$number3D++;
	$masType[$row['id']]=$row['type'];
	$masTexture3D[$row['id']]=$row['3Dtexture'];
	$masObject3D[$row['id']]=$row['3Dobject'];
	$masComment[$row['id']]=$row['commentary'];
}
?>