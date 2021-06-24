<?php 

	include("../../strickers/dbCon.php");
	session_start();
	$feedId=$_POST["feedId"];
	
		$query=mysqli_query($connection,"SELECT feedLike FROM postFeed WHERE feedId={$feedId}");
		$like=mysqli_fetch_array($query);
		$like=$like["feedLike"];
		
		$sql1="SELECT * FROM feedLikes WHERE loverId={$_SESSION["loginId"]} AND postFeedId={$feedId}";
		$sql2="DELETE FROM feedLikes WHERE loverId={$_SESSION["loginId"]} AND postFeedId={$feedId}";
		$sql4="INSERT INTO feedLikes (postFeedId,loverId,loverUsername,profilePic) VALUES ({$feedId},{$_SESSION["loginId"]},'{$_SESSION["userName"]}','{$_SESSION["profilePic"]}')";
		
		$post1=mysqli_query($connection,$sql1);
		
		if(mysqli_num_rows($post1)>0){
			$like--;
			$sql3="UPDATE postFeed SET feedLike={$like} WHERE feedId={$feedId} ";		
			$post2=mysqli_query($connection,$sql3);
			$post3=mysqli_query($connection,$sql2);
			if(($post2)&&($post3)){echo "minus";} else{echo 1; }
		}
		else{
			$like++;
			$sql3="UPDATE postFeed SET feedLike={$like} WHERE feedId={$feedId} ";
			$post2=mysqli_query($connection,$sql4);
			$post3=mysqli_query($connection,$sql3);
			if(($post2)&&($post3)){echo "add";} else{echo 1; }
		}
		
		
		
		
	
	mysqli_close($connection);

	

?>
