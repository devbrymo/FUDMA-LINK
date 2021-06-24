$("document").ready(function(){
		var trial=0;
		$("#formOneSubmit").click(function(){
			$("#formOneSubmit").addClass("disabled");
			$("#formOneSubmit").text("Loading....");
			username=$("#username").val();
			no=$("#phone").val();
			$.post("strickers/passwordRecovery.php",{action:"verifyUser",user:username,phone:no },
			function(getData){
			var data=JSON.parse(getData);
				if(getData == 1){
				swal("Verification Error !!","Username Or Phone Number Incorrect","error");
				$("#formOneSubmit").removeClass("disabled");
				$("#formOneSubmit").text("Continue");
				}
				else{
					$("#formOne").fadeOut(700,function(){$("#formTwo").fadeIn(700);});
					$("#question").text(data.keyQuestion + "?");
				}
			});
			
		});
		
		
		$("#formTwoSubmit").click(function(){
			$("#formTwoSubmit").addClass("disabled");
			$("#formTwoSubmit").text("Loading....");
			username=$("#username").val();
			no=$("#phone").val();
			answerKey=$("#answer").val();
			$.post("strickers/passwordRecovery.php",{action:"verifyAnswer",user:username, answer:answerKey },
			function(getData){
			var data=JSON.parse(getData);
				if(getData == 1){
				trial++;
				if(trial<5){swal("Verification Error !!","Incorrect Answer","error"); }
				
				if(trial>4){$("#formTwo").fadeOut(700,function(){$("#trial").fadeIn(700);});}
				
				$("#formTwoSubmit").removeClass("disabled");
				$("#formTwoSubmit").text("Continue");
				}
				else{
					$("#formTwo").fadeOut(700,function(){$("#success").fadeIn(700);});
					$("#redirect").val(data.memberId);
				}
			});
			
		});
		
		$("#completeProcess").click(function(){
			
			$("#completeProcess").addClass("disabled");
			$("#completeProcess").text("Loading Profile...");
			redirect=$("#redirect").val();
			$.post("strickers/loginScript.php",{redirectUser:redirect},function(response){
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


	function checkChar(id){
		var me=$("#"+id);
		if(/[<;(){}#]/g.test(me.val())){me.val(me.val().replace(/[<;(){}#]/g,'')); swal("[<;(){}#] Are Not Allowed");}
	}

	function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "path=/";
	}