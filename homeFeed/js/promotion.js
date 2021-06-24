$("document").ready(function(){
	
		$("#navContainer").load("navContainer.html");
		$("#rightNav").load("rightNav.html");
		$("#leftNav").load("leftNav.html");
		$("#mobileNav").load("mobileNav.html");
		$("#footer").load("footer.html");
		getMemberData();
                
		
	});

	function verifyLogin(){
			$.post("../strickers/madone.php",function(data){if(data==1){window.location.href="../index.html";}});	
	}

        		
        (function getTotalMsgCount(){
		$.ajax({
			type:"POST",
			url:"strickers/getTotalMsgCount.php",
			async:true,
			success:function(data){
				 $("#totalMsgCount").text(data); 
				 setTimeout(getTotalMsgCount,10000);
			}
		});
        })();


	function logout(){
			$.post("../strickers/logout.php",function(data){if(data==0){window.location.href="../index.html";}});	
	}
	
	function getMemberData(){
			
			$.getJSON("strickers/getMemberData.php",function(data){
				$("#memberUsername").text(data.userName);
				$("#memberPic").attr("src",data.profilePic.replace("../",""));
				
			});
		
	}	