$(document).ready(function() {
    var search = $("#search");
    var limit = $("#numbOfRecs");
    var dateStart = $("#startYear");
    var dateEnd = $("#endYear");

    $("#clearButt").on('click', function(e) {
    	e.preventDefault();

    	search.val("");
        limit.val("");
        dateStart.val("");
        dateEnd.val("");

    });


    $("#searchButt").on('click', function(e) {
        e.preventDefault();


        var searchTerm = search.val();
        var searchLimit = limit.val();

        var searchDateStart = dateStart.val();
        var searchDateEnd = dateEnd.val();
        console.log(searchTerm);

        if (!searchTerm) {
            console.log("Needs a search parameter");
        } else {
            var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
            url += '?' + $.param({
                'api-key': "920a63c3a24345549eb65e9f5e7cd250",
                'q': searchTerm
            });
            if (searchDateStart < searchDateEnd) {
                url += $.param({
                    'begin_date': searchDateStart
                })
            } else {
                console.log("Problem with date start");
            }

            if (searchDateEnd > searchDateStart) {
                url += $.param({
                    'end_date': searchDateEnd
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
                //loop through limit
                searchLimit = searchLimit ? searchLimit : 10;
                for (var i = 0; i < searchLimit; i++) {

                    var mainDiv = $("<div class='article-result'>");
                    var numberDiv = $("<div class='article-number'>");
                    var titleBlock = $("<h4 class='article-title'>");
                    var authorBlock = $("<p class='article-author'>");
                    var sectionBlock = $("<p class='article-section'>");
                    var dateBlock = $("<p class='article-date'>");
                    var linkBlock = $("<a class='article-link'>");


                    var articleResultNumber = i + 1;
                    var title = result.response.docs[i].headline.main;
                    var author = result.response.docs[i].byline.original;
                    var section = result.response.docs[i].section_name;
                    var pubDate = new Date(result.response.docs[i].pub_date);
                    var link = result.response.docs[i].web_url;

                    numberDiv.text(articleResultNumber);
                    titleBlock.text(title);
                    authorBlock.text(author);
                    sectionBlock.text(section);
                    dateBlock.text(pubDate);
                    linkBlock.text(link).attr("src", link);

                    mainDiv.append(numberDiv, titleBlock, authorBlock, sectionBlock, dateBlock, linkBlock);

                    $("#results").append(mainDiv);

                    // console.log(articleResultNumber + "\n" + title + "\n" + author + "\n" + section + "\n" + pubDate + "\n" + link);

                }

            }).fail(function(err) {
                throw err;
            });
        }



    })



});