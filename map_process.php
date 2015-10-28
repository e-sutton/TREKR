<?php
/* Map_Process.php
*  Rev.1
*  @reference: http://www.sanwebe.com/2013/10/google-map-v3-editing-saving-marker-in-database
*  Date: 20/10/15
*/ 
// database settings 
$db_username = 'root';
$db_password = 'root';
$db_name = 'TREKR';
$db_host = 'localhost';

//mysqli
$mysqli = new mysqli($db_host, $db_username, $db_password, $db_name);

if (mysqli_connect_errno()) 
{
    header('HTTP/1.1 500 Error: Could not connect to db!'); 
    exit();
}

//Save and delete markers 
if($_POST) //run only if there's a post data
{
    //make sure request is comming from Ajax
    $xhr = $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest'; 
    if (!$xhr){ 
        header('HTTP/1.1 500 Error: Request must come from Ajax!'); 
        exit(); 
    }
    
    // get marker position and split it for database
    $mLatLang   = explode(',',$_POST["latlang"]);
    $mLat       = filter_var($mLatLang[0], FILTER_VALIDATE_FLOAT);
    $mLng       = filter_var($mLatLang[1], FILTER_VALIDATE_FLOAT);
    $userid     = $_POST["userid"]; 
    
    //Delete Marker
    if(isset($_POST["del"]) && $_POST["del"]==true)
    {
        $results = $mysqli->query("DELETE FROM markers WHERE lat=$mLat AND lng=$mLng AND userid = $userid");
        if (!$results) {  
          header('HTTP/1.1 500 Error: Could not delete Markers!');  
          exit();
        } 
        exit("DB Delte Done!");
    }
    
    $results = $mysqli->query("INSERT INTO markers (lat, lng, userid) VALUES ($mLat, $mLng, $userid)");
    if (!$results) {  
          header('HTTP/1.1 500 Error: Could not create marker!');  
          exit();
    } 
    
    $output = '<h1 class="marker-heading">'.$mName.'</h1><p>'.$mAddress.'</p>';
    exit($output);
}


################ Continue generating Map XML #################

//Create a new DOMDocument object
$dom = new DOMDocument("1.0");
$node = $dom->createElement("markers"); //Create new element node
$parnode = $dom->appendChild($node); //make the node show up 

// Select all the rows in the markers table
$userid  = $_GET["userid"]; 
$results = $mysqli->query("SELECT * FROM markers WHERE userid = $userid");
if (!$results) {  
    header('HTTP/1.1 500 Error: Could not get markers!'); 
    exit();
} 

//set document header to text/xml
header("Content-type: text/xml"); 

// Iterate through the rows, adding XML nodes for each
while($obj = $results->fetch_object())
{
  $node = $dom->createElement("marker");  
  $newnode = $parnode->appendChild($node);   
  $newnode->setAttribute("lat", $obj->lat);  
  $newnode->setAttribute("lng", $obj->lng);   
}
echo $dom->saveXML();
?>