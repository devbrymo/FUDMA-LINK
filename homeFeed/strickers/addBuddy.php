<?php 
	
include("../../strickers/dbCon.php");
	
	session_start();
	
	$requesterId=$_SESSION["loginId"];
	$accepterId=$_POST["userId"];
	
	$query1="SELECT id FROM buddies WHERE (requesterId={$requesterId} AND accepterId={$accepterId})";
	$query1.="OR (requesterId={$accepterId} AND accepterId={$requesterId})";
	$query2="INSERT INTO buddies (requesterId,accepterId) VALUES ({$requesterId},{$accepterId}) ";
	
	$post1=mysqli_query($connection,$query1);
	if(mysqli_num_rows($post1)>0){}
	else{
		$post2=mysqli_query($connection,$query2);
		if(!$post2){echo mysqli_error($connection);}
	}
	
mysqli_close($connection);			

 ?>