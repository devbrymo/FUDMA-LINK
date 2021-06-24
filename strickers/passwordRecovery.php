<?php #Login Validation
	
include("dbCon.php");

	if((isset($_POST["action"]))&&($_POST["action"]=="verifyUser")){
		$user=str_replace("'", "\'", $_POST["user"]);
		$query="SELECT keyQuestion FROM members WHERE userName='{$user}' AND phoneNumber='{$_POST["phone"]}'";
		$sql=mysqli_query($connection,$query);
		
		if(mysqli_num_rows($sql)>0){
			$output=mysqli_fetch_array($sql);
			$output=json_encode($output);
			echo $output;
		}
		else {echo 1;}
	}
	
	if((isset($_POST["action"]))&&($_POST["action"]=="verifyAnswer")){
		$key=str_replace("'", "\'",$_POST["answer"]);
		$key=strtolower($_POST["answer"]);
		$user=str_replace("'", "\'", $_POST["user"]);
		$query="SELECT memberId FROM members WHERE userName='{$user}' AND keyAnswer='{$key}'";
		$sql=mysqli_query($connection,$query);
		
		if(mysqli_num_rows($sql)>0){
			$output=mysqli_fetch_array($sql);
			$output=json_encode($output);
			echo $output;
		}
		else {echo 1;}
	}

		
		
			
mysqli_close($connection);
			

 ?>