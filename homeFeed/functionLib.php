<?php 

function getMemberData($connection,$user){
	$sql="SELECT * FROM members WHERE memberId={$user}";
	$sql=mysqli_query($connection,$sql);
	$sql=mysqli_fetch_array($sql);
	return $sql;
	mysqli_close($connection);
}	

function getMemberPhotos($connection,$user){
	$pic='';
	$fullPic='';
	$sql="SELECT feedUrl FROM postFeed WHERE posterId={$user} AND feedType='imageFeed'";
	$sql=mysqli_query($connection,$sql);
	if(mysqli_num_rows($sql)>0){
	while($data=mysqli_fetch_array($sql)){
	$pic='<div class="col-md-3 col-lg-3 col-sm-6"> <a title="Your Photo"><img src="'.str_replace("../","",$data["feedUrl"]).'" ';
	$pic.=' class="imgPostFeed img-responsive" width="400" height="300" alt="Photo"></a></div>';
	$fullPic=$fullPic . $pic;
	}} else{$fullPic='<div class="alert alert-info">Opps!!, No Posts To Display</div>';}
	return $fullPic;
	mysqli_close($connection);
}

function getMemberPosts(){
	include("../strickers/dbConPDO.php");
	$sql="SELECT * FROM postFeed WHERE posterId={$_SESSION["loginId"]} ORDER BY feedId DESC LIMIT 0,20";
	$conn=connect();
	$result = $conn->query($sql);
	$result= $result->fetchAll();
	$output=json_encode($result);
	return $output;
	disconnect($conn);
}

?>