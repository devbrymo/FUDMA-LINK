<?php
include("../../strickers/dbCon.php");
session_start();

    date_default_timezone_set("Africa/Lagos");
	$noOfImage=$_POST["noOfImage"];
	$feedType="imageFeed";
	$feedText=str_replace("'", "\'", $_POST["feedText"]);
	$date=date('Y-m-d H:i:s');
	$folder="../imageUpload/";
	$file="";
	
	for($i=1;$i<=$noOfImage;$i++){
			$file=postImageFeed($folder,"image$i");
            $file=str_replace("'", "\'", $file); 
			$sql="INSERT INTO postFeed SET posterId={$_SESSION["loginId"]},posterUsername='{$_SESSION["userName"]}',  "
			."posterPic='{$_SESSION["profilePic"]}',feedType='{$feedType}',feedText='{$feedText}',feedUrl='{$file}',datePosted='{$date}'";
			if(!$file==""){
			$post=mysqli_query($connection,$sql);
			if($post){echo 0;} else{echo 1;}
			}
		}
mysqli_close($connection);		

?>

<?php
	function postImageFeed($dir,$name)
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
                $file=compressImage($_FILES[$name]['tmp_name'],$location,20);
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

