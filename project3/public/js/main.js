function makeHTML(theData){
	var htmlString = '<ol>';
	theData.forEach(function(d){
		htmlString += '<li>' + d.user + ' : ' + d.word + '</li>';
	});
	htmlString += '</ol';
	return htmlString;
}

function saveData(obj){
	$.ajax({
		url: '/save',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(obj),
		error: function(resp){
			console.log("Oh no...");
		},
		success: function(resp){
			console.log('Saved..');
			console.log(resp);
			var htmlString = '<li>name : ' + obj.user + '</li>';
			$('ol').append(htmlString);
			var htmlString = '<li>timestamp : ' + obj.timestamp + '</li>';
			$('ol').append(htmlString);
			var htmlString = '<li>lat : ' + obj.latitude + '</li>';
			$('ol').append(htmlString);
			var htmlString = '<li>lon : ' + obj.longitude + '</li>';
			$('ol').append(htmlString);

		}
	});
}

// get user location
var x = document.getElementById("demo");

var lat;
var lon;
var data;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(storePosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
	console.log(lat);
	console.log(lon);
}

function storePosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
	console.log(lat);
	console.log(lon);
	console.log(data);
	data.latitude = lat;
    data.longitude= lon;
	console.log(data);
	saveData(data);
	console.log('data saved');
	window.location.href='/maps';
}

$(document).ready(function(){
	$('#loading').hide();
	$('#datepicker').datepicker({
		todayBtn: true,
	});

	$('#enterButton').click(function(){
		console.log(originLat);
		console.log(originLon);

		$('#container').hide();
		$('#loading').show();
		console.log('klik');
		var originCountry = $("#originCountry").val() || 'ME';
		var yearMove = $("#yearMove").val() || 'NONE';
		var timeStamp = new Date();
		getLocation();
		console.log(lat);
		console.log(lon);
		data = {
			OriginCountry: originCountry,
			yearEntry: yearMove,
			time:timeStamp,
			originLatitude: originLat,
			originLon: originLon
		};
	});
});