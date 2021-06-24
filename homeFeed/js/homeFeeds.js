/*------------------------------------------------------------------------------------------------------------------------------------
--jQuey Scripts
--Javascript Codes
--Support Functions
--By BrymoTech 2018/2019
-------------------------------------------------------------------------------------------------------------------------------------*/


//------------------------------------------------------------------------------------------------------------------------------------
//-- jQuery Scripts-------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
verifyUser="NO";
countStart=0;
countStop=20;

$("document").ready(function(){
	
	verifyLogin();
        
    //Load Page Attacthment
	//$("#navContainer").load("navContainer.html");
	//$("#rightNav").load("rightNav.html");
	//$("#leftNav").load("leftNav.html");

	//$("#mobileNav").load("mobileNav.html");
	//$("#footer").load("footer.html");
	
	$("#leftNavLogout").click(function(){logout();});
	$("#rightNavLogout").click(function(){logout();});
	$("#mobileNavLogout").click(function(){logout();});
	if($("#pageInfo").text()=="mainMemberProfile"){memberProfile();}
	if($("#pageInfo").text()=="searchPage"){goSearch();}
	//if($("#pageInfo").text()=="homeFeed"){getPostFeeds(0,20); }
	
//---------------------------------------------------------------------------------------------------------------------------------------
// Feeds Script jQuery ---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------


	//showNextFeed Post
	$("#showNextFeed").click(function(){
		$("#loader").show();
		countStart+=20;
		getPostFeeds(countStart,countStop);
	});
		
        
    //Add New postTextFeed 
	$("#postTextFeed").click(function(){
		if(verifyUser=="NO"){swal("Opps!!","You are not logged in yet, please login or register first.","info");}
		else{
			var textFeed=$("#textFeed").val();
			if(textFeed == "" || textFeed ==null){swal("Opps!!","Text box empty.","info");}
			else{
					$("#postTextFeed").html('<i class="glyphicon glyphicon-share"></i> Posting..');
					$("#postTextFeed").addClass("disabled");
					
					$.post("strickers/postTextFeed.php",{text:textFeed},function(response){
						if(response==0){
						swal("Success !!","Feed Posted","success");
						$("#loader").show();
						countStart=0;
						getPostFeeds(countStart,countStop);
						$("#textFeed").val('');
						$("#postTextFeed").removeClass("disabled");
						$("#postTextFeed").html('<i class="glyphicon glyphicon-share"></i> Share');
						}
						if(response!=0){swal(response+"Error!!","An Error Has Occured, Please Contact Admin","error");}
					});
				}
			}
	});

//---------------------------------------------------------------------------------------------------------------------------------------
// Post image feed jQuery ---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------

$("#postImageFeedForm").on("submit",(function(e){
			e.preventDefault();
			
			$.ajax({
			
			   url: "strickers/postImageFeed.php",
			   type: "POST",
			   data:  new FormData(this),
			   contentType: false,
					 cache: false,
			   processData:false,
				beforeSend : function()
			   {
				$("#pictureUploadBtn").addClass("disabled");
				$("#pictureUploadBtn").text("Uploading......");
				
			   },
			   success: function(data)
				  {
				  
					 if(data==0){
					 swal("Success !!","Image Uploaded Successfully","success");
					 $("#postImageFeedForm")[0].reset();
					 $("#formDisplayContainer2").hide();
					 $("#formDisplayContainer").show();
					 $("#noOfPicture").val("");
					 
					 
					 }
					
					if(data!=0){
						 swal("Error !!",data,"error");
						 $("#pictureUploadBtn").removeClass("disabled");
						 $("#pictureUploadBtn").text("Upload");
						 }
					 
					
				  } 
				
				});
			
		}));


});	


	
//-----------------------------------------------------------------------------------------------------------------------------------------
// View member profile jQuery--------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------

$("#nextProfileFeed").click(function(){ //Profile Feed Fro Main Profile
		$("#loader").show();
		countStart+=20;
		getProfileFeeds(countStart,countStop);
});

$("#refreshProfileFeed").click(function(){
		$("#refreshProfileFeed").addClass("disabled");
		$("#refreshProfileFeed").html('<i class="glyphicon glyphicon-refresh"></i> Refreshing...');
		countStart=0;
		getProfileFeeds(countStart,countStop);		
});

$("#updateAccountPicForm").on("submit",(function(e){ //Update Account Picture For Main Profile
			e.preventDefault();
			
			$.ajax({
			
			   url: "strickers/updateAccountPicture.php",
			   type: "POST",
			   data:  new FormData(this),
			   contentType: false,
					 cache: false,
			   processData:false,
				beforeSend : function()
			   {
				$("#updateProfilePicBtn").addClass("disabled");
				$("#updateProfilePicBtn").text("Updating...");
				
			   },
			   success: function(data)
				  {
					 if(data==1){swal("Error !!",data,"error");}
					 else{
					 document.cookie="loginPic=; expires=Thu, 18 Dec 2013 12:00:00 UTC;";
					 setCookie("loginPic",data,"30");
					 $("#profilePicHead").attr("src",data.replace("../",""));
					 $("#updateProfilePic").attr("src",data.replace("../",""));
					 swal("Success !!","Account Picture Updated","success");
					 $("#updateProfilePicBtn").removeClass("disabled");
					 $("#updateProfilePicBtn").text("Update Picture");
					 }
					
				  } 
				
				});
			
		}));
		
		$("#updateAccountInfoForm").on("submit",(function(e){ //Update Account Info For Main Profile
			e.preventDefault();
			
			$.ajax({
			
			   url: "strickers/updateAccountDetails.php",
			   type: "POST",
			   data:  new FormData(this),
			   contentType: false,
					 cache: false,
			   processData:false,
				beforeSend : function()
			   {
				$("#updateDataBtn").addClass("disabled");
				$("#updateDataBtn").text("Updating...");
				
			   },
			   success: function(data)
				  {

				  	if(data==0){swal("Error !!",data,"error");}
					else{
					updateProfileData(data);
					swal("Success !!","Account Data Updated","success");
					$("#updateDataBtn").removeClass("disabled");
					$("#updateDataBtn").text("Update Data");
					}
					 
				  } 
				
				});



}));

if($("#pageInfo").text()=="viewMemberProfile"){
			//getUserPhotos("viewMemberProfile"); //Get All Member Pictures (View Member Data)
			//getProfileData("viewMemberProfile"); //Get Member Data (View Member Data)
			//getPostFeeds(countStart,countStop);
}

function memberProfile(){
	
	if(verifyUser=="NO"){swal("Opps!!","You are not yet logged in, please login or register to gain full access.","info");
	$("#updateAccountPicForm").hide(); $("#profilePicHead").attr("src","profilePic/default.png"); $("#loader").hide(); $("#nextProfileFeed").hide(); }
	else{ 
				//getUserPhotos("mainMemberProfile"); //Get All Member Pictures (Main Member Data)
				//getProfileData("mainMemberProfile"); //Get Member Data (Main Member Data)
				//getProfileFeeds(countStart,countStop);
	}
	
}
//-----------------------------------------------------------------------------------------------------------------------------------------
// View likes jQuery ----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------

//if($("#pageInfo").text()=="viewLikes"){
//			getAllLikes(); //Get All Feeds Like
//}

//-----------------------------------------------------------------------------------------------------------------------------------------
// View likes jQuery--------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------

//if($("#pageInfo").text()=="viewComments"){
//		$.get("strickers/setViewFeedId.php?action=getId",function(viewCommentId){
			//getCommentFeed(viewCommentId);
			//getAllComment(viewCommentId);
			//$("#memberCommentPic").attr("src","profilePic/default.png");
			//getMemberData();
//		});
//}


//---------------------------------------------------------------------------------------------------------------------------------------
// Buddies jQuery ---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------

function goBuddies(){
	if($("#pageInfo").text()=="buddiesPage"){
		if(verifyUser=="NO"){swal("Opps!!","You are not yet logged in, please login or register to gain full access.","info");
			$("#viewsBuddyContainer").html('<div class="alert alert-danger text-center"><b> Opps!!,You are not yet logged in, please login or register to gain full access.</b><br/><a href="../index.html" class="btn btn-danger">Login/Register</a></div>');}
		else{
		getMembers(countStart,countStop);
		getMyBuddies(countStart,countStop);
		getBuddyRequest(); }
	}
}

$("#refreshMyBuddyList").click(function(){
	$("#refreshMyBuddyList").addClass("disabled");
	$("#refreshMyBuddyList").html('<i class="glyphicon glyphicon-refresh"></i> Refreshing..');
	countStart=0;
	if($("#pageInfo").text()=="buddiesPage"){getMyBuddies(countStart,countStop);}
	if($("#pageInfo").text()=="buddyChatPage"){getMyChatList(countStart,countStop);}
});
		
$("#showNextMembers").click(function(){
	countStart+=20;
	getMembers(countStart,countStop);
});
		
$("#showMyNextBuddies").click(function(){
	countStart+=20;
	if($("#pageInfo").text()=="buddiesPage"){getMyBuddies(countStart,countStop); }
	if($("#pageInfo").text()=="buddyChatPage"){getMyChatList(countStart,countStop); }
});
		
$("#sendMessageBtn").click(function(){
	$("#sendMessageBtn").addClass("disabled");
	$("#sendMessageBtn").text('Sending...');
	sendMessage();
});
		
$("#closeBuddyChat").click(function(){
	$("#viewBuddyChatContainer").hide();
	if($("#pageInfo").text()=="buddiesPage"){$("#viewsBuddyContainer").show(); getMyBuddies(countStart,countStop); }
	if($("#pageInfo").text()=="buddyChatPage"){$("#chatListContainer").show(); getMyChatList(countStart,countStop); }
	
	countStart=0;
	//clearInterval For the setIntervals
	clearInterval(getMessageInterval);
	clearInterval(checkMsgStatusInterval);
});


//---------------------------------------------------------------------------------------------------------------------------------------
// Buddies Chat jQuery ---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------

function goChatBuddies(){
	if($("#pageInfo").text()=="buddyChatPage"){
		if(verifyUser=="NO"){swal("Opps!!","You are not yet logged in, please login or register to gain full access.","info");
			$("#chatListContainer").html('<div class="alert alert-danger text-center"><b> Opps!!,You are not yet logged in, please login or register to gain full access.</b><br/><a href="../index.html" class="btn btn-danger">Login/Register</a></div>');}
		else{
			getMyChatList(countStart,countStop);
		}
	}
}

//********************************<<<<<<<<<<****************************************>>>>>>>>>>>>>>>************************************
// Report Page jQuery -----------------------------------------------------------------------------------------------------------------
//********************************<<<<<<<<<<****************************************>>>>>>>>>>>>>>>************************************


$("#reportForm").on("submit",(function(e){
			e.preventDefault();
			$("#btnSend").addClass("disabled");
			$("#btnSend").text("Sending....");
			
			var contactData=$("#contact").val();
			var messageData=$("#report").val();
			var name=$("#name").val();

			$.post("strickers/postReport.php",{contact:contactData, message:messageData, fullname:name},
			function(data){
				if(data==0){
					swal("Success!!","Report Sent Successfully. Thank You For Using Fudma Link","success");
					$("#btnSend").removeClass("btn-primary");
					$("#btnSend").removeClass("disabled");
					$("#btnSend").text("Send");
					$("#btnSend").addClass("btn-success");
					$("#contact").val('');
					$("#report").val('');
					$("#name").val('');
					}
				if(data!=0){swal("Error!!","Report Not Sent","error");}
			});	
	
}));



//---------------------------------------------------------------------------------------------------------------------------------------
// Search Page jQuery ---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------

function goSearch(){
	
	if(verifyUser=="NO"){
		swal("Opps!!","You are not yet logged in, please login or register to gain full access.","info");
		$("#mainSearchContainer").html('<div class="alert alert-danger text-center"><b> Opps!!,You are not yet logged in, please login or register to gain full access.</b><br/><a href="../index" class="btn btn-danger">Login/Register</a></div>');
		$("#mainSearchContainer").show();
	} else{$("#mainSearchContainer").show();}
	
}

$("#showNextList").click(function(){
		countStart+=20;
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

//*****************************************************************************************************************************************
//*****************************************************************************************************************************************

//-----------------------------------------------------------------------------------------------------------------------------------------
//Functions For homeFeeds.js---------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------

		
function getTotalMsgCount(){
		$.ajax({
			type:"POST",
			url:"strickers/getTotalMsgCount.php",
			async:true,
			success:function(data){
				 $("#totalMsgCount").text(data); 
				 $("#totalMsgCount2").text(data); 
				 $("#totalMsgCount3").text(data); 
				 setTimeout(getTotalMsgCount,10000);
			}
		});
}

//*****************************************************************************************************************************************
//Function To Get Home Feeds And View Member Profile Feeds 
//*****************************************************************************************************************************************

function getPostFeeds(countStart,countStop){

	if($("#pageInfo").text()=="homeFeed"){var url="strickers/getFeedScript.php?countStart="+countStart+"&countStop="+countStop; }
	if($("#pageInfo").text()=="viewMemberProfile"){var url="strickers/getViewMemberFeeds.php?countStart="+countStart+"&countStop="+countStop;}

				$.getJSON(url,function(data){
					
					var i=0;
					var text='';
					var fullFeed='';
					
					if(data.length==0){swal("Sorry!!","There Are No More Post To Display","info"); countStart=0; $("#loader").hide(); }
					else{feedData=data;
					var pic=getCookie("loginPic");
					if(pic==""){ pic="profilePic/default.png"; } else { pic=pic.replace("../",""); }
					
					for(i=0;i<data.length;i++){
						
						text='<div class="box box-widget"><div class="box-header with-border"><div class="user-block">';
						text+='<img class="img-circle imgContainer" src="'+feedData[i].posterPic.replace("../","")+'" alt="User Image">';
						text+='<span class="username"><a href="viewMemberProfile?member='+feedData[i].posterId+'">'+feedData[i].posterUsername+'</a></span>';
						text+='<span class="description">'+moment(feedData[i].datePosted,"YYYY-MM-DD hh:mm").format("MM/DD/YYYY hh:mm A")+'</span></div></div>';

						text+='<div class="box-body" style="display: block;">';
						if(feedData[i].feedType=="imageFeed"){
						text+='<div class="pad-10"><center><img  class="imgFeed img-responsive img-thumbnail" src="'+feedData[i].feedUrl.replace("../","")+'" alt="Photo" /></center></div>';}
						text+='<p class="well well-sm">'+feedData[i].feedText.replace(/\n/g,"<br />")+'</p>';
					  
						text+='<button id="likeBtn'+i+'" onclick="likePost('+feedData[i].feedId+','+feedData[i].feedLike+','+i+')" type="button" class="btn btn-danger btn-xs"><i class="glyphicon glyphicon-thumbs-up"></i> Like <span id="likeBtnCount'+i+'">'+feedData[i].feedLike+'</span></button>';
						text+=' <a id="viewLikeBtn'+i+'" href="viewLike?post='+feedData[i].feedId+'" type="button" class="btn btn-success btn-xs">View <i class="glyphicon glyphicon-heart"></i></a>';
						text+=' <a id="viewCommentBtn'+i+'" type="button" href="viewComments?post='+feedData[i].feedId+'" class="btn btn-info btn-xs"><i class="glyphicon glyphicon-comment"></i> View</a>';
						text+='<span id="feedCommentContainer'+i+'" class="pull-right text-muted"><span id="feedCommentCount'+i+'">'+feedData[i].feedComment+'</span> Comments</span></div>';
					
						text+='<div class="box-footer" style="display: block;">';

						text+='<img class="img-responsive img-circle imgContainer img-sm" id="memberCommentPic'+i+'" src="'+pic+'" alt="Alt Text">';
						text+='<div class="img-push">';
						text+='<div class="input-group ">';
						text+='  <input id="newComment'+i+'" onkeyup="checkChar(\'newComment'+i+'\')" maxlength="500" type="text" class="form-control input-sm" placeholder="Your comment">';
						text+='<span class="input-group-btn"><button id="commentBtn'+i+'" onclick="addComment('+feedData[i].feedId+','+feedData[i].feedComment+','+i+')" class="btn btn-sm btn-primary" type="button">Post</button></span>';
						text+='</div></div></div></div>';
						fullFeed=fullFeed+text;
						
						}
						$("#feedDesignContainer").html(fullFeed);
						$("#loader").hide();						
				}
			});	
}

//----------------------------------------------------------------------------------------------------------------------------------------
// Feeds Functions  ----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------         

function likePost(id,like,count){
	if(verifyUser=="NO"){swal("Opps!!","You are not logged in yet, please login or register first.","info"); }
	else{
			
			if(count=="NULL"){
				$("#likeBtn").removeClass("btn-danger");
				$("#likeBtn").addClass("btn-warning");

				$.post("strickers/likeFeedPost.php",{feedId:id},function(data){
					if(data=="add"){feedData.feedLike++;}
					if(data=="minus"){feedData.feedLike--;}
					$("#likeBtn").html('<i class="glyphicon glyphicon-thumbs-up"></i> Like '+feedData.feedLike);

				});
			}
			else{
				$("#likeBtn"+count).removeClass("btn-danger");
				$("#likeBtn"+count).addClass("btn-warning");
				var likeCount=parseInt($("#likeBtnCount"+count).text());
				//alert("Feed Like Before: "+likeCount);
				$.post("strickers/likeFeedPost.php",{feedId:id},function(data){
					if(data=="add"){likeCount++;}
					if(data=="minus"){likeCount--;}
					$("#likeBtn"+count).html('<i class="glyphicon glyphicon-thumbs-up"></i> Like <span id="likeBtnCount'+count+'">'+likeCount+'</span>');

				});
			}
			
		}
}


function viewComment(id,count){
	
			$("#viewCommentBtn"+count).addClass("disabled");
			$("#viewCommentBtn"+count).text("Loading..");
			window.location.href="viewComments?post="+id;

}

function viewLike(id,count){
	
			$("#viewLikeBtn"+count).addClass("disabled");
			$("#viewLikeBtn"+count).text("Loading..");
			window.location.href="viewLike?post="+id;			
}

function addComment(id,like,count){

	if(verifyUser=="NO"){swal("Opps!!","You are not logged in yet, please login or register first.","info"); }
	else{
		
			
			if(count=="NULL"){count=""; var feed=parseInt($("#feedCommentCount"+count).text()); }
			else{var feed=parseInt($("#feedCommentCount"+count).text()); }

			var comment=$("#newComment"+count).val();
			
			if(comment == "" || comment == null){swal("Opps!","Comment Box Empty.","info");}
			else{
				$("#commentBtn"+count).addClass("disabled");
				$("#commentBtn"+count).text("Posting");
				feed++;
				$("#feedCommentContainer"+count).html('<span id="feedCommentCount'+count+'">'+feed + '</span> Comment');
				var comment=$("#newComment"+count).val();
				
				$.post("strickers/postFeedComment.php",{feedId:id,feedComment:comment},function(data){
					if(data==0){
					$("#commentBtn"+count).removeClass("disabled");
					$("#newComment"+count).val("");
					$("#commentBtn"+count).text("Post");
					swal("Success !!","Comment Posted Successfully","success");
					if(count=="NULL" || count==""){getAllComment(id);}
					}
					if(data==1){
					$("#commentBtn"+count).removeClass("disabled");
					$("#commentBtn"+count).text("Post");
					swal("Error!!","Comment Not Posted, Please Contact Admin","error");
					}
				
				});
			
			}
		}
}

function addComment2(id){
	if(verifyUser=="NO"){swal("Opps!!","You are not logged in yet, please login or register first.","info"); }
	else{

		var comment=$("#newComment2").val();
		var feed=parseInt($("#feedCommentCount0").text());
		if(comment=="NULL" || comment==""){swal("Opps!!","Text Box Empty.","info"); }
		else{
			$("#commentBtn2").addClass("disabled");
			$("#commentBtn2").text("Posting");
			feed++;
			$("#feedCommentContainer0").html('<span id="feedCommentCount0">'+feed+'</span> Comment');
			
			$.post("strickers/postFeedComment.php",{feedId:id,feedComment:comment},function(data){
			if(data==0){
			$("#commentBtn2").removeClass("disabled");
			$("#newComment2").val("");
			$("#commentBtn2").text("Post");
			swal("Success !!","Comment Posted Successfully","success");
			getAllComment(id);
			}
			if(data==1){
			$("#commentBtn2").removeClass("disabled");
			$("#commentBtn2").text("Post");
			swal("Error!!","Comment Not Posted, Please Contact Admin","error");
			}
							
			});
		}
	}
}

//----------------------------------------------------------------------------------------------------------------------------------------
// Post Image Feed Functions----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------

function generatePictureForm(){
	if(verifyUser=="NO"){swal("Opps!!","You are not logged in yet, please login or register first.","info"); }
	else{
			var noOfPic=$("#noOfPicture").val();
			
			var formContainerText='';
			var typeTest=isNaN(noOfPic);
			if(typeTest==true){swal("Error!", "Invalid Input");}
			else if(noOfPic==""){swal("Error!", "Box Should Not Be Empty");}
			else if(noOfPic>5){swal("Error!", "Number Should Not Be Grater Than Five(5)");}
			else{
				
				formContainerText=
				'<input type="hidden" name="noOfImage" value="'+noOfPic+'" />'
				+'<h4 class="text-center text-bold">Select Pictures</h4>'
				+generateBoxes(noOfPic)
				+'<div class="form-group">'
				+'<b>Caption</b>'
				
				+'<textarea type="text" id="feedText" onkeyup="checkChar(\'feedText\')" name="feedText" maxlength="1000" rows="3" class="form-control btn-white" placeholder="Image Caption" required ></textarea>'
				
				+'</div>'
				+'<div class="alert alert-info text-black"><b>Note:</b> '
				+'Image should not be more than 10Mb.</div> '
				+'<div class="form-group">'
				+'<button id="pictureUploadBtn" class="form-control btn-success">Upload</button>'
				+'</div>';
				$("#formDisplayContainer").hide();
				$("#formDisplayContainer2").show();
				$("#postImageFeedForm").html(formContainerText);
			}
		}
}

function generateBoxes(noOfPic){
	var formBox=""; 
	var completeFormBox="";
	var no=1;
	for(no;no<=noOfPic;no++){
				
		formBox='<div class="form-group">'
		+'<input type="file" name="image'+no+'" class="form-control btn-white" required />'
		+'</div>';
		completeFormBox=completeFormBox+formBox;		
	} 
		return completeFormBox;
}

//---------------------------------------------------------------------------------------------------------------------------------------
// View Member Profile Function ---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------

function getUserPhotos(info){ //Get User Photos For Member Profile
	$.getJSON("strickers/getMemberPictures.php?pageInfo="+info,function(data){
		var pic='';
		var i=0;
		
		for(i;i<data.length;i++){
			pic+=' <a title="Your Photo"><img src="'+data[i].feedUrl.replace("../","")+'" class="imgPostFeed img-responsive" width="400" height="300" alt="Photo"></a>';
		}
		$("#photoContainer").html(pic);
	});
}

function getProfileData(info){ //Get Profile Data For Both Current And Viewer Profile
	$.getJSON("strickers/getProfileData.php?pageInfo="+info,function(data){
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
		
		if(info=="mainMemberProfile"){
			updateForm='<div class="row">';
			updateForm+='<div class="col-md-6"><div class="form-group">Username: <input id="updateUsername" onkeyup="checkChar(\'updateUsername\')" name="userName" maxlength="15" placeholder="Username" value="'+data.userName+'" class="form-control " type="text" disabled /></div></div>';
			updateForm+='<div class="col-md-6"><div class="form-group">Full Name:<input id="updateFullname" onkeyup="checkChar(\'updateFullname\')" name="fullName" maxlength="25" placeholder="Full Name" value="'+data.fullName+'" class="form-control" type="text" /></div></div>';
			updateForm+='<div class="col-md-6"><div class="form-group">Password: <input id="updateKey" onkeyup="checkChar(\'updateKey\')" name="key" maxlength="15" placeholder="Password" value="'+data.accessKey+'" class="form-control" type="password" /></div></div>';
			updateForm+='<div class="col-md-6"><div class="form-group">Phone Number: <input id="updatePhone" onkeyup="checkChar(\'updatePhone\')" name="phoneNumber" maxlength="15" placeholder="Phone Number" value="'+data.phoneNumber+'" class="form-control" type="number" /></div></div>';
			updateForm+='<div class="col-md-6"><div class="form-group">Address: <textarea id="updateAddress" onkeyup="checkChar(\'updateAddress\')" name="address" maxlength="199" class="form-control" type="text" placeholder="Address">'+data.address+' </textarea></div></div>';
			updateForm+='<div class="col-md-6"><div class="form-group">About: <textarea id="updateAbout" onkeyup="checkChar(\'updateAbout\')" name="about"  maxlength="200" class="form-control" type="text" placeholder="About You">'+data.aboutme+'</textarea></div></div>';
			updateForm+='<div class="col-md-6"><div class="form-group">Gender: <input id="updateGender" onkeyup="checkChar(\'updateGender\')" name="gender" maxlength="8" value="'+data.gender+'" placeholder="Gender" class="form-control" type="text" /></div></div>';
			updateForm+='<div class="col-md-6"><div class="form-group">Date of Birth: <input id="updateBirth" onkeyup="checkChar(\'updateBirth\')" name="birthdate" maxlength="10" placeholder="Date Of Birth" value="'+data.birthdate+'" class="form-control" type="text" /></div></div>';
			updateForm+='<div class="col-md-6"><div class="form-group">Home Town: <input id="updateHome" onkeyup="checkChar(\'updateHome\')" name="hometown" maxlength="15" value="'+data.hometown+'" placeholder="Home Town" class="form-control" type="text" /></div></div>';
			updateForm+='<div class="col-md-6"><div class="form-group">Language: <input id="updateLanguage" onkeyup="checkChar(\'updateLanguage\')" name="language" maxlength="15" value="'+data.language+'" placeholder="Language" class="form-control" type="text" /></div></div>';
			updateForm+='<div class="form-group pad-10"><button id="updateDataBtn" class="btn btn-primary btn-block" >Update Data</button></div>';
			updateForm+='</div>';
		}

		if(info=="mainMemberProfile"){
			$("#updateAccountInfoForm").html(updateForm);
			$("#updateProfilePic").attr("src",data.profilePic.replace("../",""));
			$("#profilePicHead").attr("src",data.profilePic.replace("../",""));
		}
		else { $("#profilePicHead").attr("src",data.profilePic.replace("../","")); }
		
		$("#profileInfo1").html(info1);
		$("#profileInfo2").html(info2);
		
	});

}

function updateProfileData(data){

	data=JSON.parse(data);
	
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
	updateForm+='<div class="col-md-6"><div class="form-group">Username: <input id="updateUsername" onkeyup="checkChar(\'updateUsername\')" name="userName" maxlength="15" placeholder="Username" value="'+data.userName+'" class="form-control " type="text" disabled /></div></div>';
	updateForm+='<div class="col-md-6"><div class="form-group">Full Name:<input id="updateFullname" onkeyup="checkChar(\'updateFullname\')" name="fullName" maxlength="25" placeholder="Full Name" value="'+data.fullName+'" class="form-control" type="text" /></div></div>';
	updateForm+='<div class="col-md-6"><div class="form-group">Password: <input id="updateKey" onkeyup="checkChar(\'updateKey\')" name="key" maxlength="15" placeholder="Password" value="'+data.accessKey+'" class="form-control" type="password" /></div></div>';
	updateForm+='<div class="col-md-6"><div class="form-group">Phone Number: <input id="updatePhone" onkeyup="checkChar(\'updatePhone\')" name="phoneNumber" maxlength="15" placeholder="Phone Number" value="'+data.phoneNumber+'" class="form-control" type="number" /></div></div>';
	updateForm+='<div class="col-md-6"><div class="form-group">Address: <textarea id="updateAddress" onkeyup="checkChar(\'updateAddress\')" name="address" maxlength="199" class="form-control" type="text" placeholder="Address">'+data.address+' </textarea></div></div>';
	updateForm+='<div class="col-md-6"><div class="form-group">About: <textarea id="updateAbout" onkeyup="checkChar(\'updateAbout\')" name="about"  maxlength="200" class="form-control" type="text" placeholder="About You">'+data.aboutme+'</textarea></div></div>';
	updateForm+='<div class="col-md-6"><div class="form-group">Gender: <input id="updateGender" onkeyup="checkChar(\'updateGender\')" name="gender" maxlength="8" value="'+data.gender+'" placeholder="Gender" class="form-control" type="text" /></div></div>';
	updateForm+='<div class="col-md-6"><div class="form-group">Date of Birth: <input id="updateBirth" onkeyup="checkChar(\'updateBirth\')" name="birthdate" maxlength="10" placeholder="Date Of Birth" value="'+data.birthdate+'" class="form-control" type="text" /></div></div>';
	updateForm+='<div class="col-md-6"><div class="form-group">Home Town: <input id="updateHome" onkeyup="checkChar(\'updateHome\')" name="hometown" maxlength="15" value="'+data.hometown+'" placeholder="Home Town" class="form-control" type="text" /></div></div>';
	updateForm+='<div class="col-md-6"><div class="form-group">Language: <input id="updateLanguage" onkeyup="checkChar(\'updateLanguage\')" name="language" maxlength="15" value="'+data.language+'" placeholder="Language" class="form-control" type="text" /></div></div>';
	updateForm+='<div class="form-group pad-10"><button id="updateDataBtn" class="btn btn-primary btn-block" >Update Data</button></div>';
	updateForm+='</div>';

	$("#updateAccountInfoForm").html(updateForm);
		
	$("#profileInfo1").html(info1);
	$("#profileInfo2").html(info2);
		
}

//***************************************************************************************************************************************
// View Main Member Function -------------------------------------------------------------------------------------------------------------
//***************************************************************************************************************************************

function getMemberPosts(data){
			data=JSON.stringify(data);
			feedData=JSON.parse(data);
			
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
				text+='<span class="description">'+moment(feedData[i].datePosted,"YYYY-MM-DD hh:mm").format("MM/DD/YYYY hh:mm A")+'</span></div></div>';

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
				text+='</div></div></div>';
				fullFeed=fullFeed+text;
				
				}
				$("#loader").hide();
				$("#feedDesignContainer").html(fullFeed);
		}
		$("#refreshProfileFeed").removeClass("disabled");
		$("#refreshProfileFeed").html('<i class="glyphicon glyphicon-refresh"></i> Refresh');
}

function getProfileFeeds(countStart,countStop){
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
				text+='<span class="description">'+moment(feedData[i].datePosted,"YYYY-MM-DD hh:mm").format("MM/DD/YYYY hh:mm A")+'</span></div></div>';

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
				text+='</div></div></div>';
				fullFeed=fullFeed+text;
				
				}
				$("#loader").hide();
				$("#feedDesignContainer").html(fullFeed);
		}
		$("#refreshProfileFeed").removeClass("disabled");
		$("#refreshProfileFeed").html('<i class="glyphicon glyphicon-refresh"></i> Refresh');
	});	
}


function editFeed(id,count){
	$("#editFeedContainer"+count).toggle();
}

function updateFeed(id,count){
	var text=$("#textFeed"+count).val();
	if(text=="" || text== null){swal("Opps!!","Edit Box Empty.","info");}
	else{
		$("#updateFeedBtn"+count).addClass("disabled");
		$("#updateFeedBtn"+count).html('<i class="glyphicon glyphicon-share"></i> Updating...');
		
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
}

function deleteFeed(id,count){
	var confirm=window.confirm("Are You Sure You Want To Delete This ??");
	if(confirm==true){
		$("#deleteBtn"+count).addClass("disabled");
		$("#deleteBtn"+count).html('<i class="glyphicon glyphicon-remove"></i> Deleting...');
		$.post("strickers/deleteFeed.php",{feedId:id},function(data){
			if(data==0){
			swal("Success","Post Deleted Successfully","success");
			$("#deleteBtn"+count).removeClass("disabled");
			$("#deleteBtn"+count).html('<i class="glyphicon glyphicon-remove"></i> Delete');
			$("#feedContainer"+count).hide();
			}
			if(data==1){swal("Error","Post Not Deleted, Please Contact Admin","error");}
		});
	}
	if(confirm==false){}

}

//***************************************************************************************************************************************
// View Feed Likes Function -------------------------------------------------------------------------------------------------------------
//***************************************************************************************************************************************

function getAllLikes(){
		$.getJSON("strickers/getFeedLikes.php",function(data){
			likeData=data;
			var i=0;
			var text='';
			var fullLike='';
			
			if(likeData.length==0){
			$("#viewLikeContainer").html('<li class="list-group-item"><b>No Like On This Post For Now, Be The First To Like</b><span class="badge"><i class="glyphicon glyphicon-heart"></i></span></li>');
			
			}
			else
			{	for(i=0;i<likeData.length;i++){
				text='<li class="list-group-item">'+likeData[i].loverUsername+'<span id="viewMemberProfileUsername'+i+'" onclick="setViewMemberId('+likeData[i].loverId+','+i+')" class="badge btn btn-primary"><i class="glyphicon glyphicon-heart"></i> View Profile</span></li>';
				fullLike=fullLike+text; }
				$("#viewLikeContainer").html(fullLike);	
			}
		
	});	
}


//***************************************************************************************************************************************
// View Comments Function -------------------------------------------------------------------------------------------------------------
//***************************************************************************************************************************************

function getCommentFeed(id){
		$.getJSON("strickers/getCommentFeed.php?feedId="+id,function(data){
			feedData=data;
			var i=0;
			var text='';
			var fullFeed='';
			
				text='<div class="box box-widget"><div class="box-header with-border"><div class="user-block">';
				text+='<img class="img-circle imgContainer" src="'+feedData.posterPic.replace("../","")+'" alt="User Image">';
				text+='<span class="username"><a id="viewMemberProfileUsername" onclick="setViewMemberId('+feedData.posterId+')">'+feedData.posterUsername+'</a></span>';
				text+='<span class="description">'+moment(feedData.datePosted,"YYYY-MM-DD hh:mm").format("MM/DD/YYYY hh:mm A")+'</span></div></div>';

				text+='<div class="box-body" style="display: block;">';
				if(feedData.feedType=="imageFeed"){
				text+='<center><img class="img-responsive pad-10 imgFeed" src="'+feedData.feedUrl.replace("../","")+'" alt="Photo" /></center>';}
				text+='<p class="well well-sm">'+feedData.feedText.replace(/\n/g,"<br />")+'</p>';
			  
				text+='<button id="likeBtn" onclick="likePost('+feedData.feedId+','+feedData.feedLike+',\'NULL\')" type="button" class="btn btn-danger btn-xs"><i class="glyphicon glyphicon-thumbs-up"></i> Like '+feedData.feedLike+'</button>';
				text+='<span id="feedCommentContainer" class="pull-right text-muted">'+feedData.feedComment+' Comments</span></div>';
			
				text+='<div class="box-footer" style="display: block;">';
				text+='<img class="img-responsive img-circle imgContainer img-sm" id="memberCommentPic" src="" alt="Alt Text">';
				text+='<div class="img-push">';
				text+='<div class="input-group ">';
				text+='  <input id="newComment" maxlength="500" type="text" class="form-control input-sm" placeholder="Your comment"  onkeyup="checkChar(\'newComment\')" >';
				text+='<span class="input-group-btn"><button id="commentBtn" onclick="addComment('+feedData.feedId+','+feedData.feedComment+',\'NULL\')" class="btn btn-sm btn-primary" type="button">Post</button></span>';
				text+='</div></div></div></div>';
				
				
				fullFeed=fullFeed+text;
				$("#feedPost").html(fullFeed);

				if(verifyUser=="NO"){$("#memberCommentPic").attr("src","profilePic/default.png");}
				else{ var pic=localStorage.myData; pic=JSON.parse(pic);
					  $("#memberCommentPic").attr("src",pic.memberPic.replace("../","")); }

				
			
	});	
}

//**************************************************************************************************************************************
//Get Post Comment Fro View Comments Page
//**************************************************************************************************************************************

function getPostComment(data){

		data=JSON.stringify(data);
		commentData=JSON.parse(data);
			var i=0;
			var text='';
			var text2='';
			var fullComment='';
			
			if(commentData.length==0){
			$("#commentContainer").html('<div class="alert alert-info"><h4>No Comment Yet, Be The First To Post A Comment</h4></div>');
			}
			else{
			
				for(i=0;i<commentData.length;i++){
				text='<div class="timeline-entry">';
				text+='<div class="timeline-stat">';
				text+='		<div class="timeline-icon"><img src="'+commentData[i].profilePic.replace("../","")+'" class="imgContainer" alt="Profile picture"></div>';
				text+='		<div class="timeline-time">'+moment(commentData[i].datePosted,"YYYY-MM-DD hh:mm").format("MM/DD/YYYY hh:mm A")+'</div>';
				text+='	</div>';
				text+='	<div class="timeline-label">';
				text+='	<h4 class="mar-no pad-btm"><a href="viewMemberProfile?member='+commentData[i].commenterId+'" class="text-success">'+commentData[i].commenterUsername+'</a></h4>';
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
				text2+='<span class="input-group-btn"><button id="commentBtn2" onclick="addComment2('+commentData[0].postFeedId+')" class="btn btn-sm btn-primary" type="button">Post</button></span>';
				text2+='</div></div></div>';
				text2+='</div>';
				
				$("#commentContainer").html(fullComment);
				$("#comment2").html(text2);
				var pic=$("#memberCommentPic").attr("src");
				$("#memberCommentPic2").attr("src",pic); 
			}
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
			//getMemberData();
			}
			else{
			
				for(i=0;i<commentData.length;i++){
				text='<div class="timeline-entry">';
				text+='<div class="timeline-stat">';
				text+='		<div class="timeline-icon"><img src="'+commentData[i].profilePic.replace("../","")+'" class="imgContainer" alt="Profile picture"></div>';
				text+='		<div class="timeline-time">'+moment(commentData[i].datePosted,"YYYY-MM-DD hh:mm").format("MM/DD/YYYY hh:mm A")+'</div>';
				text+='	</div>';
				text+='	<div class="timeline-label">';
				text+='	<h4 class="mar-no pad-btm"><a href="viewMemberProfile?member='+commentData[i].commenterId+'" class="text-success">'+commentData[i].commenterUsername+'</a></h4>';
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
				var pic=$("#memberCommentPic").attr("src");
				$("#memberCommentPic2").attr("src",pic); 
			
				}
		
	});	
}




//***************************************************************************************************************************************
// Buddies Function -------------------------------------------------------------------------------------------------------------
//***************************************************************************************************************************************

function getMembers(countStart,countStop){
		$.getJSON("strickers/getMembers.php?countStart="+countStart+"&countStop="+countStop+"",function(data){
			
			var i=0;
			var text='';
			var fullMembers='';
			if(data.length==0){swal("Sorry!!","There Are No More Users To Display","info");}
			else{
			
				for(i=0;i<data.length;i++){
				
				text='<li class="list-group-item"><div style="display:inline">';
				text+='<img class="img-responsive imgContainer img-post-size img-circle " src="'+data[i].profilePic.replace("../","")+'" style="display:inline" />';
				text+='<h4 style="display:inline"> <a href="viewMemberProfile?member='+data[i].memberId+'" class="text-black">'+data[i].userName+'</a></h4>';
				text+='<button id="addBuddyBtn'+i+'" onclick="addBuddy('+data[i].memberId+','+i+')" class="btn btn-primary pull-right" style="display:inline"><i class="glyphicon glyphicon-plus"></i></button>';
				text+='</div></li>';
				fullMembers=fullMembers+text;
				
				}
				$("#membersContainer").html(fullMembers);
				
				
				
		}
	});	
}

function getMyBuddies(countStart,countStop){
		$.getJSON("strickers/getMyBuddies.php?countStart="+countStart+"&countStop="+countStop+"",function(data){
			
			var i=0;
			var text='';
			var fullMembers='';
			$("#noOfBuddies").text(data.length);
			if(data.length==0){
			fullMembers='<div class="alert alert-info">There Is No More Friend/Buddy On Your List</div>';
			$("#myBuddiesContainer").html(fullMembers);
			$("#showMyNextBuddies").hide();
			$("#refreshMyBuddyList").show();
			$("#refreshMyBuddyList").removeClass("disabled");
			$("#refreshMyBuddyList").html('<i class="glyphicon glyphicon-refresh"></i> Refresh');
			
			}
			else{
			
				for(i=0;i<data.length;i++){
				
				text='<li class="list-group-item" id="buddy'+i+'"><div style="display:inline">';
				text+='<img class="img-responsive imgContainer img-post-size img-circle " src="'+data[i].profilePic.replace("../","")+'" style="display:inline" />';
				text+='<h4 style="display:inline"> <a href="viewMemberProfile?member='+data[i].memberId+'" class="text-black">'+data[i].userName+'</a></h4>';
				text+='<div class="pull-right" style="display:inline"> <a title="Chat" id="addBuddyBtn'+i+'" href="chatMessages?buddy='+data[i].memberId+'" class="btn btn-sm btn-primary " onClick="setChatId('+data[i].memberId+'); return false;" ><i class="glyphicon glyphicon-comment"></i></a>';
				text+=' <button title="Delete Friend" id="addBuddyBtn'+i+'" onclick="deleteBuddy('+data[i].memberId+','+i+')" class="btn btn-sm btn-danger " ><i class="glyphicon glyphicon-trash"></i></button>';
				text+='</div></div></li>';
				fullMembers=fullMembers+text;
				
				}
				$("#myBuddiesContainer").html(fullMembers);
				$("#refreshMyBuddyList").hide();
				$("#showMyNextBuddies").show();
				
				
				
		}
	});	
}

function getBuddyRequest(){
		$.getJSON("strickers/getBuddyRequest.php",function(data){
			
			var i=0;
			var text='';
			var fullRequest='';
			$("#noOfRequest").text(data.length);
			if(data.length==0){
			fullRequest='<div class="alert alert-info">There Is No Friend/Buddy Request For Now</div>';
			$("#myBuddyRequestContainer").html(fullRequest);
			}
			
			else{
				
				for(i=0;i<data.length;i++){
				
				text='<li class="list-group-item"><div style="display:inline">';
				text+='<img class="img-responsive imgContainer img-post-size img-circle " src="'+data[i].profilePic.replace("../","")+'" style="display:inline" />';
				text+='<h4 style="display:inline"><a href="viewMemberProfile?member='+data[i].memberId+'" class="text-black"> '+data[i].userName+'</a></h4>';
				text+='<button id="acceptBuddyBtn'+i+'" onclick="acceptBuddy('+data[i].memberId+','+i+')" class="btn btn-primary pull-right" style="display:inline"><i class="glyphicon glyphicon-plus"></i></button>';
				text+='</div></li>';
				fullRequest=fullRequest+text;
				
				}
				$("#myBuddyRequestContainer").html(fullRequest);
				
				
				
		}
	});	
}


function addBuddy(id,count){
	$("#addBuddyBtn"+count).removeClass("btn-primary");
	$("#addBuddyBtn"+count).addClass("btn-success");
	$("#addBuddyBtn"+count).addClass("disabled");
	$("#addBuddyBtn"+count).html('<i class="glyphicon glyphicon-ok"></i>');
	$.post("strickers/addBuddy.php",{userId:id});
}

 function acceptBuddy(id,count){
	$("#acceptBuddyBtn"+count).removeClass("btn-primary");
	$("#acceptBuddyBtn"+count).addClass("btn-success");
	$("#acceptBuddyBtn"+count).addClass("disabled");
	$("#acceptBuddyBtn"+count).html('<i class="glyphicon glyphicon-ok"></i>');
	$.post("strickers/acceptBuddy.php",{userId:id});
}

function deleteBuddy(id,count){
	var confirm=window.confirm("Are You Sure You Want To Delete This Friend From Your List ?? Note All Chats With This Person Would Also Be Deleted!");
	if(confirm==true){
		$.post("strickers/deleteBuddy.php",{buddyId:id},function(data){
			if(data==0){
			swal("Success","Buddy Deleted Successfully","success");
			$("#buddy"+count).hide();
			}
			if(data==1){swal("Error","Buddy Not Deleted, Please Contact Admin","error");}
		});
	}
	if(confirm==false){alert("Grate Choice");}

}

function chatWithMyBuddy(id,count){	
	$("#seeMyBuddyProfile"+count).text("Loading Chat...");
		$.post("strickers/setChatWithId.php",{chatWithId:id,action:"setId"});
		if($("#pageInfo").text()=="buddiesPage"){$("#viewsBuddyContainer").hide();}
		if($("#pageInfo").text()=="buddyChatPage"){$("#chatListContainer").hide();}
		$("#viewBuddyChatContainer").show();
		getBuddyMessage();  // "getBuddyMessage" Fn gets New Messag
		changeMsgStatus();  // "changeMsgStatus" shows the message has been read to avoid counting it.			
}


//Buddy Chat Functions

function sendMessage(){
	var messageText=$("#sendMessageText").val();
	var chatWith=getCookie("chatWithId");
	$.post("strickers/postBuddyMessage.php",{message:messageText,chatWithId:chatWith},function(data){
		$("#sendMessageBtn").removeClass("disabled");
		$("#sendMessageBtn").text('Send');
		$("#sendMessageText").val('');
		if(data==0){swal(data);}
		else{swal(data);}
		//if(data==1){swal("Error !!","Please Contact Admin","error");}
	});

}


function getBuddyMessage(){
	var chatWith=getCookie("chatWithId");
	$.getJSON("strickers/getBuddyMessage.php?chatWithId=" + chatWith,function(data){
		var myId=getCookie("loginId");
		var myUsername=getCookie("loginUser");
		var i=0;
		var text='';
		var fullMsg='';
			if(data.length==0){
			fullMsg='<div class="alert alert-info">There Is No Message For Now</div>';
			$("#chatContainer").html(fullMsg);
			}
			else{
			
				for(i=0;i<data.length;i++){
				
				if(data[i].senderId==myId){
				text='<div class="direct-chat-msg right">';
				text+='<div class="direct-chat-info clearfix">';
				text+='<span class="direct-chat-name pull-right">'+myUsername+'</span>';
				text+='<span class="direct-chat-timestamp pull-left">'+moment(data[i].datePosted,"YYYY-MM-DD hh:mm").format("MM/DD/YYYY hh:mm A")+'</span>';
				text+='</div><div class="direct-chat-text">'+data[i].message+'</div></div>';
				
				}
				else{
				
				text='<div class="direct-chat-msg"><div class="direct-chat-info clearfix">';
				text+='<span class="direct-chat-name pull-left">'+data[i].userName+'</span>';
				text+='<span class="direct-chat-timestamp pull-right">'+moment(data[i].datePosted,"YYYY-MM-DD hh:mm").format("MM/DD/YYYY hh:mm A")+'</span>';
				text+='</div><div class="direct-chat-text">'+data[i].message+'</div></div>';
				}
				
				
				fullMsg=fullMsg+text;
				
				}
				$("#chatContainer").html(fullMsg);
				
				
				
		}
		getMessageInterval=setTimeout(getBuddyMessage,2000);
	});
}


//***************************************************************************************************************************************
// Buddies Function -------------------------------------------------------------------------------------------------------------
//***************************************************************************************************************************************
function getMyChatList(countStart,countStop){
        chatId=[];
		$.getJSON("strickers/getMyChatList.php?countStart="+countStart+"&countStop="+countStop+"",function(data){
			
			var i=0;
			var text='';
			var fullMembers='';
			if(data.length==0){
			fullMembers='<div class="alert alert-info">There Is No Chat Activity On Your List</div>';
			$("#chatList").html(fullMembers);
			$("#showMyNextBuddies").hide();
			$("#refreshMyBuddyList").show();
			$("#refreshMyBuddyList").removeClass("disabled");
			$("#refreshMyBuddyList").html('<i class="glyphicon glyphicon-refresh"></i> Refresh');
			
			}
			else{
			
				for(i=0;i<data.length;i++){
				
				text='<li class="list-group-item" id="buddy'+i+'"><div style="display:inline">';
				text+='<img class="img-responsive imgContainer img-post-size img-circle " src="'+data[i].profilePic.replace("../","")+'" style="display:inline" />';
				text+='<h4 style="display:inline"> <a  class="text-black" href="viewMemberProfile?member='+data[i].memberId+'">'+data[i].userName+'</a></h4>';
				text+='<div class="pull-right" style="display:inline"> <a title="Chat" id="addBuddyBtn'+i+'" href="chatMessages?buddy='+data[i].memberId+'" class="btn btn-primary " onClick="setChatId('+data[i].memberId+'); return false;"><i class="glyphicon glyphicon-envelope"></i> <b id="chatCount'+i+'"></b></a> ';
				//text+=' <button title="Delete Friend" id="addBuddyBtn'+i+'" onclick="deleteBuddy('+data[i].memberId+','+i+')" class="btn btn-sm btn-danger " ><i class="glyphicon glyphicon-trash"></i></button>';
				text+='</div></div></li>';
				fullMembers=fullMembers+text;
                chatId.push(data[i].memberId);
				
				}

				$("#chatList").html(fullMembers);
				$("#refreshMyBuddyList").hide();
				$("#showMyNextBuddies").show();
                localStorage.chatId=JSON.stringify(chatId);
				getMsgCount();
				
				
		}
	});	
}


function getMsgCount(){
	$.getJSON("strickers/getMsgCount.php",function(chat){
		localStorage.chat=JSON.stringify(chat);
		startMsgCount();
	});
}

function startMsgCount(){
	
	var chatId=JSON.parse(localStorage.chatId);
	var chat=JSON.parse(localStorage.chat);
	var chatCount=0;
	
	for(var j=0; j<chatId.length; j++){
		
		for(var i=0; i<chat.length; i++){
				if(chatId[j]==chat[i].senderId){chatCount++;}
		}

		$("#chatCount"+j).text(chatCount);
		chatCount=0;
	}

}

function changeMsgStatus(){
	$.get("strickers/changeMsgStatus.php",function(){
          checkMsgStatusInterval=setTimeout(changeMsgStatus,3000);
       });
}


//----------------------------------------------------------------------------------------------------------------------------------------
// Search Functions----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------

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
						text+='<span class="username"><a href="viewMemberProfile?member='+data[i].posterId+'">'+data[i].posterUsername+'</a></span>';
						text+='<span class="description">'+moment(data[i].datePosted,"YYYY-MM-DD hh:mm").format("MM/DD/YYYY hh:mm A")+'</span></div></div>';

						text+='<div class="box-body" style="display: block;">';
						if(data[i].feedType=="imageFeed"){
						text+='<img class="img-responsive pad-10 imgPostFeed" src="'+data[i].feedUrl.replace("../","")+'" alt="Photo">';}
						text+='<p class="well well-sm">'+data[i].feedText.replace(/\n/g,"<br />")+'</p>';
					  
						text+=' <a href="viewComments?post='+data[i].feedId+'" class="btn btn-info btn-xs"><i class="glyphicon glyphicon-comment"></i> View Post</a>';
						text+='<span class="pull-right text-muted"><b>'+data[i].feedLike+' Like </b></span></div>';
					
						text+='</div>';
						fullContent=fullContent+text;
						
						}
						
					}
				
				if(searchKey=="friends"){
					for(i=0;i<data.length;i++){
					
						text='<li class="list-group-item"><div style="display:inline">';
						text+='<img class="img-responsive imgContainer img-post-size img-circle " src="'+data[i].profilePic.replace("../","")+'" style="display:inline" />';
						text+='<h4 style="display:inline"> <a href="viewMemberProfile?member='+data[i].memberId+'">'+data[i].userName+'</a></h4>';
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
				//getMemberData(data.length);
	});	
}

//----------------------------------------------------------------------------------------------------------------------------------------
// Support Functions----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------

function getMemberData(){		

	var myJSON="{\"memberUsername\" : \""+getCookie("loginUser")+"\",\"memberPic\" : \""+getCookie("loginPic")+"\" }";
	myJSON=JSON.parse(myJSON);
	$("#memberUsername").text(myJSON.memberUsername); $("#memberPic").attr("src",myJSON.memberPic.replace("../",""));
	var page=$("#pageInfo").text();
	if(page=="buddyChatPage" || page=="buddiesPage"){$("#myId").val(getCookie("loginId")); }
	localStorage.myData=JSON.stringify(myJSON);		

	setTimeout(getTotalMsgCount,10000);	
}


function assignData(count){
	var no=0;
	if(verifyUser=="YES"){
		var data=localStorage.myData;
		data=JSON.parse(data);
		
		$("#memberUsername").text(data.memberUsername); $("#memberPic").attr("src",data.memberPic.replace("../",""));
		for(no;no<count;no++){$("#memberCommentPic"+no).attr("src",data.memberPic.replace("../","")); }
		
	}
	else{
			$("#memberUsername").text("GUEST"); $("#memberPic").attr("src","profilePic/default.png");
			for(no;no<count;no++){$("#memberCommentPic"+no).attr("src","profilePic/default.png"); }
	}
				
}

function checkChar(id){
	var me=$("#"+id);
	if(/[<;(){}$]/g.test(me.val())){me.val(me.val().replace(/[<;(){}$]/g,'')); swal("[<;(){}$] Are Not Allowed");}
}	

function setViewMemberId(id,count){		
	$("#viewMemberProfileUsername"+count).text("Loading Profile...");
	if($("#pageInfo").text()=="buddiesPage"){$("#viewMemberProfile"+count).text("Loading Profile...");}
	if($("#pageInfo").text()=="buddyChatPage"){$("#seeMyBuddyProfile"+count).text("Loading Profile...");}
	if($("#pageInfo").text()=="searchPage"){$("#viewMemberProfileUsername"+count).text("Loading Profile...");}
	$.post("strickers/setViewMemberId.php",{viewMemberId:id,action:"setId"},function(data){	
		if(data==0){window.location.href="viewMemberProfile.html";} });
}
		
function verifyLogin(){
	var verify=getCookie("loginId");
	if(verify != ""){
		status="YES"; verifyUser="YES"; //getMemberData();
	}

	
	if($("#pageInfo").text()=="buddiesPage"){goBuddies();}	
	if($("#pageInfo").text()=="buddyChatPage"){goChatBuddies();}
	
	
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "path=/";
}
	
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function logout(){
	document.cookie="loginId=; expires=Thu, 18 Dec 1999 12:00:00 UTC; path=/";		
	document.cookie="loginUser=; expires=Thu, 18 Dec 1999 12:00:00 UTC; path=/";		
	document.cookie="loginName=; expires=Thu, 18 Dec 1999 12:00:00 UTC; path=/";		
	document.cookie="loginPic=; expires=Thu, 18 Dec 1999 12:00:00 UTC; path=/";		
	$.post("../strickers/logout.php",function(data){if(data==0){window.location.href="../index"; } });	
}

function setChatId(id){
	document.cookie="chatWithId=; expires=Thu, 18 Dec 1999 12:00:00 UTC; path=/";	
	setCookie("chatWithId",id,"30");
	this.submit();
}