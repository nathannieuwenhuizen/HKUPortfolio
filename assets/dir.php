var files = <?php $out = array();
	foreach (glob('./selfImage/*.jpg') as $filename) {
		$p = pathinfo($filename);
		$out[] = $p['filename'];
	}
	echo json_encode($out);
?>

var viewCount = <?php 
	$views = file_get_contents("views.txt");
	$views += 1;
	file_put_contents("views.txt", $views);
	echo $views;
?>
