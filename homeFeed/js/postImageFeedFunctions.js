function generatePictureForm(){
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


function checkChar(id){
		var me=$("#"+id);
		if(/[<;(){}$]/g.test(me.val())){me.val(me.val().replace(/[<;(){}$]/g,'')); swal("[<;(){}$] Are Not Allowed");}
		}
		
		
function getMemberData(){
	var no=0;
	$.getJSON("strickers/getMemberData.php",function(data){
		$("#memberUsername").text(data.userName);
		$("#memberPic").attr("src",data.profilePic.replace("../",""));
		
	});
}

function verifyLogin(){
	$.post("../strickers/madone.php",function(data){if(data==1){window.location.href="../index.html";}});	
}

function logout(){
	$.post("../strickers/logout.php",function(data){if(data==0){window.location.href="../index.html";}});	
}	