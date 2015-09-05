<?php
session_start();
//Параметры
include "../connectionSettings.php";
$link = mysqli_connect($server, $username, $password);
if (!$link) 
{
	die(mysqli_connect_error());
}
//utf8
mysqli_set_charset($link, "utf8");	
		
mysqli_select_db($link, $DB) or die(mysqli_error($link));
$strSQL = "DELETE FROM Lections WHERE id=" . $_SESSION['$id'];
$rs = mysqli_query($link, $strSQL);

$strSQL = "DELETE FROM SlidesInLection WHERE number_lection=" . $_SESSION['$id'];
$rs = mysqli_query($link, $strSQL);

$strSQL = "DELETE FROM Demonstrations_Time WHERE number_lection=" . $_SESSION['$id'];
$rs = mysqli_query($link, $strSQL);

$strSQL = "SELECT realname FROM Video WHERE number_lection=".$_SESSION['$id'];
$res = mysqli_query($link, $strSQL);
while($row = mysqli_fetch_array($res)) 
{
	unlink("../repository/video/".$row['realname']);
}

$strSQL = "DELETE FROM Video WHERE number_lection=" . $_SESSION['$id'];
$rs = mysqli_query($link, $strSQL);
mysqli_close($link);

//Web путь до главной страницы
//include $_SERVER['DOCUMENT_ROOT'] .$home. "homepage.php";

//Сообщение об успехе и ссылка
echo '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
echo '<link rel="stylesheet" href="css/styles.css" type="text/css">';
echo '<div id="backgroundResult">';
echo "<center><br><H2>Лекция успешно удалена.</H2></center>";
echo '<p>&nbsp;</p>';
echo '</div>';
?>