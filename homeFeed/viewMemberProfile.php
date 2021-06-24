<?php 
include("../strickers/dbCon.php"); 
include("functionLib.php");
session_start();
if(isset($_GET["member"])){$user=$_GET["member"]; $_SESSION["viewMemberId"]=$_GET["member"]; } else {header("Location: index"); exit(); }
$userData=getMemberData($connection,$user);
?>
<html>
<head>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta property="og:type" content="website" />
  	<meta property="og:title" content="Fudma Link: <?php echo $userData["fullName"]; ?>" />
  	<meta property="og:description" content="Join <?php echo $userData["userName"]; ?> At Fudma Link, The Home For All Fudma Students." />
  	<meta property="og:url" content="http://www.fudmalink.tk" />
  	<meta property="og:image" content="http://www.fudmalink.tk/homeFeed/<?php echo str_replace("../", "", $userData["profilePic"]); ?>" />
  	<meta property="og:image:width" content="1200" />
  	<meta property="og:image:height" content="680" />
  	<meta property="og:image" content="http://www.fudmalink.tk/homeFeed/<?php echo str_replace("../", "", $userData["profilePic"]); ?>" />
  	<meta property="og:image:width" content="200" />
  	<meta property="og:image:height" content="200" />
	<title>FUDMA LINK</title>
	
    <!--Bootstrap Css-->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="../bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="../css/colors.css" rel="stylesheet">
    <link href="../css/CssBox.css" rel="stylesheet">
    <link href="css/feedDesign.css" rel="stylesheet">
    <link href="css/mainProfileDesign.css" rel="stylesheet">
  	<link rel="icon" href="image/favicon.ico" type="image/x-icon">
  	<style>#loader{display:none;}</style>
</head>

<body>
	
<div class="container bootstrap snippet">
<div class="row">
		<!-- BEGIN USER PROFILE -->
		<div class="col-md-12">
			<div class="grid profile">
				<div class="grid-header">
				<div>
				<?php	
					
					echo '<img id="profilePicHead" src="'.str_replace("../","",$userData["profilePic"]).'" ';
					echo 'class="img-responsive img-thumbnail  profile-userpic" alt="Profile Pic">';
				?>
				</div>
					
				</div>
				<div class="grid-body">
					<ul class="nav nav-tabs">
						<li class="active"><a href="#profile" data-toggle="tab">Profile</a></li>
						<li class=""><a href="#timeline" data-toggle="tab">Timeline</a></li>
						<li class=""><a href="#photos" data-toggle="tab">Photos</a></li>
						<li class=""><a href="index">Home</a></li>
					</ul>
					<div class="tab-content">
						<!-- BEGIN PROFILE -->
						<div class="tab-pane active" id="profile">
							<p class="lead text-black ">Account Information</p><hr/>
							
							<div class="row">
								<?php

								echo '<div id="profileInfo1" class="col-md-6 text-black">';
								echo ' <p><strong>Username:</strong> '.$userData["userName"].'</p>';
								echo '<p><strong>FullName:</strong> '.$userData["fullName"].'</p>';
								echo '<p><strong>Phone Number:</strong> '.$userData["phoneNumber"].'</p>';
								echo '<p><strong>Address:</strong> '.$userData["address"].'</p>';
								echo '<p><strong>Birth Date:</strong> '.$userData["birthdate"].'</p>';
								echo '</div>';
								echo '<div id="profileInfo2" class="col-md-6 text-black">';
								echo '<p><strong>About:</strong><br/> '.str_replace("\n", "<br />", $userData["aboutme"]).'</p>';
								echo '<p><strong>Gender:</strong> '.$userData["gender"].'</p>';
								echo '<p><strong>Home Town:</strong> '.$userData["hometown"].'</p>';
								echo '<p><strong>Language:</strong> '.$userData["language"].'</p>';
								echo '<p><strong>Joined on:</strong> '.$userData["dateAdded"].'</p>';
		
								echo '</div>';
								
							?>
							</div>
							
						</div>
						<!-- END PROFILE -->
						
						<!-- BEGIN TIMELINE -->
						<div class="tab-pane" id="timeline">
							<p class="lead text-black ">Posts</p>
							<!--FEED POST-->
			
							<div id="#top"></div>
							<center><img id="loader" src="img/loader.gif" /></center><br/>
							<div id="feedDesignContainer"><?php echo getContent($user); ?></div>
							<center>
							<a class="btn btn-primary btn-sm" style="border-radius:10px; width:70%" href="#top" id="showNextFeed">
							Load More</a></center>
							<div class="top-10"></div>
							
						</div>
						<!-- END TIMELINE -->
						<!-- BEGIN PHOTOS -->
						<div class="tab-pane" id="photos">
							<p class="lead text-black">Photos</p>
							<hr>
							<div class="row">
								<div class="col-md-12">
									<div class="popup-gallery" id="photoContainer"><?php echo getMemberPhotos($connection,$user); ?></div>
									<br>
								</div>
							</div>
						</div>
						<!-- END PHOTOS -->
						
					</div>
				</div>
			</div>
		</div>
		<!-- END USER PROFILE -->
	</div>
</div>

<div id="pageInfo" class="hidden">viewMemberProfile</div>

	<script src="../bootstrap/js/jquery.min.js"></script>
	<script src="../bootstrap/js/bootstrap.js"></script>
	<script src="../js/sweetalert.min.js"></script>
	<script src="../js/moment.js"></script>
	<script src="js/homeFeeds.js?v=g"></script>
	<!--script src="js/viewMemberJquery.js"></script>
	<script src="js/viewMemberFunctions.js"></script-->

</body>
</html>

<?php 
function getContent($user){
	include("../strickers/dbCon.php");
	$i=0;
	$content='';
	$text='';
	$sql="SELECT * FROM postFeed WHERE posterId=$user ORDER BY feedId DESC LIMIT 0,20";
	$post=mysqli_query($connection,$sql);
	if(mysqli_num_rows($post)>0){
	while($data=mysqli_fetch_array($post)){
		$text='<div class="well well-sm"><div class="box box-widget"><div class="box-header with-border"><div class="user-block">';
		$text.='<img class="img-circle imgContainer" src="'.str_replace("../","",$data["posterPic"]).'" alt="User Image">';
		$text.='<span class="username"><a href="viewMemberProfile?member='.$data["posterId"].'">'.$data["posterUsername"].'</a></span>';
		$text.='<span class="description">'.date('m/d/Y g:iA', strtotime($data["datePosted"])).'</span></div></div>';

		$text.='<div class="box-body" style="display: block;">';
		if($data["feedType"]=="imageFeed"){
		$text.='<div class="pad-10"><center><img  class="imgFeed img-responsive img-thumbnail" src="'.str_replace("../","",$data["feedUrl"]).'" alt="Photo" /></center></div>';}
		$text.='<p class="well well-sm">'.str_replace("\n","<br/>",$data["feedText"]).'</p>';
							  
		$text.='<button id="likeBtn'.$i.'" onclick="likePost('.$data["feedId"].','.$data["feedLike"].','.$i.')" type="button" class="btn btn-danger btn-xs"><i class="glyphicon glyphicon-thumbs-up"></i> Like <span id="likeBtnCount'.$i.'">'.$data["feedLike"].'</span></button>';
		$text.=' <a href="viewLike?post='.$data["feedId"].'" class="btn btn-success btn-xs">View <i class="glyphicon glyphicon-heart"></i></a>';
		$text.=' <a href="viewComments?post='.$data["feedId"].'" class="btn btn-info btn-xs"><i class="glyphicon glyphicon-comment"></i> View</a>';
		$text.='<span id="feedCommentContainer'.$i.'" class="pull-right text-muted"><span id="feedCommentCount'.$i.'">'.$data["feedComment"].'</span> Comments</span></div>';
							
		$text.='<div class="box-footer" style="display: block;">';
		if(isset($_COOKIE["loginPic"])){
		$text.='<img class="img-responsive img-circle imgContainer img-sm" id="memberCommentPic'.$i.'" src="'.str_replace("../","",$_COOKIE["loginPic"]).'" alt="Alt Text">'; }
		else {$text.='<img class="img-responsive img-circle imgContainer img-sm" id="memberCommentPic'.$i.'" src="profilePic/default.png" alt="Alt Text">'; }
		$text.='<div class="img-push">';
		$text.='<div class="input-group ">';
		$text.='  <input id="newComment'.$i.'" onkeyup="checkChar(\'newComment'.$i.'\')" maxlength="500" type="text" class="form-control input-sm" placeholder="Your comment">';
		$text.='<span class="input-group-btn"><button id="commentBtn'.$i.'" onclick="addComment('.$data["feedId"].','.$data["feedComment"].','.$i.')" class="btn btn-sm btn-primary" type="button">Post</button></span>';
		$text.='</div></div></div></div></div>';
		$content=$content . $text;
		$i++;
		
	}} else{$content='<div class="alert alert-info">Opps!!, No Posts To Display</div>';}
	return $content;
	mysqli_close($connection);
}	
?>
