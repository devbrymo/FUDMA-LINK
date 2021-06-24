<?php 

	include("../../strickers/dbConPDO.php");
	session_start();
	$sender=$_SESSION["loginId"];
	$receiver=$_GET["chatWithId"];
		
	$sql="SELECT a.memberId, a.userName, b.senderId, b.receiverId, b.message, b.datePosted ";
	$sql.="FROM members a,buddyChat b WHERE ((b.senderId={$sender} AND b.receiverId={$receiver}) ";
	$sql.="OR (b.senderId={$receiver} AND b.receiverId={$sender})) AND a.memberId={$receiver}  ";
	
	$conn=connect();
		$result = $conn->query($sql);
		$result= $result->fetchAll();
		$output=json_encode($result);
		echo $output;
		
	disconnect($conn);

	

?>
