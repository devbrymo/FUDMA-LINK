function generatePictureForm(){
	var noOfPic=document.getElementById("noOfPicture").value;
	var formContainer=document.getElementById("formDisplayContainer");
	var typeTest=isNaN(noOfPic);
	if(typeTest==true){swal("Error!", "Invalid Input");}
	else if(noOfPic==""){swal("Error!", "Box Should Not Be Empty");}
	else if(noOfPic>5){swal("Error!", "No Should Not Be Grater Than Five(5)");}
	else{
		
		formContainer.innerHTML=
		'<form action="imageFeedPost.php" method="post"  enctype="multipart/form-data">'
		+'<input type="hidden" name="noOfImage" value="'+noOfPic+'" />'
		+'<h4 class="text-center text-bold">Select Pictures</h4>'
		+generateBoxes(noOfPic)
		+'<div class="form-group">'
		+'<div class="input-group">'
		+'<span class="input-group-addon btn-black">Text</span>'
		+'<input type="text" name="feedText" class="form-control btn-white" required />'
		+'</div>'
		+'</div>'
		+'<div class="alert alert-info text-black"><b>Note:</b> '
		+'Image should not be more than 10Mb.</div> '
		+'<div class="form-group">'
		+'<button name="pictureFeedPost" value="image" class="form-control btn-success">Upload</button>'
		+'</div>'		
		+'</form>';
		
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