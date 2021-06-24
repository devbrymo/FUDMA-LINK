<?php 

	include("../../strickers/dbCon.php");
	session_start();
		
		date_default_timezone_set("Africa/Lagos");
		$contact=str_replace("'", "\'",$_POST["contact"]);
		$message=str_replace("'", "\'",$_POST["message"]);	
		$fullname=str_replace("'", "\'",$_POST["fullname"]);	
		$date=date('Y-m-d H:i:s');
		
		$sql="INSERT INTO report (fullName, contact ,message, datePosted) ";
		$sql.=" VALUES ('{$fullname}','{$contact}','{$message}','{$date}') ";
	
		$post=mysqli_query($connection,$sql);
		
		
		if($post){echo 0;} else {echo 1;}
		
	mysqli_close($connection);

	

?>
