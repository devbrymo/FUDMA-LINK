<?php
include("../../strickers/dbCon.php");
session_start();

	if((isset($_POST["action"]))&&($_POST["action"]=="setId")){
		
		$chatWithId=$_POST["chatWithId"]; 
		$_SESSION["chatWithId"]=$chatWithId;
		$date=date('Y-m-d H:i:s');
		
		
		$sql1="SELECT * FROM buddyChatList WHERE (firstBuddy={$_SESSION["loginId"]} AND secondBuddy={$chatWithId} ) ";
		$sql1.="OR (firstBuddy={$chatWithId} AND secondBuddy={$_SESSION["loginId"]} )";
		
		$sql2="UPDATE buddyChatList SET lastActivity='{$date}' WHERE (firstBuddy={$_SESSION["loginId"]} AND secondBuddy={$chatWithId} ) ";
		$sql2.="OR (firstBuddy={$chatWithId} AND secondBuddy={$_SESSION["loginId"]} )";
		
		
		$sql3="INSERT INTO buddyChatList (firstBuddy,secondBuddy,lastActivity) VALUES ({$chatWithId},{$_SESSION["loginId"]},'{$date}')";
		
			$post1=mysqli_query($connection,$sql1);
			//if(!$post1){echo mysqli_error($connection);}
			if(mysqli_num_rows($post1)>0) //Check If Memebers Exist In Chat List
			{
				$post2=mysqli_query($connection,$sql2); //If Found Update LastActivity Data With Current date
				//if($post2){echo 0;}else{echo 1;}
				//if(!$post2){echo mysqli_error($connection);}
			}
			else
			{
				$post3=mysqli_query($connection,$sql3); //If Not Found Insert New Chat List  Data
				//if($post3){echo 0;}else{echo 1;}
				//if(!$post3){echo mysqli_error($connection);}
			}
		
		
		
		
	}
	
	
	if((isset($_GET["action"]))&&($_GET["action"]=="getId")){
		echo "{$_SESSION["chatWithId"]}";
	}
mysqli_close($connection);
?>