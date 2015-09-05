<?php
//Параметры
include $_SERVER['DOCUMENT_ROOT'] . "/connectionSettings.php";
//Соединение
$link = mysqli_connect($server, $username, $password);
if (!$link) 
{
	die(mysqli_connect_error());
}		
//Выбор базы
mysqli_select_db($link, $DB) or die(mysqli_error($link));

//Запрос
$strSQL = "SELECT * FROM Slides, SlidesInScenario WHERE id_scenario='".$numberScenario."' AND SlidesInScenario.id_slide=Slides.id";
$res = mysqli_query($link, $strSQL);
$countSlide=0;
while($subrow = mysqli_fetch_array($res)) 
{
	if ($subrow[type]=='2D')
	{
		if ($subrow['id_slide']==0)
		{
			echo'<img id="n'. $subrow['id_slide'] .'" src='.$home."files/".$subrow['2Dicon'].' alt="Icon" onclick="iconClick(this)">';
		}
		else
		{
			echo'<img id="n'. $subrow['id_slide'] .'" src='.$home."repository/2D/icons/".$subrow['2Dicon'].' alt="Icon" onclick="iconClick(this)">';
		}
		$masID[$countSlide]='n'. $subrow['id_slide'];
		$masType[$subrow['id_slide']]=$subrow['type'];
		$masSlide2D[$subrow['id_slide']]=$subrow['2Dpic'];
		$masComment[$subrow['id_slide']]=$subrow['commentary'];
	}
	else if($subrow[type]=='3D')
	{
		echo'<img id="n'. $subrow['id_slide'] .'" src='.$home."repository/3D/icons/".$subrow['3Dicon'].'" alt="Icon" onclick="iconClick(this)">';
		$masID[$countSlide]='n'. $subrow['id_slide'];
		$masType[$subrow['id_slide']]=$subrow['type'];
		$masTexture3D[$subrow['id_slide']]=$subrow['3Dtexture'];
		$masObject3D[$subrow['id_slide']]=$subrow['3Dobject'];
		$masComment[$subrow['id_slide']]=$subrow['commentary'];
	}
	$countSlide++;
}
mysqli_close($link);
?>