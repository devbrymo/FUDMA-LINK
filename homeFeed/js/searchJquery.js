$("document").ready(function(){
	var data=new Object();
	var countStart=0;
	var countStop=10;
	verifyLogin();
	
		$("#showNextList").hide();
		$("#navContainer").load("navContainer.html");
		$("#rightNav").load("rightNav.html");
		$("#leftNav").load("leftNav.html");
		$("#mobileNav").load("mobileNav.html");
		
		getProfile();
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