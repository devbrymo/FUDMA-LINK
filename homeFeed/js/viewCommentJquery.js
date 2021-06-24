$("document").ready(function(){
		verifyLogin();
		$("#navContainer").load("navContainer.html");
		$("#rightNav").load("rightNav.html");
		$("#leftNav").load("leftNav.html");
		$("#mobileNav").load("mobileNav.html");
		$("#footer").load("footer.html");
		

		$.get("strickers/setViewFeedId.php?action=getId",function(viewCommentId){
		getCommentFeed(viewCommentId);
		getAllComment(viewCommentId);
		getMemberData();
		});
		
		
		
	});