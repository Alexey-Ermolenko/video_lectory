<?php
$numberLection=$_GET['id'];
$_SESSION['$numberLection']=$numberLection;
//include "homepage.php";
include "createJSON.php";
include "createName.php";
include "about.php";

$html = '
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<link rel="stylesheet" href="css/styles.css" type="text/css">
<script type="text/javascript" src="js/three.js"></script>
<script type="text/javascript" src="js/obj2web.js"></script>
<script type="text/javascript" src="js/jquery-2.1.1.min.js"></script>
<script type="text/javascript" src="js/blackborder.js"></script>
<script type="text/javascript" src="js/createActions.js"></script>
<title>ML studio: Лекция</title>
</head>

<body>
	<header>
		<div id="opheader">
			<h1>'.$name.'</h1>
		</div>
	</header>
	<div id="site">
		<div id="videoblock" poster="'.$poster.'";>
			<video id="video">
				<source id="mp4" src="">
				<source id="webm" src="">
			</video>
			<div id="loadblock">
				<img id="load" src="files/load.gif">
			</div>
			<img id="playlink" src="files/play.png" alt="" />
		</div>
		<div id="buttonbar">
			<button id="play"></button>
			<output id="time"></output>
			<input type="range" id="videoRange">
			<output id="fullTime"></output>

			<ul id="menu">
				<li><button id="videoClass">&#9784</button>
					<ul id="submenu">
					</ul>
				</li>
			</ul>


			<input type="range" id="audioRange">
			<button id="audioFull"></button>
		</div>     
	</div>
	<div id="slide">
	</div>
	<div id="list">
		<div id="inlist">
			<div id="pictures"></div> 
			<div id="timelist"></div>
		</div>
	</div>
	<canvas id="canvasLoop"></canvas>
	<script type="text/javascript">
		var jsonString = '.json_encode($JSON).';
		var paintString = '.json_encode($JSON2).';
		var info1 = "'.$info1.'";
		var info2 = "'.$info2.'";
		var info3 = "'.$info3.'";
		var info4 = "'.$info4.'";
		var info5 = "'.$info5.'";
		var info6 = "'.$info6.'";
	</script>
	<script type="text/javascript" src="js/script.js"></script>
</body>
</html>';
?>