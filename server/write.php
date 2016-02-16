<?php 
 function writeData($path, $mode, $data){
	$fp = fopen($path, $mode);
	$retries = 0;
	$max_retries = 20;
	do {
		if ($retries > 0) {
			usleep(rand(1, 10000));
		}
		$retries += 1;
	}while (!flock($fp, LOCK_EX) and $retries <= $max_retries);
	if ($retries == $max_retries) {
		return false;
	}
	fwrite($fp, $data."\n");
	fflush($fp);
	flock($fp, LOCK_UN);
	fclose($fp);
	return true;
}
error_reporting(0);
try{
	$content = file_get_contents("php://input");
	$error = error_get_last();  
	if($error['message']){
		throw new Exception($error['message']);
	}
	if($content != ""){
		if(writeData("../data/experiment2_result.txt", "a", $content)){
			echo 1;
			// echo "Fail. Please submit one more time.";
		}
		else{
			echo 0;
		}
	}
}
catch(Exception $e){
	// exit('禁止访问'); 
	echo $e->getMessage();
}
?>

