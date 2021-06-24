<?php 

	include("../../strickers/dbConPDO.php");
	session_start();
	$feedId=$_GET["feedId"];
		
		$sql="SELECT * FROM feedComment WHERE postFeedId={$feedId}";
		$conn=connect();
		$result = $conn->query($sql);
		$result= $result->fetchAll();
		$output=json_encode($result);
		echo $output;
		
	disconnect($conn);

	

?>
