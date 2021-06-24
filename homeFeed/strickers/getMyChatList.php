<?php 

	include("../../strickers/dbConPDO.php");
	session_start();
	$countStart=$_GET["countStart"];
	$countStop=$_GET["countStop"];
	$myId=$_SESSION["loginId"];
		
	$sql="SELECT a.memberId, a.userName, a.profilePic, b.firstBuddy	, b.secondBuddy	 ";
	$sql.="FROM members a, buddyChatList b WHERE CASE WHEN b.firstBuddy	 ={$myId} THEN b.secondBuddy = a.memberId ";
	$sql.="WHEN b.secondBuddy ={$myId} THEN b.firstBuddy = a.memberId END ";
	$sql.="ORDER BY lastActivity DESC LIMIT {$countStart} , {$countStop}";
	$conn=connect();
		$result = $conn->query($sql);
		$result= $result->fetchAll();
		$output=json_encode($result);
		echo $output;
		
	disconnect($conn);

	

?>
