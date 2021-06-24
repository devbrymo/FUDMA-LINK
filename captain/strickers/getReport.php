<?php 

	include("../../strickers/dbConPDO.php");
	
		
		$sql="SELECT * FROM report";
		$conn=connect();
		$result = $conn->query($sql);
		$result= $result->fetchAll();
		$output=json_encode($result);
		echo $output;
		
	disconnect($conn);

	

?>
