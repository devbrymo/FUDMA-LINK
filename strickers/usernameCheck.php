<?php #Login Validation
	
include("dbCon.php");

		$username=$_GET["username"];
		$query="SELECT userName FROM members WHERE userName='{$username}'";
		
		$sql=mysqli_query($connection,$query);
		
		if(mysqli_num_rows($sql)>0){echo 1;}
		else {echo 0;}
			
mysqli_close($connection);
			

 ?>