<?php

$zip = new ZipArchive;

$res = $zip->open('../repository/archiver/'.$id.'.zip', ZipArchive::CREATE);
if ($res === TRUE) {
    $zip->addFile('css/styles.css', 'lecture/css/styles.css');
    $zip->addFile('js/blackborder.js', 'lecture/js/blackborder.js');
    $zip->addFile('js/createActions.js', 'lecture/js/createActions.js');
    $zip->addFile('js/jquery-2.1.1.min.js', 'lecture/js/jquery-2.1.1.min.js');
    $zip->addFile('js/obj2web.js', 'lecture/js/obj2web.js');
    $zip->addFile('js/script.js', 'lecture/js/script.js');
    $zip->addFile('js/three.js', 'lecture/js/three.js');
    $zip->addFile('../files/play.png', 'lecture/files/play.png');
	$zip->addFile('../files/load.gif', 'lecture/files/load.gif');
	
    include 'createHtml.php';

    $zip->addFromString('lecture/index.php', $html);
    $zip->close();
} else {
    echo 'Ошибка №'.$res;
}
?>