$("document").ready(function(){
		verifyLogin();
		$("#navContainer").load("navContainer.html");
		$("#rightNav").load("rightNav.html");
		$("#leftNav").load("leftNav.html");
		$("#mobileNav").load("mobileNav.html");
		
               
		getMemberData();
		

		$("#postImageFeedForm").on("submit",(function(e){
			e.preventDefault();
			
			$.ajax({
			
			   url: "strickers/postImageFeed.php",
			   type: "POST",
			   data:  new FormData(this),
			   contentType: false,
					 cache: false,
			   processData:false,
				beforeSend : function()
			   {
				$("#pictureUploadBtn").addClass("disabled");
				$("#pictureUploadBtn").text("Uploading......");
				
			   },
			   success: function(data)
				  {
				  
					 if(data==0){
					 swal("Success !!","Image Uploaded Successfully","success");
					 $("#postImageFeedForm")[0].reset();
					 $("#formDisplayContainer2").hide();
					 $("#formDisplayContainer").show();
					 $("#noOfPicture").val("");
					 
					 
					 }
					
					if(data!=0){
						 swal("Error !!",data,"error");
						 $("#pictureUploadBtn").removeClass("disabled");
						 $("#pictureUploadBtn").text("Upload");
						 }
					 
					
				  } 
				
				});
			
		}));
	});