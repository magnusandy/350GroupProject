var initialLocation;
var marker;
var siberia = new google.maps.LatLng(60, 105);
var newyork = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
var supportFlag = new Boolean();     
var directionDisplay;
var geocoder;
var map;
var curMarker = new google.maps.Marker;
var id;
var name;
var address;
var description;
var isVisited;
var clickEvent;
var currentOnClick;
var allMarkers;
var MASTERinfoWindow = new google.maps.InfoWindow();
var tempMarker = new google.maps.Marker();

function excapeChars(parse)
{
	var x = parse.replace("'", "''")
	return x
}

function initialize()
{
	geocoder = new google.maps.Geocoder();
	directionDisplay = new google.maps.DirectionsRenderer();
	var myOptions = {
		zoom: 2,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		zoomControl: false,
		mapTypeControl: false
	};
	map = new google.maps.Map(document.getElementById('map-canvas'), myOptions);
	directionDisplay.setMap(map);
	//Loop through all the markers from the database and add them to the map
	for(var i = 0; i < allMarkers.length; i++)
	{
		 placeMarker(allMarkers[i]["lat"],allMarkers[i]["lng"],allMarkers[i]["title"],allMarkers[i]["isVisited"], allMarkers[i]["description"],allMarkers[i]["address"]);
	}
	map.setCenter(new google.maps.LatLng(25,10));
	google.maps.event.addListener(map, 'click', function(event){
		showPinForm();
		//clickEvent = event;
		currentOnClick = event.latLng;
        tempPlaceMarker(event.latLng);
	});
}
	
function showPinForm(){
	var updatePinForm = document.getElementById("updatePinForm");
	if(updatePinForm.className != "hidden"){
		updatePinForm.className = "hidden";
	}
	var pinForm = document.getElementById("newPinForm");
	if(pinForm.className == "hidden"){
		pinForm.className = "";
	}
}
	
function submitPin(){
	name = document.getElementById("pinName").value;
	name = excapeChars(name);
	address = document.getElementById("pinAddress").value;
	address = excapeChars(address);
	description = document.getElementById("pinDescription").value;
	description = excapeChars(description);
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
function updatePin() {    
   var xmlhttp = new XMLHttpRequest();
   xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			//DO WHATEVER YOU WANT TO DO WHEN UPDATE IS COMPLETE
      }
   }
	//NEED TO PUT IN THE CORRECT ID HERE!!
	id = document.getElementById("updatePinID").value;
	title = document.getElementById("updatePinName").value;
	description = document.getElementById("updatePinDescription").value;
	isVisited = document.getElementById("updatePinIsVisited");
	if(isVisited.checked)
	{
		isVisited = true;
	}
	else
	{
		isVisited = false;
	}
	if(name != ""){
		var postParams = "id="+id+"&title="+title+"&description="+description+"&isVisited="+isVisited;
		xmlhttp.open("POST", "ajaxFunctions/updatePin.php", true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send(postParams);
	} else {
		var pinError = document.getElementById("updatePinNameError");
		pinError.className = "";
	}
}

/* Takes in 4 variables and makes a marker using them
	pinLat : latitude of the pin
	pinLng : longitude of the pin
	pinName : the title for the pin
	description : the description for the pin
*/
function placeMarker(pinLat,pinLng,pinName,isVisited, description, address){
	//LatLng object for use on the marker
	var latLng = new google.maps.LatLng(pinLat, pinLng);
	var img;
	//chose which color to make the pin according to if its been visited or not
	if(isVisited == true)
	{
		img = "img/visited.png";
	}
	else
	{
		img = "img/unvisited.png";	
	}
	
	//create an info window
	var contentString = '<div id="content">' +
	'<h1 id="firstHeading" class="firstHeading">'+pinName+'</h1>'+
	'<p><b>Address: </b>'+address+'</p><br>'+
	'<p><b>Description: </b>'+description+'</p><br>'+
	'</div>';
	var infowindow = new google.maps.InfoWindow({
    content: contentString
	});
	
	//create Marker with given lat, long and title
	var marker = new google.maps.Marker({
		//Takes the individual Lat and Lng and parses them into a location for position
		position:  latLng,
		map: map,
		title: pinName,
		icon: img
	});
	//bind infoWindow to the marker
	google.maps.event.addListener(marker, 'click', function() {
	MASTERinfoWindow.close();
	MASTERinfoWindow = infowindow;
    MASTERinfoWindow.open(map,marker);
	map.setCenter(new google.maps.LatLng(pinLat,pinLng));	
    });
}

/*
Creates a new blue pin, that signifies were the pin your 
currently creating will go
*/
function tempPlaceMarker(location)
{
	img = "img/newMarkerTemp.png"
	tempMarker.setMap(null);
    tempMarker = new google.maps.Marker({
        position: location,
        map: map,
		icon: img,
        title: "New Marker Position"
    });     
}

/*
Create a temp marker at the users current location via GEOLOCATION
and opens the pin form for making a marker at the current location
*/
function centerOnMe()
{
	showPinForm();
    navigator.geolocation.getCurrentPosition(function(position) {
      currentOnClick = new google.maps.LatLng(position.coords.latitude,
															 position.coords.longitude);
      tempPlaceMarker(currentOnClick);
		map.setZoom(12);
      map.setCenter(currentOnClick);
    }, function() {
      alert("failed")
    });
}
google.maps.event.addDomListener(window, 'load', initialize);