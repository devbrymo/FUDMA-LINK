<?php 

	include("../../strickers/dbCon.php");
	session_start();
	$feedId=$_GET["feedId"];
	
		
		$sql="SELECT * FROM postFeed  WHERE feedId={$feedId}";
		$post=mysqli_query($connection,$sql);
		$post=mysqli_fetch_array($post);
		$output=json_encode($post);
		echo $output;
		
	mysqli_close($connection);

	

?>
