<?php 

	include("../../strickers/dbCon.php");
	session_start();
	if(isset($_SESSION["loginId"])){

		$loginUser=$_SESSION["loginId"];
		$sql="SELECT count(*) FROM buddyChat WHERE receiverId={$loginUser} AND status=0  ";
		$post=mysqli_query($connection,$sql);
		if($post){$post=mysqli_fetch_array($post);}
		else{echo mysqli_error($connection);}
	      
	    if($post){echo $post["count(*)"];}
		
	}
	else{echo 0;}
	mysqli_close($connection);

?>
