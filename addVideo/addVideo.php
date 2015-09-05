<?php
session_start();
$numberLection=$_GET['id'];
$_SESSION['$numberLection']=$numberLection;
?>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link rel="stylesheet" href="styles.css" type="text/css">
	<title>ML studio: Загрузка видеофайлов</title>
</head>
<body>
	<header>
		<div id='opheader'>
			<center><h1>ML studio</h1></center>
		</div>
		<nav id='firsrNav'>
			<a class="firstNavLink" href='../welcome.php'>О проекте</a>
			<a id="thisLink" href='../lesson/listLecture.php'>Лекции</a>
		</nav>
		<nav id='secondNav'>
			<a class="secondNavLink" href='../lesson/listLecture.php'>Лекции</a>
			<a class="secondNavLink" href='../slides/listSlides.php'>Слайды</a>
			<a class="secondNavLink" href='../scenario/listScenarios.php'>Сценарии</a>
			<a class="secondNavLink" href='../res/listLectureForRes.php'>Запись лекции</a>
			<a id="thisLink2" href='listLectureForVideo.php'>Добавление видео</a>
			<a class="secondNavLink" href='../timeCorrection/listLectureForCorrection.php'>Синхронизация лекции</a>
			<a class="secondNavLink"  href='../export/listLecture.php'>Экспорт</a>
		</nav>
	</header>
	<article>
		<iframe id='result' name="iframe-name" frameborder='no' src="#"></iframe>
		<form action='addVideo_script.php' method='post' enctype='multipart/form-data' target="iframe-name">
			<p>Укажите видеофайлы которые нужно загрузить (форматы webm и mp4)</p>	
			<input name='video[]' type='file' multiple='true' accept="video/webm,video/mp4" required="required" />
			<input type='submit' value='Загрузить файлы' onclick='result()'></input>
		</form>
		<a href='../setResolution/setResolution.php?id=<?php echo $numberLection;?>' class='links'>Установать соответсвия разрешений и файлов</a>
	</article>
	<script type='text/javascript' src='script.js'></script>
</body>
</html>