var dataTest;

function getInstagram(term){
	var apiURLHead = 'https://api.instagram.com/v1/tags/';
	var apiURLTail = '/media/recent?access_token=';
	var accessToken = '11766209.973fd32.942187a48ac8433ea807b797f060b9e7';
	var searchQuery = apiURLHead+term+apiURLTail+accessToken+'&COUNT=3';
	console.log(searchQuery);

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

$(document).ready(function(){
	//setup event listener
	$('#searchButton').click(function(){
		//get the value that was typed
		var outValue = $('#theInputBox').val();
		var instagram,Link = getInstagram(outValue);
		var wikiLink = getWikiData(outValue);
	});
});