<?php
session_start();
	if((isset($_POST["action"]))&&($_POST["action"]=="setId")){
	$feedId=$_POST["feedId"];
	$_SESSION["viewFeedId"]=$feedId;
	echo 0;
	}
	
	if((isset($_GET["action"]))&&($_GET["action"]=="getId")){
	echo "{$_SESSION["viewFeedId"]}";
	}
?>