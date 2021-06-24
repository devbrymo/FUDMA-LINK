<?php $feeddata=''; ?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>FUDMA LINK</title>
	
    <!--Bootstrap Css-->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta property="og:type" content="website" />
  	<meta property="og:title" content="Fudma Link: The Home For All Fudma Student" />
  	<meta property="og:description" content="You Are Welcome To Fudma Link, Connect with thousands of fudma students right on click, Search for thousands of handouts and text books, Read all the latest news at fudma blog" />
  	<meta property="og:url" content="http://www.fudmalink.tk" />
  	<meta property="og:image" content="http://www.fudmalink.tk/home6.png" />
  	<meta property="og:image:width" content="1200" />
  	<meta property="og:image:height" content="680" />
  	<meta property="og:image" content="http://www.fudmalink.tk/home6.png" />
  	<meta property="og:image:width" content="200" />
  	<meta property="og:image:height" content="200" />
    <!-- Latest compiled and minified CSS -->
    <!--link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"-->
	<link href="../bootstrap/css/bootstrap.min.css" rel="stylesheet"> 
    <link href="../css/colors.css" rel="stylesheet">
    <link href="../css/CssBox.css" rel="stylesheet">
    <link href="css/feedDesign.css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="../slideBar/slideBar.css" />
    <link href="css/navDesign.css" rel="stylesheet">
	<link rel="icon" href="image/favicon.ico" type="image/x-icon">
	<style>#loader{display:none;}</style>
</head>

<body class="cbp-spmenu-push">
		<nav class="cbp-spmenu cbp-spmenu-vertical cbp-spmenu-left" id="cbp-spmenu-s1" >
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
			<div id="top"></div>
			<?php if(!isset($_COOKIE["loginId"])){echo '<div class="alert alert-info text-justify"><b>Note:</b> You are accessing this page as a guest. As a guest you can only view the page but would not have permission to perform operation on the page (posting,like,comment etc). To login/register, 
			<b><i><a href="../index?stayOnPage=yes">click here.</a></i></b></div>';} ?>
			<!--POST FORM-->
			<div class="panel">
				<div class="panel-body">
					<textarea id="textFeed" class="form-control" rows="2" maxlength="1000"  onkeyup="checkChar('textFeed')" placeholder="Say Something !!"></textarea>
        		<div class="top-10 clearfix">
        			<button id="postTextFeed" class="btn btn-sm btn-primary pull-right" type="submit"><i class="glyphicon glyphicon-share"></i> Share</button>
        			<a class="btn btn-sm btn-primary " href="postImageFeed"><i class="glyphicon glyphicon-picture"></i> Add Photo</a>
        	
        		</div>
        	</div>
			</div>
			
			<!--FEED POST-->
			<center><img src="img/loader.gif" id="loader" /></center><br/>
			<?php // echo $_SESSION["userName"]; ?>
    
			<div id="feedDesignContainer"><?php echo getContent(); ?></div>

 	        <center>
			<a class="btn btn-primary btn-sm" style="border-radius:10px; width:70%" href="#top" id="showNextFeed">
			Load More</a></center>
			<div class="top-20"></div>
			
			
			</div>
			<!--THIRD-->
			<div class="col-lg-3 col-md-3 visible-lg visible-md  rightSidebar mainColor" style=" height:100%;">
			<div id="rightNav"><?php include("rightNav.php"); ?></div>
			</div>
		
		</div>
		
	</div>
	<!--BODY FOOTER-->
	<div id="footer"><?php include("footer.php"); ?></div>
	<div id="pageInfo" class="hidden">homeFeed</div>
        <!-- jQuery library -->
        <!--script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
		<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script-->
		<script src="../bootstrap/js/jquery.min.js"></script>
		<script src="../bootstrap/js/bootstrap.js"></script>
		<script src="../js/sweetalert.min.js"></script>
		<script src="../js/moment.js"></script>
		<!--script src="js/homeJquery.js"></script-->
        <!--script src="js/homeFunctions.js"></script-->
        <script type="text/javascript" src="js/homeFeeds.js?v=<?php echo rand(100,500); ?>"></script>
		<script src="slideBar/slideBar.custom.js"></script>
		<script src="../slideBar/slideBar.js"></script>
</body>
</html>

<?php 
function getContent(){
	include("../strickers/dbCon.php");
	$i=0;
	$content='';
	$text='';
	$sql="SELECT * FROM postFeed ORDER BY feedId DESC LIMIT 0,20";
	$post=mysqli_query($connection,$sql);
	
	while($data=mysqli_fetch_array($post)){
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
		$text.='<span id="feedCommentContainer'.$i.'" class="pull-right text-muted"><span id="feedCommentCount'.$i.'">'.$data["feedComment"].'</span> Comments</span></div>';
							
		$text.='<div class="box-footer" style="display: block;">';
		if(isset($_COOKIE["loginPic"])){
		$text.='<img class="img-responsive img-circle imgContainer img-sm" id="memberCommentPic'.$i.'" src="'.str_replace("../","",$_COOKIE["loginPic"]).'" alt="Alt Text">'; }
		else {$text.='<img class="img-responsive img-circle imgContainer img-sm" id="memberCommentPic'.$i.'" src="profilePic/default.png" alt="Alt Text">'; }
		$text.='<div class="img-push">';
		$text.='<div class="input-group ">';
		$text.='  <input id="newComment'.$i.'" onkeyup="checkChar(\'newComment'.$i.'\')" maxlength="500" type="text" class="form-control input-sm" placeholder="Your comment">';
		$text.='<span class="input-group-btn"><button id="commentBtn'.$i.'" onclick="addComment('.$data["feedId"].','.$data["feedComment"].','.$i.')" class="btn btn-sm btn-primary" type="button">Post</button></span>';
		$text.='</div></div></div></div>';
		$content=$content . $text;
		$i++;
		
	}
	return $content;
	mysqli_close($connection);
}	

?>
