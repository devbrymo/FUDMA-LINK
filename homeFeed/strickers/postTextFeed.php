<?php
include("../../strickers/dbCon.php");
	session_start();
        date_default_timezone_set("Africa/Lagos");
	$feedType="textFeed";
	$feedText=str_replace("'", "\'", $_POST["text"]);
	$date=date('Y-m-d H:i:s');
	
	$query="INSERT INTO postFeed SET posterId={$_SESSION["loginId"]},posterUsername='{$_SESSION["userName"]}',  "
	."posterPic='{$_SESSION["profilePic"]}',feedType='{$feedType}',feedText='{$feedText}',datePosted='{$date}'";
	
	$post=mysqli_query($connection,$query);
	if($post){echo 0;} else {echo 1;}
mysqli_close($connection);
?>