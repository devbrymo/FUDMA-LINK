<section class="panel panel-default">
	<header class="panel-heading">
	<h2 class="panel-title elipsis"><i class="glyphicon glyphicon-list"></i> MENU</h2>
	</header>

	<div class="panel-body noradius pad-10">
	<ul class="nav-news-feed">
        <li><i class="glyphicon glyphicon-home icon1"></i><div><a href="index">Home</a></div></li>
        <li><i class="glyphicon glyphicon-user"></i><div><a href="buddies">Buddies</a></div></li>
        <li><i class="glyphicon glyphicon-comment"></i><div><a href="buddyChat">Chat <b id="totalMsgCount3"></b> </a></div></li>
        <li><i class="glyphicon glyphicon-search icon3"></i><div><a href="search">Search</a></div></li>
        <li><i class="glyphicon glyphicon-plus icon1"></i><div><a href="postImageFeed">Image</a></div></li>
        <li><i class="glyphicon glyphicon-book "></i><div><a href="../handout/index">Handout Portal</a></div></li>
        <li><i class="glyphicon glyphicon-list-alt icon1"></i><div><a href="commingSoon">Fudma Blog</a></div></li>
        <?php    
		if(isset($_COOKIE["loginId"])){echo '<li><i class="glyphicon glyphicon-off icon3"></i><div><a id="rightNavLogout">Logout</a></div></li>';}
		else{echo '<li><i class="glyphicon glyphicon-log-in icon3"></i><div><a href="../index?stayOnPage=yes">Login</a></div></li>';}
		?> 
		<li><i class="glyphicon glyphicon-globe icon2"></i><div><a href="promotion">Promotion</a></div></li>
        <li><i class="glyphicon glyphicon-calendar "></i><div><a href="commingSoon">Updates</a></div></li>
        <li><i class="glyphicon glyphicon-alert icon1 "></i><div><a href="report">Report Problem</a></div></li>
        <li><i class="glyphicon glyphicon-th icon2 "></i><div><a href="promotion">Contact Us</a></div></li>
	</ul>
	</div>
</section>
