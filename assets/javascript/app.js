// Array containing topics that will generate the buttons
var topics = ["arthur", "rugrats",]
// Looping through the topics array to apply new buttons to each element
for (var i = 0; i < topics.length; i++) {
    // creating a new button with a custom attribute that matches what the user types into the search form.
    var newBtn = $("<button>").attr("data-search", topics[i]);
    // Adding text to the button to match what the user typed in the search form.
    newBtn.text(topics[i]);
    // Appending the new button to the bar of buttons at the top of the page
    $(".rowTop").append(newBtn);
    // Clearing the search form 
    $("#search").val("");
}

// Function for adding new buttons
function newBtns() {
    // creating a new button with a custom attribute that matches the last element of the topics array
    var newBtn = $("<button>").attr("data-search", topics[topics.length - 1]);
    // Adding text to the button to match the string of the last element in the topics array
    newBtn.text(topics[topics.length - 1]);
    // Appending the new button to the bar of buttons at the top of the page
    $(".rowTop").append(newBtn);
    // Clearing the search form 
    $("#search").val("");
}

// Click event for the submit button
$('#submit').on('click', function (event) {

    // Preventing the default action of the submit button.
    event.preventDefault();
    // creating a variable to capture the value of the search form.
    var userInput = $("#search").val().trim();
    topics.push(userInput);
    console.log(topics);

    newBtns();

});

// Click event for each button using event delegation
$(document).on('click', 'button', function () {

    // creating a variable to capture the value of the data-search attribute of the button that was clicked on 
    var name = $(this).data("search");
    // URL used to reference the giphy API based on the name
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=eMxiubUBiYXeaZPLMjMQyxAVkubINTVG&limit=10"
    // AJAX call to get data from the giphy API
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {

        // Creating variable to capture the data list of the response object (list of 10 random gifs)
        var results = response.data;
        // Loop through the list of 10 random gifs
        for (var i = 0; i < results.length; i++) {
            // Create a new div for each gif
            var gifSpan = $("<span>");
            // Capture the rating of each gif
            var rating = response.data[i].rating;
            // Creating a p tag to display the rating 
            var p = $("<p>").text("Rating: " + rating);
            // Creating a variable to display the gif as a still image
            var images = $("<img src='" + response.data[i].images.fixed_height_still.url + "'>");
            // Adding a class of gif to each gif
            images.attr("class", "gif");
            // Adding a custom attribute called data-state and setting it to "still" so that the gifs are still upon opening the page
            images.attr("data-state", "still");
            // Adding a custom attribute called data-still and setting the value to the link of the still gif image
            images.attr("data-still", response.data[i].images.fixed_height_still.url);
            // Adding a custom attribute called data-animate and setting the value to the link of the moving gif image
            images.attr("data-animate", response.data[i].images.fixed_height.url);
            // Appending the P and Image tags to the div
            gifSpan.prepend(p);
            gifSpan.prepend(images);
            // Appending the gif div to a div on the DOM 
            $("#gifList").prepend(gifSpan);
        };

    });
});

// Click event for each gif image (event delegation used here as well)
$(document).on("click", ".gif", function () {
    // New variable to capture the data-state value of the image being clicked on
    var state = $(this).attr("data-state");
    // 'If' statement checking to see if data-state attribute is 'still'
    if (state === "still") {
        // creating variable to capture the data-animate value of the image being clicked on
        var animate = $(this).attr("data-animate");
        // If the state is 'still', when the image is clicked change the src value to the data-animate value
        $(this).attr("src", animate);
        // If the state is 'still', when the image is clicked change the data-state value to 'animate'
        $(this).attr("data-state", "animate");
    } else {
        // creating variable to capture the data-still value of the image being clicked on
        var still = $(this).attr("data-still");
        // If the state is 'animate', when the image is clicked change the src value to the data-still value
        $(this).attr("src", still);
        // If the state is 'animate', when the image is clicked change the data-state value to 'still'
        $(this).attr("data-state", "still");
    };
});