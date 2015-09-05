<?php
//Параметры
include "../../connectionSettings.php";

$mysqli = new mysqli($server, $username, $password, $DB);

if ($mysqli->connect_errno) {
    printf("Не удалось подключиться: %s\n", $mysqli->connect_error);
    exit();
}

$mysqli->set_charset('utf8');

//Запрос
$result = $mysqli->query('SELECT * FROM Demonstrations, DemonstrationsTypes, Demonstrations_In_Scenario WHERE id_scenario="'.$_GET['idScenario'].'" AND Demonstrations_In_Scenario.id_demonstration=Demonstrations.id');

$JSON.='"slides": [';
 
while($row = $result->fetch_assoc()){
	//echo "<br>";
		//var_dump($row);
}

$JSON.=substr($JSON, 0, -1);
$JSON.=']}';

$result->free();

$mysqli->close();
?>