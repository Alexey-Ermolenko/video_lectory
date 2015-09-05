<?php
//echo "33333333333333333";


//Параметры
include "../connectionSettings.php";

$mysqli_3D = new mysqli($server, $username, $password, $DB);

if ($mysqli_3D->connect_errno) {
    printf("Не удалось подключиться: %s\n", $mysqli_3D->connect_error);
    exit();
}

$mysqli_3D->set_charset('utf8');



//$result = $mysqli->query('SELECT * FROM Slides, SlidesTime WHERE number_lection="'.$_GET['id'].'" AND SlidesTime.id_slide=Slides.id ORDER BY time');
//$result_3D = $mysqli_3D->query('SELECT * FROM Demonstrations, Demonstrations_Time WHERE number_lection="'.$_GET['id'].'" AND Demonstrations_Time.id_demonstration=Demonstrations.id ORDER BY time');

$result_3D = $mysqli_3D->query('SELECT * FROM Demonstrations, Demonstrations_Time WHERE number_lection="'.$_GET['id'].'" AND Demonstrations_Time.id_demonstration=Demonstrations.id AND typeID=2 ORDER BY time');


if ($result_3D->num_rows>0){
	$i=1;
	while($row = $result_3D->fetch_assoc()){
		//var_dump($row);
		//echo "<hr>";
	$str = $row['string_parameter'];
	
	$str = explode("ꄬ", $str);
	$texture_3D_demo = $str[0]; // texture
	$object_3D_demo = $str[1]; // object
			$JSON_array.='{"type": "3D","icon": "'."../repository/3D/icons/".$row['icon'].'", "obj": "'."../repository/3D/objects/".$object_3D_demo.'","texture": "'."../repository/3D/textures/".$texture_3D_demo.'", "time": '.$row['time'].'},';
		$i++;
	}
	//$JSON_array=substr($JSON_array, 0, -1);
}


$result_3D->free();

$mysqli_3D->close();

?>