<?php 
if(isset($_GET["post"])){$post=$_GET["post"];} else{header("Location: index"); exit(); }
?>
<html>
<head>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
	<title>FUDMA LINK</title>
	
    <!--Bootstrap Css-->
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="../bootstrap/css/bootstrap.css" rel="stylesheet" />
 	<link href="../css/colors.css" rel="stylesheet">
    <link href="../css/CssBox.css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="../slideBar/slideBar.css" />
    <link href="css/navDesign.css" rel="stylesheet">
	<link rel="icon" href="image/favicon.ico" type="image/x-icon">
      
</head>

<body class="cbp-spmenu-push">
		<nav class="cbp-spmenu cbp-spmenu-vertical cbp-spmenu-left" id="cbp-spmenu-s1">
		<div id="mobileNav"><?php include("mobileNav.php"); ?></div>
		</nav>
		
		<div id="navContainer" class="visible-md visible-lg "><?php include("navContainer.php"); ?></div>
		<div class="visible-xs visible-sm">
			<nav class="navbar navbar-inverse bg-black navbar-fixed-top ">
			<div class="container">
				<ul class="nav navbar-nav mobile-bar">
				<li><a href="index"><span class="menu-icon glyphicon glyphicon-home"></span>Home</a></li>
				<li><a href="buddies"><span class="menu-icon glyphicon glyphicon-user"></span>Buddy</a></li>
				<li><a href="buddyChat"><span class="menu-icon glyphicon glyphicon-envelope"></span><b id="totalMsgCount"></b> Chat</a></li>
				<li><a href="#" id="showLeft"><span class="menu-icon glyphicon glyphicon-list"></span>More</a></li>
					
				</ul>
			</div>
			</nav>
		</div>
		
		
		
	<div class="container-fluid">
		<div class="row">
		<!--FIRST-->
			<div class="col-lg-3 col-md-3 visible-lg visible-md sidebar mainColor" style=" height:100%;">
			<div id="leftNav"><?php include("leftNav.php"); ?></div>
			</div>
			<!--SECOND-->
			<div class="col-lg-6 col-md-6  col-lg-offset-3 col-md-offset-3 main">
			
			<ul class="list-group">
			  <li class="list-group-item active">People Who Like This Post</li>
			  <?php echo getPostLike($post); ?>
			</ul>
			</div>
			<!--THIRD-->
			<div class="col-lg-3 col-md-3 visible-lg visible-md  rightSidebar mainColor" style=" height:100%;">
			<div id="rightNav"><?php include("rightNav.php"); ?></div>
			</div>
		
		</div>
		
	</div>
<!--BODY FOOTER-->
	<div id="footer"><?php include("footer.php"); ?></div>
	<div id="pageInfo" class="hidden">viewLike</div>

		<script src="../bootstrap/js/jquery.min.js"></script>
		<script src="../bootstrap/js/bootstrap.js"></script>
		<script src="js/homeFeeds.js"></script>
		<script src="slideBar/slideBar.custom.js"></script>
		<script src="../slideBar/slideBar.js"></script>

		<!--script src="js/viewLikeJquery.js"></script>
		<script src="js/viewLikeFunctions.js"></script-->
</body>
</html>
<?php
function getPostLike($post){
	include("../strickers/dbCon.php"); 
	$text='';
	$fullLike='';
	$sql="SELECT * FROM feedLikes  WHERE postFeedId={$post}";
	$sql=mysqli_query($connection,$sql);
	if(mysqli_num_rows($sql) > 0){
		while($data=mysqli_fetch_array($sql)){
		$text='<li class="list-group-item">'.$data["loverUsername"].'<a href="viewMemberProfile?member='.$data["loverId"].'" ';
		$text.=' class="badge btn btn-primary"><i class="glyphicon glyphicon-heart"></i> View Profile</a></li>';
		$fullLike=$fullLike . $text; }
 	}
	else {$fullLike='<li class="list-group-item"><b>No Like On This Post For Now, Be The First To Like</b><span class="badge">';
	$fullLike.='<i class="glyphicon glyphicon-heart"></i></span></li>'; }
	return $fullLike;
	mysqli_close($connection);
}
?>