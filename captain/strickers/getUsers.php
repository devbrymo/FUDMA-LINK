<?php 

	include("../../strickers/dbConPDO.php");
		$countStart=$_GET["countStart"];
		$countStop=$_GET["countStop"];
		
		$sql="SELECT memberId,userName,phoneNumber,fullName,gender,dateAdded,accessKey ";
		$sql.=" FROM members LIMIT {$countStart},{$countStop}";
		$conn=connect();
		$result = $conn->query($sql);
		$result= $result->fetchAll();
		$output=json_encode($result);
		echo $output;
		
	disconnect($conn);

	

?>
