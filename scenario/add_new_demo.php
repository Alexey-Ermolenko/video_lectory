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
//$strSQL = "SELECT * FROM Demonstrations WHERE typeID='3'";
//$strSQL = "SELECT * FROM Demonstrations LEFT JOIN DemonstrationsTypes ON DemonstrationsTypes.id=Demonstrations.typeID WHERE DemonstrationsTypes.name='new_demo'";
$strSQL = "SELECT Demonstrations.id,Demonstrations.string_parameter, Demonstrations.autor, Demonstrations.name, Demonstrations.icon, Demonstrations.commentary, DemonstrationsTypes.name FROM Demonstrations LEFT JOIN DemonstrationsTypes ON DemonstrationsTypes.id=Demonstrations.typeID WHERE DemonstrationsTypes.name='new_demo'";
$res = mysqli_query($link, $strSQL);
$numberNew_demo=0;

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
			echo'<img id="n'. $row['id'] .'" class="inBase" src="'."../repository/new_demo/icons/".$row['icon'].'" alt="IconInBase" onclick="iconClick(this)">';
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
			echo'<img id="n'. $row['id'] .'" class="outBase" src="'."../repository/new_demo/icons/".$row['icon'].'" alt="Icon" onclick="iconClick(this)">';
		}
	}
	$numberNew_demo++;
	$masType[$row['id']]=$row['typeID'];
	$masSlide2D[$row['id']]=$row['2Dpic'];
	$masComment[$row['id']]=$row['commentary'];
}


/*
while($row = mysqli_fetch_array($res)) 
{
	if ($row['id']!=0)
	{

		$file_new_demo = $row['string_parameter'];
		
		echo'<img id="n'. $row['id'] .'" class="slide" src="'."../repository/new_demo/icons/".$row['icon'].'" alt="IconInBase" onclick="iconClick_new_demo(this)" img_new_demo="'.$file_new_demo.'" comment="'.$row['commentary'].'"/>';
		$number_new_demo++;
		$masType[$row['id']]=$row['typeID'];
	//	$masNew_demo_img[$row['id']]=$file_new_demo;
		$masComment[$row['id']]=$row['commentary'];
		
		$mas_quantity = $number_new_demo;		
	}
}
if ($numberNew_demo==0)
{
	$masTexture3D[1]="0";
	$masObject3D[1]="0";
}
mysqli_close($link);
*/
?>