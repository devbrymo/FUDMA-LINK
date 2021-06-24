<?php 

	include("../../strickers/dbCon.php");
	session_start();
	$requesterId=$_SESSION["loginId"];
	$accepterId=$_POST["userId"];;
		
	$sql="UPDATE buddies SET status=1 WHERE (requesterId={$requesterId} AND accepterId={$accepterId})";
	$sql.="OR (requesterId={$accepterId} AND accepterId={$requesterId})";

	$post=mysqli_query($connection,$sql);
		if(!$post){echo mysqli_error($connection);}
	
	
mysqli_close($connection);

	

?>
