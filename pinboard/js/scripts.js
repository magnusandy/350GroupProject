function hideNewPinForm(){
	document.getElementById("newPinForm").className = "hidden";
	return false;
}

function showUpdateForm(id,title,description,isVisited){
	hideNewPinForm();
	var updateForm = document.getElementById("updatePinForm");
	updateForm.className = "";
	document.getElementById("updatePinID").value = id;
	document.getElementById("updatePinName").value = title;
	document.getElementById("updatePinDescription").value = description;
	document.getElementById("updatePinIsVisited").checked = isVisited;
}