function hideNewPinForm(){
	document.getElementById("newPinForm").className = "hidden";
	return false;
}

function showUpdateForm(){
	hideNewPinForm();
	document.getElementById("updatePinForm").className = "";
}