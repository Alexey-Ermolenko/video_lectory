<?php include_once('actions/getLecture.php'); ?>
<!DOCTYPE html>
<html>
<head>
	<!-- META -->
	<title>ML Studio</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	<meta name="description" content="" />
	
	<link rel="shortcut icon" href="lib/kickstart/css/img/favicon.ico">
	<!-- CSS -->
	<link rel="stylesheet" type="text/css" href="lib/kickstart/css/kickstart.css" media="all" />
	<link rel="stylesheet" type="text/css" href="lib/kickstart/css/style.css" media="all" /> 
	
	<!-- Javascript -->
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script type="text/javascript" src="lib/kickstart/js/kickstart.js"></script>
</head>
<body>

<nav class="navbar">
<!-- <a class="hide-phone" id="logo" href="http://lectory.nsuem.ru"><i class="fa fa-angle-right"></i>NSUEM</a>
 -->

	<ul>
		<li><a href="http://lectory.nsuem.ru"><span>ML</span>Studio</a></li>
		<!-- <li><a href="http://www.99lime.com/uikit/"><span>UI</span>KIT</a></li>
		<li><a href="http://www.99lime.com/blog/">Blog</a></li>-->
	</ul>
</nav>

<!-- ===================================== END HEADER ===================================== -->

<div class="callout callout-top clearfix">
	<div class="grid">
		<div class="col_12 column">
			<img class="align-left" src="lib/kickstart/css/img/books.png" /> 
			<h3 >Мультимедиа лекторий НГУЭУ</h3>
			<h5 >Портал веб-лекций с расширенным демонстрационным рядом и возможностью как просмотра онлайн, так и скачивания файлов для воспроизведеня без подключения к Интернет. <br/>  Приятного просмотра!</h5>
		</div>
	</div>
</div>

<div class="grid">

<!--  	<ul class="tabs">
		<li class="current first last"><a href="#lections">Лекции</a></li>
		<li class="last"><a href="#instructions">Лекции</a></li>
	</ul>  

	<div id="lections" class="tab-content clearfix">

		<div>
			<div class="col_4 column">
				<img title="" src="http://placehold.it/400x350/4D99E0/ffffff.png&amp;text=400x350" width="400" height="350">
			</div>			

			<div class="col_8 column">
				<span class="right" style="margin: 10px 0 10px 0; float:right;">
					<span class="icon-level icon-level-1"></span>
				</span>
			
				<h4><a href="demo/index.html?id=1">Мировые финансовые центры</a> <a title="скачать" href=""><i class="fa fa-download"></i></a></h4>
				<h5>Новиков Александр Владимирович</h5>
				<p> Тема лекции – мировые финансовые центры. В лекции подробно объясняется значение и суть понятия финансового центра, описываются меры, предпринимаемые правительством Российской федерации для построения в России финансовых центров, а также рассматриваются возможности и перспективы получения Новосибирском статуса финансового центра. Рассматриваются мероприятия по формированию финансового центра в Новосибирске.</p>
				<p><a href="">#международный финансовый центр</a>, <a href="">#МФЦ</a>, <a href="">#стратегия развития</a>, <a href="">#финансовые инструменты</a>, <a href="">#глобальная конкурентоспособность</a></p>
				<p>Продолжительность лекции: 35:55</p>
				<p>Количество демонстраций: 44</p>
			</div>
		</div>
	</div>
-->
<!-- 	<div class="lecture clearfix">

		<div>
			<div class="col_4 column">
				<img title="" src="http://placehold.it/400x350/4D99E0/ffffff.png&amp;text=400x350" width="400" height="350">
			</div>			

			<div class="col_8 column">
				<span class="right" style="margin: 10px 0 10px 0; float:right;">
					<span class="icon-level icon-level-1"></span>
				</span>
			
				<h4><a href="demo/index.html?id=1">Мировые финансовые центры</a> <a title="скачать" href=""><i class="fa fa-download"></i></a></h4>
				<h5>Новиков Александр Владимирович</h5>
				<p> Тема лекции – мировые финансовые центры. В лекции подробно объясняется значение и суть понятия финансового центра, описываются меры, предпринимаемые правительством Российской федерации для построения в России финансовых центров, а также рассматриваются возможности и перспективы получения Новосибирском статуса финансового центра. Рассматриваются мероприятия по формированию финансового центра в Новосибирске.</p>
				<p><a href="">#международный финансовый центр</a>, <a href="">#МФЦ</a>, <a href="">#стратегия развития</a>, <a href="">#финансовые инструменты</a>, <a href="">#глобальная конкурентоспособность</a></p>
				<p>Продолжительность лекции: 35:55</p>
				<p>Количество демонстраций: 44</p>
			</div>
		</div>
	</div> -->
	
	<?php		
	foreach ($lectArray as $lecture) {

	echo '<div class="lecture clearfix"><div><div class="col_4 column">';

	if ($lecture['poster']) echo '<img title="" src="repository/posters/'.$lecture['poster'].'" width="400">';
		else echo '<img title="" src="lib/kickstart/css/img/instructor.jpg" width="400">';	
						
	echo '</div>';

	echo '<div class="col_8 column">';
	//echo '<span class="right" style="margin: 10px 0 10px 0; float:right;"><span class="icon-level icon-level-1"></span></span>';

	

	if (file_exists($filename='repository/archiver/'.$lecture['id'].'.zip')) echo '<span class="right" style="margin: 10px 0 10px 0; float:right;"><a title="скачать" class="download" href="'.$filename.'"><i class="fa fa-download"></i></a></span>';

	echo '<h4><a href="demo/index.php?id=1">'.$lecture['name'].'</a>';
	echo '</h4>';
				
	if ($lecture['autor']) echo '<h5>'.$lecture['autor'].'</h5>';
	if ($lecture['specification']) echo '<p>'.$lecture['specification'].'</p>';
	if ($lecture['keys']) echo '<a href="">#'.$lecture['keys'].'</a>';
	//if ($lecture['date']) echo '<p>'.$lecture['date'].'</p>';
	
	echo'</div></div></div>';

	/*echo '<div class="span4"><a class="download" href="repository/archiver/'.$row['id'].'.zip"><img src="files/save.png" alt="Save"></a><a class="links" href="demo/index.html?id='.$row['id'].'" target="_blank"><div>'.$img.'<span class="links">'.$row['name'].'</span><span class="links">'.$row['autor'].'</span></div></a></div>';
	*/}

	?>





</div> <!-- End Grid -->


<!-- ===================================== START FOOTER ===================================== -->
<div class="clear"></div>
<div id="footer">
&copy; Copyright 2015 Разработано: <a href="http://nsuem.ru">НГУЭУ</a>, при поддержке <a href="http://www.mmedia.nsu.ru">ЦПП НГУ</a>
</div>

</body>
</html>
