function getUserPhotos(){
$.getJSON("strickers/getMemberPictures.php",function(data){
	var pic='';
	var i=0;
	
	for(i;i<data.length;i++){
		pic+=' <a title="Your Photo"><img src="'+data[i].feedUrl.replace("../","")+'" class="imgPostFeed" alt="Photo"></a>';
	}
	$("#photoContainer").html(pic);
});

}

function checkChar(id){
		var me=$("#"+id);
		if(/[<;(){}$]/g.test(me.val())){me.val(me.val().replace(/[<;(){}$]/g,'')); swal("[<;(){}$] Are Not Allowed");}
		}

function getUserDetails(){
$.getJSON("strickers/getAllMemberData.php",function(data){
	var info1='';
	var info2='';
	var updateForm='';
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
	
	
	updateForm='<div class="row">';
	updateForm+='<div class="col-md-6"><div class="form-group">Username: <input name="userName" maxlength="15" placeholder="Username" value="'+data.userName+'" class="form-control " type="text" disabled /></div></div>';
	updateForm+='<div class="col-md-6"><div class="form-group">Full Name:<input name="fullName" maxlength="25" placeholder="Full Name" value="'+data.fullName+'" class="form-control" type="text" /></div></div>';
	updateForm+='<div class="col-md-6"><div class="form-group">Password: <input name="key" maxlength="15" placeholder="Password" value="'+data.accessKey+'" class="form-control" type="password" /></div></div>';
	updateForm+='<div class="col-md-6"><div class="form-group">Phone Number: <input name="phoneNumber" maxlength="15" placeholder="Phone Number" value="'+data.phoneNumber+'" class="form-control" type="text" /></div></div>';
	updateForm+='<div class="col-md-6"><div class="form-group">Address: <textarea name="address" maxlength="199" class="form-control" type="text" placeholder="Address">'+data.address+' </textarea></div></div>';
	updateForm+='<div class="col-md-6"><div class="form-group">About: <textarea name="about"  maxlength="200" class="form-control" type="text" placeholder="About You">'+data.aboutme+'</textarea></div></div>';
	updateForm+='<div class="col-md-6"><div class="form-group">Gender: <input name="gender" maxlength="8" value="'+data.gender+'" placeholder="Gender" class="form-control" type="text" /></div></div>';
	updateForm+='<div class="col-md-6"><div class="form-group">Date of Birth: <input name="birthdate" maxlength="10" placeholder="Date Of Birth" value="'+data.birthdate+'" class="form-control" type="text" /></div></div>';
	updateForm+='<div class="col-md-6"><div class="form-group">Home Town: <input name="hometown" maxlength="15" value="'+data.hometown+'" placeholder="Home Town" class="form-control" type="text" /></div></div>';
	updateForm+='<div class="col-md-6"><div class="form-group">Language: <input name="language" maxlength="15" value="'+data.language+'" placeholder="Language" class="form-control" type="text" /></div></div>';
	updateForm+='<div class="form-group pad-10"><button id="updateDataBtn" class="btn btn-primary btn-block" >Update Data</button></div>';
	updateForm+='</div>';
	
	$("#profileInfo1").html(info1);
	$("#profileInfo2").html(info2);
	$("#updateAccountInfoForm").html(updateForm);
});

}

function getPostFeeds(countStart,countStop){
		$.getJSON("strickers/getMemberFeeds.php?countStart="+countStart+"&countStop="+countStop+"",function(data){
			feedData=data;
			var i=0;
			var text='';
			var fullFeed='';
			
			if(feedData.length==0){$("#showFeedError").show(); $("#showNextFeed").hide();  $("#loader").hide();}
			else{
			$("#showNextFeed").show();
			$("#showFeedError").hide();
				for(i=0;i<feedData.length;i++){
				
				text='<div class="border-shadow" id="feedContainer'+i+'" ><div class="box box-widget"><div class="box-header with-border"><div class="user-block">';
				text+='<img class="img-circle imgContainer" src="'+feedData[i].posterPic.replace("../","")+'" alt="User Image">';
				text+='<span class="username"><a href="#">'+feedData[i].posterUsername+'</a></span>';
				text+='<span class="description">'+moment(feedData[i].datePosted).fromNow().toString()+'</span></div></div>';

				text+='<div class="box-body" style="display: block;">';
				if(feedData[i].feedType=="imageFeed"){
				text+='<center><img class="img-responsive pad-10 imgFeed" src="'+feedData[i].feedUrl.replace("../","")+'" alt="Photo" /></center>';}
				text+='<p class="well well-sm" id="mainFeedText'+i+'">'+feedData[i].feedText.replace(/\n/g,"<br />")+'</p>';
			  
				text+='<button id="viewLikeBtn'+i+'" onclick="viewLike('+feedData[i].feedId+','+i+')" type="button" class="btn btn-primary btn-xs">'+feedData[i].feedLike+' View <i class="glyphicon glyphicon-heart"></i></button>';
				text+=' <button id="viewCommentBtn'+i+'" type="button" onclick="viewComment('+feedData[i].feedId+','+i+')" class="btn btn-info btn-xs"><i class="glyphicon glyphicon-comment"></i> View</button>';
				text+=' <button id="editFeedBtn'+i+'" type="button" onclick="editFeed('+feedData[i].feedId+','+i+')" class="btn btn-success btn-xs"><i class="glyphicon glyphicon-pencil"></i> Edit</button>';
				text+=' <button id="deleteBtn'+i+'" type="button" onclick="deleteFeed('+feedData[i].feedId+','+i+')" class="btn btn-danger btn-xs"><i class="glyphicon glyphicon-remove"></i> Delete</button>';
				
				text+='<div class="well editFeedMainContainer top-10" id="editFeedContainer'+i+'"><textarea onkeyup="checkChar(\'textFeed'+i+'\')" id="textFeed'+i+'" maxlength="1000" class="form-control" rows="2">'+feedData[i].feedText.replace(/\n/g,"<br />")+'</textarea>';
        		text+='<div class="top-10 clearfix">';
        		text+='	<button onclick="updateFeed('+feedData[i].feedId+','+i+')"  id="updateFeedBtn'+i+'" class="btn btn-sm btn-primary pull-right" ><i class="glyphicon glyphicon-share"></i> Update</button>';
        		text+='</div></div>';
				text+='<div class="box-footer" style="display: block;">';
				text+='<img class="img-responsive img-circle imgContainer img-sm" id="memberCommentPic'+i+'" src="" alt="Alt Text">';
				text+='<div class="img-push">';
				text+='<div class="input-group ">';
				text+='  <input onkeyup="checkChar(\'newComment'+i+'\')"  maxlength="500" id="newComment'+i+'" type="text" class="form-control input-sm" placeholder="Your comment">';
				text+='<span class="input-group-btn"><button id="commentBtn'+i+'" onclick="addComment('+feedData[i].feedId+','+feedData[i].feedComment+','+i+')" class="btn btn-sm btn-primary" type="button">Post</button></span>';
				text+='</div></div></div></div></div></div>';
				fullFeed=fullFeed+text;
				
				}
				$("#loader").hide();
				$("#feedDesignContainer").html(fullFeed);
				getMemberData(feedData.length);
				
		}
		$("#refreshFeed").removeClass("disabled");
		$("#refreshFeed").html('<i class="glyphicon glyphicon-refresh"></i> Refresh');
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

function editFeed(id,count){
	$("#editFeedContainer"+count).toggle();
}

function updateFeed(id,count){
	$("#updateFeedBtn"+count).addClass("disabled");
	$("#updateFeedBtn"+count).html('<i class="glyphicon glyphicon-share"></i> Updating...');
	var text=$("#textFeed"+count).val();
	$.post("strickers/updateFeed.php",{feedId:id,feedText:text},function(data){
		if(data==0){
		swal("Success","Post Updated Successfully","success");
		$("#updateFeedBtn"+count).removeClass("disabled");
		$("#updateFeedBtn"+count).html('<i class="glyphicon glyphicon-share"></i> Update');
		$("#mainFeedText"+count).html(text.replace(/\n/g,"<br />"));
		
		}
		if(data==1){swal("Error","Error, please contact admin","error");}
		
	});
	
}

function deleteFeed(id,count){
	var confirm=window.confirm("Are You Sure You Want To Delete This ??");
	if(confirm==true){
		$.post("strickers/deleteFeed.php",{feedId:id},function(data){
			if(data==0){
			swal("Success","Post Deleted Successfully","success");
			$("#feedContainer"+count).hide();
			}
			if(data==1){swal("Error","Post Not Deleted, Please Contact Admin","error");}
		});
	}
	if(confirm==false){alert("False");}

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

function getProfilePic(){
	var no=0;
	$.getJSON("strickers/getMemberData.php",function(data){
		$("#updateProfilePic").attr("src",data.profilePic.replace("../",""));
		$("#profilePicHead").attr("src",data.profilePic.replace("../",""));
	});
}

function verifyLogin(){
	$.post("../strickers/madone.php",function(data){if(data==1){window.location.href="../index.html";}});	
}

function logout(){
	$.post("../strickers/logout.php",function(data){if(data==0){window.location.href="../index.html";}});	
}