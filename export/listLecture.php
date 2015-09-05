<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link rel="stylesheet" href="css/styles.css" type="text/css">
	<title>ML studio: Архивация</title>
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
			<a class="secondNavLink" href='../addVideo/listLectureForVideo.php'>Добавление видео</a>
			<a class="secondNavLink" href='../timeCorrection/listLectureForCorrection.php'>Синхронизация лекции</a>
			<a id="thisLink2"  href='listLecture.php'>Экспорт</a>
		</nav>
	</header>
	<section>
		<p>Этот раздел преназначен для финальных действий. После выбора лекции из списка она станет доступна для просмотра и будет создан её архив для скачиваний.</p>
		<p>Дождитесь пока будет завершена работа по созданию архива и только после закройте пустую вкладку.</p>
		<p>Если вы внесли изменения в лекцию, то нужна повторно её выбрать в этом разделе, для замены старого архива новым.</p>
		<p>Список лекций:</p>
		<?php include 'listLecture_script.php' ?>
	</section>
</body>
</html>