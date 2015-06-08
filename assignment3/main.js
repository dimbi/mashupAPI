var dataTest;

function getInstagram(term){
	// var apiURL = 'https://api.instagram.com/v1/tags/nofilter/media/recent?client_id=973fd32a46bb4a6aa2b9878e375bb540';
	var apiURLHead = 'https://api.instagram.com/v1/tags/';
	var apiURLTail = '/media/recent?access_token=';
	var accessToken = '11766209.973fd32.942187a48ac8433ea807b797f060b9e7';
	var searchQuery = apiURLHead+term+apiURLTail+accessToken+'&COUNT=3';
	console.log(searchQuery);

	/*
	code: a91e9b3ab1b0449b9548e737e0c18ae4
	accessToken: 11766209.973fd32.942187a48ac8433ea807b797f060b9e7
	{"access_token":"11766209.973fd32.942187a48ac8433ea807b797f060b9e7",
	"user":
		{"username":"rinarsoputro",
		  "bio":"Engineer. Jazz. Chelsea. Travelling. Japanese foods. Currently living in New York.",
		  "website":"",
		  "profile_picture":"https:\/\/igcdn-photos-g-a.akamaihd.net\/hphotos-ak-xap1\/t51.2885-19\/927387_429646557178470_1434513123_a.jpg",
		  "full_name":"Dimas Rinarso Putro",
		  "id":"11766209"
		}
	}
	*/


	$.ajax({
		url: searchQuery,
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
			}
		},
		success: function(data){
			console.log("success..");
			console.log(data);

			var theHTMLString = '<ol><h3>Latest instagram posts about '+term+'</h3>';
			for (var i=0; i < data.data.length; i++){
				var imgLink = data.data[i].images.low_resolution.url
				theHTMLString += '<img src="' + imgLink +'">';
			}

			theHTMLString += '</ol>';
			
			$('#instagramImg').html(theHTMLString);
		}
	});
}

function getWikiData(term){
	var wikiURL = 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
	var searchQuery = wikiURL+term;
	console.log(wikiURL);


	$.ajax({
		url: searchQuery,
		type: 'GET',
		dataType: 'jsonp',
		error: function(){
			console.log("error..");
			console.log(err);
		},
		success: function(data){
			var totalResults = data[1].length;
			var theNames = data[1];
			var theLinks = data[3];
			dataTest = data;


			var theHTMLString = '<ol><h3>Related wiki article about '+term+'</h3>';
			for (var i = 0; i<totalResults; i++){
				var names = theNames[i];
				var links = theLinks[i];
				console.log(names+' : '+links);

				theHTMLString += '<li><a href="' + links + '"">' + names + '</a></li>';
			}

			theHTMLString += '</ol>';
			
			$('#wikiArticle').html(theHTMLString);
		}
	});
}

// for yelp
// Consumer Key	bMbQUgq9AvI56T1boPwwKg
// Consumer Secret	VcGSUjtrWl90TrJuidZXf_bUTXc
// Token	Mu7puDrYTynW0BJ7IXL5uD5ge9M23sKn
// Token Secret	ftdhsCHDgf5aL9WNhNCuYawIRoE

//for soundcloud
//576d251fbf19a64d73e6608771b9c6b8
//1bd6ecebc1b8669c758a7d37b6770538

// function getSoundCloud(){
// 	SC.initialize({
//   		client_id: '576d251fbf19a64d73e6608771b9c6b8'
// 	});

// 	// find all tracks with the genre 'punk' that have a tempo greater than 120 bpm.
// 	SC.get('https://api.soundcloud.com/tracks/', { bpm: { from: 120 } }, function(tracks) {
// 	  console.log(tracks);
// 	});
// }



$(document).ready(function(){
	//setup event listener
	$('#searchButton').click(function(){
		//get the value that was typed
		var outValue = $('#theInputBox').val();
		var movieLink = getInstagram(outValue);
		var wikiLink = getWikiData(outValue);
		// getSoundCloud();
	});
});