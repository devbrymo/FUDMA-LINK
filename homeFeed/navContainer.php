<nav class="navbar bg-black navbar-fixed-top " >   
		  <div class="container ">
			<div class="row">
				<div class="col-md-6 ">
				
				<h4 class="text-bold text-center"><span style="color:gold;">FUDMA</span> <span style="color:#3596ff;">LINK</span></h4>
				
				</div>
				
				<div class="col-md-6 ">
				<h4 class="text-white">The Home For All Fudma Student, Its A Place To Be</h4>
				
				</div>
		  </div>
		  
		  </div>
</nav>

<?php 
	session_start();
	if(isset($_COOKIE["loginId"])){
		if(!isset($_SESSION["loginId"])){
			$_SESSION["loginId"]=$_COOKIE["loginId"]; 
			$_SESSION["userName"]=$_COOKIE["loginUser"];	
			$_SESSION["profilePic"]=$_COOKIE["loginPic"];	
			$_SESSION["fullName"]=$_COOKIE["loginName"];
		}	
	}
?>		