var accessToken = '11766209.973fd32.942187a48ac8433ea807b797f060b9e7';
var isFound = false;
var latCoord = [];
var lonCoord = [];
var strikeData = [];
var arrayImg = [];
var queryLat;
var queryLon;

var dataTest;


function getInstagram(term){
	
	
	//check the lat and long
	//and other drones variables for news
	isFound = false;
	latCoord = [];
	lonCoord = [];
	strikeData = [];


	for (var i = 0; i < dronesData.strike.length; i++){
		if (dronesData.strike[i].town.toLowerCase() == term.toLowerCase() || 
			dronesData.strike[i].location.toLowerCase() == term.toLowerCase()) {
			if (dronesData.strike[i].lat || dronesData.strike[i].lon){
				latCoord.push(dronesData.strike[i].lat);
				lonCoord.push(dronesData.strike[i].lon);
				strikeData.push(dronesData.strike[i]);
				isFound = true;
			}
		}
	}

	// if the city name is one of the ones affected by dronewars
	// then search latest instagram posts from within 5 Km of the center lat 
	if (isFound == true){
		var idx = Math.floor(Math.random()*latCoord.length);
		queryLat = latCoord[idx];
		queryLon = lonCoord[idx];
		map.setCenter(new google.maps.LatLng(queryLat, queryLon));
		map.setZoom(13); 
		var searchQuery = 'https://api.instagram.com/v1/media/search?lat='+latCoord[idx]+'&lng='+lonCoord[idx]+'&distance=5000&access_token='+accessToken;
		console.log(searchQuery);
	}
	//if the city name is not affected
	// then search by tag instead of location (we won't be too interested anyway
	// with the result so loose search is acceptable)
	else{
		var searchTerm = term.replace(/\s/g, '');
		var apiURLHead = 'https://api.instagram.com/v1/tags/';
		var apiURLTail = '/media/recent?access_token=';
		var searchQuery = apiURLHead+searchTerm+apiURLTail+accessToken+'&COUNT=3';
		console.log(searchQuery);
	}


	$.ajax({
		url: searchQuery,
		type: 'GET',
		dataType: 'jsonp',
		error:function(x,e){
			if(x.status === 0){
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
			}
		},
		success: function(data){
			console.log("instagram success..");

			var theHTMLString = '<ol><h1>'+term+' today shown by latest Instagram Posts.</h1>';

			if (!isFound){
				theHTMLString += '<h2>'+term+' has never been attacked by drones. You can see from the pictures. They\'re all smiling. Maybe you too.</h2><br><br>';
				for (var i=0; i < data.data.length; i++){
						var imgLink = data.data[i].images.low_resolution.url;
						theHTMLString += '<img src="' + imgLink +'">';
					}
			}

			else{				
				if (data.data.length == 0){
					theHTMLString += '<h2>'+term+' has been attacked by drones in the past. Currently, no instagram posts from this area.<br> Hopefully they\'re safe. And happy.</h2><br>';
				}
				else{
					theHTMLString += '<h2>'+term+' has been attacked by drones in the past. What you\'re about to see might not be pleasant. They are the latest instagram posts taken in the radius of 5 Km from the center of warzone. It might, however, show you a glimpse of hope too. Stop right here if you aren\'t ready. Continue only if you\'re interested in reality.</h2><br>';
					for (var i=0; i < data.data.length; i++){
						var imgLink = data.data[i].images.low_resolution.url;
						theHTMLString += '<img src="' + imgLink +'">';
					}
				}
			}

			theHTMLString += '</ol>';			
			$('#instagramImg').html(theHTMLString);
			window.scrollTo(0,document.body.scrollHeight);

			if (isFound){
				printNews(strikeData);
			}
			else{
				$('#droneNews').remove();
			}

		}
	});
}

function printNews(data){

	var theHTMLString = '<ol><br><br><h1>THE DARK SIDE: What they have experienced in the past. </h1>';	
	theHTMLString += '<h2>Since 2004, the United States government has attacked hundreds of targets in Northwest Pakistan using unmanned aerial vehicles (drones) controlled by the Central Intelligence Agency\'s Special Activities Division. Most of these attacks are on targets in the Federally Administered Tribal Areas along the Afghan border in Northwest Pakistan. These strikes began during the administration of U.S. President George W. Bush, and have increased substantially under his successor Barack Obama. Some in the media have referred to the attacks as a \"drone war\". Initially the U.S. government had officially denied the extent of its policy; in May 2013 it acknowledged for the first time that four U.S. citizens had been killed in the strikes.Surveys have shown that the strikes are deeply unpopular in Pakistan, where they have contributed to a negative perception of the United States.</h2><br><br>';
	
	//get instagram post during the time
	// --------------START---------------
	
	// Query tag "dronewar" from instagram
	var trendQuery = 'dronestrikes'
	var apiURLHead = 'https://api.instagram.com/v1/tags/';
	var apiURLTail = '/media/recent?access_token=';
	var picQuery = apiURLHead+trendQuery+apiURLTail+accessToken+'&COUNT=3';
	console.log('pic URL : '+picQuery);	

	$.ajax({
		url: picQuery,
		type: 'GET',
		dataType: 'jsonp',
		error:function(x,e){
			if(x.status === 0){
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
			}
		},
		success: function(dataFunc){
			console.log("pictures for news. success..");

			for (var i=0; i < dataFunc.data.length ; i++){
				arrayImg.push(dataFunc.data[i].images.low_resolution.url);
			}

			for (var i=0; i < data.length; i++){
				theHTMLString += '<h3>'+data[i].date.substring(0, 10);+'</h3>';
				theHTMLString += '<br><img src=' + arrayImg[Math.floor(Math.random()*arrayImg.length)] +'><br>';
							

				if (data[i].deaths){
					theHTMLString += '<h4>Death tolls: ';
					theHTMLString += data[i].deaths+' persons'+'<br>';
				}
				else{
					theHTMLString += '<h4>Death tolls: ';
					theHTMLString += '0 person'+'<br>';
				}

				if (data[i].names !== ""){
					theHTMLString += 'Death victims: ';
					theHTMLString += data[i].names+'<br>';
				}
				else {
					theHTMLString += 'Death victims: ';
					theHTMLString += 'not available <br>';
				}

				if (data[i].civilians){
					theHTMLString += 'Civilians deaths: ';
					theHTMLString += data[i].civilians+' persons'+'<br>';			
				}
				else{
					theHTMLString += 'Civilians death: ';
					theHTMLString += 'None'+'<br>';
				}

				if (data[i].children){
					theHTMLString += 'Children: ';
					theHTMLString += data[i].children+' persons'+'<br>';
				}
				else{
					theHTMLString += 'Children: ';
					theHTMLString += '0 person'+'<br>';
				}

				if (data[i].injuries){
					theHTMLString += 'Injuries: ';
					theHTMLString += data[i].injuries+' persons'+'</h4>';			
				}
				else{
					theHTMLString += 'Injuries: ';
					theHTMLString += 'None'+'</h4s>';
				}

				theHTMLString += '<p>'+data[i].narrative+'<br>';
				theHTMLString += data[i].bij_summary_short+'</p>';

				theHTMLString += '<a href=\"'+data[i].bij_link+'\">More information click here</a><br><br><br>';

			}

			theHTMLString += '</ol>';		
			$('#droneNews').html(theHTMLString);

		}
	});
	//----------------END----------------

}


$(document).ready(function(){
	
	$('#the-basics .typeahead').typeahead({
		  hint: true,
		  highlight: true,
		  minLength: 1
		},
		{
		  name: 'cityTownSet',
		  source: substringMatcher(cityTownSet)
		});

	$('#searchButton').click(function(){
		var outValue = $('#inputAhead').val();
		console.log(outValue);
		var instagram,Link = getInstagram(outValue);
	});
});