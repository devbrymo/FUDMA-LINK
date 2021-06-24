<?php 
/*
	include("../../strickers/dbCon.php");
	session_start();
	//$loginUser=$_SESSION["loginId"];
	//$chatBuddy=$_POST["memberId"];
	$loginUser=1;
	$chatBuddy=4;
		
	$sql="SELECT count(*) FROM buddyChat WHERE ";
	$sql.="(receiverId={$loginUser} AND senderId={$chatBuddy}) AND status=0";
	
	$post=mysqli_query($connection,$sql);
	$post=mysqli_fetch_array($post);
	echo $post["count(*)"];
	
	mysqli_close($connection);
*/
?>


<?php 

	include("../../strickers/dbConPDO.php");
	session_start();
	$loginUser=$_SESSION["loginId"];
	//$chatBuddy=$_POST["memberId"];
	//$loginUser=1;
	//$chatBuddy=4;
	
		
	$sql="SELECT id,senderId,receiverId,status FROM buddyChat WHERE ";
	$sql.="receiverId={$loginUser} AND status=0";
	
	$conn=connect();
	$result = $conn->query($sql);
	$result= $result->fetchAll();
	$output=json_encode($result);
	echo $output;
		
	disconnect($conn);

?>
