$("document").ready(function(){
		var countStart=0;
		var countStop=20;
	
		verifyLogin();
		$("#modalWindow").load("modalWindow.html");
		getReport();
		getUsers(countStart,countStop);
		
		$("#showNextUsers").click(function(){
			$("#loader").show();
			countStart+=20;
			getUsers(countStart,countStop);
		});
		
		$("#logout").click(function(){
			logout();
		});
		
		$("#mobileLogout").click(function(){
			logout();
		});
		
		
		$("#showMenuOn").click(function(){
			$("#leftView").removeClass("position-540");
			$("#leftView").addClass("col-md-6");
			$("#rightView").addClass("col-md-6");
			$("#rightView").removeClass("hidden");
			$("#rightView").hide();
			$("#rightView").fadeIn(2000);
			$("#showMenuOn").hide();
			$("#showMenuOff").show();
		});
		
		$("#showMenuOff").click(function(){
			$("#rightView").fadeOut(2000,function(){
				$("#rightView").addClass("hidden");
				$("#rightView").removeClass("col-md-6");
				$("#leftView").removeClass("col-md-6");
				$("#leftView").addClass("position-540");
				$("#showMenuOff").hide();
				$("#showMenuOn").show();
				
				
			});
		});
		
		$("#showNextList").click(function(){
		countStart+=10;
				if($("input[id=searchFriend]:checked").length==1){
					getSearchResult($("#searchWord").val(),"friends",countStart,countStop);
				}
				
				if($("input[id=searchPost]:checked").length==1){
					getSearchResult($("#searchWord").val(),"posts",countStart,countStop);
				}
		});
		
		
		$("#searchForm").on("submit",(function(e){
			e.preventDefault();
			$("#searchBtn").addClass("disabled");
			$("#searchBtn").html('<i class="glyphicon glyphicon-search"></i> Searching...');
			countStart=0;
			if($("input[id=searchFriend]:checked").length==1){
				getSearchResult($("#searchWord").val(),"friends",countStart,countStop);
			}
			
			if($("input[id=searchPost]:checked").length==1){
				getSearchResult($("#searchWord").val(),"posts",countStart,countStop);
			}
			
		}));
		
	
	});