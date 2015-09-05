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
	
	////////////
	$result1 = $mysqli->query("SELECT * FROM DemonstrationsTypes");	
	$names_array_count = 0;
	while ($name_row = $result1->fetch_assoc()) {
			$name_str[$names_array_count] = $name_row['name'];
			$names_array_count++;
	}
	//var_dump($name_str);
	$name_str =  json_encode($name_str);
	//echo $name_str;
	//echo "names_array_count ". $names_array_count;
	////////////
/*
	for ($i = 0;$i < $names_array_count; $i++) {
		echo "<br>";
		echo "$i = ".$name_str[$i];
	}
*/	
?>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link rel="stylesheet" href="css/styles.css" type="text/css">
	<title>ML studio: Лекции</title>
	<?php
		$numberLection=$_GET['id'];
	?>
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
			<a id="thisLink2" href='listLectureForRes.php'>Запись лекции</a>
			<a class="secondNavLink" href='../addVideo/listLectureForVideo.php'>Добавление видео</a>
			<a class="secondNavLink" href='../timeCorrection/listLectureForCorrection.php'>Синхронизация лекции</a>
			<a class="secondNavLink"  href='../export/listLecture.php'>Экспорт</a>
		</nav>
	</header>
	<section>
	<div id='scenarios'>
		<p>Выберите сценарий для лекции:</p>
		<?php
			echo '<select size="1" name="scenario" onchange="showSlides()">';
			include 'addScenario.php';
			echo '</select>';
		?>
		<input type='submit' onclick='thisScenario(); return false' value='Начать запись лекции и видео'></input>
		<input type='submit' onclick='thisScenario2(); return false' value='Начать запись лекции с уже готовым видео'></input>
		<!--<input type='submit' onclick='thisScenario3(); return false' value='Начать запись лекции и видео на два экрана'></input> (В ходе разработки) -->
	</div>
	<div id='scenarioSlides'>
	</div>
	</section>
	<script type="text/javascript" src="js/script.js"></script>
	<script type="text/javascript">
		var masTypesDemo = '<?php echo json_encode($masTypesDemo);?>';
		masTypesDemo = JSON.parse(masTypesDemo);
	
		var masSlides='<?php echo json_encode($masNumberSlide);?>';
		masSlides = JSON.parse(masSlides);
		
		var masIconSlides='<?php echo json_encode($masIconSlide);?>';
		masIconSlides = JSON.parse(masIconSlides);
		var masType='<?php echo json_encode($masType);?>';
		masType = JSON.parse(masType);
		var masScenario='<?php echo json_encode($masNumberScenario);?>';
		masScenario = JSON.parse(masScenario);
		var url = '../repository/';
		var url2 = '../files/';
		
		var numberLection = <?php echo $numberLection; ?>;
		showSlides();
		
	</script>
</body>
</html>