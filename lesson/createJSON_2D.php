<?php
//echo "2222222222222222222";

//Параметры
include "../connectionSettings.php";

$mysqli_2D = new mysqli($server, $username, $password, $DB);

if ($mysqli_2D->connect_errno) {
    printf("Не удалось подключиться: %s\n", $mysqli_2D->connect_error);
    exit();
}
$mysqli_2D->set_charset('utf8');

//$result = $mysqli->query('SELECT * FROM Slides, SlidesTime WHERE number_lection="'.$_GET['id'].'" AND SlidesTime.id_slide=Slides.id ORDER BY time');
//$result_2D = $mysqli_2D->query('SELECT * FROM Demonstrations, Demonstrations_Time WHERE number_lection="'.$_GET['id'].'" AND Demonstrations_Time.id_demonstration=Demonstrations.id ORDER BY time');

$result_2D = $mysqli_2D->query('SELECT * FROM Demonstrations, Demonstrations_Time WHERE number_lection="'.$_GET['id'].'" AND Demonstrations_Time.id_demonstration=Demonstrations.id AND typeID=1 ORDER BY time');

if ($result_2D->num_rows>0){
	$i=1;
	while($row = $result_2D->fetch_assoc()){
		//var_dump($row);
		//echo "<hr>";
		$file_2D_demo = $row['string_parameter'];
			if ($row['id_demonstration']==0)	{
				$JSON_array.='{"type": "2D","icon": "'."../files/".$row['icon'].'","src": "'."../files/".$file_2D_demo.'", "time": '.$row['time'].'},';	
				//$demoArray = array("id" => "n".$i, "type" => "2d", "icon" => "../files/".$row['icon'], "src" => "../files/".$file_2D_demo, "time" => $row['time']);	
			}	else	{
				$JSON_array.='{"type": "2D","icon": "'."../repository/2D/icons/".$row['icon'].'","src": "'."../repository/2D/images/".$file_2D_demo.'", "time": '.$row['time'].'},';	
				//$demoArray = array("type" => "2d", "icon" => "../repository/2D/icons/".$row['icon'], "src" => "../repository/2D/images/".$file_2D_demo, "time" => $row['time']);	
			}
		$i++;
	}
	//print_r($demoArray);
	//$JSON_array=substr($JSON_array, 0, -1);
}
$result_2D->free();
$mysqli_2D->close();

?>