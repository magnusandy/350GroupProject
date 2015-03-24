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
function deletePin(id) {
    if (first.length == 0) { 
        document.getElementById("txtHint").innerHTML = "";
        return;
    } else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                if(xmlhttp.responseText == true)
				{
					window.location.href = '../display.php';
				}
            }
        }
        xmlhttp.open("GET", "../ajaxFunctions/deletePin.php?id="+id, true);
        xmlhttp.send();
    }
}