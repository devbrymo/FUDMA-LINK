<?php include("../strickers/dbCon.php"); session_start(); ?>
<?php include("functionLib.php"); ?>
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
 	<link href="../css/colors.css" rel="stylesheet">
    <link href="../css/CssBox.css" rel="stylesheet">
    <link href="css/feedDesign.css" rel="stylesheet">
    <link href="css/mainProfileDesign.css" rel="stylesheet">
  	<link rel="icon" href="image/favicon.ico" type="image/x-icon">
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
						if(isset($_COOKIE["loginId"])){$pic=str_replace("../","",$_COOKIE["loginPic"]); } else {$pic="profilePic/default.png";}
						echo '<img id="profilePicHead" src="'.$pic.'" class="img-responsive img-thumbnail  profile-userpic" alt="Profile Pic" />';
					?>
					</div>
					
				</div>
				<div class="grid-body">
					<ul class="nav nav-tabs">
						<li class="active"><a href="#profile" data-toggle="tab">Profile</a></li>
						<li class=""><a href="#timeline" data-toggle="tab">Timeline</a></li>
						<li class=""><a href="#photos" data-toggle="tab">Photos</a></li>
						<li class=""><a href="#settings" data-toggle="tab">Settings</a></li>
						<li class=""><a href="index" >Home</a></li>
					</ul>
					<div class="tab-content">
						<!-- BEGIN PROFILE -->
						<div class="tab-pane active" id="profile">
							<p class="lead text-black ">Account Information</p><hr/>
							
							<div class="row">
							<?php

								if(isset($_COOKIE["loginId"])){
								$userData=getMemberData($connection,$_COOKIE["loginId"]);
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
								}

							?>
							</div>
							
						</div>
						<!-- END PROFILE -->
						<!-- BEGIN TIMELINE -->
						<div class="tab-pane" id="timeline">
							<p class="lead text-black ">Post By You</p><hr/>
							<!--FEED POST-->
				
							<div id="top"></div>
							<center><img id="loader" src="img/loader.gif" /></center><br/>
							
							<div id="showFeedError" >
							<div class="alert alert-info">
							<p class="lead">Sorry, its either you have not posted anything yet or there are no more post to display.</p></div>
							<center>
							<a class="btn btn-primary btn-sm" style="border-radius:10px; width:70%" href="#top" id="refreshProfileFeed">
							<i class="glyphicon glyphicon-refresh"></i> Refresh</a></center>
							<div class="top-10"></div>
							</div>
							
							<div id="feedDesignContainer"></div>
							
							<center >
							<a class="btn btn-primary btn-sm" style="border-radius:10px; width:70%" href="#top" id="nextProfileFeed">
							Load More</a></center>
							<div class="top-10"></div>
							
						</div>
						<!-- END TIMELINE -->
						<!-- BEGIN PHOTOS -->
						<div class="tab-pane" id="photos">
							<p class="lead text-black">My Photos</p>
							<hr>
							<div class="row">
								
									<div class="popup-gallery" id="photoContainer"><?php echo getMemberPhotos($connection,$_COOKIE["loginId"]); ?></div>
									<br>
								
							</div>
						</div>
						<!-- END PHOTOS -->
						<!-- BEGIN SETTINGS -->
						<div class="tab-pane" id="settings">
							<p class="lead text-black">Update Account</p>
						<!--Update Profile Pic-->
							<div class="border-black-dashed">
							<center>
							<div class="pad-10">
				
							<?php echo'<img src="'.$pic.'" id="updateProfilePic" class="img-responsive imgPostFeed2 imgContainer" />'; ?>
							
							
							<form class="pad-10" id="updateAccountPicForm" enctype="multipart/form-data">
							<div class="form-group"><input class="form-control" type="file" name="accountPic" /></div>
							<div class="form-group"><button class="btn btn-primary btn-block" id="updateProfilePicBtn" >Update Picture</button></div>
							</form>
							
									
							</div></center>
							</div>
							
						<!-- Update Account Info-->
						<p class="lead text-black top-5">Update Account Information</p>
							<div class="border-black-dashed" >
							<form class="pad-10" id="updateAccountInfoForm" >
							<?php

								if(isset($_COOKIE["loginId"])){
									$data=$userData;
									echo '<div class="row">';
									echo '<div class="col-md-6"><div class="form-group">Username: <input id="updateUsername" onkeyup="checkChar(\'updateUsername\')" name="userName" maxlength="15" placeholder="Username" value="'.$data["userName"].'" class="form-control " type="text" disabled /></div></div>';
									echo '<div class="col-md-6"><div class="form-group">Full Name:<input id="updateFullname" onkeyup="checkChar(\'updateFullname\')" name="fullName" maxlength="25" placeholder="Full Name" value="'.$data["fullName"].'" class="form-control" type="text" /></div></div>';
									echo '<div class="col-md-6"><div class="form-group">Password: <input id="updateKey" onkeyup="checkChar(\'updateKey\')" name="key" maxlength="15" placeholder="Password" value="'.$data["accessKey"].'" class="form-control" type="password" /></div></div>';
									echo '<div class="col-md-6"><div class="form-group">Phone Number: <input id="updatePhone" onkeyup="checkChar(\'updatePhone\')" name="phoneNumber" maxlength="15" placeholder="Phone Number" value="'.$data["phoneNumber"].'" class="form-control" type="number" /></div></div>';
									echo '<div class="col-md-6"><div class="form-group">Address: <textarea id="updateAddress" onkeyup="checkChar(\'updateAddress\')" name="address" maxlength="199" class="form-control" type="text" placeholder="Address">'.$data["address"].' </textarea></div></div>';
									echo '<div class="col-md-6"><div class="form-group">About: <textarea id="updateAbout" onkeyup="checkChar(\'updateAbout\')" name="about"  maxlength="200" class="form-control" type="text" placeholder="About You">'.$data["aboutme"].'</textarea></div></div>';
									echo '<div class="col-md-6"><div class="form-group">Gender: <input id="updateGender" onkeyup="checkChar(\'updateGender\')" name="gender" maxlength="8" value="'.$data["gender"].'" placeholder="Gender" class="form-control" type="text" /></div></div>';
									echo '<div class="col-md-6"><div class="form-group">Date of Birth: <input id="updateBirth" onkeyup="checkChar(\'updateBirth\')" name="birthdate" maxlength="10" placeholder="Date Of Birth" value="'.$data["birthdate"].'" class="form-control" type="text" /></div></div>';
									echo '<div class="col-md-6"><div class="form-group">Home Town: <input id="updateHome" onkeyup="checkChar(\'updateHome\')" name="hometown" maxlength="15" value="'.$data["hometown"].'" placeholder="Home Town" class="form-control" type="text" /></div></div>';
									echo '<div class="col-md-6"><div class="form-group">Language: <input id="updateLanguage" onkeyup="checkChar(\'updateLanguage\')" name="language" maxlength="15" value="'.$data["language"].'" placeholder="Language" class="form-control" type="text" /></div></div>';
									echo '<div class="form-group pad-10"><button id="updateDataBtn" class="btn btn-primary btn-block" >Update Data</button></div>';
									echo '</div>';
								}
							?>
							</form>
							</div>
						</div>
						<!-- END SETTINGS -->
					</div>
				</div>
			</div>
		</div>
		<!-- END USER PROFILE -->
	</div>
</div>
<div id="pageInfo" class="hidden">mainMemberProfile</div>

	<script src="../bootstrap/js/jquery.min.js"></script>
	<script src="../bootstrap/js/bootstrap.js"></script>
	<script src="../js/sweetalert.min.js"></script>
	<script src="../js/moment.js"></script>
	<script src="js/homeFeeds.js?vg=<?php echo rand(100,500); ?>"></script>
    <script>
    getMemberPosts(<?php echo getMemberPosts(); ?>);
    </script>
</body>
</html>


