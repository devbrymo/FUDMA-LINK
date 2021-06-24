<?php 
	
		include("../../strickers/dbCon.php");
		session_start();
		
		$dir="../profilePic/";
		$postPicture=postImage($dir,"accountPic");
		$postPicture=str_replace("'", "\'", $postPicture);
		
		if(!empty($postPicture)){
			$sql1="UPDATE members SET profilePic='{$postPicture}' WHERE memberId={$_SESSION["loginId"]}";
			$sql2="UPDATE postFeed SET posterPic='{$postPicture}' WHERE posterId={$_SESSION["loginId"]}";
			$sql3="UPDATE feedLikes SET profilePic='{$postPicture}' WHERE loverId={$_SESSION["loginId"]}";
			$sql4="UPDATE feedComment SET profilePic='{$postPicture}' WHERE commenterId={$_SESSION["loginId"]}";
			
			$query1=mysqli_query($connection, $sql1);
			$query2=mysqli_query($connection, $sql2);
			$query3=mysqli_query($connection, $sql3);
			$query4=mysqli_query($connection, $sql4);
			if(($query1)&&($query2)&&($query3)&&($query4)){ $_SESSION["profilePic"]=$postPicture; echo $postPicture; } 
				else{echo 1;}
		}
		
		mysqli_close($connection);
?>
<?php
	function postImage($dir,$name)
	{ 
		// Getting file name
            $filename = $_FILES[$name]['name'];
         
            // Valid extension
            $valid_ext = array('png','jpeg','jpg','gif');

            // Location
            $location = $dir.$filename;

            // file extension
            $file_extension = pathinfo($location, PATHINFO_EXTENSION);
            $file_extension = strtolower($file_extension);

            // Check extension
            if(in_array($file_extension,$valid_ext)){  

                // Compress Image
                $file=compressImage($_FILES[$name]['tmp_name'],$location,10);
				return $file;

            }else{
                echo "Invalid file type.";
            }
		
	}
	
	 // Compress image
        function compressImage($source, $destination, $quality) {

            $info = getimagesize($source);

            if ($info['mime'] == 'image/jpeg') 
                $image = imagecreatefromjpeg($source);

            elseif ($info['mime'] == 'image/gif') 
                $image = imagecreatefromgif($source);

            elseif ($info['mime'] == 'image/png') 
                $image = imagecreatefrompng($source);

            if(imagejpeg($image, $destination, $quality)){return $destination;}
			else{return "";}

        }
?>

