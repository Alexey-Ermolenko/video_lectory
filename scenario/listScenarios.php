<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link rel="stylesheet" href="css/styles.css" type="text/css">
	<title>ML studio: Сценарии</title>
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
			<a id="thisLink2" href='listScenarios.php'>Сценарии</a>
			<a class="secondNavLink" href='../res/listLectureForRes.php'>Запись лекции</a>
			<a class="secondNavLink" href='../addVideo/listLectureForVideo.php'>Добавление видео</a>
			<a class="secondNavLink" href='../timeCorrection/listLectureForCorrection.php'>Синхронизация лекции</a>
			<a class="secondNavLink"  href='../export/listLecture.php'>Экспорт</a>
		</nav>
	</header>
	<section>
		<p>Список сценариев:</p>
		<?php include 'listScenarios_script.php' ?>
	</section>
</body>
</html>