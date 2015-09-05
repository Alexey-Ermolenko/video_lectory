<?php
	//Параметры
	include "../connectionSettings.php";
	//Соединение
	$link = mysqli_connect($server, $username, $password);
	if (!$link)		{
		die(mysqli_connect_error());
	}		
	//utf8
	mysqli_set_charset($link, "utf8");	
	//Выбор базы
	mysqli_select_db($link, $DB) or die(mysqli_error($link));

	$i=0;
	$strSQL = "SELECT * FROM Scenario";
	$res = mysqli_query($link, $strSQL);

	while($row = mysqli_fetch_array($res)) 	{
		echo'<option value="' . $row['id'] .'">' . $row['name'] . '</option>';
		//$strSQL = "SELECT * FROM Demonstrations_In_Scenario, Demonstrations WHERE id_scenario=".$row['id']." AND id_demonstration=Demonstrations.id";
		$strSQL = "SELECT * FROM `Demonstrations_In_Scenario`, `Demonstrations`,`DemonstrationsTypes` WHERE id_scenario=".$row['id']." AND id_demonstration=Demonstrations.id AND Demonstrations.typeID=DemonstrationsTypes.id";
		
		$subres=mysqli_query($link, $strSQL);
		while($row = mysqli_fetch_array($subres))	{
			$masTypesDemo[$i]=$row['name'];
			
			$masNumberSlide[$i]=$row['id_demonstration'];
				$masIconSlide[$i]=$row['icon'];
				$masType[$i]=$row['typeID'];
			$masNumberScenario[$i]=$row['id_scenario'];
			$i++;
		}
	}
	mysqli_close($link);

?>