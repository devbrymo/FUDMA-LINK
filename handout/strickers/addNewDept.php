<?php 

	include("../../strickers/dbCon.php");
	
		$dept=$_POST["newDept"];
		$check="SELECT * FROM deptList WHERE deptName='$dept'";
		$check=mysqli_query($connection,$check);
	
		if(mysqli_num_rows($check)>0){echo " :Already In List";}
		else{
			$post="INSERT INTO deptList SET deptName='{$dept}'";
			$post=mysqli_query($connection,$post);
			if($post){echo 0;} else{echo mysqli_error($connection);}
		}

	mysqli_close($connection);

?>
