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

$resultSQL = $mysqli->query('SELECT * FROM Demonstrations, Demonstrations_In_Scenario WHERE id_scenario ="'.$_GET['idScenario'].'" AND Demonstrations_In_Scenario.id_demonstration = Demonstrations.id AND Demonstrations.typeID = 1');


//SELECT * FROM Demonstrations, Demonstrations_In_Scenario WHERE id_scenario =8 AND Demonstrations_In_Scenario.id_demonstration = Demonstrations.id AND Demonstrations.typeID = 1

	//$JSON='{"slides": [';
	 
	while($row = $resultSQL->fetch_assoc()){
			if ($row['id_demonstration']==0){
				echo'<img class="'.$row['typeID'].'" id="n'. $row['id_demonstration'] .'" src='.'../../files/'.$row['icon'].' alt="Icon" onclick="iconResClick_2D(this); iconClick(this);">';
				$JSON.='{"id": "n'.$row['id_demonstration'].'", "type": "'.$row['typeID'].'", "pic": "../../files/'.$row['string_parameter'].'", "commentary": "'.$row['commentary'].'"},';
				//$array. = array("id" => "n'.$row['id_demonstration'].'", "type" => "'.$row['typeID'].'","pic" => "../../files/'.$row['pic'].'","commentary" => "'.$row['commentary'].'");
			} else{
				echo'<img class="'.$row['typeID'].'" id="n'. $row['id_demonstration'] .'" src='.'../../repository/2D/icons/'.$row['icon'].' alt="Icon" onclick="iconResClick_2D(this); ; iconClick(this);">';
				$JSON.='{"id": "n'.$row['id_demonstration'].'", "type": "'.$row['typeID'].'", "pic": "../../repository/2D/images/'.$row['string_parameter'].'", "commentary": "'.$row['commentary'].'"},';
				//$array. = array("id" => "n".$row['id_demonstration']."", "type" => "".$row['typeID']."","pic" => "../../repository/2D/images/".$row['string_parameter']."","commentary" => "".$row['commentary']."");
			}
	}

	//$JSON=substr($JSON, 0, -1);
	//$JSON.=']}';

	$resultSQL->free();

	$mysqli->close();

?>