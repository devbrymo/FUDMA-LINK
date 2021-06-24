<?php
//declare the database connection variables
    
    define("DSN", "mysql:dbName=fudmadropbox");
    define("USERNAME", "root");
    define("PASSWORD", "");

    
    //function to connect to database
    function connect(){
        $connection = new PDO(DSN, USERNAME, PASSWORD);
        $connection->setAttribute(PDO::ATTR_PERSISTENT, true);
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $sql = "USE fudmadropbox";
        $connection->query($sql);
        
        return $connection;
    }

    function disconnect($connection){
        $connection = "";
    }
?>
