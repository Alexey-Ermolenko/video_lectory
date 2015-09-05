<?php
//Параметры
include "../connectionSettings.php";
//Соединение
$mysqli = new mysqli($server, $username, $password, $DB);

if ($mysqli->connect_errno) {
    printf("Не удалось подключиться: %s\n", $mysqli->connect_error);
    exit();
}

$mysqli->set_charset('utf8');

$mysqli->query('UPDATE Demonstrations_Time SET time=time+'.$_POST['delta'].' WHERE number_lection='.$_POST['id']);
$mysqli->query('UPDATE Commands SET time=time+'.$_POST['delta'].' WHERE number_lection='.$_POST['id']);

$mysqli->close();
?>