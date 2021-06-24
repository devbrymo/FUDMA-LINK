<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
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
	<title>FUDMA LINK</title>
	
   	<meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="../bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="../bootstrap/css/bootstrap.min.css" rel="stylesheet"> 
	<link href="../css/colors.css" rel="stylesheet">
    <link href="../css/CssBox.css" rel="stylesheet">
    <link href="css/feedDesign.css" rel="stylesheet">
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
			<div id="top"></div>
			
			<!--Promotion Start-->
			<div class="">
			
			<div class="pad-10">
				
				<p class="lead text-black">Having any problem with the site, or just want to give us some
				suggestions or observation, Feel free.</p>
				<div class="well">
				<form id="reportForm">
				<div class="form-group">
				<input type="text" id="name" maxlength="50" onkeyup="checkChar('name')" class="form-control" placeholder="Full Name" required /> </div>
				<div class="form-group">
				<textarea id="report" class="form-control" maxlength="249" onkeyup="checkChar('report')" rows="2" placeholder="Your Report/Message" required></textarea>
				</div>
				<div class="form-group">
				<input type="text" id="contact" maxlength="35" onkeyup="checkChar('contact')" class="form-control" placeholder="Please Provide An Optional Contact" /> </div>
				<div class="form-group"><button id="btnSend" class="btn btn-primary btn-block">Send</button></div>
				</form>
				</div>
				
				<p class="lead text-black">Feel free to also contact us.</p>
				<ul class="list-group" >
				<li class="list-group-item">Email: ibyusuf31@gmail.com</li>
				<li class="list-group-item">Phone: +2347032529431</li>
				<li class="list-group-item">WhatsApp: +2347032529431</li>
				</ul>
				<hr class="hr-gold" />
			</div>
			</div><br>

							
			<!--Promotion Stop-->
			
			<div class="top-10"></div>
			<div id="mobileNav"></div>
			
			</div>
			<!--THIRD-->
			<div class="col-lg-3 col-md-3 visible-lg visible-md  rightSidebar mainColor" style=" height:100%;">
			<div id="rightNav"><?php include("rightNav.php"); ?></div>
			</div>
		
		</div>
		
	</div>
	<!--BODY FOOTER-->
	<div id="footer"><?php include("footer.php"); ?></div>
	<div id="pageInfo" class="hidden">reportPage</div>
		
		
		<script src="../bootstrap/js/jquery.min.js"></script>
		<script src="../bootstrap/js/bootstrap.js"></script>
		<script src="../js/sweetalert.min.js"></script>
		<script src="../js/moment.js"></script>
		<script src="js/homeFeeds.js"></script>
		<script src="slideBar/slideBar.custom.js"></script>
		<script src="../slideBar/slideBar.js"></script>
		
</body>
</html>
