<?php 

	include("../../strickers/dbCon.php");
	session_start();
	$feedId=$_POST["feedId"];
			
		$sql="DELETE FROM postFeed WHERE feedId={$feedId}";
		$post=mysqli_query($connection,$sql);
		if($post){echo 0;} else{echo 1;}
		
	mysqli_close($connection);

	

?>
