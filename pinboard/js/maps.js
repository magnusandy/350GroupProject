var initialLocation;
var marker;
var siberia = new google.maps.LatLng(60, 105);
var newyork = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
var supportFlag = new Boolean();     
var directionDisplay;
var geocoder;
var map;
var curMarker = new google.maps.Marker;
var name;
var address;
var description;
var isVisited;
var clickEvent;
var currentOnClick;
var allMarkers;
function initialize()
	{
		geocoder = new google.maps.Geocoder();
		directionDisplay = new google.maps.DirectionsRenderer();
		var myOptions = {
			zoom: 2,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		map = new google.maps.Map(document.getElementById('map-canvas'), myOptions);
		directionDisplay.setMap(map);
		
		//Loop through all the markers from the database and add them to the map
		for(var i = 0; i < allMarkers.length; i++)
		{
			 placeMarker(allMarkers[i]["lat"],allMarkers[i]["lng"],allMarkers[i]["title"],allMarkers[i]["isVisited"])
		}
		map.setCenter(new google.maps.LatLng(25,10));
  
		// Try W3C Geolocation (Preferred)
		
	
	google.maps.event.addListener(map, 'click', function(event){
		showPinForm();
		//clickEvent = event;
		currentOnClick = event.latLng;
	});
}
	
function showPinForm(){
	var pinForm = document.getElementById("newPinForm");
	var currentClass = pinForm.className;
	if(currentClass == "hidden"){
		pinForm.className = "";
	}
}
	
function submitPin(){
	name = document.getElementById("pinName").value;
	address = document.getElementById("pinAddress").value;
	description = document.getElementById("pinDescription").value;
	isVisited = document.getElementById("pinIsVisited");
	if(isVisited.checked)
	{
		isVisited = true;
	}
	else
	{
		isVisited = false;
	}
	if(name != ""){
		createPin(name,address,currentOnClick.lat(),currentOnClick.lng(),description,isVisited);
	} else {
		var pinError = document.getElementById("pinNameError");
		pinError.className = "";
	}
}

/*
Creates and AJAX request to insert a new pin into the database, takes 
title, address, lat, lng, description and isVisited as parameters, the email 
for a Pin is retrieved from the session and the id is generated in the Database.
*/
function createPin(title, address, lat, lng, description, isVisited) {    
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			window.location = "display.php";
        }
    }
	var postParams = "title="+title+"&address="+address+"&lat="+lat+"&lng="+lng+"&description="+description+"&isVisited="+isVisited;
    xmlhttp.open("POST", "ajaxFunctions/createPin.php", true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send(postParams);
}

/*
A simple function that creates a confirmation dialog before deleting a pin
*/
function confirmDelete(id)
{
	var confirm = window.confirm("Are you sure you want to delete?")
	if(confirm)
	{
		deletePin(id);
	}
	else
	{
		
	}
}

/*
	Deletes pin based on its id
*/
function deletePin(id) {    
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			window.location = "display.php";
		}
	}
	var postParams = "id="+id;
	xmlhttp.open("POST", "ajaxFunctions/deletePin.php", true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(postParams);
}

/*
When using this function, you need to be careful what you pass in, because 
the database does not care what you pass, whatever is in (or not in) the title 
and description variables will be put into the database, so if the user does not want to
change the Title/Description, make sure the old ones are passed in. Also, the isVisited param 
MUST BE a boolean not an empty string or something else it wont work.
*/
function updatePin(id, title, description, isVisited) {    
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				//DO WHATEVER YOU WANT TO DO WHEN UPDATE IS COMPLETE
            }
        }
		var postParams = "id="+id+"&title="+title+"&description="+description+"&isVisited="+isVisited;
        xmlhttp.open("POST", "ajaxFunctions/updatePin.php", true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlhttp.send(postParams);
	}

/* Takes in 4 variables and makes a marker using them
	pinLat : latitude of the pin
	pinLng : longitude of the pin
	pinName : the title for the pin
	description : the description for the pin
*/
function placeMarker(pinLat,pinLng,pinName,isVisited){
	var latLng = new google.maps.LatLng(pinLat, pinLng);
	var img;
	if(isVisited == true)
	{
		img = "img/visited.png";
	}
	else
	{
		img = "img/unvisited.png";	
	}
	var marker = new google.maps.Marker({
		//Takes the individual Lat and Lng and parses them into a location for position
		position:  latLng,
		map: map,
		title: pinName,
		icon: img
	});
}

google.maps.event.addDomListener(window, 'load', initialize);