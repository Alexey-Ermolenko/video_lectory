<?php
include '../../connectionSettings.php';
$mysqli = new mysqli($server, $username, $password, $DB);

if ($mysqli->connect_errno) {
    printf("Не удалось подключиться: %s\n", $mysqli->connect_error);
    exit();
}

$mysqli->set_charset('utf8');

//Удаляем старые данные
$mysqli->query('DELETE FROM Commands WHERE number_lection='.$_POST['id']);
$mysqli->query('DELETE FROM Demonstrations_Time WHERE number_lection='.$_POST['id']);

//Запись слайдов
$demoArray = json_decode($_POST['jsonString']);
if (count($demoArray->slides)>0){
	for ($i = 0; $i < count($demoArray->slides); $i++) {
		$mysqli->query('INSERT INTO Demonstrations_Time(id_demonstration, number_lection, time) VALUES("'.$demoArray->slides[$i]->idSlide.'","'.$_POST['id'].'","'.$demoArray->slides[$i]->time.'")');
	}
}

//Запись команд
$commandsArray = json_decode($_POST['TotalCommandString']);
if (count($commandsArray->commands)>0){
	for ($i = 0; $i < count($commandsArray->commands); $i++) {
		$mysqli->query('INSERT INTO Commands(command, number_lection, time) VALUES("'.$commandsArray->commands[$i]->command.'","'.$_POST['id'].'","'.$commandsArray->commands[$i]->time.'")');
	}
}
$mysqli->close();
?>