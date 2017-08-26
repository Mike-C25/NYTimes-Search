$(document).ready(function() {
    var search = "wall street";
    var limit = 5;
    var dateStart;
    var dateEnd;


    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
        'api-key': "920a63c3a24345549eb65e9f5e7cd250",
        'q': search
    });
    if (dateStart < dateEnd) {
        url += $.param({
        	'begin_date' : dateStart
        })
    } else {
        console.log("Problem with date start");
    }

    if (dateEnd > dateStart) {
        url += $.param({
        	'end_date' : dateEnd
        })
    } else {
        console.log("Problem with date end");
    }




    $.ajax({
        url: url,
        method: 'GET',
    }).done(function(result) {
    	console.log(result);
    	var articleLength = result.response.docs.length;
    	for(var i=0; i< limit; i++){
    		var articleResultNumber = i+1;
    		var title = result.response.docs[i].headline.main;
    		var author = result.response.docs[i].byline.original;
    		var section = result.response.docs[i].section_name;
    		var pubDate = new Date(result.response.docs[i].pub_date);
    		var link = result.response.docs[i].web_url;
    		console.log(articleResultNumber + "\n" + title + "\n" + author + "\n" + section + "\n" + pubDate + "\n" + link);

    	}

    }).fail(function(err) {
        throw err;
    });
});