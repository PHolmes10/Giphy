$('#submit').on('click', function (event) {
    event.preventDefault();
    var userInput = $("#search").val();
    console.log(userInput);
    var newBtn = $("<button>").attr("data-search", userInput);
    newBtn.text(userInput);
    console.log(newBtn);
    $(".rowTop").append(newBtn);
    $("#search").val("");
});

$(document).on('click', 'button', function () {
    var name = $(this).data("search");

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=eMxiubUBiYXeaZPLMjMQyxAVkubINTVG&limit=10"

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response);
        for (var i = 0; i < response.data.length; i++) {
            $("#gifDiv").prepend("<p>Rating: " + response.data[i].rating + "</p>");
            var images = $("<img src='" + response.data[i].images.fixed_height_still.url + "'>");
            images.attr("class", "gif");
            $("#gifDiv").prepend(images);
        };
    });
});

