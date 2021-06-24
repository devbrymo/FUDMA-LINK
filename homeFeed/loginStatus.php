<?php

	session_start();
	if(isset($_COOKIE["loginId"])){
		$_SESSION["loginId"]=$_COOKIE["loginId"];	
		$_SESSION["userName"]=$_COOKIE["loginUser"];	
		$_SESSION["profilePic"]=$_COOKIE["loginPic"];	
		$_SESSION["fullName"]=$_COOKIE["loginName"];
	}

?>