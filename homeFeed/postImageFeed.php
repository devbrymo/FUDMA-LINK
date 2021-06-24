<html>
	<head>
	<head>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>FUDMA LINK</title>
	
    <!--Bootstrap Css-->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="../bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="../bootstrap/css/bootstrap.min.css" rel="stylesheet"> 

   <!--My Css-->
	<link rel="stylesheet" type="text/css" href="../slideBar/slideBar.css" />
    <link href="../css/colors.css" rel="stylesheet">
    <link href="../css/CssBox.css" rel="stylesheet">
    <link href="css/navDesign.css" rel="stylesheet">
  
	
   <!--Site Icon-->
	<link rel="icon" href="image/favicon.ico" type="image/x-icon">
</head>

<body class="cbp-spmenu-push">
		<!--Mobile Slide Navigation Bar-->
		<nav class="cbp-spmenu cbp-spmenu-vertical cbp-spmenu-left" id="cbp-spmenu-s1">
		<div id="mobileNav"><?php include("mobileNav.php"); ?></div>
		</nav>
		
		<!-- Mobile Top Navigation Bar-->
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
			
			<!--POST FORM-->
			<div class="panel">
				<div class="panel-body">
					<div>
				<div class="top-10">
				<h3 class="text-bold text-success">Post Some Pictures</h3></div>
				
				<div class="border-shadow top-10 ">
				<div class="pad-10" id="formDisplayContainer">
				<div class="form-group">
					<h4 class="text-center text-bold">How Many Pictures Do You Want To Upload</h4>
					<div class="input-group">

							<input type="text" id="noOfPicture" class="form-control" />
						<span class="input-group-btn"><button onclick="generatePictureForm()" class="form-control btn-black">Submit</button></span>
					</div>
				</div>
				<div class="alert alert-info text-bold text-black text-center">Note: You can only upload 5 picture at a time</div>
				
				
				</div>
				<div class="pad-10" id="formDisplayContainer2">
				<form id="postImageFeedForm"></form>
				</div>
	
				</div>
	
			</div>
        	</div>
			</div>
			
			
			
			</div>
			<!--THIRD-->
			<div class="col-lg-3 col-md-3 visible-lg visible-md  rightSidebar mainColor" style=" height:100%;">
			<div id="rightNav"><?php include("rightNav.php"); ?></div>
			</div>
		
		</div>
		
	</div>
	
	<!--BODY FOOTER-->
	<div id="footer"><?php include("footer.php"); ?></div>
	<div id="pageInfo" class="hidden">postPictureFeed</div>
	<!--script src="js/postImageFeedFunctions.js"></script>
	<script src="js/postImageFeedJquery.js"></script-->
	
	<script src="../bootstrap/js/jquery.min.js"></script>
	<script src="../bootstrap/js/bootstrap.js"></script>
	<script src="../js/sweetalert.min.js"></script>
	<script src="js/homeFeeds.js"></script>
	<script src="slideBar/slideBar.custom.js"></script>
	<script src="../slideBar/slideBar.js"></script>

</body>
</html>