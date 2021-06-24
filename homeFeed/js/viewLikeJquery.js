$("document").ready(function(){
		verifyLogin();
		getAllLikes();
		
		$("#navContainer").load("navContainer.html");
		$("#rightNav").load("rightNav.html");
		$("#leftNav").load("leftNav.html");
		$("#mobileNav").load("mobileNav.html");
		$("#footer").load("footer.html");
                
		getMemberData();
		
	});