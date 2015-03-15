<?php
// get the q parameter from URL
$email = $_REQUEST["q"];
session_start();
$_SESSION["email"] = $email;
echo $_SESSION["email"];
?>