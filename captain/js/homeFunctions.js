function getReport(){
				$.getJSON("strickers/getReport.php",function(data){
					
					var i=0;
					var text='';
					var fullText='';
					
					if(data.length==0){
					$("#mainReportContainer").html('<div class="alert alert-info">Opps!! There are no report or message yet</div>');
					
					}
					else{
					
							for(i=0;i<data.length;i++){
							text='<tr id="reportRow'+i+'">';
							text+='<td>'+data[i].fullName+'</td>';
							text+='<td>'+data[i].userName+'</td>';
							text+='<td>'+data[i].phoneNumber+'</td>';
							text+='<td>'+data[i].contact+'</td>';
							text+='<td>'+data[i].message+'</td>';
							text+='<td>'+data[i].datePosted+'</td>';
							text+='<td><button class="btn btn-danger btn-block" onclick="deleteReport('+data[i].id+','+i+')"><i class="glyphicon glyphicon-trash"></i></button></td>';
							
							text+='</tr>';
							fullText=fullText+text;
							
							}
							$("#reportContainer").after(fullText);
						
						}
			});	
		}
		
		function getUsers(countStart,countStop){
				$.getJSON("strickers/getUsers.php?countStart="+countStart+"&countStop="+countStop+"",function(data){
					
					var i=0;
					var text='';
					var fullText='';
					
					if(data.length==0){swal("Opps!!","There Are No More Users To Display.","info"); $("#loader").hide();}
					else{
					
							for(i=0;i<data.length;i++){
							text='<tr id="userRow'+i+'">';
							text+='<td>'+data[i].fullName+'</td>';
							text+='<td>'+data[i].userName+'</td>';
							text+='<td>'+data[i].phoneNumber+'</td>';
							text+='<td>'+data[i].accessKey+'</td>';
							text+='<td>'+data[i].gender+'</td>';
							text+='<td>'+data[i].dateAdded+'</td>';
							text+='<td><button class="btn btn-danger btn-block" onclick="deleteUser('+data[i].memberId+','+i+')"><i class="glyphicon glyphicon-trash"></i></button></td>';
							
							text+='</tr>';
							fullText=fullText+text;
							
							}
							$("#usersContainer").after(fullText);
							$("#loader").hide();
						
						}
			});	
		}
	
	function deleteReport(id,count){
		var confirm=window.confirm("Are You Sure You Want To Delete This ??");
		if(confirm==true){
			$.post("strickers/deleteReport.php",{reportId:id},function(data){
				if(data==0){
				swal("Success","Report Deleted Successfully","success");
				$("#reportRow"+count).hide();
				}
				if(data==1){swal("Error","Report Not Deleted","error");}
				
			});
		}
	}
	
	function deleteUser(id,count){
		var confirm=window.confirm("Are You Sure You Want To Delete This User ??");
		if(confirm==true){
			$.post("strickers/deleteUser.php",{userId:id},function(data){
				if(data==0){
				swal("Success","User Deleted Successfully","success");
				$("#userRow"+count).hide();
				}
				if(data==1){swal("Error","User Not Deleted","error");}
				
			});
		}
	}
	
	function deleteFeed(id,count){
		var confirm=window.confirm("Are You Sure You Want To Delete This ??");
		if(confirm==true){
			$.post("../homeFeed/strickers/deleteFeed.php",{feedId:id},function(data){
				if(data==0){
				swal("Success","Post Deleted Successfully","success");
				$("#feedContainer"+count).hide();
				}
				if(data==1){swal("Error","Post Not Deleted, Please Contact Admin","error");}
			});
		}
		

	}

	function getSearchResult(searchWord,searchKey,countStart,countStop){
		$.getJSON("../homeFeed/strickers/getSearchResult.php?searchWord="+searchWord+"&searchKey="+searchKey+"&countStart="+countStart+"&countStop="+countStop+"",function(data){
			
			
			var i=0;
			var text='';
			var fullContent='';
			
			if(data.length==0){
			fullContent='<div class="alert alert-info">No More Result Found For <b>'+searchWord+'</b> </div>';
			$("#showNextList").hide(); }
			else{
				
				if(searchKey=="posts"){
					for(i=0;i<data.length;i++){
					
						text='<div class="imgContainer" id="feedContainer'+i+'"><div class="box box-widget"><div class="box-header with-border"><div class="user-block">';
						text+='<img class="img-circle imgContainer" src="../homeFeed/'+data[i].posterPic.replace("../","")+'" alt="User Image">';
						text+='<span class="username"><a id="viewMemberProfileUsername'+i+'" onclick="setViewMemberId('+data[i].posterId+','+i+')">'+data[i].posterUsername+'</a></span>';
						text+='<span class="description">'+moment(data[i].datePosted).fromNow().toString()+'</span></div></div>';

						text+='<div class="box-body" style="display: block;">';
						if(data[i].feedType=="imageFeed"){
						text+='<center><img class="img-responsive pad-10 imgFeed" src="../homeFeed/'+data[i].feedUrl.replace("../","")+'" alt="Photo" /></center>';}
						text+='<p class="well well-sm">'+data[i].feedText.replace(/\n/g,"<br />")+'</p>';
					  
						text+=' <button id="viewCommentBtn'+i+'" type="button" onclick="viewComment('+data[i].feedId+','+i+')" class="btn btn-info btn-xs"><i class="glyphicon glyphicon-comment"></i> View Post</button>';
						text+=' <button id="deletePostBtn'+i+'" type="button" onclick="deleteFeed('+data[i].feedId+','+i+')" class="btn btn-danger btn-xs"><i class="glyphicon glyphicon-trash"></i> Delete</button>';
						text+='<span class="pull-right text-muted"><b>'+data[i].feedLike+' Like </b></span></div>';
					
						text+='</div></div>';
						fullContent=fullContent+text;
						
						}
						
					}
				
				if(searchKey=="friends"){
					for(i=0;i<data.length;i++){
					
						text='<li class="list-group-item"><div style="display:inline">';
						text+='<img class="img-responsive imgContainer img-post-size img-circle " src="../homeFeed/'+data[i].profilePic.replace("../","")+'" style="display:inline" />';
						text+='<h4 style="display:inline" id="viewMemberProfileUsername2'+i+'"> '+data[i].userName+'</h4>';
						text+='<button id="addBuddyBtn'+i+'" onclick="setViewMemberId2('+data[i].memberId+','+i+')" class="btn btn-primary pull-right" style="display:inline">View Profile</button>';
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





function viewComment(id,count){
	$("#viewCommentBtn"+count).addClass("disabled");
	$("#viewCommentBtn"+count).text("Loading..");
	$.post("../homeFeed/strickers/setViewFeedId.php",{feedId:id,action:"setId"},function(data){
		if(data==0){window.location.href="../homeFeed/viewComments.html";}
	});
	
}



function setViewMemberId(id,count){
	
	$("#viewMemberProfileUsername"+count).text("Loading Profile...");
	$.post("../homeFeed/strickers/setViewMemberId.php",{viewMemberId:id,action:"setId"},function(data){
				if(data==0){window.location.href="../homeFeed/viewMemberProfile.html";}
			});
}

function setViewMemberId2(id,count){
	
	$("#viewMemberProfileUsername2"+count).text("Loading Profile...");
	$.post("../homeFeed/strickers/setViewMemberId.php",{viewMemberId:id,action:"setId"},function(data){
				if(data==0){window.location.href="../homeFeed/viewMemberProfile.html";}
			});
}

		function verifyLogin(){
			$.post("../strickers/madone.php",function(data){if(data==1){window.location.href="index.html";}});	
		}

		function logout(){
			$.post("../strickers/logout.php",function(data){if(data==0){window.location.href="index.html";}});	
		}