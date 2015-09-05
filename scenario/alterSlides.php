<?php
session_start();

function addSlide()
{
	//Параметры
	include "../connectionSettings.php";
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
	//Запрос
	$strSQL = "SELECT id FROM Demonstrations_In_Scenario where id_demonstration='".$_POST['idSlide']."' AND id_scenario=".$_SESSION['$idScenario'];
	$res = mysqli_query($link, $strSQL);
	//Проверка существования записи (не добавляли ли ранее)
	if (mysqli_num_rows($res) == 0)
	{
		//Если нет, то добавляем
		$strSQL = "INSERT INTO Demonstrations_In_Scenario(id_demonstration , id_scenario) VALUES('".$_POST['idSlide']."' ,'".$_SESSION['$idScenario']."')"; 
		mysqli_query($link, $strSQL) or die(mysqli_error($link));
	}
	$datetime = date('Y-m-d h:i:s');
	$query ="UPDATE Scenario SET dateAlter='".$datetime."' WHERE id=".$_SESSION['$idScenario'];
	mysqli_query($link, $query) or die(mysqli_error($link));
	//Закрытие соединения
	mysqli_close($link);
}

function dropSlide()
{ 
	//Параметры
	include "../connectionSettings.php";
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
	//Запрос
	$strSQL = "DELETE FROM Demonstrations_In_Scenario WHERE id_demonstration='".$_POST['idSlide']."' and id_scenario='".$_SESSION['$idScenario']."'"; 
	mysqli_query($link, $strSQL) or die(mysqli_error($link));
	$datetime = date('Y-m-d h:i:s');
	$query ="UPDATE Scenario SET dateAlter='".$datetime."' WHERE id=".$_SESSION['$idScenario'];
	mysqli_query($link, $query) or die(mysqli_error($link));
	//Закрытие соединения
	mysqli_close($link);
}	
	
//Проверка нажатой кнопки
if($_POST['addSlide'])
{
   addSlide();
}
elseif($_POST['dropSlide'])
{
	dropSlide();
}
header("Location: ".$_SERVER['HTTP_REFERER']);
?>