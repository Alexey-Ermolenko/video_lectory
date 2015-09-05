<?php 
	session_start();
	$_SESSION['$id']=$_GET['id'];
	include "../connectionSettings.php";
	$link = mysqli_connect($server, $username, $password);
	if (!$link) 
	{
		die(mysqli_connect_error());
	}		
	mysqli_select_db($link, $DB) or die(mysqli_error($link));
	$strSQL = "SELECT name FROM Lections WHERE id =" . $_GET['id'] or die(mysqli_error($link));;
	$namelection=mysqli_query($link, $strSQL); 
	$namelection = mysqli_fetch_row($namelection);
	mysqli_close($link);
?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" href="css/styles.css" type="text/css">
<title>ML studio: Удаление лекции</title>
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
			<a id="thisLink2"  href='../lesson/listLecture.php'>Лекции</a>
			<a class="secondNavLink" href='../slides/listSlides.php'>Слайды</a>
			<a class="secondNavLink" href='../scenario/listScenarios.php'>Сценарии</a>
			<a class="secondNavLink" href='../res/listLectureForRes.php'>Запись лекции</a>
			<a class="secondNavLink" href='../addVideo/listLectureForVideo.php'>Добавление видео</a>
			<a class="secondNavLink" href='../timeCorrection/listLectureForCorrection.php'>Синхронизация лекции</a>
			<a class="secondNavLink"  href='../export/listLecture.php'>Экспорт</a>
		</nav>
	</header>
	<section>
		<iframe id='result' name="iframe-name" frameborder='no' src="#"></iframe>
		<form action='deleteLection.php' method='post' target="iframe-name">
			<H1> Удаление лекции </H1>
			<p>Название лекции: <?php echo $namelection[0]; ?> </p>
			<input type='submit' value='Удалить лекцию' onclick='result()' />
		</form>	
	</section>
	<script type='text/javascript' src='js/script.js'></script>
</body>
</html>