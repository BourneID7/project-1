$(document).ready(function() {

  // hide results screen at page load
$("#resultsDisplay").hide();

// on submit hide form screen & show results screen
$("#submit").on("click", function(event) {
   event.preventDefault(); 

   var userChoices = $(this).data();
        
    var queryURL = "https://developers.zomato.com/api/v2.1/categories?apikey=fc365d62a0c922660dbdd5fbb407fa71"

    $.ajax({
      url: queryURL,
      method: "GET",
  
    }).then(function(response) {      

      console.log(response);     

});

$("#formDisplay").hide();
$("#resultsDisplay").show();

})


})



      

         











