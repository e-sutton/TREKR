<?php
    // get connection to DB
    include("connection.php"); 

    $username = $_POST['username'];
    //$email    = $_GET['email'];

    $sql = "select count(*) from login where username = :username";
            // parameter
             $query_params = array( 
            ':username' => $username
            //':email' => $_POST['username']
        ); 
    try 
        { 
            // run query
            $stmt = $db->prepare($sql); 
            $result = $stmt->execute($query_params); 
        } 
        catch(PDOException $ex) 
        { 
             
            echo("Failed to run query: " . $ex->getMessage()); 
        } 


    //$row = $stmt->fetch(); 
    if($result > 0){
    	echo "Login successful";
    }
    else{
    	echo "Login unsuccessful, username = "+$username;
    }




?>