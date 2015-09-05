<?php

	//Параметры
	include "../connectionSettings.php";
	//Соединение
	$mysqli = new mysqli($server, $username, $password, $DB);
	if ($mysqli->connect_errno) {
		printf("Не удалось подключиться: %s\n", $mysqli->connect_error);
		exit();
	}
	//utf8
	$mysqli->set_charset('utf8');

?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" href="css/styles.css" type="text/css">
	<script type="text/javascript" src="../js/jquery-2.1.1.min.js"></script>
	
<title>ML studio: коррекция</title>
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
	</header>
	<hr/>
	<section>
		<div id='add_form'>
			<center><h3>Добавление нового типа демонстрационных объектов</h3></center>
			<hr>
			<form action="add_new_demo_type.php">
				<p><b>Данные о новом типе демонстрационных объектов</b></p>
				<p><input type="text" name="demo_name" />Название<Br>
				<input type="file" name="answer" />Файлы обработчики<Br>
				<input type="file" name="answer" />файлы кода<Br>
				<input type="file" name="answer" />Файлы обработчики формы добавления демонстрационного объекта<Br>
				<input type="file" name="answer" />файлы средств вывода из бд по сценарию<Br>
				<input type="file" name="answer" />файлы средств вывода из бд по типу</p>
				<p><center><input type="submit"/><input type="reset"/></center></p>
			 </form>

			
		</div>
		<h1>
			
	</section>
</body>
</html>