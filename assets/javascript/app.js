$('#submit').on('click', function (event) {
    event.preventDefault();
    var userInput = $("#search").val();
    // console.log(userInput);
    var newBtn = $("<button>").attr("data-search", userInput);
    newBtn.text(userInput);
    // console.log(newBtn);
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
        // console.log(response);
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            $("#gifDiv").prepend("<p>Rating: " + response.data[i].rating + "</p>");
            var images = $("<img src='" + response.data[i].images.fixed_height_still.url + "'>");
            images.attr("class", "gif");
            images.attr("data-state", "still");
            images.attr("data-still", response.data[i].images.fixed_height_still.url);
            images.attr("data-animate", response.data[i].images.fixed_height.url);

            $("#gifDiv").prepend(images);
        };

    });
});

$(document).on("click", ".gif", function () {
    var state = $(this).attr("data-state");
    console.log(this);
    if (state === "still") {
        // this.src = data-animate
        var animate = $(this).attr("data-animate");
        $(this).attr("src", animate);
        $(this).attr("data-state", "animate");
    } else {
        var still = $(this).attr("data-still");
        $(this).attr("src", still);
        $(this).attr("data-state", "still");
    };
});