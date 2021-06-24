<?php 

	include("../../strickers/dbConPDO.php");
	
		$countStart=$_GET["countStart"];
		$sql="SELECT * FROM deptList LIMIT {$countStart},20 ";
		$conn=connect();
		$result = $conn->query($sql);
		$result= $result->fetchAll();
		$output=json_encode($result);
		echo $output;
		
	disconnect($conn);

	

?>
