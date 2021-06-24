$("document").ready(function(){
	var feedData=new Object();
	var countStart=0;
	var countStop=20;
	verifyLogin();
	getPostFeeds(countStart,countStop);
        
		$("#navContainer").load("navContainer.html");
		$("#rightNav").load("rightNav.html");
		$("#leftNav").load("leftNav.html");
		$("#mobileNav").load("mobileNav.html");
		$("#footer").load("footer.html");
		
                

		$("#showNextFeed").click(function(){
		$("#loader").show();
		countStart+=20;
		getPostFeeds(countStart,countStop);
		});
		
               

		$("#postTextFeed").click(function(){
			$("#postTextFeed").html('<i class="glyphicon glyphicon-share"></i> Posting..');
			$("#postTextFeed").addClass("disabled");
			var textFeed=$("#textFeed").val();
			$.post("strickers/postTextFeed.php",{text:textFeed},function(response){
				if(response==0){
				swal("Success !!","Feed Posted","success");
				$("#loader").show();
				countStart=0;
				getPostFeeds(countStart,countStop);
				$("#textFeed").val('');
				$("#postTextFeed").removeClass("disabled");
				$("#postTextFeed").html('<i class="glyphicon glyphicon-share"></i> Share');
				}
				if(response==1){swal("Error!!","An Error Has Occured, Please Contact Admin","error");}
			});
		});


	});	