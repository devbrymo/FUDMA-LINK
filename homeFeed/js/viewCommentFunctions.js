		
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


function getCommentFeed(id){
		$.getJSON("strickers/getCommentFeed.php?feedId="+id,function(data){
			feedData=data;
			var i=0;
			var text='';
			var fullFeed='';
			
				text='<div class="box box-widget"><div class="box-header with-border"><div class="user-block">';
				text+='<img class="img-circle imgContainer" src="'+feedData.posterPic.replace("../","")+'" alt="User Image">';
				text+='<span class="username"><a id="viewMemberProfileUsername" onclick="setViewMemberId('+feedData.posterId+')">'+feedData.posterUsername+'</a></span>';
				text+='<span class="description">'+moment(feedData.datePosted).fromNow().toString()+'</span></div></div>';

				text+='<div class="box-body" style="display: block;">';
				if(feedData.feedType=="imageFeed"){
				text+='<center><img class="img-responsive pad-10 imgFeed" src="'+feedData.feedUrl.replace("../","")+'" alt="Photo" /></center>';}
				text+='<p class="well well-sm">'+feedData.feedText.replace(/\n/g,"<br />")+'</p>';
			  
				text+='<button id="likeBtn" onclick="likePost('+feedData.feedId+','+feedData.feedLike+')" type="button" class="btn btn-danger btn-xs"><i class="glyphicon glyphicon-thumbs-up"></i> Like '+feedData.feedLike+'</button>';
				text+='<span id="feedCommentContainer" class="pull-right text-muted">'+feedData.feedComment+' Comments</span></div>';
			
				text+='<div class="box-footer" style="display: block;">';
				text+='<img class="img-responsive img-circle imgContainer img-sm" id="memberCommentPic" src="" alt="Alt Text">';
				text+='<div class="img-push">';
				text+='<div class="input-group ">';
				text+='  <input id="newComment" maxlength="500" type="text" class="form-control input-sm" placeholder="Your comment"  onkeyup="checkChar(\'newComment\')" >';
				text+='<span class="input-group-btn"><button id="commentBtn" onclick="addComment('+feedData.feedId+','+feedData.feedComment+',)" class="btn btn-sm btn-primary" type="button">Post</button></span>';
				text+='</div></div></div></div>';
				
				
				fullFeed=fullFeed+text;
				$("#feedPost").html(fullFeed);
				
			
	});	
}

function likePost(id,like){
	$("#likeBtn").removeClass("btn-danger");
	$("#likeBtn").addClass("btn-warning");

	$.post("strickers/likeFeedPost.php",{feedId:id},function(data){
		if(data=="add"){feedData.feedLike++;}
		if(data=="minus"){feedData.feedLike--;}
		$("#likeBtn").html('<i class="glyphicon glyphicon-thumbs-up"></i> Like '+feedData.feedLike);

	});
}


function addComment(id,commentNo){
	$("#commentBtn").addClass("disabled");
	$("#commentBtn").text("Posting");
	feedData.feedComment++;
	$("#feedCommentContainer").text(feedData.feedComment + " Comment");
	var comment=$("#newComment").val();
	
	$.post("strickers/postFeedComment.php",{feedId:id,feedComment:comment},function(data){
	if(data==0){
	$("#commentBtn").removeClass("disabled");
	$("#newComment").val("");
	$("#commentBtn").text("Post");
	swal("Success !!","Comment Posted Successfully","success");
	
	getAllComment(id);
	getMemberData();
	}
	if(data==1){
	$("#commentBtn").removeClass("disabled");
	$("#commentBtn").text("Post");
	swal("Error!!","Comment Not Posted, Please Contact Admin","error");
	}
	if(data!=0){alert(data);}
	
		
	});
}

function addComment2(id){
	
	$("#commentBtn2").addClass("disabled");
	$("#commentBtn2").text("Posting");
	feedData.feedComment++;
	$("#feedCommentContainer").text(feedData.feedComment + " Comment");
	var comment=$("#newComment2").val();
	
	$.post("strickers/postFeedComment.php",{feedId:id,feedComment:comment},function(data){
	if(data==0){
	$("#commentBtn2").removeClass("disabled");
	$("#newComment2").val("");
	$("#commentBtn2").text("Post");
	swal("Success !!","Comment Posted Successfully","success");
	getAllComment(id);
	getMemberData();
	}
	if(data==1){
	$("#commentBtn2").removeClass("disabled");
	$("#commentBtn2").text("Post");
	swal("Error!!","Comment Not Posted, Please Contact Admin","error");
	}
	if(data!=0){alert(data);}
	
		
	});
}

function getAllComment(id){
		$.getJSON("strickers/getAllComment.php?feedId="+id,function(data){
			commentData=data;
			var i=0;
			var text='';
			var text2='';
			var fullComment='';
			
			if(commentData.length==0){
			$("#commentContainer").html('<div class="alert alert-info"><h4>No Comment Yet, Be The First To Post A Comment</h4></div>');
			getMemberData();
			}
			else{
			
				for(i=0;i<commentData.length;i++){
				text='<div class="timeline-entry">';
				text+='<div class="timeline-stat">';
				text+='		<div class="timeline-icon"><img src="'+commentData[i].profilePic.replace("../","")+'" class="imgContainer" alt="Profile picture"></div>';
				text+='		<div class="timeline-time">'+moment(commentData[i].datePosted).fromNow().toString()+'</div>';
				text+='	</div>';
				text+='	<div class="timeline-label">';
				text+='	<h4 class="mar-no pad-btm"><a id="viewMemberProfileUsername'+i+'" onclick="setViewMemberId2('+commentData[i].commenterId+','+i+')" class="text-success">'+commentData[i].commenterUsername+'</a></h4>';
				text+='	<p>'+commentData[i].comment+'</p>';
				text+='	</div></div>';
				fullComment=fullComment+text;
				}
				text2='<div class="box box-widget">';
				text2+='<div class="box-footer" style="display: block;">';
				text2+='<img id="memberCommentPic2" class="img-responsive img-circle imgContainer img-sm" src="" alt="Alt Text">';
				text2+='<div class="img-push">';
				text2+='<div class="input-group ">';
				text2+='<input id="newComment2" maxlength="500" type="text" class="form-control input-sm" placeholder="Your comment" onkeyup="checkChar(\'newComment2\')">';
				text2+='<span class="input-group-btn"><button id="commentBtn2" onclick="addComment2('+id+')" class="btn btn-sm btn-primary" type="button">Post</button></span>';
				text2+='</div></div></div>';
				text2+='</div>';
				
				$("#commentContainer").html(fullComment);
				$("#comment2").html(text2);
			
				}
		
	});	
}

function checkChar(id){
		var me=$("#"+id);
		if(/[<;(){}$]/g.test(me.val())){me.val(me.val().replace(/[<;(){}$]/g,'')); swal("[<;(){}$] Are Not Allowed");}
}


 function getMemberData(){
	
	$.getJSON("strickers/getMemberData.php",function(data){
		$("#memberUsername").text(data.userName);
		$("#memberPic").attr("src",data.profilePic.replace("../",""));
		$("#memberCommentPic").attr("src",data.profilePic.replace("../",""));
		$("#memberCommentPic2").attr("src",data.profilePic.replace("../",""));
		
	});
}

function setViewMemberId(id){
	
	$("#viewMemberProfileUsername").text("Loading Profile...");
	$.post("strickers/setViewMemberId.php",{viewMemberId:id,action:"setId"},function(data){
				if(data==0){window.location.href="viewMemberProfile.html";}
			});
}

function setViewMemberId2(id,count){
	
	$("#viewMemberProfileUsername"+count).text("Loading Profile...");
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