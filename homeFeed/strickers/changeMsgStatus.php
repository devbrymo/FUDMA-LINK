<?php 

	include("../../strickers/dbCon.php");
	session_start();
	$loginUser=$_SESSION["loginId"];
	$chatBuddy=$_SESSION["chatWithId"];
	$count=0;
	
	$sql="SELECT senderId, receiverId, message ";
	$sql.="FROM buddyChat  WHERE ((senderId={$loginUser} AND receiverId={$chatBuddy}) ";
	$sql.="OR (senderId={$chatBuddy} AND receiverId={$loginUser})) AND status=0 ";
	
	$updateStatus="UPDATE buddyChat SET status=1 WHERE receiverId={$loginUser} AND senderId={$chatBuddy}";
	
	$post=mysqli_query($connection,$sql);
	if($post){
		while($getData=mysqli_fetch_array($post)){if($loginUser==$getData["receiverId"]){$count++;} }
		if($count>0){
			$post2=mysqli_query($connection,$updateStatus);
			if($post2){echo 0;} else{echo 1;}
			
		}
	} else{echo 1;}

?>
