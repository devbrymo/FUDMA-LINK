<?php 

	include("../../strickers/dbConPDO.php");
			
		session_start();
		if(isset($_GET["refresh"])){$deptId=$_SESSION["activeDept"];}
		else{
		$_SESSION["activeDept"]=$_GET["dept"];
		$deptId=$_GET["dept"];
		}
		$sql="SELECT * FROM handoutList WHERE deptId={$deptId}";
		$conn=connect();
		$result = $conn->query($sql);
		$result= $result->fetchAll();
		$output=json_encode($result);
		echo $output;
		
	disconnect($conn);

	

?>
