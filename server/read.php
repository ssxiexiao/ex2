<?php
function genData(){
	$angle = [];
	$data = [];
	for($i = 0; $i < 4; $i++){
		$data []= [];
	}
	for($i = 1; $i <= 24; $i += 4){
		$angle []= [];
		for($j = $i; $j < $i + 4; $j += 1){
			$angle[count($angle)-1] []= $j;
		}
	}
	for($i = 26; $i <= 49; $i += 4){
		$angle []= [];
		for($j = $i; $j < $i + 4; $j += 1){
			$angle[count($angle)-1] []= $j;
		}
	}
	for($i = 0; $i < count($angle); $i++){
		for($k = 0; $k < 8; $k++){
			shuffle($angle[$i]);
			for($j = 0; $j < count($angle[$i]); $j++){
				$data[$j] []= $angle[$i][$j];
			}
		}
	}
	return $data;
}
function readRecord($id, $path, $mode){
	$retries = 0;
	$max_retries = 20;
	$fp = fopen($path, 'r');
	do {
		if ($retries > 0) {
			usleep(rand(1, 10000));
		}
		$retries += 1;
	}while (!flock($fp, LOCK_SH) and $retries <= $max_retries);
	if ($retries == $max_retries) {
		return false;
	}
	$json_string = file_get_contents($path);
	flock($fp, LOCK_UN);
	fclose($fp);

	$fp = fopen($path, $mode);
	$retries = 0;
	do {
		if ($retries > 0) {
			usleep(rand(1, 10000));
		}
		$retries += 1;
	}while (!flock($fp, LOCK_EX) and $retries <= $max_retries);
	if ($retries == $max_retries) {
		return false;
	}

	$json = json_decode($json_string,true);
	if($json == null){
		$json['data'] = [];
	}
	while(count($json['data']) < $id){
		$data = genData();
		for($i = 0; $i < count($data); $i++){
			$json['data'] []= $data[$i];
		}
	}
	$returnData = array('angles' => $json['data'][$id-1], 'id' => $id);
	$returnJson = json_encode($returnData);

	echo $returnJson;
	fwrite($fp, json_encode($json));
	flock($fp, LOCK_UN);
	fclose($fp);
	return true;
}

$dataLog = '../data/experiment2_record.json';
$id = $_GET['id'];
if($id){
	readRecord($id, $dataLog, 'w+');
}
?>