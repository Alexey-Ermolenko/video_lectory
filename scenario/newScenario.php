<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" href="css/styles.css" type="text/css">
<title>ML studio: Создание сценария</title>
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
	<article>
		<iframe id='result' name="iframe-name" frameborder='no' src="#"></iframe>
		<form id='form1' action='createScenario.php' method='post' target="iframe-name">
			<p>Название сценария:</p>
			<input type='text' name='name' required="required" />
			<p>Описание сценария:</p>
			<textarea name='message' rows='3' cols='55' required="required"></textarea>
			<p>Автор:</p>
			<input type='text' name='autor' required="required" />
		
			<input type='submit' value='Создать сценарий' onclick="resultCreate()"/>
		</form>
	</article>
	<script type="text/javascript" src="js/script.js"></script>
</body>
</html>