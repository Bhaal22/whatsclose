/**
 * New node file
 */
var map;
var markers = [];;

$(document).ready(function() {
	
	$("#fromDate").datepicker();
	$("#toDate").datepicker();
		
	var clientPos;
	if(navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(
	    	// OK
	    	function(position) {
		    	console.log(position);
	    		clientPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	    		console.log(clientPos);
	    		
	    		
	    		var markerClient = new google.maps.Marker({
	    			position: clientPos,
	    			map: map,
	    			title: 'You are here',
	    			icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
	    		});
	    		
	    		map.panTo(clientPos);
	    		
		    },
		    // KO
	    	function(error) {
		    	console.log(error);
		    	// whatever
		    	
		    });
	    
    } else {
	    alert("Ce navigateur ne supporte pas la geolocalisation");
	}
	
	
	// Position par d�faut
	var centerpos = new google.maps.LatLng(43.580417999999995,7.125102);
	
	// Options relatives � la carte
	var optionsGmaps = {
	    center: centerpos,
	    mapTypeId: google.maps.MapTypeId.ROADMAP,
	    zoom: 5
	};
	// ROADMAP peut �tre remplac� par SATELLITE, HYBRID ou TERRAIN
	// Zoom : 0 = terre enti�re, 19 = au niveau de la rue
	 
	// Initialisation de la carte pour l'�l�ment portant l'id "map"
	map = new google.maps.Map(document.getElementById("map"), optionsGmaps);
	
	
	
});

function searchBandName() {
	console.log("search band name");
	
	clearMarkers();
	
	$.ajax({
		type: "GET",
		url : '/bandSearch',
        data: {
        	"bandName" : $("#bandName").val(),
        	"fromDate" : $.datepicker.parseDate("mm/dd/yy", $("#fromDate").val()),
        	"toDate" : $.datepicker.parseDate("mm/dd/yy", $("#toDate").val())
        },
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
	$("#noDateFound").remove();
	
  var html = '';
  if (data.length === 0) {
    html = "<div id='noDateFound'>No dates found</div>";
  } else {
	  for (var i = 0; i < data.length; i++) {

		  console.log("geo : %j", data[i].fields.geometry);
		  
		  var lat,lng;
		  if (data[i].fields.geometry) {
			  var geometry = data[i].fields.geometry[0].split(",");
			  lat = geometry[0];
			  lng = geometry[1];
			  
			  addMarker(lat, lng, data[i].fields.location[0]);
		  }
		  
		  html += "<div id='concert_'" + i + ">";
		  html += "<div style='float: left; width: 250px'>";
		  html += formatDate_MMMDDYYYY(new Date(data[i].fields.date));
		  html += "</div>";
		  html += "<div>";
		  html += data[i].fields.location;
		  html += "</div>";
		  html += "</div>";
		  
		  
	  }
  }

  console.log (html);
	$("#resultList").append(html);
	$("#resultList").show();
	
}

function addMarker(lat, lng, title) {
	console.log(title);
	marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: map,
        title: title
    });
	
	markers.push(marker);
}

function clearMarkers() {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
	markers.length = 0;
}
