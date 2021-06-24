<?php 

	include("../../strickers/dbCon.php");
		session_start();
		$sql="SELECT memberId,profilePic,userName FROM members WHERE memberId={$_SESSION["loginId"]}";
		$post=mysqli_query($connection,$sql);
		$post=mysqli_fetch_array($post);
		$output=json_encode($post);
		echo $output;
	
	mysqli_close($connection);

	

?>
