<?php 

	include("../../strickers/dbConPDO.php");
	session_start();
	$countStart=$_GET["countStart"];
	$countStop=$_GET["countStop"];
	$myId=$_SESSION["loginId"];
		
	$sql="SELECT a.memberId, a.userName, a.profilePic, b.accepterId, b.requesterId ";
	$sql.="FROM members a, buddies b WHERE CASE WHEN b.accepterId ={$myId} THEN b.requesterId = a.memberId ";
	$sql.="WHEN b.requesterId ={$myId} THEN b.accepterId = a.memberId END ";
	$sql.="AND b.status =1 LIMIT {$countStart} , {$countStop}";
	$conn=connect();
		$result = $conn->query($sql);
		$result= $result->fetchAll();
		$output=json_encode($result);
		echo $output;
		
	disconnect($conn);

	

?>
