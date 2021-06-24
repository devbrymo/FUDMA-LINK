	$("document").ready(function(){
		

        //Login Validation Check

		//Check For Username
		$("#loginUsername").keyup(function(){if(/[^A-Za-z0-9$_]/g.test($(this).val())){$(this).val($(this).val().replace(/[^A-Za-z0-9$_]/g,'')); $(this).after("<div class='fullNameCheck'><p class='alert-danger pad-5 top-5'>No special characters Allowed</p></div>");}});
		$("#loginUsername").blur(function(){$(".fullNameCheck").html('');});
		

		//Check For Password
		$("input[name='password']").keyup(function(){if(/[^A-Za-z0-9$_]/g.test($(this).val())){$(this).val($(this).val().replace(/[^A-Za-z0-9$_]/g,'')); $(this).after("<div class='passwordCheck'><p class='alert-danger pad-5 top-5'>No special characters Allowed</p></div>");}});
		$("input[name='password']").blur(function(){$(".passwordCheck").html('');});
		
	
		//SignUp Validation Check
		
		//Check For FullName
		$("input[name='fullName']").keyup(function(){if(/[^a-z A-Z]/g.test($(this).val())){$(this).val($(this).val().replace(/[^a-z A-Z]/g,'')); $(this).after("<div class='fullNameCheck'><p class='alert-danger pad-5 top-5'>Only Alphabets Are Allowed</p></div>");}});
		$("input[name='fullName']").blur(function(){$(".fullNameCheck").html('');});
		//Check For Password
		$("input[name='accessKey']").keyup(function(){if(/[^A-Za-z0-9$_]/g.test($(this).val())){$(this).val($(this).val().replace(/[^A-Za-z0-9$_]/g,'')); $(this).after("<div class='passwordCheck'><p class='alert-danger pad-5 top-5'>No special characters Allowed</p></div>");}});
		$("input[name='accessKey']").blur(function(){$(".passwordCheck").html('');});
		//Check For Phone
		$("input[name='phone']").keyup(function(){if(/[^0-9]/g.test($(this).val())){$(this).val($(this).val().replace(/[^0-9]/g,'')); $(this).after("<div class='phoneCheck'><p class='alert-danger pad-5 top-5'>Only Digits Are Allowed</p></div>");}});
		$("input[name='phone']").blur(function(){$(".phoneCheck").html('');});
		//Check For Question
		$("input[name='keyQuestion']").keyup(function(){if(/[^a-z A-Z0-9'",.?]/g.test($(this).val())){$(this).val($(this).val().replace(/[^a-z A-Z0-9'",.?]/g,'')); $(this).after("<div class='questionCheck'><p class='alert-danger pad-5 top-5'>Characters Apart From <b>{ . , ? \' and \" }</b> are not allowed</p></div>");}});
		$("input[name='keyQuestion']").blur(function(){$(".questionCheck").html('');});
		//Check For Answer
		$("input[name='keyAnswer']").keyup(function(){if(/[^a-z A-Z0-9'",.?]/g.test($(this).val())){$(this).val($(this).val().replace(/[^a-z A-Z0-9'",.?]/g,'')); $(this).after("<div class='answerCheck'><p class='alert-danger pad-5 top-5'>Characters Apart From <b>{ . , ? \' and \" }</b> are not allowed</p></div>");}});
		$("input[name='keyAnswer']").blur(function(){$(".answerCheck").html('');});
		


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
					 if(data==1){
					 $("#loginForm")[0].reset();
					 $("#loginBtn").text("Sign In");
					 $("#loginBtn").removeClass("disabled");
					 swal("Alert !!","Incorrect Username Or Password","error");
					 }
					 else{
					 var myData=JSON.parse(data); 
					 setCookie("loginId",myData.memberId,"30");
					 setCookie("loginUser",myData.userName,"30");
					 setCookie("loginPic",myData.profilePic,"30");
					 setCookie("loginName",myData.fullName,"30");
					 window.location.href="homeFeed/";
					 }

				  } 
				
				});
			
		}));
		
		$("#signupForm").on("submit",(function(e){
			e.preventDefault();
		
			$.ajax({
			
			   url: "strickers/signupScript.php",
			   type: "POST",
			   data:  new FormData(this),
			   contentType: false,
					 cache: false,
			   processData:false,
			   beforeSend : function()
			   {
				$("#signupBtn").text("Processing...");
				$("#signupBtn").addClass("disabled");
				$("#welcomeTextContainer").addClass("hidden-xs");
				$("#welcomeContainer").addClass("top-40");
				
			   },
			   success: function(data)
				  {
					 if(data==0){
					 $("#loginSignupContainer").slideUp(600,function(){
						$("#welcomeContainer").slideDown(600);
				
						});
					 }
					 if(data==1){
					 $("#signupBtn").text("Sign Up");
					 $("#signup").removeClass("disabled");
					 swal("Alert !!","Username Already Taken","error");
					 }

				  } 
				
				});
			
		}));
		
		
		$("#signupUsername").keyup(function(){
			username=$("#signupUsername").val();
                        if(/[^A-Za-z0-9$_]/g.test($(this).val())){$(this).val($(this).val().replace(/[^A-Za-z0-9$_]/g,'')); $(this).after("<div class='fullNameCheck'><p class='alert-danger pad-5 top-5'>No special characters Allowed</p></div>");}
			$("#signupUsername").blur(function(){$(".fullNameCheck").html('');});
			
			$.get("strickers/usernameCheck.php?username="+username,function(response){
				if(response==1){
				$("#signupUsernameContainer").removeClass("has-success");
				$("#signupUsernameContainer").addClass("has-error"); 
				$("#signupIcon").removeClass("glyphicon-ok"); 
				$("#signupIcon").addClass("glyphicon-remove"); }
				
				if(response==0){
				$("#signupUsernameContainer").removeClass("has-error");
				$("#signupUsernameContainer").addClass("has-success");
				$("#signupIcon").removeClass("glyphicon-remove"); 
				$("#signupIcon").addClass("glyphicon-ok"); }
				
			});
		});
		
		$("#completeSignup").click(function(){
			$("#completeSignup").addClass("disabled");
			$("#completeSignup").text("Loading...");
			var user=$("#signupUsername").val();
			var pass=$("#signupPassword").val();
			$.post("strickers/loginScript.php",{username:user,password:pass},function(response){
			if(response==1){swal(response);}
			else{
			var myData=JSON.parse(response); 
			setCookie("loginId",myData.memberId,"30");
			setCookie("loginUser",myData.userName,"30");
			setCookie("loginPic",myData.profilePic,"30");
			setCookie("loginName",myData.fullName,"30");
			window.location.href="homeFeed/"; }
			});
		});
	
	});
	
	function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
	}