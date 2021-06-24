<?php 

	include("../../strickers/dbCon.php");
	session_start();
        date_default_timezone_set("Africa/Lagos");
		$message=str_replace("'", "\'",$_POST["message"]);
		$sender=$_SESSION["loginId"];
		$receiver=$_POST["chatWithId"];
		$date=date('Y-m-d H:i:s');
		
		$sql="INSERT INTO buddyChat (senderId,receiverId,message,datePosted)";
		$sql.=" VALUES ('{$sender}','{$receiver}','{$message}','{$date}')";
		
		$post=mysqli_query($connection,$sql);
		
		
		if($post){echo 0;} else {echo 1 . mysqli_error($connection);}
		
	mysqli_close($connection);

	

?>
