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
$strSQL = "SELECT * FROM Demonstrations LEFT JOIN DemonstrationsTypes ON DemonstrationsTypes.id=Demonstrations.typeID WHERE DemonstrationsTypes.name='2D'";

$res = mysqli_query($link, $strSQL);
$number2D=0;

while($row = mysqli_fetch_array($res)) 
{
	if ($row['id']!=0)
	{	
		$file_2D_demo = $row['string_parameter'];
	
		echo'<img id="n'. $row['id'] .'" class="slide" src="'."../repository/2D/icons/".$row['icon'].'" alt="IconInBase" onclick="demoIconClick_2D(this)" img="'.$file_2D_demo.'" comment="'.$row['commentary'].'"/>';
		$number_2D++;
		$masType[$row['id']]=$row['typeID'];
	//	$mas2D_img[$row['id']]=$file_2D_demo;
		$masComment[$row['id']]=$row['commentary'];
		
		$mas_quantity = $number_2D;
	}
}


if ($number2D==0)
{
	$masTexture3D[1]="0";
	$masObject3D[1]="0";
}
mysqli_close($link);
?>