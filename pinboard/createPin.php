<?php
// get the q parameter from URL
session_start();
$servername = "lovett.usask.ca";
$username = "cmpt350_amm215";
$dbname = "cmpt350_amm215";
$password = "5eukmjjz9w";
$email = $_SESSION["email"];

$title = $_POST["title"];
$address = $_POST["address"];
$lat = (double)$_POST["lat"];
$lng = (double)$_POST["lng"];
$desc = $_POST["description"];
$isVisited = $_POST["isVisited"];

//create connection to the database
$conn = new mysqli($servername, $username, $password, $dbname);
if($conn->connect_error)
{
	die("connection failed" . $conn->connect_error);
}
else
{
	//select all the pin information for this user
	$sql = "INSERT INTO pin_table (email, title, address, lat, lng, description, isVisited) VALUES ('".$email."', '".$title."', '".$address."', ".$lat.", ".$lng.", '".$desc."', ".$isVisited.");";
	$conn->query($sql);
	echo $sql;
}
















?>