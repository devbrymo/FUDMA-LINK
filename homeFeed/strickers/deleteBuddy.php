<?php 

	include("../../strickers/dbCon.php");
	session_start();
	$buddyId=$_POST["buddyId"];
	$myId=$_SESSION["loginId"];
	
	
		
		$sql1="DELETE FROM buddies WHERE (requesterId={$buddyId} AND accepterId={$myId}) ";
		$sql1.="OR (requesterId={$myId} AND accepterId={$buddyId})";
		
		$sql2="DELETE FROM buddyChatList WHERE (firstBuddy={$buddyId} AND secondBuddy={$myId}) ";
		$sql2.="OR (firstBuddy={$myId} AND secondBuddy={$buddyId})";
		
		$sql3="DELETE FROM buddyChat WHERE (senderId={$buddyId} AND receiverId={$myId}) ";
		$sql3.="OR (senderId={$myId} AND receiverId={$buddyId})";
		
		$post1=mysqli_query($connection,$sql1);
		$post2=mysqli_query($connection,$sql2);
		$post3=mysqli_query($connection,$sql3);
		
		if(($post1)&&($post2)&&($post3)){echo 0;} else{echo 1;}
		
	mysqli_close($connection);

	

?>
