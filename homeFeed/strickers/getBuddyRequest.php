<?php 

	include("../../strickers/dbConPDO.php");
	session_start();
	$myId=$_SESSION["loginId"];
		
	$sql="SELECT a.memberId, a.userName, a.profilePic FROM members a, buddies b ";
	$sql.="WHERE b.accepterId ={$myId} AND b.requesterId = a.memberId AND b.status=0";

		$conn=connect();
		$result = $conn->query($sql);
		$result= $result->fetchAll();
		$output=json_encode($result);
		echo $output;
		
	disconnect($conn);

	

?>
