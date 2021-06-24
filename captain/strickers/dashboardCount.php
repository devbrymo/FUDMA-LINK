<?php 

	include("../../strickers/dbCon.php");
	
		$userCount="SELECT count(*) FROM members";
		$reportCount="SELECT count(*) FROM report";

		$userCount=mysqli_query($connection,$userCount);
		$reportCount=mysqli_query($connection,$reportCount);

		$userCount=mysqli_fetch_array($userCount);
		$reportCount=mysqli_fetch_array($reportCount);

		$output='{"userCount" : "'.$userCount["count(*)"].'","reportCount" : "'.$reportCount["count(*)"].'"}';
		echo $output;

	mysqli_close($connection);

?>

