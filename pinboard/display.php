<?php
session_start();
echo $_SESSION["email"];
?>

<?php?>

<script>
//a email is NOT passed as a param, rather the PHP function will use
//the email from the current session
function getPinsForUser() {    
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var listOfMarkers = JSON.parse(xmlhttp.responseText);
				var markerOne = listOfMarkers[0];
				console.log(markerOne.id) //the int id from the DATABASE
				console.log(markerOne.title) //title of marker
				console.log(markerOne.address) //address possibly empty
				console.log(markerOne.lat) //latitude double
				console.log(markerOne.lng) //longitude double
				console.log(markerOne.description) //description string
				console.log(markerOne.isVisited) // boolean 
				/*
				THIS IS WHERE THE STUFF IS HAPPENING BABY
				the above variable, listOfMarkers is a JSON object that is essentally an
				array of marker information Objects the information can be accessed thusly:
				listOfMarkers[i] is the ith marker information object and has the following fields:
				markerOne = listOfMarkers[0];
				markerOne.id //the int id from the DATABASE
				markerOne.title //title of marker
				markerOne.address //address possibly empty
				markerOne.lat //latitude double
				markerOne.lng //longitude double
				markerOne.description //description string
				markerOne.isVisited // boolean 
				NOTE THAT THIS IS NOT NOT NOT A GOOGLE MAPS MARKER OBJECT SO DONT TRY TO GIVE IT DIRECTLY TO A MAP
				*/
            }
        }
        xmlhttp.open("GET", "getPins.php", true);
        xmlhttp.send();
	}
getPinsForUser();


</script>