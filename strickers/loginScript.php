<?php #Login Validation
include("dbCon.php");

if(isset($_POST["redirectUser"])){ //password recovery login
			
		$data="SELECT memberId,userName,profilePic,fullName FROM members WHERE memberId={$_POST["redirectUser"]}";
		$data=mysqli_query($connection,$data);
		
		if(mysqli_num_rows($data)>0){
			$data=mysqli_fetch_array($data);
			session_start();
			$_SESSION["loginId"]=$data["memberId"];	
			$_SESSION["userName"]=$data["userName"];	
			$_SESSION["profilePic"]=$data["profilePic"];	
			$_SESSION["fullName"]=$data["fullName"];	
			$output=json_encode($data);
			echo $output;	
		}
		else {echo 1;}
		
		mysqli_close($connection);
		exit();
}



		$username=str_replace("'", "\'",$_POST["username"]);
		$accessKey=str_replace("'", "\'",$_POST["password"]);
		
		$query="SELECT memberId,userName,profilePic,fullName FROM members WHERE userName='{$username}' AND accessKey='{$accessKey}'";
		$sql=mysqli_query($connection,$query);
		
		if(mysqli_num_rows($sql)>0){
			$data=mysqli_fetch_array($sql);
			session_start();
			$_SESSION["loginId"]=$data["memberId"];	
			$_SESSION["userName"]=$data["userName"];	
			$_SESSION["profilePic"]=$data["profilePic"];	
			$_SESSION["fullName"]=$data["fullName"];	
			$output=json_encode($data);
			echo $output;
		}
		else {echo 1;}
			
mysqli_close($connection);
			

 ?>