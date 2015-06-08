  // function initialize() {
  //   var mapCanvas = document.getElementById('map-canvas');
  //   var mapOptions = {
  //     center: new google.maps.LatLng(30.774402, 69.585769),
  //     zoom: 5,
  //     mapTypeId: google.maps.MapTypeId.ROADMAP
  //   }
  // }
function initialize() {
	var mapCanvas = document.getElementById('map-canvas');
    var mapOptions = {
        zoom: 5,
        center: new google.maps.LatLng(30.774402, 69.585769),
	   	//styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#ffdfa6"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#b52127"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#c5531b"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#74001b"},{"lightness":-10}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#da3c3c"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#74001b"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#da3c3c"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"#990c19"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#74001b"},{"lightness":-8}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#6a0d10"},{"visibility":"on"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#ffdfa6"},{"weight":0.4}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]}],
	   	//styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#004358"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#1f8a70"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#1f8a70"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#fd7400"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#1f8a70"},{"lightness":-20}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#1f8a70"},{"lightness":-17}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"},{"visibility":"on"},{"weight":0.9}]},{"elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#ffffff"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#1f8a70"},{"lightness":-10}]},{},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#1f8a70"},{"weight":0.7}]}],
	   	styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#c9323b"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#c9323b"},{"weight":1.2}]},{"featureType":"administrative.locality","elementType":"geometry.fill","stylers":[{"lightness":"-1"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"lightness":"0"},{"saturation":"0"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.stroke","stylers":[{"weight":"0.01"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.stroke","stylers":[{"weight":"0.01"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#c9323b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#99282f"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#99282f"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.stroke","stylers":[{"color":"#99282f"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#99282f"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#99282f"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#99282f"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#090228"}]}],
	   	mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(mapCanvas, mapOptions);
    var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(30.774402, 69.585769),
                    map: map,
                    title: 'Pakistan today'
                });
}

google.maps.event.addDomListener(window, 'load', initialize);

