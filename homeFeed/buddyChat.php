<html>

<head>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>FUDMA LINK</title>
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
  	
    <link rel="stylesheet" type="text/css" href="../bootstrap/css/bootstrap.min.css"/>
	<link href="../css/colors.css" rel="stylesheet">
    <link href="../css/CssBox.css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="../slideBar/slideBar.css" />
    <link href="css/navDesign.css" rel="stylesheet">
    <link href="css/buddyChatDesign.css" rel="stylesheet">
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
		
	<input id="myId" type="hidden"  />
	<input id="myPic" type="hidden" />
	<input id="myUsername" type="hidden" />
	
	<!--BODY-->
	
	<div class="container-fluid">
		<div class="row">
		<!--FIRST-->
			<div class="col-lg-3 col-md-3 visible-lg visible-md sidebar mainColor" style=" height:100%;">
			<div id="leftNav"><?php include("leftNav.php"); ?></div>
			</div>
			<!--SECOND-->
			<div class="col-lg-6 col-md-6  col-lg-offset-3 col-md-offset-3 main">
			<div id="top"></div>
			
			<div id="chatListContainer">
			<ul class="list-group">
						  <li class="list-group-item active">Your Chat List</li>
						  <div id="chatList">Loading.....</div>
						  <li class="list-group-item "><a href="#top" id="showMyNextBuddies" class="btn btn-block btn-primary ">Load More</a></li>
						  <li class="list-group-item "><a href="#top" id="refreshMyBuddyList" class="btn btn-block btn-primary "><i class="glyphicon glyphicon-refresh"></i> Refresh</a></li>
			</ul>
			</div>
			<div id="viewBuddyChatContainer">
			<!-- DIRECT CHAT PRIMARY -->
					  <div class="box box-primary direct-chat direct-chat-primary">
						<div class="box-header with-border">
						  <h3 class="box-title">Buddy Chat</h3>
							<div class="box-tools pull-right">
								<button id="closeBuddyChat" type="button" class="btn btn-box-tool" data-widget="remove"><i class="glyphicon glyphicon-remove"></i> Close</button>
							</div>
						</div>
						<!-- /.box-header -->
						
						<div class="box-body">
							<div class="direct-chat-messages" id="chatContainer"></div>
						</div>
						
						<!-- /.box-body -->
						<div class="box-footer">
						  
							<div class="input-group">
							  <input type="text" onkeyup="checkChar('sendMessageText')" maxlength ="249" id="sendMessageText" name="message" placeholder="Type Message ..." class="form-control">
								  <span class="input-group-btn">
									<button id="sendMessageBtn" type="submit" class="btn btn-primary btn-flat">Send</button>
								  </span>
							</div>
						  
						</div>
						<!-- /.box-footer-->
					  </div>
					  <!--/.direct-chat -->
			
			</div>
			
			</div>
			<!--THIRD-->
			<div class="col-lg-3 col-md-3 visible-lg visible-md  rightSidebar mainColor" style=" height:100%;">
			<div id="rightNav"><?php include("rightNav.php"); ?></div>
			</div>
		
		</div>
		
	</div>
	<div id="pageInfo" class="hidden">buddyChatPage</div>

		<script src="../bootstrap/js/jquery.min.js"></script>
		<script src="../bootstrap/js/bootstrap.js"></script>
		<script src="../js/sweetalert.min.js"></script>
		<script src="../js/moment.js"></script>
		<script src="js/homeFeeds.js?v=<?php echo rand(100,1000); ?>"></script>
		<!--script src="js/buddyChatJquery.js"></script>
		<script src="js/buddyChatFunctions.js"></script-->
		<script src="slideBar/slideBar.custom.js"></script>
		<script src="../slideBar/slideBar.js"></script>

</body>
</html>