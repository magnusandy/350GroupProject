/**
* Hides the new pin form on the page, sets the hidden attribute to true for the form
*/
function hideNewPinForm(){
	document.getElementById("newPinForm").className = "hidden";
	return false;
}

/**
* Display the update form on the page, takes in the values for at pin, that are then set
* as the initial values within the form fields, so they can easily be edited.
*/
function showUpdateForm(id,title,description,isVisited){
	hideNewPinForm();
	var updateForm = document.getElementById("updatePinForm");
	updateForm.className = "";
	document.getElementById("updatePinID").value = id;
	document.getElementById("updatePinName").value = title;
	document.getElementById("updatePinDescription").value = description;
	document.getElementById("updatePinIsVisited").checked = isVisited;
}