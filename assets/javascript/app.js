// hide results screen at page load
$("#resultsDisplay").hide();

// on submit hide form screen & show results screen
$("#submit").on("click", function(event) {
    event.preventDefault();

    $("#formDisplay").hide();
    $("#resultsDisplay").show();

});

