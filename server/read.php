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
		for($k = 0; $k < 10; $k++){
			shuffle($angle[$i]);
			for($j = 0; $j < count($angle[$i]); $j++){
				$data[$j] []= $angle[$i][$j];
			}
		}
	}
	return $data;
}
function readRecord($path, $mode){
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
		$json['max_id'] = null;
		$json['unallocated_id'] = [];
		$json['data'] = [];
		$json['unsubmitted_id'] = [];
	}
	if(count($json['unallocated_id']) == 0){
		if($json['max_id'] == null) $json['max_id'] = 4;
		else $json['max_id'] += 4;
		$data = genData();
		if($json['data'] == null) $json['data'] = [];
		for($i = 0; $i < count($data); $i++){
			if($i > 0){
				$json['unallocated_id'] []= $json['max_id'] - 3 + $i;
			}
			$json['data'] []= $data[$i];
			// $json['unsubmitted_id'] []= $json['max_id'] - 3 + $i;
		}
		$returnData = array('angles' => $json['data'][$json['max_id'] - 4], 'id' => $json['max_id'] - 3);
		$returnJson = json_encode($returnData);
		echo $returnJson;
	}
	else{
		$returnData = array('angles' => $json['data'][$json['unallocated_id'][0]-1], 'id' => $json['unallocated_id'][0]);
		$returnJson = json_encode($returnData);
		$json['unallocated_id'] = array_splice($json['unallocated_id'], 1);
		echo $returnJson;
	}
	fwrite($fp, json_encode($json));
	flock($fp, LOCK_UN);
	fclose($fp);
	return true;
}
$dataLog = '../data/experiment2_record.json';
readRecord($dataLog, 'w+');
?>