$(document).ready(function() {

    // hide results screen at page load
  $("#resultsDisplay").hide();

  // on submit hide form screen & show results screen
  $("#submit").on("click", function(event) {
    event.preventDefault(); 

    // query zomato api to get restaurant results
    var userChoices = $(this).data();
    var price = $("#priceRange").val();
    var food = $("#foodType").val();
    var distance = $("#distance").val();
    var city = $("#city").val().trim().toLowerCase();
          
    var cityId = "https://developers.zomato.com/api/v2.1/locations?query=" + city + "&count=1&apikey=fc365d62a0c922660dbdd5fbb407fa71";
    $.ajax({
      url: cityId,
      method: "GET"
  
    }).then(function(response) {      

      console.log(response); 
      var entityId = response.location_suggestions[0].entity_id;
      console.log(entityId);
      var queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=" + entityId + "&entity_type=city&count=10&sort=cost&order=asc" + "&apikey=fc365d62a0c922660dbdd5fbb407fa71";
      
      $.ajax({
        url: queryURL,
        method: "GET"
    
      }).then(function(response) {      

        console.log(response); 
      
      });
  
  
    });

    // query giphy api to get images of chosen type of food

    function displayGif() {
      
      var chosenfood = $("#foodType").val() + " food"
      console.log (chosenfood)
      var queryURL2 = "https://api.giphy.com/v1/gifs/search?api_key=Kc3B8vMettxiRAYXD1ePoUIDMSYc4Tf3&q="+chosenfood+"&limit=10&offset=0&rating=G&lang=en"
      
      $.ajax({
        url: queryURL2,
        method: "GET"
      }).then(function(response) {
        console.log(response);

        var results = response.data;
        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div>");
          var gifurl = results[i].images.fixed_width.url;
          var gifpic= $('<img class="gif">');
          gifpic.attr("src", gifurl);
          gifpic.attr("alt", "food");
          $("#gifs").append(gifDiv);
          gifDiv.append(gifpic);
      }
    })
    }

    $("#formDisplay").hide();
    $("#resultsDisplay").show();
    displayGif();

  })


})



      

         











