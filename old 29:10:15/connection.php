<?php
/*
* common.php *
* Rev 1 *
* 27/09/2015 *
*
* @reference http://forums.devshed.com/php-faqs-stickies-167/program-basic-secure-login-system-using-php-mysql-891201.html *
*/ 
//common.php accesses the mySQL database
//variables
//login data
//$user = $_REQUEST['username'];
//$email = $_REQUEST['email'];
//$username = "1819848_ms";
//$password = "mathsmash1";
$username = "root";
$password = "root";
$host = "localhost";
$dbname = "TREKR";
//$host = "fdb13.biz.nf";
//$dbname = "1819848_ms";

try{
    $db = new PDO("mysql:host={$host}; port=8889; dbname={$dbname};charset=UTF8", $username, $password, $options);
} catch (PDOException $ex) {
    die("Failed to connect to the database: " . $ex->getMessage()); 
}
//configure PDO to throw exception if error encountered
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

//return db rows using associative array - will have string indexes where string value
//represents the column name
$db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC); 

/*mysql_connect("localhost","root","root") or die(mysql_error());
mysql_select_db("TREKR") or die(mysql_error());



$result = mysql_query("SELECT username, email FROM login WHERE username = '$user'");
while($row = mysql_fetch_array($result)){
	if($user = $row["username"]){
		echo $row["id"];	
	}
	else{
		echo "failed getting user";
	}

}*/
?>