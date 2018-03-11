<?php

try{
	$dbh = new PDO('mysql:host=localhost;dbname=login', 'root', '');

	$sth = $dbh->query('SELECT * FROM "userlogin" WHERE 1');

	print($sth);
	if (isset($_POST['user_id']) and isset($_POST['user_pass'])){
	
	// Assigning POST values to variables.
	$username = $_POST['user_id'];
	$password = $_POST['user_pass'];

	$find = $bdh->query("SELECT * FROM 'user_login' WHERE username='$username' and password='$password'")->fetchColumn();

	// CHECK FOR THE RECORD FROM TABLE
	// $query = "SELECT * FROM `user_login` WHERE username='$username' and Password='$password'";
	 
	// $result = mysqli_query($connection, $query) or die(mysqli_error($connection));
	// $count = mysqli_num_rows($result);

	if ($find == 1){
	//echo "Login Credentials verified";
	echo "<script type='text/javascript'>alert('Login Credentials verified')</script>";
	}
	else{
	echo "<script type='text/javascript'>alert('Invalid Login Credentials')</script>";
	//echo "Invalid Login Credentials";
	}
	}
} catch (PDOException $e){
	print "Error " . $e->getMessage() . " <br/>";
	die();
}
?>