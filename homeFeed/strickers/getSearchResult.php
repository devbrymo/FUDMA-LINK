<?php 

	include("../../strickers/dbConPDO.php");
	session_start();
	$searchWord=$_GET["searchWord"];
	$searchKey=$_GET["searchKey"];
	
	$countStart=$_GET["countStart"];
	$countStop=$_GET["countStop"];
	
	$sql1="SELECT * FROM postFeed  WHERE feedText LIKE '%$searchWord%' ORDER BY feedId DESC LIMIT $countStart,$countStop";
	$sql2="SELECT memberId,userName, profilePic FROM members WHERE (userName LIKE '%$searchWord%') ";
	$sql2.="OR (fullName LIKE '%$searchWord%') OR (phoneNumber LIKE '%$searchWord%') ";
	$sql2.="ORDER BY memberId ASC LIMIT $countStart,$countStop";
	
	if($searchKey=="posts"){$searchQuery=$sql1;}
	if($searchKey=="friends"){$searchQuery=$sql2;}
	
		$conn=connect();
		$result = $conn->query($searchQuery);
		$result= $result->fetchAll();
		$output=json_encode($result);
		echo $output;
		
	disconnect($conn);

	

?>
