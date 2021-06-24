<?php 

	include("../../strickers/dbCon.php");
	session_start();
        date_default_timezone_set("Africa/Lagos");
		$feedId=$_POST["feedId"];
		$feedComment=str_replace("'", "\'",$_POST["feedComment"]);
		$date=date('Y-m-d H:i:s');
		$query=mysqli_query($connection,"SELECT feedComment FROM postFeed WHERE feedId={$feedId}");
		$commentCount=mysqli_fetch_array($query);
		$commentCount=$commentCount["feedComment"];
		$commentCount++;
		
		$sql1="INSERT INTO feedComment (postFeedId,commenterId,commenterUsername,comment,datePosted,profilePic)";
		$sql1.="VALUES ({$feedId},{$_SESSION["loginId"]},'{$_SESSION["userName"]}','{$feedComment}','{$date}','{$_SESSION["profilePic"]}')";
		$sql2="UPDATE postFeed SET feedComment={$commentCount} WHERE feedId={$feedId} ";		

		$post1=mysqli_query($connection,$sql1);
		if($post1){
				$post2=mysqli_query($connection,$sql2);
				if($post2){echo 0;}else{echo 1;}
			}
		else{ echo 1;}
		
		
		
	mysqli_close($connection);

	

?>
