<?php
session_start();
$idScenario=$_GET['id'];
$_SESSION['$idScenario']=$idScenario;





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
<title>ML studio: Выбор слайдов для сценария</title>
				<script type="text/javascript" src="../js/jquery-2.1.1.min.js"></script>
					<?php 	for ($i = 0;$i <= count($link_str); $i++) {	?>
								<script type="text/javascript" src="<?php echo $link_str[$i];?>"></script>
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
			<a class="secondNavLink" href='../slides/listSlides.php'>Слайды</a>
			<a id="thisLink2" href='listScenarios.php'>Сценарии</a>
			<a class="secondNavLink" href='../res/listLectureForRes.php'>Запись лекции</a>
			<a class="secondNavLink" href='../addVideo/listLectureForVideo.php'>Добавление видео</a>
			<a class="secondNavLink" href='../timeCorrection/listLectureForCorrection.php'>Синхронизация лекции</a>
			<a class="secondNavLink"  href='../export/listLecture.php'>Экспорт</a>
		</nav>
	</header>
	<div id='workplace'>
		<div id='hub'>
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
													$www = $www + $mas_quantity;
											?>
										</div> 
									</div>
								</div>
			<?php	}	?>
		</div>
		<div id="action">
			<form action='alterSlides.php' method='post'>
				<input type="text" name='idSlide' id='idSlide'></input>
				<input type="submit" name='addSlide' value="Добавить слайд" />
				<input type="submit" name='dropSlide' value="Удалить слайд" />
				</br>
			</form>
		</div>
	</div>
	<div id='result'>
		<div id="slide">
		</div>
		<div id='text'>
		</div>
	</div>
	<script type="text/javascript">
		 var number2D=<?php echo $number2D; ?>;
		 var number3D=<?php echo $number3D; ?>;
		 var jsonType = '<?php echo json_encode($masType);?>';
		 var jsonSlide2D = '<?php echo json_encode($masSlide2D);?>';
		 var jsonTexture3D = '<?php echo json_encode($masTexture3D);?>';
		 var jsonObject3D = '<?php echo json_encode($masObject3D);?>';
		 var jsonComment = '<?php echo json_encode($masComment);?>';
		 var url = '../repository/';
		 var url2 = '../files/';
	 </script>
	<script type="text/javascript" src="js/script.js"></script>
</body>
</html>