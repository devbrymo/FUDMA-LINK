	function displayEmptyFeed(){
		document.getElementById("emptyFeed").innerHTML=
		"<div class='jumbotron alert-info text-center'>"
		+"<h4>There are no more post to display.</h4> <br>"
		+"<p><a href='home.php' class='btn btn-info'>Click here to go back home</a></p>"
		+"<p>OR</p>"
		+"<p><a href='bloghome.php' >Click Here To View The Fudma Baze Blog</a></p>"
		+"<p><a href='gp_calculator.php' >Click Here To Use the Gp Calculator</a></p>"
		+"<p><a href='handout.php' >Click Here To Go to the Handout Portal</a></p>"
		+"<p><a href='cartoonize.php' >Click Here To View The Cartoonize Portal</a></p>"
		+"</div>";
	}
	
	var profilePicture=new Array();
	var userName=new Array();
	var userId=new Array();
	var feedText=new Array();
	var feedType=new Array();
	var feedUrl=new Array();
	
	
	
	