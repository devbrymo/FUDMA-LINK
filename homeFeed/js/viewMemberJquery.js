$("document").ready(function(){
	var feedData=new Object();
	var countStart=0;
	var countStop=10;
	
		
		//verifyLogin();
		getUserDetails();
		getPostFeeds(countStart,countStop);
		getUserPhotos();
		
		$("#showNextFeed").click(function(){
		$("#loader").show();
		countStart+=10;
		getPostFeeds(countStart,countStop);
		
		});
		
		$("#postTextFeed").click(function(){
			$("#postTextFeed").html('<i class="glyphicon glyphicon-share"></i> Posting');
			$("#postTextFeed").addClass("disabled");
			var textFeed=$("#textFeed").val();
			$.post("strickers/postTextFeed.php",{text:textFeed},function(response){
				if(response==0){
				swal("Success !!","Feed Posted","success");
				$("#loader").show();
				getPostFeeds(countStart,countStop);
				$("#textFeed").val('');
				$("#postTextFeed").removeClass("disabled");
				$("#postTextFeed").html('<i class="glyphicon glyphicon-share"></i> Share');
				}
				if(response==1){swal("Error!!","An Error Has Occured, Please Contact Admin","error");}
			});
		});
	});