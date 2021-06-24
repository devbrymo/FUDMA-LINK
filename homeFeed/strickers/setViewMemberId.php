<?php
session_start();
	if((isset($_POST["action"]))&&($_POST["action"]=="setId")){
	$viewMemberId=$_POST["viewMemberId"];
	$_SESSION["viewMemberId"]=$viewMemberId;
	echo 0;
	}
	
	if((isset($_GET["action"]))&&($_GET["action"]=="getId")){
	echo "{$_SESSION["viewMemberId"]}";
	}
?>