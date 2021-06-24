<section class="panel">
				<div class="panel-body pad-10">
				
				<div>
				<div class="profile-userpic">
				<?php
				if(isset($_COOKIE["loginId"])){$pic=str_replace("../","",$_COOKIE["loginPic"]); $name=$_COOKIE["loginName"];}
				else{$pic="profilePic/default.png"; $name="GUEST";}
				echo '<img id="memberPic" src="'.$pic.'" class="img-responsive imgContainer " alt="Profile Pic">';
				?>
				</div>
				<div class="profile-usertitle">
				<?php echo '<div class="profile-usertitle-name" id="memberUsername">'.$name.'</div>'; ?>
				</div>
				<?php    
		        if(isset($_COOKIE["loginId"])){
		        echo ' <div class="profile-userbuttons"> <a type="button" class="btn btn-primary btn-sm btn-block" href="memberProfile">';
                echo ' View Profile </a> </div>';
			    } ?>
    			<div class="profile-usermenu">
					<ul class="nav-news-feed">

						<li><i class="glyphicon glyphicon-home icon1"></i><div><a href="index">Home</a></div></li>
						<li><i class="glyphicon glyphicon-user"></i><div><a href="buddies">Buddies</a></div></li>
						<li><i class="glyphicon glyphicon-comment"></i><div><a href="buddyChat">Chat <b id="totalMsgCount2"></b></a></div></li>
						<li><i class="glyphicon glyphicon-plus icon1"></i><div><a href="postImageFeed">Image</a></div></li>
						<?php    
						if(isset($_COOKIE["loginId"])){echo '<li><i class="glyphicon glyphicon-off icon3"></i><div><a id="leftNavLogout">Logout</a></div></li>';}
						else{echo '<li><i class="glyphicon glyphicon-log-in icon3"></i><div><a href="../index?stayOnPage=yes">Login</a></div></li>';}
						?> 
					</ul>
				</div>
			</div>
				</div>
</section>