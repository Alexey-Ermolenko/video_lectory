<?php
//Web путь до главной страницы
/*$home;
//https или http
if (isset($_SERVER['HTTPS']) && ($_SERVER['HTTPS']=='on')) 
{
	$home .= 'https://';
	$default_port = 443;
} 
else 
{
	$home .= 'http://';
	$default_port = 80;
}

$home .= $_SERVER['SERVER_NAME'];

// проверка порта
if ($_SERVER['SERVER_PORT'] != $default_port) 
{
	$home .= ':'.$_SERVER['SERVER_PORT'];
}
$home .= '/';*/
$home = '/noskov/';
?>