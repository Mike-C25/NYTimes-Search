
var search = "wall street";
var limit = 10;
var dateStart;
var dateEnd;


var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
url += '?' + $.param({
  'api-key': "920a63c3a24345549eb65e9f5e7cd250",
  'q': search,
  'page' : limit,
  'begin_date' : dateStart,
  'end_date' : dateEnd
});


$.ajax({
  url: url,
  method: 'GET',
}).done(function(result) {
  console.log(result);
}).fail(function(err) {
  throw err;
});