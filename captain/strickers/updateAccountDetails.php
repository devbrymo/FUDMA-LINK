<?php 

	
		include("../../strickers/dbCon.php");
		session_start();
		
		$currKey=str_replace("'", "\'", $_POST["accesskey1"]);
		$key=str_replace("'", "\'", $_POST["accesskey2"]);
		//$email=str_replace("'", "\'", $_POST["email"]);
		
		$sql="SELECT accessKey FROM members WHERE memberId={$_SESSION["loginId"]} AND accessKey='{$currKey}'  ";
		$query=mysqli_query($connection, $sql);
		
		if(mysqli_num_rows($query)>0){
			$sql="UPDATE members SET  accessKey='{$key}' WHERE memberId={$_SESSION["loginId"]} AND accessKey='{$currKey}'";
			$query=mysqli_query($connection, $sql);
			if($query){echo 0;} else{echo "Unknown Error";}
		}
		else{echo "Incorrect Password"; }
		
			
			
		

		mysqli_close($connection);

	
?>

