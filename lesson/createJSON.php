<?php
//Параметры
include "../connectionSettings.php";

$mysqli = new mysqli($server, $username, $password, $DB);

if ($mysqli->connect_errno) {
    printf("Не удалось подключиться: %s\n", $mysqli->connect_error);
    exit();
}

	$slides = array();

$mysqli->set_charset('utf8');

$JSON='{"videos": [';
//Запрос
$result = $mysqli->query('SELECT * FROM Video WHERE number_lection='.$_GET['id']);
if ($result->num_rows>0){
	$result = $mysqli->query('SELECT * FROM Video WHERE number_lection='.$_GET['id'].' AND resolution="360"');
	if ($result->num_rows>0){
		$result = $mysqli->query('SELECT * FROM Video WHERE number_lection='.$_GET['id'].' AND resolution="360" AND type="mp4"');
		if ($result->num_rows>0){
			$row = $result->fetch_assoc();
			$JSON.='{"type": "360","mp4": "../repository/video/'.$row['realname'].'",';
		}
		else{
			$JSON.='{"type": "360","mp4": " ",';
		}
		$result = $mysqli->query('SELECT * FROM Video WHERE number_lection='.$_GET['id'].' AND resolution="360" AND type="webm"');
		if ($result->num_rows>0){
			$row = $result->fetch_assoc();
			$JSON.='"webm": "../repository/video/'.$row['realname'].'"},';
		}
		else{
			$a=$result->num_rows;
			$JSON.='"webm": " "},';
		}
	}

	$result = $mysqli->query('SELECT * FROM Video WHERE number_lection='.$_GET['id'].' AND resolution="480"');
	if ($result->num_rows>0){
		$result = $mysqli->query('SELECT * FROM Video WHERE number_lection='.$_GET['id'].' AND resolution="480" AND type="mp4"');
		if ($result->num_rows>0){
			$row = $result->fetch_assoc();
			$JSON.='{"type": "480","mp4": "../repository/video/'.$row['realname'].'",';
		}
		else{
			$JSON.='{"type": "480","mp4": " ",';
		}
		$result = $mysqli->query('SELECT * FROM Video WHERE number_lection='.$_GET['id'].' AND resolution="480" AND type="webm"');
		if ($result->num_rows>0){
			$row = $result->fetch_assoc();
			$JSON.='"webm": "../repository/video/'.$row['realname'].'"},';
		}
		else{
			$JSON.='"webm": " "},';
		}
	}

	$result = $mysqli->query('SELECT * FROM Video WHERE number_lection='.$_GET['id'].' AND resolution="720"');
	if ($result->num_rows>0){
		$result = $mysqli->query('SELECT * FROM Video WHERE number_lection='.$_GET['id'].' AND resolution="720" AND type="mp4"');
		if ($result->num_rows>0){
			$row = $result->fetch_assoc();
			$JSON.='{"type": "720","mp4": "../repository/video/'.$row['realname'].'",';
		}
		else{
			$JSON.='{"type": "720","mp4": " ",';
		}
		$result = $mysqli->query('SELECT * FROM Video WHERE number_lection='.$_GET['id'].' AND resolution="720" AND type="webm"');
		if ($result->num_rows>0){
			$row = $result->fetch_assoc();
			$JSON.='"webm": "../repository/video/'.$row['realname'].'"},';
		}
		else{
			$JSON.='"webm": " "},';
		}
	}

	$result = $mysqli->query('SELECT * FROM Video WHERE number_lection='.$_GET['id'].' AND resolution="1080"');
	if ($result->num_rows>0){
		$result = $mysqli->query('SELECT * FROM Video WHERE number_lection='.$_GET['id'].' AND resolution="1080" AND type="mp4"');
		if ($result->num_rows>0){
			$row = $result->fetch_assoc();
			$JSON.='{"type": "1080","mp4": "../repository/video/'.$row['realname'].'",';
		}
		else{
			$JSON.='{"type": "1080","mp4": " ",';
		}
		$result = $mysqli->query('SELECT * FROM Video WHERE number_lection='.$_GET['id'].' AND resolution="1080" AND type="webm"');
		if ($result->num_rows>0){
			$row = $result->fetch_assoc();
			$JSON.='"webm": "../repository/video/'.$row['realname'].'"},';
		}
		else{
			$JSON.='"webm": " "},';
		}
	}
	$JSON=substr($JSON, 0, -1);
}


//=====================================================
	//--------------сортировка массива по времени 
	$JSON_array = '[';
		$resultDemoTypes = $mysqli->query("SELECT name FROM DemonstrationsTypes");	
			while($row = $resultDemoTypes->fetch_assoc()){	
				include ("createJSON_".$row['name'].".php");
			}	

	
	//массив слайдов
	$JSON_array=substr($JSON_array, 0, -1);
	$JSON_array.=']';
	$JSON_array = json_decode($JSON_array);

	if ($JSON_array == null) {
		$JSON_array = "[]";
		
		$JSON.='], "slides": ';
		$JSON.=$JSON_array;
		$JSON=substr($JSON, 0, -1);
		$JSON.=']}';
	} else {
			$id = array();
		$arr22 = array();
		$JSON_arr22 = '[';
		$array_demo_count = count($JSON_array);
		for ($i = 1; $i <= $array_demo_count; $i++) {
			//$id[$i] = "n".$i;
			$JSON_arr22.='{"id":"n'.$i.'"},';
			
		}
		$JSON_arr22=substr($JSON_arr22, 0, -1);
		$JSON_arr22.=']';
		$JSON_arr22 = json_decode($JSON_arr22);
		
		//echo "<pre>";
		//	print_r($JSON_arr22);
		//echo "</pre>";
		//--------------	--------------

		function sortArr($a, $b) {
		//    return $a->time - $b->time;
			if ($a == $b) {
				return 0;
			}
			return ($a->time < $b->time) ? -1 : 1;
		}
		usort($JSON_array, 'sortArr');  
		$JSON_array = json_encode($JSON_array); 
		
		$slides_arr =  json_decode($JSON_array);
		//echo "<pre>";
		//	print_r($slides_arr);
		//echo "</pre>";

		

		for ($i = 0; $i < count($slides_arr); $i++) {
			$JS_arr = (array)$JSON_arr22[$i];
			$slide_arr = (array)$slides_arr[$i];
			$total_arr[$i] = array_merge($JS_arr, $slide_arr);
			
		}
		
		$JSON_array = json_encode($total_arr); 
		
		$JSON.='], "slides": ';
		$JSON.=$JSON_array;
		$JSON=substr($JSON, 0, -1);
		$JSON.=']}';
		
		//echo $JSON;
		//=====================================================
	}
	
	//echo $JSON;

$JSON2='{"commands": []}';
$result = $mysqli->query('SELECT * FROM Commands WHERE number_lection='.$_GET['id'].' ORDER BY time');
if ($result->num_rows>0){
	$JSON2='{"commands": [';
	while($row = $result->fetch_assoc()){
		$JSON2.='{"command": "'.$row['command'].'","time": "'.$row['time'].'"},';
	}
	$JSON2=substr($JSON2, 0, -1);
	$JSON2.=']}';
}
$result->free();

$mysqli->close();
?>