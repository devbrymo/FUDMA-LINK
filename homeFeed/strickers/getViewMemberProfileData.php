<?php 

	include("../../strickers/dbCon.php");
		session_start();
		$sql="SELECT * FROM members WHERE memberId={$_SESSION["viewMemberId"]}";
		$post=mysqli_query($connection,$sql);
		$post=mysqli_fetch_array($post);
		$output=json_encode($post);
		echo $output;
	
	mysqli_close($connection);

	

?>
