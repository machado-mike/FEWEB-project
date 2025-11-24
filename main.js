$(document).ready(function () {

    // When the user clicks the search button
    $("#searchBtn").on("click", function () {

        // Get the user input and remove surrounding spaces
        const searchName = $("#search-form").val().trim();

        // If the input is empty, do nothing
        if (!searchName) return;

        // Hide the home section and show a "Loading..." message
        $("#home").hide();
        $("#result").show().html("<p>Loading...</p>");

        // Fetch all 3 pieces of data at the same time
        Promise.all([
            fetchCharacter(searchName),
            fetchLocalCharacterInfo(searchName),
            fetchYouTubeTrailer(searchName)
        ])
            .then(function (results) {

                // Unpack data from the results array
                const frameData = results[0];
                const characterInfo = results[1];
                const youtubeId = results[2];

                //Pass data to the UI
                showCharacter(frameData, characterInfo, youtubeId);
            })
    });

    // Allow the Enter key to trigger the search
    $("#search-form").on("keypress", function (e) {
        if (e.which === 13) {
            $("#searchBtn").click();
        }
    });

});