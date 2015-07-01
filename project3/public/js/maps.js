// Getting source coordinates

var map;
var originLat;
var originLon;


function initialize() {
        var input = document.getElementById('originCountry');
        var autocomplete = new google.maps.places.Autocomplete(input);
        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            var place = autocomplete.getPlace();
            document.getElementById('city2').value = place.name;
            // document.getElementById('cityLat').value = place.geometry.location.lat();
            // document.getElementById('cityLng').value = place.geometry.location.lng();
            originLat = place.geometry.location.lat();
            originLon = place.geometry.location.lng();
        });
    }
    google.maps.event.addDomListener(window, 'load', initialize); 