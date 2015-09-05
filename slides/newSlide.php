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
	$result = $mysqli->query("SELECT * FROM DemonstrationsTypes");	
	
	$result1 = $mysqli->query("SELECT * FROM DemonstrationsTypes");	
	$row_cnt = $result->num_rows;
	$libs_array = array();
	$libs_array_count = 0;
	while ($lib_row = $result1->fetch_assoc()) {
		$libs_array[$libs_array_count] = ($lib_row['library_file_links']);
		$www =  $www. $libs_array[$libs_array_count];
		$libs_array_count++;
	}
	$www  = explode(";", $www);	

?>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<link rel="stylesheet" href="css/styles.css" type="text/css">
		<script type="text/javascript" src="../js/jquery-2.1.1.min.js"></script>
		<title>Demo Tester: Создание слайда</title>
			<?php 	for ($i = 0;$i <= count($www); $i++) {	?>
						<script type="text/javascript" src="<?php echo $www[$i];?>"></script>
			<?php 	}	?>
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
			<a id="thisLink2" href='listSlides.php'>Слайды</a>
			<a class="secondNavLink" href='../scenario/listScenarios.php'>Сценарии</a>
			<a class="secondNavLink" href='../res/listLectureForRes.php'>Запись лекции</a>
			<a class="secondNavLink" href='../addVideo/listLectureForVideo.php'>Добавление видео</a>
			<a class="secondNavLink" href='../timeCorrection/listLectureForCorrection.php'>Синхронизация лекции</a>
			<a class="secondNavLink"  href='../export/listLecture.php'>Экспорт</a>
		</nav>
	</header>
		<article>
			<iframe id='result' name="iframe-name" frameborder='no' src="#"></iframe>
			<form id='form1' action='' method='post' enctype='multipart/form-data'  target='iframe-name'>
					Выберите тип слайда:<br />
					
					<?php	while ($row = $result->fetch_assoc()) {		?>
								<input type="radio" name="type" value="<?php echo $row['name'];?>" onchange="load_form_<?php echo $row['name'];?>();"><?php echo $row['name'];?></input><br>
					<?php	}	?>
				</br>
				</br>
					<div id="blank"></div>
			</form>
		</article>
		<script type="text/javascript" src="js/script.js"></script>
	</body>
</html>