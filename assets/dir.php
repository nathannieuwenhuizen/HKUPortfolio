var files = <?php $out = array();
	foreach (glob('./uploads/*.*') as $filename) {
		$p = pathinfo($filename);
		if ( $p['extension'] === 'jpg' ||  $p['extension'] === 'png') {
			$out[] = $p['filename'] . '.' . $p['extension'];
		} 
	}
	echo json_encode($out);
?>
<!-- var selfFiles = <?php $out = array();
	foreach (glob('./selfImage/*.jpg') as $filename) {
		$p = pathinfo($filename); 
		$out[] = $p['filename'];
	}
	echo json_encode($out);
?> -->
