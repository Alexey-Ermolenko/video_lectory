<?php
$numberLection=$_GET['id'];

$file = 'repository/archiver/'.$numberLection.'.zip';

//Параметры
include "connectionSettings.php";
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
//Получение лекций
$strSQL = "SELECT * FROM Lections WHERE id='".$numberLection."'";
$rs = mysqli_query($link, $strSQL);
//Вывод лекций в таблицу
while($row = mysqli_fetch_array($rs)) 
{
	$newname=$row['autor'].' - '.$row['name'].'.zip';
	break;
}
//Закрытие соединения
mysqli_close($link);

//$newname = str_replace(' ', '_', $newname);

//echo '<meta charset="UTF-8">';
//echo $newname;

if (file_exists($file)) {
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename='.'"'.$newname.'"');
    header('Content-Transfer-Encoding: binary');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($file));
    ob_clean();
    flush();
    readfile($file);
    exit;
}
?>
