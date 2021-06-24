$("document").ready(function(){
	var feedData=new Object();
	var countStart=0;
	var countStop=10;
	verifyLogin();
	getProfilePic();
	getUserDetails();
	getPostFeeds(countStart,countStop);
	getUserPhotos();
		
		$("#showNextFeed").click(function(){
		$("#loader").show();
		countStart+=10;
		getPostFeeds(countStart,countStop);
		});
		
		$("#refreshFeed").click(function(){
		$("#refreshFeed").addClass("disabled");
		$("#refreshFeed").html('<i class="glyphicon glyphicon-refresh"></i> Refreshing...');
		countStart=0;
		getPostFeeds(countStart,countStop);
		
		});
		
		$("#postTextFeed").click(function(){
			$("#postTextFeed").html('<i class="glyphicon glyphicon-share"></i> Posting');
			$("#postTextFeed").addClass("disabled");
			var textFeed=$("#textFeed").val();
			$.post("strickers/postTextFeed.php",{text:textFeed},function(response){
				if(response==0){
				swal("Success !!","Feed Posted","success");
				getPostFeeds(countStart,countStop);
				$("#textFeed").val('');
				$("#postTextFeed").removeClass("disabled");
				$("#postTextFeed").html('<i class="glyphicon glyphicon-share"></i> Share');
				}
				if(response==1){swal("Error!!","An Error Has Occured, Please Contact Admin","error");}
			});
		});
		
		$("#updateAccountPicForm").on("submit",(function(e){
			e.preventDefault();
			
			$.ajax({
			
			   url: "strickers/updateAccountPicture.php",
			   type: "POST",
			   data:  new FormData(this),
			   contentType: false,
					 cache: false,
			   processData:false,
				beforeSend : function()
			   {
				$("#updateProfilePicBtn").addClass("disabled");
				$("#updateProfilePicBtn").text("Updating...");
				
			   },
			   success: function(data)
				  {
					 if(data==0){
					 swal("Success !!","Account Picture Updated","success");
					 $("#updateProfilePicBtn").removeClass("disabled");
					 $("#updateProfilePicBtn").text("Update Picture");
					 getProfilePic();
					 
					 }
					 if(data!=0){swal("Error !!",data,"error");}
					 
					
				  } 
				
				});
			
		}));
		
		$("#updateAccountInfoForm").on("submit",(function(e){
			e.preventDefault();
			
			$.ajax({
			
			   url: "strickers/updateAccountDetails.php",
			   type: "POST",
			   data:  new FormData(this),
			   contentType: false,
					 cache: false,
			   processData:false,
				beforeSend : function()
			   {
				$("#updateDataBtn").addClass("disabled");
				$("#updateDataBtn").text("Updating...");
				
			   },
			   success: function(data)
				  {
					 if(data==0){
					 swal("Success !!","Account Data Updated","success");
					 $("#updateDataBtn").removeClass("disabled");
					 $("#updateDataBtn").text("Update Data");
					 getUserDetails();
					 
					 }
					 if(data!=0){swal("Error !!",data,"error");}
					 
					
				  } 
				
				});
			
		}));
		
	});