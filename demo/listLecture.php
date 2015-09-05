<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link rel="stylesheet" href="css/stylesNew.css" type="text/css">
	<meta content="IE=edge" http-equiv="X-UA-Compatible"></meta>
	<title>ML studio: Лекции</title>
</head>
<body>
	<header>
		<a href="../demo.html"><img id="logo" src="../files/logo.png" alt="Логотип"></img></a>
		<nav>
			<ul>
				<li class="menu"><a href="../demo.php">О проекте</a></li>
				<li class="menu"><a href="listLecture.php">Лекции</a></li>
				<li class="menu"><a href="../close.php">Контакты</a></li>
				<li class="menu"><a href="../close.php">Вход в систему</a></li>
			<ul>
		</nav>
	</header>
	<article>
		<p>Список лекций:</p>
		<?php include 'listLecture_script.php' ?>
	</article>
	<footer>
		<p>&#169; НГУЭУ Носков Игорь</p>
	</footer>
</body>
</html>