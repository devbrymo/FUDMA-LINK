<?php
//Check If User Is Actually Loged In
if(!isset($_SESSION["loginId"])){
	header("Location: ../");
	exit();
}

?>