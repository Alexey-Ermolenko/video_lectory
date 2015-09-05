<?php
session_start();
$numberLection=$_GET['id'];
$_SESSION['$numberLection']=$numberLection;
?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" href="styles.css" type="text/css">
<script type="text/javascript" src="js/jquery-2.1.1.min.js"> </script>
<script type="text/javascript" src="js/ajax.js"> </script>
<title>ML studio: Определние разрешений видео</title>
</head>

<body>
	<header>
		<div id='opheader'>
			<center><h1>ML studio</h1></center>
		</div>
		<nav id='firsrNav'>
			<a class="firstNavLink" href='../welcome.php'>О проекте</a>
			<a id="thisLink" href='../listLecture.php'>Лекции</a>
		</nav>
		<nav id='secondNav'>
			<a class="secondNavLink" href='../lesson/listLecture.php'>Лекции</a>
			<a class="secondNavLink" href='../slides/listSlides.php'>Слайды</a>
			<a class="secondNavLink" href='../scenario/listScenarios.php'>Сценарии</a>
			<a class="secondNavLink" href='../res/listLectureForRes.php'>Запись лекции</a>
			<a id="thisLink2" href='../addVideo/listLectureForVideo.php'>Добавление видео</a>
			<a class="secondNavLink" href='../timeCorrection/listLectureForCorrection.php'>Синхронизация лекции</a>
			<a class="secondNavLink"  href='../export/listLecture.php'>Экспорт</a>
		</nav>
	</header>
	<iframe id='result' name="iframe-name" frameborder='no' src="#"></iframe>
	<form action='setResolution_script.php' method='post' target="iframe-name">

	<?php
		include "loadingVideo.php";
	?>

	Выберите разрешения видео и соответствующие файлы из списка. <br />
	<input type="checkbox" name="video360" value="true" />360p<br />
	<?php
	echo 'ссылка на mp4: <select size="1" name="mp4360">';
	videoMP4();
	echo '</select></br>';
	echo 'ссылка на webm: <select size="1" name="webm360">';
	videoWeb();
	echo '</select></br>';
	?>

	<input type="checkbox" name="video480" value="true" />480p<br />
	<?php
	echo 'ссылка на mp4: <select size="1" name="mp4480">';
	videoMP4();
	echo '</select></br>';
	echo 'ссылка на webm: <select size="1" name="webm480">';
	videoWeb();
	echo '</select></br>';
	?>

	<input type="checkbox" name="video720" value="true" />720p<br />
	<?php
	echo 'ссылка на mp4: <select size="1" name="mp4720">';
	videoMP4();
	echo '</select></br>';
	echo 'ссылка на webm: <select size="1" name="webm720">';
	videoWeb();
	echo '</select></br>';
	?>

	<input type="checkbox" name="video1080" value="true" />1080p<br />
	<?php
	echo 'ссылка на mp4: <select size="1" name="mp41080">';
	videoMP4();
	echo '</select></br>';
	echo 'ссылка на webm: <select size="1" name="webm1080">';
	videoWeb();
	echo '</select></br>';
	?>
	<input type="submit" value="Установить соответствия" onclick='result()' />
	</form> 
	<script type='text/javascript' src='script.js'></script>
</body>
</html>