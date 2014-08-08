/**
 * New node file
 */
$(document).ready(function() {
});

function searchBandName() {
	console.log("search band name");
	$.ajax({
		type: "GET",
        url: '/bandSearch?bandName=' + $("#bandName").val(),
        timeout: 5000,
        success: function(data) {
            console.log("success");
            console.log("bandName = " + data.bandName);
            console.log(data);
            
            displayResult(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
}

function displayResult(data) {
	
	console.log("display data : " + data);
	
	// Remove old data
	$('[id^="concert_"]').remove();
	
	for (var i = 0; i < data.length; i++) {
		
		var html = "";
		
		html += "<div id='concert_'" + i + ">";
		html += "<div style='float: left'>";
		html += data[i].fields.location;
		html += "</div>";
		html += "<div>";
		html += new Date(data[i].fields.date);
		html += "</div>";
		html += "</div>";
		
		$("#resultList").append(html);
		
	}
	
	$("#resultList").show();
	
}