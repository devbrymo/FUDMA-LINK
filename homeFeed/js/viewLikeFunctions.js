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


function getMemberData(){
	
	$.getJSON("strickers/getMemberData.php",function(data){
		$("#memberUsername").text(data.userName);
		$("#memberPic").attr("src",data.profilePic.replace("../",""));
		
		
	});
}

function setViewMemberId(id,count){
	
	$("#viewMemberProfileUsername"+count).text("Loading...");
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