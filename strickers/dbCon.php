<?php

$connection=mysqli_connect("localhost","root","","fudmadropbox");
if(!$connection)
{
	die("Connection Not Successfull" .mysqli_connect_error());
}

?>