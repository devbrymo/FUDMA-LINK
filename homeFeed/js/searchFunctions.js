function checkChar(id){
		var me=$("#"+id);
		if(/[<;(){}$]/g.test(me.val())){me.val(me.val().replace(/[<;(){}$]/g,'')); swal("[<;(){}$] Are Not Allowed");}
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


function getSearchResult(searchWord,searchKey,countStart,countStop){
		$.getJSON("strickers/getSearchResult.php?searchWord="+searchWord+"&searchKey="+searchKey+"&countStart="+countStart+"&countStop="+countStop+"",function(data){
			
			
			var i=0;
			var text='';
			var fullContent='';
			
			if(data.length==0){
			fullContent='<div class="alert alert-info">No More Result Found For <b>'+searchWord+'</b> </div>';
			$("#showNextList").hide(); }
			else{
				
				if(searchKey=="posts"){
					for(i=0;i<data.length;i++){
					
						text='<div class="box box-widget"><div class="box-header with-border"><div class="user-block">';
						text+='<img class="img-circle imgContainer" src="'+data[i].posterPic.replace("../","")+'" alt="User Image">';
						text+='<span class="username"><a id="viewMemberProfileUsername'+i+'" onclick="setViewMemberId('+data[i].posterId+','+i+')">'+data[i].posterUsername+'</a></span>';
						text+='<span class="description">'+moment(data[i].datePosted).fromNow().toString()+'</span></div></div>';

						text+='<div class="box-body" style="display: block;">';
						if(data[i].feedType=="imageFeed"){
						text+='<img class="img-responsive pad-10 imgPostFeed" src="'+data[i].feedUrl.replace("../","")+'" alt="Photo">';}
						text+='<p class="well well-sm">'+data[i].feedText.replace(/\n/g,"<br />")+'</p>';
					  
						text+=' <button id="viewCommentBtn'+i+'" type="button" onclick="viewComment('+data[i].feedId+','+i+')" class="btn btn-info btn-xs"><i class="glyphicon glyphicon-comment"></i> View Post</button>';
						text+='<span class="pull-right text-muted"><b>'+data[i].feedLike+' Like </b></span></div>';
					
						text+='</div>';
						fullContent=fullContent+text;
						
						}
						
					}
				
				if(searchKey=="friends"){
					for(i=0;i<data.length;i++){
					
						text='<li class="list-group-item"><div style="display:inline">';
						text+='<img class="img-responsive imgContainer img-post-size img-circle " src="'+data[i].profilePic.replace("../","")+'" style="display:inline" />';
						text+='<h4 style="display:inline"> <a id="viewMemberProfileUsername2'+i+'" onclick="setViewMemberId2('+data[i].memberId+','+i+')">'+data[i].userName+'</a></h4>';
						text+='<button id="addBuddyBtn'+i+'" onclick="addBuddy('+data[i].memberId+','+i+')" class="btn btn-primary pull-right" style="display:inline"><i class="glyphicon glyphicon-plus"></i></button>';
						text+='</div></li>';
						fullContent=fullContent+text;
						
						}
						fullContent='<ul class="list-group">'+fullContent+'</ul>';
						
						
					}
				$("#showNextList").show();
				
			}			
				$("#searchResultContainer").html(fullContent);
				$("#searchBtn").removeClass("disabled");
				$("#searchBtn").html('<i class="glyphicon glyphicon-search"></i> Search');
				getMemberData(data.length);
	});	
}



function addBuddy(id,count){
	$("#addBuddyBtn"+count).removeClass("btn-primary");
	$("#addBuddyBtn"+count).addClass("btn-success");
	$("#addBuddyBtn"+count).addClass("disabled");
	$("#addBuddyBtn"+count).html('<i class="glyphicon glyphicon-ok"></i>');
	$.post("strickers/addBuddy.php",{userId:id});
}


function viewComment(id,count){
	$("#viewCommentBtn"+count).addClass("disabled");
	$("#viewCommentBtn"+count).text("Loading..");
	$.post("strickers/setViewFeedId.php",{feedId:id,action:"setId"},function(data){
		if(data==0){window.location.href="viewComments.html";}
	});
	
}


function getMemberData(count){
	var no=0;
	$.getJSON("strickers/getMemberData.php",function(data){
		$("#memberUsername").text(data.userName);
		$("#memberPic").attr("src",data.profilePic.replace("../",""));
		for(no;no<count;no++){
		$("#memberCommentPic"+no).attr("src",data.profilePic.replace("../",""));
		}
	});
}

function getProfile(){
	
	$.getJSON("strickers/getMemberData.php",function(data){
		$("#memberUsername").text(data.userName);
		$("#memberPic").attr("src",data.profilePic.replace("../",""));
		
	});
}

function setViewMemberId(id,count){
	
	$("#viewMemberProfileUsername"+count).text("Loading Profile...");
	$.post("strickers/setViewMemberId.php",{viewMemberId:id,action:"setId"},function(data){
				if(data==0){window.location.href="viewMemberProfile.html";}
			});
}

function setViewMemberId2(id,count){
	
	$("#viewMemberProfileUsername2"+count).text("Loading Profile...");
	$.post("strickers/setViewMemberId.php",{viewMemberId:id,action:"setId"},function(data){
				if(data==0){window.location.href="viewMemberProfile.html";}
			});
}

function verifyLogin(){
	$.post("../strickers/madone.php",function(data){if(data==1){window.location.href="../index.html";}});	
}

function logout(){
	$.post("../strickers/logout.php",function(data){if(data==0){window.location.href="../index.html";}});	
}
