<?php
//Параметры
include "../../connectionSettings.php";
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

$JSON='{"videos": [';

$strSQL = "SELECT * FROM Video WHERE number_lection=".$numberLection." AND resolution='360'";
$res = mysqli_query($link, $strSQL);
if (mysqli_num_rows($res) > 0)
{
	$JSON.='{"type": "360","mp4": "';
	//Запрос
	$strSQL = "SELECT * FROM Video WHERE number_lection=".$numberLection." AND type='mp4' AND resolution='360'";
	$res = mysqli_query($link, $strSQL);
	if (mysqli_num_rows($res) > 0)
	{
		$row = mysqli_fetch_array($res);
		$JSON.="../../repository/video/".$row['realname'];
	}
	else
	{
		$JSON.=' ';
	}
	$JSON.='","webm": "';
	$strSQL = "SELECT * FROM Video WHERE number_lection=".$numberLection." AND type='webm' AND resolution='360'";
	$res = mysqli_query($link, $strSQL);
	if (mysqli_num_rows($res) > 0)
	{
		$row = mysqli_fetch_array($res);
		$JSON.="../../repository/video/".$row['realname'];
	}
	else
	{
		$JSON.=' ';
	}
	$JSON.='"},';
}

$strSQL = "SELECT * FROM Video WHERE number_lection=".$numberLection." AND resolution='480'";
$res = mysqli_query($link, $strSQL);
if (mysqli_num_rows($res) > 0)
{
	$JSON.='{"type": "480","mp4": "';
	//Запрос
	$strSQL = "SELECT * FROM Video WHERE number_lection=".$numberLection." AND type='mp4' AND resolution='480'";
	$res = mysqli_query($link, $strSQL);
	if (mysqli_num_rows($res) > 0)
	{
		$row = mysqli_fetch_array($res);
		$JSON.="../../repository/video/".$row['realname'];
	}
	else
	{
		$JSON.=' ';
	}
	$JSON.='","webm": "';
	$strSQL = "SELECT * FROM Video WHERE number_lection=".$numberLection." AND type='webm' AND resolution='480'";
	$res = mysqli_query($link, $strSQL);
	if (mysqli_num_rows($res) > 0)
	{
		$row = mysqli_fetch_array($res);
		$JSON.="../../repository/video/".$row['realname'];
	}
	else
	{
		$JSON.=' ';
	}
	$JSON.='"},';
}

$strSQL = "SELECT * FROM Video WHERE number_lection=".$numberLection." AND resolution='720'";
$res = mysqli_query($link, $strSQL);
if (mysqli_num_rows($res) > 0)
{
	$JSON.='{"type": "720","mp4": "';
	//Запрос
	$strSQL = "SELECT * FROM Video WHERE number_lection=".$numberLection." AND type='mp4' AND resolution='720'";
	$res = mysqli_query($link, $strSQL);
	if (mysqli_num_rows($res) > 0)
	{
		$row = mysqli_fetch_array($res);
		$JSON.="../../repository/video/".$row['realname'];
	}
	else
	{
		$JSON.=' ';
	}
	$JSON.='","webm": "';
	$strSQL = "SELECT * FROM Video WHERE number_lection=".$numberLection." AND type='webm' AND resolution='720'";
	$res = mysqli_query($link, $strSQL);
	if (mysqli_num_rows($res) > 0)
	{
		$row = mysqli_fetch_array($res);
		$JSON.="../../repository/video/".$row['realname'];
	}
	else
	{
		$JSON.=' ';
	}
	$JSON.='"},';
}

$strSQL = "SELECT * FROM Video WHERE number_lection=".$numberLection." AND resolution='1080'";
$res = mysqli_query($link, $strSQL);
if (mysqli_num_rows($res) > 0)
{
	$JSON.='{"type": "1080","mp4": "';
	//Запрос
	$strSQL = "SELECT * FROM Video WHERE number_lection=".$numberLection." AND type='mp4' AND resolution='1080'";
	$res = mysqli_query($link, $strSQL);
	if (mysqli_num_rows($res) > 0)
	{
		$row = mysqli_fetch_array($res);
		$JSON.="../../repository/video/".$row['realname'];
	}
	else
	{
		$JSON.=' ';
	}
	$JSON.='","webm": "';
	$strSQL = "SELECT * FROM Video WHERE number_lection=".$numberLection." AND type='webm' AND resolution='1080'";
	$res = mysqli_query($link, $strSQL);
	if (mysqli_num_rows($res) > 0)
	{
		$row = mysqli_fetch_array($res);
		$JSON.="../../repository/video/".$row['realname'];
	}
	else
	{
		$JSON.=' ';
	}
	$JSON.='"},';
}
$JSON=substr($JSON, 0, -1);
$JSON.='],';

mysqli_close($link);

?>