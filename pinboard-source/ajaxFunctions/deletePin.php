<?php
// get the q parameter from URL
session_start();
$servername = "localhost";
$username = "root";
$dbname = "pinboard";
$password = "qwertyhero";
//$servername = "lovett.usask.ca";
//$username = "cmpt350_amm215";
//$dbname = "cmpt350_amm215";
//$password = "5eukmjjz9w";
$email = $_SESSION["email"];

$id = (int)$_POST["id"];


//create connection to the database

$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//$conn = new mysqli($servername, $username, $password, $dbname);

	//select all the pin information for this user
	$sql = "DELETE FROM pin_table WHERE id = ".$id.";";
	$result = $conn->query($sql);
	echo $sql;

















?>