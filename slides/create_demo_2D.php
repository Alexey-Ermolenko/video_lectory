<?php
	session_start();

	ini_set('max_file_uploads', "50");
	ini_set("upload_max_filesize","1000M");
	ini_set("post_max_size","1000M");


	//Параметры
	include "../connectionSettings.php";
	//Соединение
	$link = mysqli_connect($server, $username, $password);
	if (!$link) 
	{
		die(mysqli_connect_error());
	}		
	//utf8
	mysqli_set_charset($link, "utf8");	
	//Выбор базы
	mysqli_select_db($link, $DB) or die(mysqli_error($link));

	echo '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
	echo '<link rel="stylesheet" href="css/styles.css" type="text/css">';
	echo '<div id="backgroundResult">';
	
	
	//Загрузка 2D демонстраций
	
	if($_POST['type']=='2D')	{
		if (isset($_FILES))	{	
			//Старое имя
			$oldname=$_FILES['demo_object_img']['name'];
			//директория загрузки
			$uploaddir = "../repository/2D/icons/";
			//имя изображения
			$newName=date('YmdHis').rand(10,100).'.png';
			//путь к изображению
			$uploadfile = "$uploaddir$newName";
			
			//Проверка расширений загружаемых изображений
			if($_FILES['demo_object_img']['type'] == "image/png" || $_FILES['demo_object_img']['type'] == "image/jpg" || $_FILES['demo_object_img']['type'] == "image/jpeg")	{
				//перемещаем файл из временного хранилища
				if (move_uploaded_file($_FILES['demo_object_img']['tmp_name'], $uploadfile))	{
					$newPage = "../repository/2D/images/" . $newName;
					copy($uploadfile, $newPage);
					echo "<center><br>Файл (".$oldname.") успешно загружен.</center>";
				}	else	{
					echo "<center><br>Файл (".$oldname.") не загружен.</center>";
					echo '</div>';
					exit;
				}
			}	else	{
				echo "<center><br>Можно загружать только изображения в форматах jpg, jpeg и png. Файл (" . $oldname . ") не подходит.</center>";
				echo '</div>';
				exit;
			}
		}
		//Автор 
		$autor = $_POST['demo_object_autor'];
		//Название слайда 
		$name = $_POST['demo_object_name'];
		// имя файла демонстрации 
		$json_str_parameter = $newName;
		//$json_str_parameter = $newName;
		
		//Замена символов
		$comment = str_replace("\r\n",'</br>',$_POST['demo_object_comment']);
		//идентификатор типа демонстрационного объекта
		$typeID = "1";
		//$message = str_replace("\n",'</br>',$_POST['message']); 
		//Добавляем запись в базу
		$strSQL = ("INSERT INTO Demonstrations ( 
							string_parameter, 
							autor, 
							name,
							icon, 
							commentary,
							typeID
					) VALUES (
							'$json_str_parameter',
							'$autor',
							'$name',
							'$newName',
							'$comment',
							'$typeID'
						)");
		mysqli_query($link, $strSQL) or die(mysqli_error($link));
		//Закрытие соединения
		mysqli_close($link);
}
	
	//Сообщение об успехе и ссылки
	echo "<center><br><H2>Слайд успешно сформирован.</H2></center>";
	echo '<p>&nbsp;</p>';
	echo '</div>';
?>