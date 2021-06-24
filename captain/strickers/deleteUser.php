<?php 

	include("../../strickers/dbCon.php");
	
	$userId=$_POST["userId"];
	
		$sql="DELETE FROM members WHERE memberId={$userId}";
		$post=mysqli_query($connection,$sql);
		if($post){echo 0;} else{echo 1;}
		
	mysqli_close($connection);

	

?>
