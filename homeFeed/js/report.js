$("document").ready(function(){
		verifyLogin();
		$("#navContainer").load("navContainer.html");
		$("#rightNav").load("rightNav.html");
		$("#leftNav").load("leftNav.html");
		$("#mobileNav").load("mobileNav.html");
		$("#footer").load("footer.html");
		
		getMemberData();
		
		
		$("#reportForm").on("submit",(function(e){
			e.preventDefault();
			$("#btnSend").addClass("disabled");
			
			var contactData=$("#contact").val();
			var messageData=$("#report").val();
			$.post("strickers/postReport.php",{contact:contactData, message:messageData},
			function(data){
				if(data==0){
					swal("Success!!","Report Sent Successfully. Thank You For Using Fudma Link","success");
					$("#btnSend").removeClass("btn-primary");
					$("#btnSend").removeClass("disabled");
					$("#btnSend").addClass("btn-success");
					$("#contact").val('');
					$("#report").val('');
					
					}
				if(data!=0){swal("Error!!","Report Not Sent","error");}
			});	
	
		}));
		
		
	});

	function verifyLogin(){
			$.post("../strickers/madone.php",function(data){if(data==1){window.location.href="../index.html";}});	
	}

	function logout(){
			$.post("../strickers/logout.php",function(data){if(data==0){window.location.href="../index.html";}});	
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


        function checkChar(id){
    		var me=$("#"+id);
		if(/[<;(){}$]/g.test(me.val())){me.val(me.val().replace(/[<;(){}$]/g,'')); swal("[<;(){}$] Are Not Allowed");}
		}

	function getMemberData(){
			
			$.getJSON("strickers/getMemberData.php",function(data){
				$("#memberUsername").text(data.userName);
				$("#memberPic").attr("src",data.profilePic.replace("../",""));
				
			});
		
	}