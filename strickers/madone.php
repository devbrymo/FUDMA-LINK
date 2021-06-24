<?php 

	
		include("dbCon.php");
		session_start();
		if(isset($_SESSION["loginId"])){
		$query=mysqli_query($connection, "SELECT * FROM members WHERE memberId={$_SESSION["loginId"]}");
		if(mysqli_num_rows($query)>0){echo 0;} else{echo 1;}
		}
		else{echo 1;}
		mysqli_close($connection);
?>
