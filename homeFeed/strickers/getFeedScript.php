<?php 

	include("../../strickers/dbConPDO.php");
	session_start();
	$countStart=$_GET["countStart"];
	$countStop=$_GET["countStop"];
		
		$sql="SELECT * FROM postFeed  ORDER BY feedId DESC LIMIT $countStart,$countStop";
		$conn=connect();
		$result = $conn->query($sql);
		$result= $result->fetchAll();
		$output=json_encode($result);
		echo $output;
		
	disconnect($conn);

	

?>
