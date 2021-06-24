<?php #Get Signup Data And Post To Database
include("dbCon.php");
	
		$date=getTodayDate();
		$fullName=$_POST["fullName"];	
		$userName=$_POST["username"];	
		$password=$_POST["accessKey"];	
		$phone=$_POST["phone"];	
		$keyQuestion=str_replace("'", "\'", $_POST["keyQuestion"]);	
		$keyAnswer=str_replace("'", "\'", $_POST["keyAnswer"]);
		$keyAnswer=strtolower($keyAnswer);
		
		$sql="INSERT INTO members SET userName='{$userName}', accessKey='{$password}',"
		."fullName='{$fullName}', phoneNumber='{$phone}', keyQuestion='{$keyQuestion}',"
		."keyAnswer='{$keyAnswer}', dateAdded='{$date}'";
		$postSql=mysqli_query($connection,$sql);
		if($postSql){echo 0;} else{echo 1;}
	

		function getTodayDate(){
			$date_array = getdate();
			$formated_date = $date_array["year"] ."-";
			$formated_date .= $date_array["mon"] . "-";
			$formated_date .= $date_array["mday"];
			$date=$formated_date;
			return $date;
		}

mysqli_close($connection);
?>