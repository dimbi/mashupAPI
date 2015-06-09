function initialize() {
	var mapCanvas = document.getElementById('map-canvas');
    var mapOptions = {
        zoom: 3,
        center: new google.maps.LatLng(15.774402, 69.785769),
	   	styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#c9323b"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#c9323b"},{"weight":1.2}]},{"featureType":"administrative.locality","elementType":"geometry.fill","stylers":[{"lightness":"-1"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"lightness":"0"},{"saturation":"0"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.stroke","stylers":[{"weight":"0.01"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.stroke","stylers":[{"weight":"0.01"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#c9323b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#99282f"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#99282f"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.stroke","stylers":[{"color":"#99282f"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#99282f"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#99282f"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#99282f"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#090228"}]}],
	   	mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    var map = new google.maps.Map(mapCanvas, mapOptions);
  	getDronesLocation(map);
}
google.maps.event.addDomListener(window, 'load', initialize);


var dronesAreaNameArray = [];
var dronesLatArray = [];
var dronesLonArray = [];
var cityTownSet = [];
var dronesData;

function getDronesLocation(map) {
	$.ajax({
		url: 'http://api.dronestre.am/data',
		type: 'GET',
		dataType: 'jsonp',
		error:function(x,e){
			if(x.status==0){
				alert('You are offline!!\n Please Check Your Network.');
			}
			else if(x.status==404){
				alert('Requested URL not found.');
			}
			else if(x.status==500){
				alert('Internel Server Error.');
			}
			else if(e=='parsererror'){
				alert('Error.\nParsing JSON Request failed.');
			}
			else if(e=='timeout'){
				alert('Request Time out.');
			}
			else {
				alert('Unknown Error.\n'+x.responseText);
			}d
		},
		success: function(data){
			console.log("drones location success..");
			dronesData = data;

			var marker = [];
			for(var i=0; i<dronesData.strike.length; i++){
				dronesAreaNameArray.push(dronesData.strike[i].location);
				dronesLatArray.push(dronesData.strike[i].lat);
				dronesLonArray.push(dronesData.strike[i].lon);

				if (cityTownSet.indexOf(dronesData.strike[i].town ) == -1) cityTownSet.push(dronesData.strike[i].town);
	    		if (cityTownSet.indexOf(dronesData.strike[i].location ) == -1) cityTownSet.push(dronesData.strike[i].location);
	    		

	    		marker[i] = new google.maps.Marker({
                position: new google.maps.LatLng(dronesLatArray[i], dronesLonArray[i]),
                map: map,
                title: dronesAreaNameArray[i]
            	});
		}
		}
	});
}