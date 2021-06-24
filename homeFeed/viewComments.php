<?php 
if(isset($_GET["post"])){$post=$_GET["post"];} else{header("Location: index"); exit(); }
?>

<html>
<head>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>FUDMA LINK</title>
	
    <!--Bootstrap Css-->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="../bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="../css/colors.css" rel="stylesheet">
    <link href="../css/CssBox.css" rel="stylesheet">
    <link href="css/feedDesign.css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="../slideBar/slideBar.css" />
    <link href="css/navDesign.css" rel="stylesheet">
    <link href="css/feedCommentDesign.css" rel="stylesheet">
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
			<div id="feedPost"><?php echo getContent($post); ?></div>
			<div class="panel panel-body">
				<div class="timeline" id="commentContainer"></div>
			</div>
			<div id="comment2"></div>

			</div>
			<!--THIRD-->
			<div class="col-lg-3 col-md-3 visible-lg visible-md  rightSidebar mainColor" style=" height:100%;">
			<div id="rightNav"><?php include("rightNav.php"); ?></div>
			</div>
		
		</div>
		
	</div>
<!--BODY FOOTER-->
	<div id="footer"><?php include("footer.php"); ?></div>
	<div id="pageInfo" class="hidden">viewComment</div>

		<script src="../bootstrap/js/jquery.min.js"></script>
		<script src="../bootstrap/js/bootstrap.js"></script>
		<script src="../js/sweetalert.min.js"></script>
		<script src="../js/moment.js"></script>
	    <script src="js/homeFeeds.js?v=obo22<?php echo rand(100,500); ?>"></script>
		<script src="slideBar/slideBar.custom.js"></script>
		<script src="../slideBar/slideBar.js"></script>
		<script>
	    getPostComment(<?php echo getPostComment($post); ?>);
	    </script>
</body>
</html>

<?php 
function getContent($post){
	include("../strickers/dbCon.php");
	$i=0;
	$content='';
	$text='';
	$sql="SELECT * FROM postFeed WHERE feedId={$post} ORDER BY datePosted DESC";
	$post=mysqli_query($connection,$sql);
	$data=mysqli_fetch_array($post);
		$text='<div class="box box-widget"><div class="box-header with-border"><div class="user-block">';
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
		$text.='<span id="feedCommentContainer'.$i.'" class="pull-right text-muted"><span id="feedCommentCount'.$i.'">'.$data["feedComment"].'</span> Comment</span></div>';
							
		$text.='<div class="box-footer" style="display: block;">';
		if(isset($_COOKIE["loginPic"])){
		$text.='<img class="img-responsive img-circle imgContainer img-sm" id="memberCommentPic" src="'.str_replace("../","",$_COOKIE["loginPic"]).'" alt="Alt Text">'; }
		else {$text.='<img class="img-responsive img-circle imgContainer img-sm" id="memberCommentPic" src="profilePic/default.png" alt="Alt Text">'; }
		$text.='<div class="img-push">';
		$text.='<div class="input-group ">';
		$text.='  <input id="newComment'.$i.'" onkeyup="checkChar(\'newComment'.$i.'\')" maxlength="500" type="text" class="form-control input-sm" placeholder="Your comment">';
		$text.='<span class="input-group-btn"><button id="commentBtn'.$i.'" onclick="addComment('.$data["feedId"].','.$data["feedComment"].','.$i.')" class="btn btn-sm btn-primary" type="button">Post</button></span>';
		$text.='</div></div></div></div>';
		$content=$content . $text;

	return $content;
	mysqli_close($connection);
}	

function getPostComment($post){
	include("../strickers/dbConPDO.php");
	$feedId=$post;
		
		$sql="SELECT * FROM feedComment WHERE postFeedId={$feedId} ORDER BY datePosted ASC";
		$conn=connect();
		$result = $conn->query($sql);
		$result= $result->fetchAll();
		$output=json_encode($result);
		return $output;
	disconnect($conn);
}


?>