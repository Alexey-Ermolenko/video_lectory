<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" href="css/styles.css" type="text/css">
<title>ML studio: Создание лекции</title>
</head>
<body>
	<header>
		<div id='opheader'>
			<center><h1>ML studio</h1></center>
		</div>
		<nav id='firsrNav'>
			<a class="firstNavLink" href='../welcome.php'>О проекте</a>
			<a id="thisLink" href='listLecture.php'>Лекции</a>
		</nav>
		<nav id='secondNav'>
			<a id="thisLink2"  href='listLecture.php'>Лекции</a>
			<a class="secondNavLink" href='../slides/listSlides.php'>Слайды</a>
			<a class="secondNavLink" href='../scenario/listScenarios.php'>Сценарии</a>
			<a class="secondNavLink" href='../res/listLectureForRes.php'>Запись лекции</a>
			<a class="secondNavLink" href='../addVideo/listLectureForVideo.php'>Добавление видео</a>
			<a class="secondNavLink" href='../timeCorrection/listLectureForCorrection.php'>Синхронизация лекции</a>
		</nav>
	</header>
	<article>
			<iframe id='result' name="iframe-name" frameborder='no' src="#"></iframe>
			<form id='form1' action='createLection.php' method='post' target="iframe-name">
				<p>Название лекции:</p>
				<input type='text' name='name' required="required" />
				<p>Описание лекции:</p>
				<textarea name='message' rows='3' cols='55' required="required"></textarea>
				<p>Автор:</p>
				<input type='text' name='autor' required="required" />

				<input type='submit' value='Создать лекцию' onclick="resultCreate()"/>
			</form>
	</article>
	<script type="text/javascript" src="js/script2.js"></script>
</body>
</html>