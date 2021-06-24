<?php #Login Validation
include("../../strickers/dbCon.php");
		
		$accessKey=$_POST["password"];
		
		$query="SELECT memberId,userName,profilePic,fullName FROM members WHERE userName='FUDMA_LINK' AND accessKey='{$accessKey}'";
		$sql=mysqli_query($connection,$query);
		
		if(mysqli_num_rows($sql)>0){
			$data=mysqli_fetch_array($sql);
			session_start();
			$_SESSION["loginId"]=$data["memberId"];
			$_SESSION["userName"]=$data["userName"];	
			$_SESSION["profilePic"]=$data["profilePic"];	
			$_SESSION["fullName"]=$data["fullName"];
			$data=json_encode($data);
			echo $data;	
		}
		else {echo 1;}
			
mysqli_close($connection);
	
 ?>