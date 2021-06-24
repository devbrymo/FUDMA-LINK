$("document").ready(function(){
			$("#loginForm").on("submit",(function(e){
			e.preventDefault();
			
			$.ajax({
			
			   url: "strickers/loginScript.php",
			   type: "POST",
			   data:  new FormData(this),
			   contentType: false,
					 cache: false,
			   processData:false,
			   beforeSend : function()
			   {
				$("#loginBtn").text("Siginig In...");
				$("#loginBtn").addClass("disabled");
				
			   },
			   success: function(data)
				  {
					 if(data!=1){
					 	var myData=JSON.parse(data);
					 	localStorage.zababu=JSON.stringify(myData);
					 	window.location.href="dashboard.html";
					 }
					 if(data==1){
					 $("#loginForm")[0].reset();
					 $("#loginBtn").text("Sign In");
					 $("#loginBtn").removeClass("disabled");
					 swal("Alert !!","Incorrect Password","error");
					 }

				  } 
				
				});
			
		}));
		
		});