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
		
	
	google.maps.event.addListener(map, 'rightclick', function(event){
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