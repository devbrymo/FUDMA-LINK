function getUserPhotos(){
$.getJSON("strickers/getViewMemberPictures.php",function(data){
	var pic='';
	var i=0;
	
	for(i;i<data.length;i++){
		pic+=' <a title="Your Photo"><img src="'+data[i].feedUrl.replace("../","")+'" class="imgPostFeed" alt="Photo"></a>';
	}
	$("#photoContainer").html(pic);
});

}

function getUserDetails(){
$.getJSON("strickers/getViewMemberProfileData.php",function(data){
	var info1='';
	var info2='';
	
	info1=' <p><strong>Username:</strong> '+data.userName+'</p>';
	info1+='<p><strong>FullName:</strong> '+data.fullName+'</p>';
	info1+='<p><strong>Phone Number:</strong> '+data.phoneNumber+'</p>';
	info1+='<p><strong>Address:</strong> '+data.address+'</p>';
	info1+='<p><strong>Birth Date:</strong> '+data.birthdate+'</p>';
	
	info2='<p><strong>About:</strong> '+data.aboutme.replace(/\n/g,"<br />")+'</p>';
	info2+='<p><strong>Gender:</strong> '+data.gender+'</p>';
	info2+='<p><strong>Home Town:</strong> '+data.hometown+'</p>';
	info2+='<p><strong>Language:</strong> '+data.language+'</p>';
	info2+='<p><strong>Joined on:</strong> '+data.dateAdded+'</p>';
	
	$("#profilePicHead").attr("src",data.profilePic.replace("../",""));
	$("#profileInfo1").html(info1);
	$("#profileInfo2").html(info2);
	
});

}



function getPostFeeds(countStart,countStop){
		$.getJSON("strickers/getViewMemberFeeds.php?countStart="+countStart+"&countStop="+countStop+"",function(data){
			feedData=data;
			var i=0;
			var text='';
			var fullFeed='';
			
			if(feedData.length==0){swal("Sorry!!","There Are No More Post To Display","info"); $("#loader").hide();}
			else{
			
				for(i=0;i<feedData.length;i++){
				
				text='<div class="border-shadow"><div class="box box-widget"><div class="box-header with-border"><div class="user-block">';
				text+='<img class="img-circle imgContainer" src="'+feedData[i].posterPic.replace("../","")+'" alt="User Image">';
				text+='<span class="username"><a href="#">'+feedData[i].posterUsername+'</a></span>';
				text+='<span class="description">'+moment(feedData[i].datePosted).fromNow().toString()+'</span></div></div>';

				text+='<div class="box-body" style="display: block;">';
				if(feedData[i].feedType=="imageFeed"){
				text+='<center><img class="img-responsive pad-10 imgFeed" src="'+feedData[i].feedUrl.replace("../","")+'" alt="Photo" /></center>';}
				text+='<p class="well well-sm">'+feedData[i].feedText.replace(/\n/g,"<br />")+'</p>';
			  
				text+='<button id="likeBtn'+i+'" onclick="likePost('+feedData[i].feedId+','+feedData[i].feedLike+','+i+')" type="button" class="btn btn-danger btn-xs"><i class="glyphicon glyphicon-thumbs-up"></i> Like '+feedData[i].feedLike+'</button>';
				text+=' <button id="viewLikeBtn'+i+'" onclick="viewLike('+feedData[i].feedId+','+i+')" type="button" class="btn btn-success btn-xs">View <i class="glyphicon glyphicon-heart"></i></button>';
				text+=' <button id="viewCommentBtn'+i+'" type="button" onclick="viewComment('+feedData[i].feedId+','+i+')" class="btn btn-info btn-xs"><i class="glyphicon glyphicon-comment"></i> View</button>';
				text+='<span id="feedCommentContainer'+i+'" class="pull-right text-muted">'+feedData[i].feedComment+' Comments</span></div>';
			
				text+='<div class="box-footer" style="display: block;">';
				text+='<img class="img-responsive img-circle imgContainer img-sm" id="memberCommentPic'+i+'" src="" alt="Alt Text">';
				text+='<div class="img-push">';
				text+='<div class="input-group ">';
				text+='  <input id="newComment'+i+'" type="text" class="form-control input-sm" placeholder="Your comment">';
				text+='<span class="input-group-btn"><button id="commentBtn'+i+'" onclick="addComment('+feedData[i].feedId+','+feedData[i].feedComment+','+i+')" class="btn btn-sm btn-primary" type="button">Post</button></span>';
				text+='</div></div></div></div></div>';
				fullFeed=fullFeed+text;
				
				}
				$("#loader").hide();
				$("#feedDesignContainer").html(fullFeed);
				getMemberData(feedData.length);
				
		}
	});	
}

function likePost(id,like,count){
	$("#likeBtn"+count).removeClass("btn-danger");
	$("#likeBtn"+count).addClass("btn-warning");

	$.post("strickers/likeFeedPost.php",{feedId:id},function(data){
		if(data=="add"){feedData[count].feedLike++;}
		if(data=="minus"){feedData[count].feedLike--;}
		$("#likeBtn"+count).html('<i class="glyphicon glyphicon-thumbs-up"></i> Like '+feedData[count].feedLike);

	});
}

function viewComment(id,count){
	$("#viewCommentBtn"+count).addClass("disabled");
	$("#viewCommentBtn"+count).text("Loading..");
	$.post("strickers/setViewFeedId.php",{feedId:id,action:"setId"},function(data){
		if(data==0){window.location.href="viewComments.html";}
	});
	
}

function viewLike(id,count){
	$("#viewLikeBtn"+count).addClass("disabled");
	$("#viewLikeBtn"+count).text("Loading..");
	$.post("strickers/setViewFeedId.php",{feedId:id,action:"setId"},function(data){
		if(data==0){window.location.href="viewLike.html";}
	});
	
}

function addComment(id,like,count){
	$("#commentBtn"+count).addClass("disabled");
	$("#commentBtn"+count).text("Posting");
	feedData[count].feedComment++;
	$("#feedCommentContainer"+count).text(feedData[count].feedComment + " Comment");
	var comment=$("#newComment"+count).val();
	
	$.post("strickers/postFeedComment.php",{feedId:id,feedComment:comment},function(data){
	if(data==0){
	$("#commentBtn"+count).removeClass("disabled");
	$("#newComment"+count).val("");
	$("#commentBtn"+count).text("Post");
	swal("Success !!","Comment Posted Successfully","success");
	}
	if(data==1){
	$("#commentBtn"+count).removeClass("disabled");
	$("#commentBtn"+count).text("Post");
	swal("Error!!","Comment Not Posted, Please Contact Admin","error");
	}
	if(data!=0){alert(data);}
	
		
	});
}


function getMemberData(count){
	var no=0;
	$.getJSON("strickers/getMemberData.php",function(data){
		
		for(no;no<count;no++){
		$("#memberCommentPic"+no).attr("src",data.profilePic.replace("../","")); }
		
	});
}

function verifyLogin(){
	$.post("../strickers/madone.php",function(data){if(data==1){window.location.href="../index.html";}});	
}

function logout(){
	$.post("../strickers/logout.php",function(data){if(data==0){window.location.href="../index.html";}});	
}