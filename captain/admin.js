$(document).ready(function(){
    verifyLogin();
    dashboardCount();
    checkMe();

    countStart=0;
    countStop=20;
    activeView="dashboardView";

    getReport();
    getUsers(countStart,countStop);
    

    $("#dashboardViewBtn").click(function(){$("#"+activeView).hide(); $("#dashboardView").show(); activeView="dashboardView";  });
    $("#membersViewBtn").click(function(){$("#"+activeView).hide(); $("#membersView").show(); activeView="membersView"; });
    $("#searchViewBtn").click(function(){$("#"+activeView).hide(); $("#searchView").show(); activeView="searchView"; });
    $("#reportViewBtn").click(function(){$("#"+activeView).hide(); $("#reportView").show(); activeView="reportView"; });
    $("#profileViewBtn").click(function(){$("#"+activeView).hide(); $("#profileView").show(); activeView="profileView"; });

    $("#membersViewBtn2").click(function(){$("#"+activeView).hide(); $("#membersView").show(); activeView="membersView"; });
    $("#searchViewBtn2").click(function(){$("#"+activeView).hide(); $("#searchView").show(); activeView="searchView"; });
    $("#reportViewBtn2").click(function(){$("#"+activeView).hide(); $("#reportView").show(); activeView="reportView"; });
    $("#profileViewBtn2").click(function(){$("#"+activeView).hide(); $("#profileView").show(); activeView="profileView"; });
    $("#showNextSearchList").hide();
   $('[data-toggle="offcanvas"]').click(function(){
       $("#navigation").toggleClass("hidden-xs");
   });

   //showNextUsers For Members List
   $("#showNextUsers").click(function(){
            $("#loader").show();
            countStart+=20;
            getUsers(countStart,countStop);
    });

   $("#refreshUsers").click(function(){
            $("#loader").show();
            countStart=0;
            getUsers(countStart,countStop);
    });

   //Search Form Jquery
   $("#searchForm").on("submit",(function(e){
            e.preventDefault();
             $("#loader").show();
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

   //showNextSearchList (Search Result)
   $("#showNextSearchList").click(function(){
        $("#loader").show();
        countStart+=10;
                if($("input[id=searchFriend]:checked").length==1){
                    getSearchResult($("#searchWord").val(),"friends",countStart,countStop);
                }
                
                if($("input[id=searchPost]:checked").length==1){
                    getSearchResult($("#searchWord").val(),"posts",countStart,countStop);
                }
    });

    //UPDATE PROFILE ACCOUNT PICTURE---------------------------------------------------------------------------------------------------------------------------------------

    $("#updateAccountPicForm").on("submit",(function(e){
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
                     if(data!=1){
                        
                        $("#profilePic1").attr("src",data.replace("../","../homeFeed/"));
                        $("#profilePic2").attr("src",data.replace("../","../homeFeed/"));
                        $("#profilePic3").attr("src",data.replace("../","../homeFeed/"));
                        $("#profilePic4").attr("src",data.replace("../","../homeFeed/"));
                        
                        swal("Success !!","Account Picture Updated","success");
                        $("#updateProfilePicBtn").removeClass("disabled");
                        $("#updateProfilePicBtn").text("Update Picture");
                        
                        updateMe(data);
                     
                     }
                     if(data==1){swal("Error !!",data,"error");
                         $("#updateProfilePicBtn").removeClass("disabled");
                         $("#updateProfilePicBtn").text("Update Picture");
                     }
                     
                    
                  } 
                
                });
            
        }));

    //UPDATE PROFILE ACCOUNT DATA------------------------------------------------------------------------------------------------------------------------------------------
        
        $("#updateAccountInfoForm").on("submit",(function(e){
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
                     if(data==0){
                     swal("Success !!","Account Data Updated","success");
                     //$("#emailInput").val($("#emailInput").val());
                     //updateMe();
                     
                     }
                     if(data!=0){swal("Error !!","Incorrect Password, Try Again Or Contact Developer","error");}
                     
                     $("#updateDataBtn").removeClass("disabled");
                     $("#updateDataBtn").text("Update Data");

                  } 
                
                });
            
        }));
        
        
});




//************************************************************************************************************************************
//************************************************************************************************************************************
// DASH BOARD FUNCTIONS
//************************************************************************************************************************************
//************************************************************************************************************************************


//************************************************************************************************************************************
//GET MEMBERS FUNCTION ***************************************************************************************************************
//************************************************************************************************************************************

 function getUsers(countStart,countStop){
            $("#loader").show();
                $.getJSON("strickers/getUsers.php?countStart="+countStart+"&countStop="+countStop+"",function(data){
                    
                    var i=0;
                    var text='';
                    var tBody='';
                    
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
                            tBody=tBody+text;
                            
                            }
                            var tHead='<tr class="bg-primary"><th>Full Name</th><th>Username</th><th>Phone</th><th>Key</th><th>Gender</th><th>Date Added</th><th>Delete</th></tr>';
                            
                            $("#membersListContainer").html('<table class="table table-bordered table-sm">'+tHead+tBody+'</table>');
                            $("#loader").hide();
                        
                        }
            }); 
}

function deleteUser(id,count){
        var confirm=window.confirm("Are You Sure You Want To Delete This User ??");
        if(confirm==true){
            $.post("strickers/deleteUser.php",{userId:id},function(data){
                if(data==0){
                swal("Success","User Deleted Successfully","success");
                $("#userRow"+count).hide();
                $("#userSearch"+count).hide();
                }
                if(data==1){swal("Error","User Not Deleted","error");}
                
            });
        }
}

//************************************************************************************************************************************
//GET SEARCH RESULT FUNCTION ***************************************************************************************************************
//************************************************************************************************************************************


 function getSearchResult(searchWord,searchKey,countStart,countStop){
        $.getJSON("../homeFeed/strickers/getSearchResult.php?searchWord="+searchWord+"&searchKey="+searchKey+"&countStart="+countStart+"&countStop="+countStop+"",function(data){
           
            
            var i=0;
            var text='';
            var fullContent='';
            
            if(data.length==0){
            fullContent='<div class="alert alert-info">No More Result Found For <b>'+searchWord+'</b> </div>';
            $("#showNextSearchList").hide(); $("#loader").hide(); }
            else{
                
                if(searchKey=="posts"){
                    for(i=0;i<data.length;i++){
                    
                        text='<div class="imgContainer" id="feedContainer'+i+'"><div class="myBox box-widget"><div class="box-header with-border"><div class="user-block">';
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
                    
                        text='<li class="list-group-item" id="userSearch'+i+'"><div style="display:inline">';
                        text+='<img class="img-responsive imgContainer img-post-size img-circle " src="../homeFeed/'+data[i].profilePic.replace("../","")+'" style="display:inline" />';
                        text+='<h4 style="display:inline; color:black;" id="viewMemberProfileUsername2'+i+'"> '+data[i].userName+'</h4>';
                        text+='<div style="display:inline" class="pull-right"><button id="deleteUserBtn'+i+'" onclick="deleteUser('+data[i].memberId+','+i+')" class="btn btn-danger " ><i class="fa fa-trash"></i> </button> ';
                        text+=' <button id="addBuddyBtn'+i+'" onclick="setViewMemberId2('+data[i].memberId+','+i+')" class="btn btn-primary " ><i class="fa fa-search-plus"></i> </button> ';
                        text+='</div></div></li>';
                        fullContent=fullContent+text;
                        
                        }
                        fullContent='<ul class="list-group">'+fullContent+'</ul>';
                    }

                $("#showNextSearchList").show();
                
            }           
                $("#searchResultContainer").html(fullContent);
                $("#searchBtn").removeClass("disabled");
                $("#searchBtn").html('<i class="glyphicon glyphicon-search"></i> Search');
                $("#loader").hide();
                //getMemberData(data.length);
    }); 
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


//************************************************************************************************************************************
//GET REPORT FUNCTION ***************************************************************************************************************
//************************************************************************************************************************************
function getReport(){
                $.getJSON("strickers/getReport.php",function(data){
                    
                    var i=0;
                    var text='';
                    var tBody='';
                    
                    if(data.length==0){
                    $("#mainReportContainer").html('<div class="alert alert-info">Opps!! There are no report or message yet</div>');
                    
                    }
                    else{
                    
                            for(i=0;i<data.length;i++){
                            text='<tr id="reportRow'+i+'">';
                            text+='<td>'+data[i].fullName+'</td>';  
                            text+='<td>'+data[i].contact+'</td>';
                            text+='<td>'+data[i].message+'</td>';
                            text+='<td>'+data[i].datePosted+'</td>';
                            text+='<td><button class="btn btn-danger btn-block" onclick="deleteReport('+data[i].id+','+i+')"><i class="glyphicon glyphicon-trash"></i></button></td>';
                            
                            text+='</tr>';
                            tBody=tBody+text;
                            
                            }
                            var tHead='<tr class="bg-primary"><th>Fullname</th><th>Contact</th><th>Message</th><th>Date Posted</th><th>Delete</th></tr>';
                            $("#reportContainer").html('<table class="table table-bordered">'+tHead+tBody+'</table>');
                        
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

//************************************************************************************************************************************
//SUPPORT FUNCTION ***************************************************************************************************************
//************************************************************************************************************************************

function checkMe(){
    var myData=localStorage.zababu;
    if(myData=="" || (myData==null || myData=="null")){window.location.href="index.html";}
    else{
        myData=JSON.parse(myData);
       $("#profilePic1").attr("src",myData.profilePic.replace("../","../homeFeed/"));
       $("#profilePic2").attr("src",myData.profilePic.replace("../","../homeFeed/"));
       $("#profilePic3").attr("src",myData.profilePic.replace("../","../homeFeed/"));
       $("#profilePic4").attr("src",myData.profilePic.replace("../","../homeFeed/"));
       //$("#emailInput").val(myData.email);
    }
}

function updateMe(pic)
{
    var myData=JSON.parse(localStorage.zababu);
    myData["profilePic"]=pic;
    localStorage.zababu=JSON.stringify(myData);

}
function dashboardCount(){
    $.get("strickers/dashboardCount.php",function(data){
        data=JSON.parse(data);
        
        $("#userCount").text(data.userCount);
        $("#reportCount").text(data.reportCount);
        $("#reportCount2").text(data.reportCount);
    });
}


 function verifyLogin(){
            $.post("../strickers/madone.php",function(data){if(data==1){window.location.href="index.html";}});  
 }

 function logout(){
            localStorage.removeItem("zababu");
            $.post("../strickers/logout.php",function(data){if(data==0){window.location.href="index.html";}});  
 }