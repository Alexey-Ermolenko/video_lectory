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
	$libs_array = array();
	$libs_array_count = 0;
	while ($lib_row = $result1->fetch_assoc()) {
		$libs_array[$libs_array_count] = ($lib_row['library_file_links']);
		$link_str =  $link_str. $libs_array[$libs_array_count];
		$libs_array_count++;
	}
	$link_str  = explode(";", $link_str);	
	
	////////////
	$count_demo_types = $mysqli->query("SELECT COUNT(1) FROM `DemonstrationsTypes`");	
		while ($row = $count_demo_types->fetch_assoc()) {
			$type_count = $row["COUNT(1)"];
		}
		
	$demo_numbers = Array();
	$quantity = 0;	
?>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link rel="stylesheet" href="css/styles.css" type="text/css">
	<title>Мультимедиа лекторий: Загрузка файлов</title>		
		<script type="text/javascript" src="../js/jquery-2.1.1.min.js"></script>
			<?php 	for ($i = 0;$i <= count($link_str); $i++) {	?>
						<script type="text/javascript" src="<?php echo $link_str[$i];?>"></script>
			<?php 	}	?>
</head>
<body>
	<header>
		<div id='opheader'>
			<center><h1>Мультимедиа лекторий: Загрузка файлов</h1></center>
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
		<div id='slides'>
					<?php	while ($row = $result->fetch_assoc()) {		?>
								<p><?php 	echo $row["name"];	?></p>
								<div id="list">
									<div id="inlist">
										<div id="slides_list">
											<?php	
													$quantity++;
													
													$demo_type = $row["name"]; 
													include "add_". $row["name"]. ".php";
													
													$demo_numbers[$quantity] = "number_". $demo_type; 
													
													//echo $demo_numbers[$quantity];
													//echo " = ";
													//echo $mas_quantity;
													
													$www = $www + $mas_quantity;
											?>
										</div> 
									</div>
								</div>
					<?php	}	?>
			
			
		
			<a href='newSlide.php' class='links'>Создать новый слайд</a>
			<p></p>
		</div>
		<div id='slide'>
		</div>
		<div id='text'>
		</div>
	</article>

	<script type="text/javascript">
		var types_count = <?php echo $type_count; ?>;
		
		for (i = 1; i <= types_count; i++) {
			
		}
		
		var jsonComment = '<?php echo json_encode($masComment);?>';
		jsonComment = JSON.parse(jsonComment);
	/*
		var number2D=<?php echo $number2D; ?>;
		var number3D=<?php echo $number3D; ?>;
		var w = 172 * number2D;
		document.getElementById('inlist').style.width = w;
		var w = 172 * number3D;
		document.getElementById('inlist2').style.width = w;
		var jsonType = '<?php echo json_encode($masType);?>';
		if (number2D>0)
		{
			var jsonSlide2D = '<?php echo json_encode($masSlide2D);?>';
		}
		if (number3D>0)
		{
			var jsonTexture3D = '<?php echo json_encode($masTexture3D);?>';
			var jsonObject3D = '<?php echo json_encode($masObject3D);?>';
		}
		var jsonComment = '<?php echo json_encode($masComment);?>';
		var url = '../repository/';
		jsonType = JSON.parse(jsonType);
		if (number2D>0)
		{
			jsonSlide2D = JSON.parse(jsonSlide2D);
		}
		if (number3D>0)
		{
			jsonTexture3D = JSON.parse(jsonTexture3D);
			jsonObject3D = JSON.parse(jsonObject3D);
		}
		jsonComment = JSON.parse(jsonComment);
	*/
	</script>
	<script type="text/javascript" src="js/script.js"></script>
</body>
</html>