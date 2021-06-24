<?php 

	include("../../strickers/dbCon.php");

	session_start();

	$deptId=$_SESSION["activeDept"];
	$handout=$_POST["handout"];
	$level=$_POST["level"];
	$fileExe=["rtf","pdf","ppt","pptx","doc","dot","docx"];
	$dir="../dir/";
	$file=$dir.basename($_FILES["fileName"]["name"]);
	$exe=pathinfo($file,PATHINFO_EXTENSION);
	$exe=strtolower($exe);
	$exeCheck="FALSE";

	//Check If File Exists

	//if(file_exists($file)){echo "File Already Exists"; exit();}

	//Check File Size

	if($_FILES["fileName"]["size"]>15000000){echo "File Too Large: File Should Not Be More Than 15Mb"; exit();}

	//Check FILE_EXTENSION

	foreach ($fileExe as $key => $value) {
		if($value==$exe){$exeCheck="TRUE";}	
	}
	
	if($exeCheck=="FALSE"){echo "Invalid File Format"; exit();}

	if(move_uploaded_file($_FILES["fileName"]["tmp_name"], $file)){
		$sql="INSERT INTO handoutList (deptId,course,level,dir) VALUES ($deptId,'{$handout}','{$level}','$file')";
		$sql=mysqli_query($connection,$sql);
		if($sql){echo 0;} else {echo "Insertion Error, Please Contact Admin";}
	}
	else{echo "File Not Uploaded";}

	mysqli_close($connection);

?>
