<?php
if(isset($_POST["textFeedPost"])){
	$feedType="text";
	$feedText=$_POST["feedText"];
	$date=getTodayDate();
	
	$textFeedSql="INSERT INTO feedContent SET posterId={$_SESSION["loginId"]},posterUsername='{$_SESSION["userName"]}',  "
	."posterPic='{$_SESSION["profilePic"]}',feedType='{$feedType}',feedText='{$feedText}',datePosted='{$date}'";
	
	$post=mysqli_query($connection,$textFeedSql);
	if($post){echo "<script>swal('Success!!', 'Your Post Have Been Uploaded','success')</script>";}
	else{die(mysqli_error($connection));}
	//else{echo "<script>swal('Error!!', 'Unable to post, contact admin','warning')</script>";}
	
	
}
?>

<?php

function getTodayDate(){
	$date_array = getdate();
	$formated_date = $date_array["year"] ."-";
	$formated_date .= $date_array["mon"] . "-";
	$formated_date .= $date_array["mday"];
	$date=$formated_date;
	return $date;
}
?>