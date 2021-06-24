<?php 

	include("../../strickers/dbCon.php");
		session_start();
		if($_GET["pageInfo"]=="viewMemberProfile"){$id=$_SESSION["viewMemberId"];} else {$id=$_SESSION["loginId"];}

		$sql="SELECT * FROM members WHERE memberId={$id}";
		$post=mysqli_query($connection,$sql);
		$post=mysqli_fetch_array($post);
		$output=json_encode($post);
		echo $output;
	
	mysqli_close($connection);

	

?>
