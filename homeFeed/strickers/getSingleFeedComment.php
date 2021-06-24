<?php 

	include("../../strickers/dbCon.php");
	
	$feedId=$_GET["feedId"];
	
	
		$sql="SELECT * FROM feedComment WHERE postFeedId={$feedId}";
		$post=mysqli_query($connection,$sql);
		$post=mysqli_fetch_array($post);
		$output=json_encode($post);
		echo $output;
	
	mysqli_close($connection);

	

?>
