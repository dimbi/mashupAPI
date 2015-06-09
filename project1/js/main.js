var dataTest;

function getInstagram(term){
	
	var accessToken = '11766209.973fd32.942187a48ac8433ea807b797f060b9e7';
	
	//check the lat and long
	var isFound = false;
	for (var i = 0; i < dronesData.strike.length; i++){
		if (dronesData.strike[i].town == term || dronesData.strike[i].location == term) {
			var latCoord = dronesData.strike[i].lat;
			var lonCoord = dronesData.strike[i].lon;
			console.log('FOUND: '+i);
			var searchQuery = 'https://api.instagram.com/v1/media/search?lat='+latCoord+'&lng='+lonCoord+'&distance=5000&access_token='+accessToken;
			console.log(searchQuery);
			isFound = true;
			break;
		}
	}

	if (isFound == false){
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
					theHTMLString += '<h2>'+term+' has been attacked by drones in the past. Currently, no instagram posts from this area.<br> Hopefully they\'re safe. And happy.</h2>';
				}
				else{
					theHTMLString += '<h2>'+term+' has been attacked by drones in the past. What you\'re about to see might not be pleasant. They are the latest instagram posts taken in the radius of 5 Km from the center of warzone. It might, however, show you a glimpse of hope too. Stop right here if you aren\'t ready. Continue only if you are human, who\'re interested in reality.</h2><br>';
					for (var i=0; i < data.data.length; i++){
						var imgLink = data.data[i].images.low_resolution.url;
						theHTMLString += '<img src="' + imgLink +'">';
					}
				}
			}

			theHTMLString += '</ol>';			
			$('#instagramImg').html(theHTMLString);

			window.scrollTo(0,document.body.scrollHeight);
		}
	});
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