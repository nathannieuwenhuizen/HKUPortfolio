var files = <?php $out = array();
	foreach (glob('./selfImage/subs/*.*') as $filename) {
		$p = pathinfo($filename);
		if ( $p['extension'] === 'jpg' ||  $p['extension'] === 'png') {
			$out[] = $p['filename'] . '.' . $p['extension'];
		} 
	}
	echo json_encode($out);
?>
<!-- var selfFiles = <?php $out = array();
	foreach (glob('./selfImage/subs/*.jpg') as $filename) {
		$p = pathinfo($filename); 
		$out[] = $p['filename'];
	}
	echo json_encode($out);
?> -->
