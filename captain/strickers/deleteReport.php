<?php 

	include("../../strickers/dbCon.php");
	
	$reportId=$_POST["reportId"];
	
		$sql="DELETE FROM report WHERE id={$reportId}";
		$post=mysqli_query($connection,$sql);
		if($post){echo 0;} else{echo 1;}
		
	mysqli_close($connection);

	

?>
