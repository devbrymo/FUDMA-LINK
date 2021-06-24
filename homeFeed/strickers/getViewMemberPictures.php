<?php 

	include("../../strickers/dbConPDO.php");
	session_start();
		
		$sql="SELECT feedUrl FROM postFeed WHERE posterId={$_SESSION["viewMemberId"]} AND feedType='imageFeed' ";
		$conn=connect();
		$result = $conn->query($sql);
		$result= $result->fetchAll();
		$output=json_encode($result);
		echo $output;
		
	disconnect($conn);

	

?>
