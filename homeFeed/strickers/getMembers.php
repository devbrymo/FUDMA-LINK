<?php 
	
include("../../strickers/dbConPDO.php");
session_start();
	$countStart=$_GET["countStart"];
	$countStop=$_GET["countStop"];
	
	$query="SELECT memberId,userName, profilePic FROM members WHERE memberId !={$_SESSION["loginId"]} ORDER BY memberId ASC LIMIT $countStart,$countStop";
			
	$conn = connect();
	$result = $conn->query($query);
	$result = $result->fetchAll();
	$result = json_encode($result);
	echo $result;
	
	disconnect($conn);
			

 ?>