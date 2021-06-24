<?php 

	include("../../strickers/dbConPDO.php");
	session_start();
		
		if($_GET["pageInfo"]=="viewMemberProfile"){$id=$_SESSION["viewMemberId"];} else {$id=$_SESSION["loginId"];}
		
		$sql="SELECT feedUrl FROM postFeed WHERE posterId={$id} AND feedType='imageFeed'";
		$conn=connect();
		$result = $conn->query($sql);
		$result= $result->fetchAll();
		$output=json_encode($result);
		echo $output;
		
	disconnect($conn);

	

?>
