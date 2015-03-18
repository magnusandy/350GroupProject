<?php
// get the q parameter from URL
session_start();
$servername = "104.236.254.188";
$username = "root";
$dbname = "pinboard";
$password = "qwertyhero";
$email = $_SESSION["email"];
//create connection to the database
$conn = new mysqli($servername, $username, $password, $dbname);
if($conn->connect_error)
{
	die("connection failed" . $conn->connect_error);
}
else
{
	//select all the pin information for this user
	$sql = "SELECT * FROM pin_table WHERE email = '".$email."';";
	$result = $conn->query($sql);
	if($result->num_rows > 0)
	{
		$markers = array(); 
		/*
		build up a set of associative arrays that are representative of marker data
		*/
		while($row = $result->fetch_assoc())
		{
			$markerRow = array(
				"id" => (int)$row["id"],
				"title" => $row["title"],
				"address" => $row["address"],
				"lat" => (double)$row["lat"],
				"lng" => (double)$row["lng"],
				"description" => $row["description"],
				"isVisited" => (bool)$row["isVisited"]
			);
			array_push($markers, $markerRow);
		}
		echo json_encode($markers);
	}
}
















?>