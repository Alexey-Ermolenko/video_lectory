<?php
//Параметры
//include "../../connectionSettings.php";

$mysqli = new mysqli($server, $username, $password, $DB);

if ($mysqli->connect_errno) {
    printf("Не удалось подключиться: %s\n", $mysqli->connect_error);
    exit();
}

$mysqli->set_charset('utf8');

//Запрос
//$result = $mysqli->query('SELECT * FROM Demonstrations, Demonstrations_In_Scenario WHERE id_scenario="'.$_GET['idScenario'].'" AND Demonstrations_In_Scenario.id_demonstration=Demonstrations.id');

$resultSQL = $mysqli->query('SELECT * FROM Demonstrations, Demonstrations_In_Scenario WHERE id_scenario ="'.$_GET['idScenario'].'" AND Demonstrations_In_Scenario.id_demonstration = Demonstrations.id AND Demonstrations.typeID = 2');


//SELECT * FROM Demonstrations, Demonstrations_In_Scenario WHERE id_scenario =8 AND Demonstrations_In_Scenario.id_demonstration = Demonstrations.id AND Demonstrations.typeID = 1
	while($row = $resultSQL->fetch_assoc()){
		$str = $row['string_parameter'];
		$str = explode("ꄬ", $str);
		$texture_3D_demo = $str[0]; // texture
		$object_3D_demo = $str[1]; // object
			echo'<img class="'.$row['typeID'].'" id="n'. $row['id_demonstration'] .'" src="'."../../repository/3D/icons/".$row['icon'].'" alt="Icon" onclick="iconResClick_3D(this); iconClick(this);">';
			$JSON.='{"id": "n'.$row['id_demonstration'].'", "type": "'.$row['typeID'].'", "texture": "../../repository/3D/textures/'.$texture_3D_demo.'", "object": "../../repository/3D/objects/'.$object_3D_demo.'", "commentary": "'.$row['commentary'].'"},';
			//$array. = array("id" => "n".$row['id_demonstration']."", "type" => "".$row['typeID']."","texture" => "../../repository/3D/textures/".$texture_3D_demo."","object" => "../../repository/3D/objects/".$object_3D_demo."" ,"commentary" => "".$row['commentary']."");

	}
	//$JSON=substr($JSON, 0, -1);
	$resultSQL->free();
	$mysqli->close();
?>