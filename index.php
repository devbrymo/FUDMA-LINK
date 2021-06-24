<?php if(!isset($_GET["stayOnPage"])) {header("Location:homeFeed/"); exit(); } ?>

<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<title>FUDMA LINK</title>
	
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
	<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet"> 

   <!--My Css-->
   
    <link href="css/colors.css" rel="stylesheet">
    <link href="css/CssBox.css" rel="stylesheet">
    <link href="css/home.css" rel="stylesheet">
   	<link rel="icon" href="image/favicon.ico" type="image/x-icon">
	
	</head>
	
	<body>
	
	<!--Page Fixed Heading-->
	<nav class="navbar btn-black navbar-fixed-top " >   
		  <div class="container ">
			<div class="row">
				<div class="col-md-6 ">
				
				<h4 class="text-bold text-center"><span style="color:gold;">FUDMA</span> <span style="color:#3596ff;">LINK</span></h4>
				
				</div>
				
				
				<div class="col-md-6 hidden-sm hidden-xs">
				<h4 class="text-white">Connect with thousands of fudma students now, signup for free</h4>
				</div>
		  </div>
		  </div>
</nav>
	
	
	<div class=" top-10"></div>
		<div class="container">
		<div class="row">
		<!--Welcome Text-->
			<div class="col-md-6" id="welcomeTextContainer">
				<div class="top-20"><img src="home6.png" class="img-responsive" /></div>
				<div class="">
				<h2 class="text-center text-bold text-black">WELCOME TO FUDMA LINK</h2>
				<p class="text-center lead">Connect with thousands of fudma students right on click, Search for thousands of handouts and text books,
				Read all the latest news at fudma blog</p>
				<p class="text-center lead text-bold text-black">Login Or Sign Up Now</p>
				</div>
			</div>
		<!--Login And Signup View-->
			<div class="col-md-6">
			<div class="hidden-sm hidden-xs"><div class=" top-60"></div></div>
			<div id="loginSignupContainer">
			
		<!--Login Form-->
			<div class="bg-black-fade">
			<div class="pad-10">
			<h4 class="text-bold text-white">Already Have An Account, Sign In Below</h4>
			<form class="navbar-form " id="loginForm">
				<div class="form-group">
				<input type="text" maxlength="15" id="loginUsername" class="form-control" name="username" placeholder="Username">
				</div>
				
				<div class="form-group">
				<input type="password" maxlength="15" class="form-control" name="password" placeholder="Password">
				</div>
				
				<button class="btn btn-primary form-control" id="loginBtn">Sign In</button>
			</form>
			<a class="text-white text-bold " href="homeFeed/">Login As Guest </a> || 
			<a class="text-white text-bold " href="resetPassword"> Forget Password, Click Here</a>

			</div>
			</div>

			<!--Signup Form-->
			<div class="bg-black-fade top-10 ">
			<div class="pad-10">
					<h4 class="text-bold text-white ">Or Sign Up For Free</h4>
					
						<form id="signupForm">
						
						<div class="form-group">
						<input type="text" name="fullName" maxlength="30" class="form-control" placeholder="Full Name" required />
						</div>
						
						<div class="row">
						
						<div class="col-md-6">
						<div class="form-group has-feedback" id="signupUsernameContainer">
						<input type="text"  maxlength="15" name="username" id="signupUsername" class="form-control" placeholder="Username" required />
						<span id="signupIcon" class="glyphicon form-control-feedback" aria-hidden="true"></span>
						
						</div>
						</div>
						
						<div class="col-md-6">
						<div class="form-group">			
						<input type="password" maxlength="15" id="signupPassword" name="accessKey" class="form-control" placeholder="Password" required /> 
						</div>
						</div>
						</div>
						

						<div class="form-group">			
						<input type="number" maxlength="15" name="phone" class="form-control" placeholder="Phone" required /> 
						</div>

						<div class="form-group">			
						<div class="alert alert-info" id="errorContainer">			
						<p class="text-bold" id="errorTag">Provide a security question to be asked when ever you forget your password.</p>
						</div>
						</div>
						
						<div class="form-group">			
						<input type="text" maxlength="30" name="keyQuestion" class="form-control" placeholder="Securiy Question" required /> 
						</div>
						
						<div class="form-group">			
						<input type="text" maxlength="30" name="keyAnswer" class="form-control" placeholder="Answer"  required />
						</div>
						
						<div class="form-group">			
						<button id="signupBtn" class="btn btn-block btn-success">
						<span class="glyphicon glyphicon-log-in"></span> Sign Up</button>
						
						</div>			
						</form>
					
					
				</div>
				</div>
			</div>
			<div id="welcomeContainer">
			<!--Add Friends For New Members-->
				<div class="bg-black-fade">
				<div class="pad-10">
				<center><img src="good.png" class="img-responsive img-circle img-thumbnail" width="150" /></center>
					<h2 class="text-center text-white">WELCOME TO FUDMA LINK</h2>
					<div class="alert alert-success">
					<p class="lead text-black text-justify">FUDMA LINK, The Home For All Fudma Student<br/>
					At Fudma Link, you can connect with thousand of fudma student, view students post, share your post
					and pictures, chat with friends, create a chat or study group, get valid news about Fudma, access to
					the handout portal with books to help you study and much more.</p>
					<p class="lead text-black text-justify">Please complete your profile information after you login. God Bless Fudma.</p>
					
					</div>
					<button class="btn btn-success btn-block" id="completeSignup">GET STARTED</button>
				</div>
				</div>
			</div>
			</div>
		</div>
		</div>
		<div class="hidden-md hidden-lg"><br/><br/></div>

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
		<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
		<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
		<script src="bootstrap/js/jquery.min.js"></script>
		<script src="bootstrap/js/bootstrap.js"></script>
		<script src="js/sweetalert.min.js"></script>
		<script src="js/homeJquery.js?v=<?php echo mt_rand(100,1000); ?>"></script>

</body>

</html>