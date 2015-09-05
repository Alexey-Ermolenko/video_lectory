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
$strSQL = "SELECT * FROM Demonstrations LEFT JOIN DemonstrationsTypes ON DemonstrationsTypes.id=Demonstrations.typeID WHERE DemonstrationsTypes.name='3D'";

$res = mysqli_query($link, $strSQL);
$number3D=0;
while($row = mysqli_fetch_array($res)) 
{
	$str = $row['string_parameter'];
	
	$str = explode("ꄬ", $str);
	$texture_3D_demo = $str[0]; // texture
	$object_3D_demo = $str[1]; // object


	echo'<img id="n'. $row['id'] .'" class="slide" src="'."../repository/3D/icons/".$row['icon'].'" alt="Icon" onclick="demoIconClick_3D(this)" texture="'.$texture_3D_demo.'" object="'.$object_3D_demo.'" comment="'.$row['commentary'].'"/>';
	$number_3D++;
	$masType[$row['id']]=$row['typeID'];
//	$mas3D_Texture[$row['id']]=$texture_3D_demo;
//	$mas3D_Object[$row['id']]=$object_3D_demo;
	$masComment[$row['id']]=$row['commentary'];
	
	
	$mas_quantity = $number_3D;
}
if ($number3D==0)
{
	$mas3D_Texture[0]="0";
	$mas3D_Object[0]="0";
}
mysqli_close($link);

	
?>