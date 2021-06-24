<?php 
	
		include("../../strickers/dbCon.php");
		
		session_start();
		$fullName=str_replace("'", "\'", $_POST["fullName"]);
		$phoneNumber=str_replace("'", "\'", $_POST["phoneNumber"]);
		$birthdate=str_replace("'", "\'", $_POST["birthdate"]);
		$address=str_replace("'", "\'", $_POST["address"]);
		$about=str_replace("'", "\'", $_POST["about"]);
		$gender=str_replace("'", "\'", $_POST["gender"]);
		$hometown=str_replace("'", "\'", $_POST["hometown"]);
		$language=str_replace("'", "\'", $_POST["language"]);
		$key=str_replace("'", "\'", $_POST["key"]);
		
		$sql="UPDATE members SET fullName='{$fullName}',phoneNumber='{$phoneNumber}',";
		$sql.="birthdate='{$birthdate}',address='{$address}',aboutme='{$about}',";
		$sql.="gender='{$gender}',hometown='{$hometown}',language='{$language}',accessKey='{$key}'";
		$sql.="WHERE memberId={$_SESSION["loginId"]}";
		$query=mysqli_query($connection, $sql);
			
		if($query){
		$sql2=mysqli_query($connection,"SELECT * FROM members WHERE memberId={$_SESSION["loginId"]}");
		$data=mysqli_fetch_array($sql2);
		$data=json_encode($data);
		echo $data;
		} else{echo 1;}

		mysqli_close($connection);

?>

