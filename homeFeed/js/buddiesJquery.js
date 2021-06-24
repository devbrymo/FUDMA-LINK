$("document").ready(function(){
	var feedData=new Object();
	var countStart=0;
	var countStop=20;
	verifyLogin();
	
		$("#navContainer").load("navContainer.html");
		$("#rightNav").load("rightNav.html");
		$("#leftNav").load("leftNav.html");
		$("#mobileNav").load("mobileNav.html");
	      
		
		getMemberData();
		getMembers(countStart,countStop);
		getMyBuddies(countStart,countStop);
		getBuddyRequest();
		
		$("#refreshMyBuddyList").click(function(){
		$("#refreshMyBuddyList").addClass("disabled");
		$("#refreshMyBuddyList").html('<i class="glyphicon glyphicon-refresh"></i> Refreshing..');
		
		countStart=0;
		getMyBuddies(countStart,countStop);
		});
		
		$("#showNextMembers").click(function(){
		countStart+=20;
		getMembers(countStart,countStop);
		});
		
		$("#showMyNextBuddies").click(function(){
		countStart+=20;
		getMyBuddies(countStart,countStop);
		});
		
		$("#sendMessageBtn").click(function(){
			$("#sendMessageBtn").addClass("disabled");
			$("#sendMessageBtn").text('Sending...');
			sendMessage();
		});
		
		$("#closeBuddyChat").click(function(){
			$("#viewBuddyChatContainer").slideUp(1000,function(){
				$("#viewsBuddyContainer").slideDown(700);
				countStart=0;
				getMyBuddies(countStart,countStop);

				//clearInterval For the setIntervals
				clearInterval(getMessageInterval);
			});
		});
		
		
	});