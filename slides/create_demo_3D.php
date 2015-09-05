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
	
	
	//Загрузка 3D демонстраций
	
if ($_POST['type']=='3D')	{
	if (isset($_FILES))	{
		//Иконка
		//Старое имя
		$oldname=$_FILES['demo_object_icon']['name'];
		//директория загрузки
		$uploaddir = "../repository/3D/icons/";
		//имя изображения
		$newName=date('YmdHis').rand(10,100).'.png';
		//путь к изображению
		$uploadfile = "$uploaddir$newName";
		
		//Проверка расширений загружаемых изображений
		if($_FILES['demo_object_icon']['type'] == "image/png" || $_FILES['demo_object_icon']['type'] == "image/jpg" || $_FILES['demo_object_icon']['type'] == "image/jpeg")
		{
			//перемещаем файл из временного хранилища
			if (move_uploaded_file($_FILES['demo_object_icon']['tmp_name'], $uploadfile))
			{
				$iconName=$newName;
				$picFile=$uploadfile;
				echo "<center><br>Файл (".$oldname.") успешно загружен.</center>";
			}
			else
			{
				echo "<center><br>Файл (".$oldname.") не загружен.</center>";
				echo '</div>';
				exit;
			}
		}
		else
		{
			echo "<center><br>В качестве иконок для 3D слайдов можно загружать только изображения в форматах jpg, jpeg и png. Файл (" . $oldname . ") не подходит.</center>";
			echo '</div>';
			exit;
		}
		
		//Текстура
		//Старое имя
		$oldname=$_FILES['demo_object_img']['name'];
		//директория загрузки
		$uploaddir = "../repository/3D/textures/";
		//имя изображения
		$newName=date('YmdHis').rand(10,100).'.png';
		//путь к изображению
		$uploadfile = "$uploaddir$newName";
		
		//Проверка расширений загружаемых изображений
		if($_FILES['demo_object_img']['type'] == "image/png" || $_FILES['demo_object_img']['type'] == "image/jpg" || $_FILES['demo_object_img']['type'] == "image/jpeg")
		{
			//перемещаем файл из временного хранилища
			if (move_uploaded_file($_FILES['demo_object_img']['tmp_name'], $uploadfile))
			{
				$textureName=$newName;
				$textureFile=$uploadfile;
				echo "<center><br>Файл (".$oldname.") успешно загружен.</center>";
			}
			else
			{
				echo "<center><br>Файл (".$oldname.") не загружен.</center>";
				unlink($picFile);
				echo '</div>';
				exit;
			}
		}
		else
		{
			echo "<center><br>В качестве текстур для 3D слайдов можно загружать только изображения в форматах jpg, jpeg и png. Файл (" . $oldname . ") не подходит.</center>";
			unlink($picFile);
			echo '</div>';
			exit;
		}
		
		//Объект
		//Старое имя
		$oldname=$_FILES['demo_object']['name'];
		//директория загрузки
		$uploaddir = "../repository/3D/objects/";
		//имя изображения
		$newName=date('YmdHis').rand(10,100).'.js';
		//путь к изображению
		$uploadfile = "$uploaddir$newName";
		
		//Проверка расширений загружаемых скриптов
		$typeMas=(explode(".", $oldname));
		$typeScript=array_pop($typeMas);
		if($typeScript == 'js')
		{
			//перемещаем файл из временного хранилища
			if (move_uploaded_file($_FILES['demo_object']['tmp_name'], $uploadfile))
			{
				$objectName=$newName;
				echo "<center><br>Файл (".$oldname.") успешно загружен.</center>";
			}
			else
			{
				echo "<center><br>Файл (".$oldname.") не загружен.</center>";
				unlink($picFile);
				unlink($textureFile);
				echo '</div>';
				exit;
			}
		}
		else
		{
			echo "<center><br>В качестве объектов для 3D слайдов можно загружать файлы только в формате js. Файл (" . $oldname . ") не подходит.</center>";
			unlink($picFile);
			unlink($textureFile);
			echo '</div>';
			exit;
		}
	}
	//Автор 
	$autor = $_POST['demo_object_autor'];
	//Название слайда 
	$name = $_POST['demo_object_name'];
	// имя файла демонстрации в виде JSON строки

	$json_str_parameter = $textureName."ꄬ".$objectName; // ꄬ
	//Замена символов
	$comment = str_replace("\r\n",'</br>',$_POST['demo_object_comment']);
	//идентификатор типа демонстрационного объекта
	$typeID = "2";
	//$message = str_replace("\n",'</br>',$_POST['message']); 
	//Добавляем запись в базу
	//$strSQL = "INSERT INTO Slides(type, autor, name, 3Dicon, 3Dtexture, 3Dobject, commentary) VALUES('".$_POST['type']."','".$_POST['autor']."','".$_POST['name']."','".$iconName."','".$textureName."','".$objectName."','".$message."')"; 
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
							'$iconName',
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