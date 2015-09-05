<?php
//Параметры
include "../connectionSettings.php";
//Соединение
$link = mysqli_connect($server, $username, $password);
if (!$link) 
{
	die(mysqli_connect_error());
}		
//Выбор базы
mysqli_select_db($link, $DB) or die(mysqli_error($link));


/// ************************** видео **************************


$JSON='{"video": [';

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
		$JSON.="video/".$row['realname'];
		$zip->addFile('../repository/video/'.$row['realname'], "lecture/video/".$row['realname']);
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
		$JSON.="video/".$row['realname'];
		$zip->addFile('../repository/video/'.$row['realname'], "lecture/video/".$row['realname']);
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
		$JSON.="video/".$row['realname'];
		$zip->addFile('../repository/video/'.$row['realname'], "lecture/video/".$row['realname']);
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
		$JSON.="video/".$row['realname'];
		$zip->addFile('../repository/video/'.$row['realname'], "lecture/video/".$row['realname']);
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
		$JSON.="video/".$row['realname'];
		$zip->addFile('../repository/video/'.$row['realname'], "lecture/video/".$row['realname']);
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
		$JSON.="video/".$row['realname'];
		$zip->addFile('../repository/video/'.$row['realname'], "lecture/video/".$row['realname']);
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
		$JSON.="video/".$row['realname'];
		$zip->addFile('../repository/video/'.$row['realname'], "lecture/video/".$row['realname']);
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
		$JSON.="video/".$row['realname'];
		$zip->addFile('../repository/video/'.$row['realname'], "lecture/video/".$row['realname']);
	}
	else
	{
		$JSON.=' ';
	}
	$JSON.='"},';
}
$JSON=substr($JSON, 0, -1);
$JSON.='], "slide": [';

/// ************************** демонстрации **************************
/*
$strSQL = "SELECT * FROM Slides, SlidesTime WHERE number_lection='".$numberLection."' AND SlidesTime.id_slide=Slides.id ORDER BY time";
$res = mysqli_query($link, $strSQL);
if (mysqli_num_rows($res) > 0)
{
	$i=1;
	while($row = mysqli_fetch_array($res)) 
	{
		$JSON.='{"id": "n'.$i.'", "type": ';
		if ($row['type']=='2D')
		{
			if ($row['id_slide']==0)
			{
				// $JSON.='"blackboard","icon": "'.$home."files/".$row['2Dicon'].'","src": "'.$home."files/".$row['2Dpic'].'", "obj": " ","texture": " ", "time": '.$row['time'].'},';
				$JSON.='"blackboard","icon": "files/'.$row['2Dicon'].'","src": "files/'.$row['2Dpic'].'", "obj": " ","texture": " ", "time": '.$row['time'].'},';
				$zip->addFile('../files/'.$row['2Dicon'], "lecture/files/".$row['2Dicon']);
				$zip->addFile('../files/'.$row['2Dpic'], "lecture/files/".$row['2Dpic']);
			}
			else
			{
				// $JSON.='"blackboard","icon": "'.$home."repository/2D/icons/".$row['2Dicon'].'","src": "'.$home."repository/2D/images/".$row['2Dpic'].'", "obj": " ","texture": " ", "time": '.$row['time'].'},';
				$JSON.='"blackboard","icon": "repository/2D/icons/'.$row['2Dicon'].'","src": "repository/2D/images/'.$row['2Dpic'].'", "obj": " ","texture": " ", "time": '.$row['time'].'},';
				$zip->addFile('../repository/2D/icons/'.$row['2Dicon'], "lecture/repository/2D/icons/".$row['2Dicon']);
				$zip->addFile('../repository/2D/images/'.$row['2Dpic'], "lecture/repository/2D/images/".$row['2Dpic']);
			}
		}
		else if ($row['type']=='3D')
		{
			// $JSON.='"3d","icon": "'.$home."repository/3D/icons/".$row['3Dicon'].'","src": " ", "obj": "'.$home."repository/3D/objects/".$row['3Dobject'].'","texture": "'.$home."repository/3D/textures/".$row['3Dtexture'].'", "time": '.$row['time'].'},';
			$JSON.='"3d","icon": "repository/3D/icons/'.$row['3Dicon'].'","src": " ", "obj": "repository/3D/objects/'.$row['3Dobject'].'","texture": "repository/3D/textures/'.$row['3Dtexture'].'", "time": '.$row['time'].'},';
			$zip->addFile('../repository/3D/icons/'.$row['3Dicon'], "lecture/repository/3D/icons/".$row['3Dicon']);
			$zip->addFile('../repository/3D/objects/'.$row['3Dobject'], "lecture/repository/3D/objects/".$row['3Dobject']);
			$zip->addFile('../repository/3D/textures/'.$row['3Dtexture'], "lecture/repository/3D/textures/".$row['3Dtexture']);
		}
		$i++;
	}
	$JSON=substr($JSON, 0, -1);
}
$JSON.=']}';
*/

/// ************************** команды **************************
/*
$JSON2='{"line": []}';


$strSQL = "SELECT * FROM Actions WHERE number_lection=".$numberLection;
$res = mysqli_query($link, $strSQL);
if (mysqli_num_rows($res) > 0)
{
	$JSON2='{"line": [';
	while($row = mysqli_fetch_array($res))
	{
		if ($row['action']=='paint')
		{
			$JSON2.='{"height": "'.$row['height'].'","width": "'.$row['width'].'","time": '.$row['time'].',"action": "'.$row['action'].'","x1": "'.$row['xold'].'","y1": "'.$row['yold'].'","x2": "'.$row['x'].'","y2": "'.$row['y'].'","color": "'.$row['color'].'"},';
		}
		else if ($row['action']=='deleteLoop' || $row['action']=='clear' || $row['action']=='createLoop' || $row['action']=='hideLoop')
		{
			$JSON2.='{"height": "'.$row['height'].'","width": "'.$row['width'].'","time": '.$row['time'].',"action": "'.$row['action'].'","x1": " ","y1": " ","x2": " ","y2": " ","color": " "},';
		}
		else if ($row['action']=='loop')
		{
			$JSON2.='{"height": "'.$row['height'].'","width": "'.$row['width'].'","time": '.$row['time'].',"action": "'.$row['action'].'","x1": "'.$row['x'].'","y1": "'.$row['y'].'","x2": "'.$row['xold'].'","y2": "'.$row['yold'].'","color": " "},';
		}
		else if ($row['action']=='3DAction')
		{
			$JSON2.='{"height": " ","width": " ","time": '.$row['time'].',"action": "'.$row['action'].'","x1": "'.$row['x'].'","y1": "'.$row['y'].'","x2": "'.$row['xold'].'","y2": " ","color": " "},';
		}
		else if ($row['action']=='dropSlide')
		{
			$JSON2.='{"height": " ","width": " ","time": '.$row['time'].',"action": "'.$row['action'].'","x1": " ","y1": " ","x2": " ","y2": " ","color": " "},';
		}
	}
	$JSON2=substr($JSON2, 0, -1);
	$JSON2.=']}';
}
*/

mysqli_close($link);
?>