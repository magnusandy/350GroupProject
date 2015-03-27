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
//$email = $_SESSION["email"];

$id =(int)$_POST["id"];
$title = $_POST["title"];
$desc = $_POST["description"];
$isVisited = (boolean)$_POST["isVisited"];


//create connection to the database
try{
	$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $conn->prepare("UPDATE pin_table SET title=?, description=?, isVisited=? WHERE id=?");

	$ti = ifEmptySetNull($title);
	$de = ifEmptySetNull($desc);
	$Is = $isVisited;
	$stmt->execute(array($ti,$de,$Is,$id));
}
catch(PDOException $e)
{
	echo "xplosive failz";
}

function ifEmptySetNull($data)
{
	if(empty($data))
	{
		return NULL;
	}
	else
	{
		return $data;
	}
}

















?>