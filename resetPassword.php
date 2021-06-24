<html>
	<head>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>FUDMA LINK</title>
	
    <!--Bootstrap Css-->
    <meta name="viewport" content="width=device-width, initial-scale=1">
   <!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
<link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">

<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>

<!-- Latest compiled JavaScript -->
<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<script src="bootstrap/js/jquery.min.js"></script>
<script src="bootstrap/js/bootstrap.min.js"></script>
<script src="js/sweetalert.min.js"></script>
	
	<!--Sweet Alert-->
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

   <!--My Css-->
   
    <link href="css/colors.css" rel="stylesheet">
    <link href="css/CssBox.css" rel="stylesheet">
    <link href="css/home.css" rel="stylesheet">
   
   <!--Site Icon-->
	<link rel="icon" href="image/favicon.ico" type="image/x-icon">
	<style> #formTwo{display:none;} #success{display:none;} #trial{display:none;}</style>
	<script src="js/passwordRecovery.js?v=0d"></script>

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
	
	
	<div class=" top-70"></div>
	<div class="container">
	<div class="well border-shadow position-540">
	<center><img src="img/login.png" class="img-responsive" width="200" /></center>
	<h3 class="text-bold text-center">PASSWORD RECOVERY</h3>
	<hr class="hr-blue" />
		<div id="formOne">
						
			<div class="form-group">
			<input type="text" id="username" maxlength="20" onkeyup="checkChar('username')" class="form-control" placeholder="Username" required />
			</div>
			
			<div class="form-group">
			<input type="number" maxlength="15" onkeyup="checkChar('phone')"  id="phone" class="form-control" placeholder="Phone Number" required />
			<input type="hidden" id="redirect" />
			</div>
							
			<div class="form-group">			
			<button id="formOneSubmit" class="btn btn-block btn-primary">Continue</button>
							
			</div>
		
		</div>
		
		<div id="formTwo">
					
			
			<h4>Answer The Security Question Below</h4>
			<div class="well well-sm border-black" id="question"></div>
			
			
			<div class="form-group">
			<input type="text" id="answer" maxlength="50" onkeyup="checkChar('answer')" class="form-control" placeholder="Answer" required />
			</div>
							
			<div class="form-group">			
			<button id="formTwoSubmit" class="btn btn-block btn-primary">Continue</button>
							
			</div>
		
		</div>
		
		<div id="success">
					
			<div class="alert alert-success">
			<p class="lead">
			<b>Password recovery verification succesful.</b> Onces you click on continue below, you would be redirected
			to your profile, please view and change your password in settings to something you can remember. Thank you for using Fudma Link.
			</p>
			</div>
							
			<div class="form-group">			
			<button id="completeProcess" class="btn btn-block btn-primary">Continue</button>
							
			</div>
		
		</div>
		
		
		<div id="trial">
					
			<div class="alert alert-danger">
			<p class="lead">
			<b>Password recovery verification failed.</b> You have tried answering this question five times and failed,
			Please try again later or contact admin @07032529431, ibyusuf31@gmail.com. Thank You For Using Fudma Link.
			</p>
			</div>
							
			<div class="form-group">			
			<a href="index.html" class="btn btn-block btn-primary">Home</a>
							
			</div>
		
		</div>
		<center><a href="index" class="btn text-bold text-black">Back To Home</a></center>
	</div>
	</div>
	
</body>	
</html>