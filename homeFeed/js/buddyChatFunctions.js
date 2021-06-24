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


function getMyChatList(countStart,countStop){
                chat=new Array();
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
				text+='<h4 style="display:inline"> <a id="seeMyBuddyProfile'+i+'" class="text-black" onclick="setViewMemberId('+data[i].memberId+','+i+')">'+data[i].userName+'</a></h4>';
				text+='<div class="pull-right" style="display:inline"> <button title="Chat" id="addBuddyBtn'+i+'" onclick="chatWithMyBuddy('+data[i].memberId+','+i+')" class="btn btn-primary " ><i class="glyphicon glyphicon-envelope"></i> <b id="chatCount'+i+'"></b></button> ';
				//text+=' <button title="Delete Friend" id="addBuddyBtn'+i+'" onclick="deleteBuddy('+data[i].memberId+','+i+')" class="btn btn-sm btn-danger " ><i class="glyphicon glyphicon-trash"></i></button>';
				text+='</div></div></li>';
				fullMembers=fullMembers+text;
                                chat[i]=data[i].memberId;
				
				}
				$("#chatList").html(fullMembers);
				$("#refreshMyBuddyList").hide();
				$("#showMyNextBuddies").show();
                setTimeout(getMsgCount,2000);
				
				
				
		}
	});	
}



function getMsgCount(){
	var i=0;
	for(i;i<chat.length;i++){
		
		$.ajax({
			type:"POST",
			url:"strickers/getMsgCount.php",
			data:{memberId:chat[i]},
			async:false,
			success:function(count){
				 $("#chatCount"+i).text(count); 
				 //alert(count);
			}
		});
	}
	
}


function getMemberData(){
	
	$.getJSON("strickers/getMemberData.php",function(data){
		$("#memberUsername").text(data.userName); 
		$("#memberPic").attr("src",data.profilePic.replace("../",""));
		$("#myId").val(data.memberId);
		$("#myUsername").val(data.userName);
		$("#myPic").val(data.profilePic.replace("../",""));
		
	});
}

function deleteBuddy(id,count){
	var confirm=window.confirm("Are You Sure You Want To Delete This Friend From Your List ??");
	if(confirm==true){
		$.post("strickers/deleteBuddy.php",{buddyId:id},function(data){
			if(data==0){
			swal("Success","Buddy Deleted Successfully","success");
			$("#buddy"+count).hide();
			}
			if(data==1){swal("Error","Buddy Not Deleted, Please Contact Admin","error");}
		});
	}
	

}

function setViewMemberId(id,count){
	
	$("#seeMyBuddyProfile"+count).text("Loading Profile...");
	$.post("strickers/setViewMemberId.php",{viewMemberId:id,action:"setId"},function(data){
				if(data==0){window.location.href="viewMemberProfile.html";}
			});
}

function changeMsgStatus(){
	$.get("strickers/changeMsgStatus.php",function(){
          checkMsgStatusInterval=setTimeout(changeMsgStatus,3000);
       });
}

function chatWithMyBuddy(id,count){
	
	$("#seeMyBuddyProfile"+count).text("Loading Chat...");
	$("#chatListContainer").slideUp(1000,function(){
		$.post("strickers/setChatWithId.php",{chatWithId:id,action:"setId"});
		$("#viewBuddyChatContainer").slideDown(700);

	        // "getBuddyMessage" Fn gets New Messag
		// "changeMsgStatus" shows the message has been read to avoid counting it

                getBuddyMessage();
		changeMsgStatus();
		
		
	});
	
	
	
}

function verifyLogin(){
	$.post("../strickers/madone.php",function(data){if(data==1){window.location.href="../index.html";}});	
}

function logout(){
	$.post("../strickers/logout.php",function(data){if(data==0){window.location.href="../index.html";}});	
}

//Buddy Chat Functions

function sendMessage(){
	var messageText=$("#sendMessageText").val();
	$.post("strickers/postBuddyMessage.php",{message:messageText},function(data){
		$("#sendMessageBtn").removeClass("disabled");
		$("#sendMessageBtn").text('Send');
		$("#sendMessageText").val('');
		if(data==0){}
		if(data==1){swal("Error !!","Please Contact Admin","error");}
	});

}

function getBuddyMessage(){
	$.getJSON("strickers/getBuddyMessage.php",function(data){
		var myId=$("#myId").val();
		var myUsername=$("#myUsername").val();
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
				text+='<span class="direct-chat-timestamp pull-left">'+moment(data[i].datePosted).fromNow().toString()+'</span>';
				text+='</div><div class="direct-chat-text">'+data[i].message+'</div></div>';
				
				}
				else{
				
				text='<div class="direct-chat-msg"><div class="direct-chat-info clearfix">';
				text+='<span class="direct-chat-name pull-left">'+data[i].userName+'</span>';
				text+='<span class="direct-chat-timestamp pull-right">'+moment(data[i].datePosted).fromNow().toString()+'</span>';
				text+='</div><div class="direct-chat-text">'+data[i].message+'</div></div>';
				}
				
				
				fullMsg=fullMsg+text;
				
				}
				$("#chatContainer").html(fullMsg);
				
				
				
		}
		getMessageInterval=setTimeout(getBuddyMessage,2000);
	});
}