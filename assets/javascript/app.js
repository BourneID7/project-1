$(document).ready(function() {

<<<<<<< HEAD
  // hide results screen at page load
$("#resultsDisplay").hide();

// on submit hide form screen & show results screen
$("#submit").on("click", function(event) {
   event.preventDefault(); 

   var userChoices = $(this).data();
   var price = $("#priceRange").val();
   var food = $("#foodType").val();
   var distance = $("#distance").val();
   var cityName = $("#city").val().trim().toLowerCase();
        
    // var queryURL = "https://developers.zomato.com/api/v2.1/cities?q=" + city + "&price_range" + price + "&apikey=fc365d62a0c922660dbdd5fbb407fa71"

    var citySearchURL = "https://developers.zomato.com/api/v2.1/cities?q=" + cityName + "&apikey=fc365d62a0c922660dbdd5fbb407fa71"

    // var cuisinesSearchURL = "https://developers.zomato.com/api/v2.1/cuisines?q=" + food + "&apikey=fc365d62a0c922660dbdd5fbb407fa71"

    // var queryURL = "https://developers.zomato.com/api/v2.1/search?q=" + city + "&price_range" + price + "&apikey=fc365d62a0c922660dbdd5fbb407fa71"


    $.ajax({
      url: citySearchURL,
      // url: cuisinesSearchURL,
      method: "GET",
=======
    // hide results screen at page load
  $("#resultsDisplay").hide();

  // on submit hide form screen & show results screen
  $("#submit").on("click", function(event) {
    event.preventDefault(); 

    // query zomato api to get restaurant results
    var userChoices = $(this).data();
    var price = $("#priceRange").val();
    var food = $("#foodType").val();
    var cuisine;
    var distance = $("#distance").val();
    var city = $("#city").val().trim().toLowerCase();

    // first query locations endpoint to get city id      
    var cityId = "https://developers.zomato.com/api/v2.1/locations?query=" + city + "&count=1&apikey=fc365d62a0c922660dbdd5fbb407fa71";
    $.ajax({
      url: cityId,
      method: "GET"
>>>>>>> 2d64d1749e7adcef922f52ec5398d9a6ccab0a0d
  
    }).then(function(response) {      

      console.log(response); 
<<<<<<< HEAD

 
=======
      var entityId = response.location_suggestions[0].entity_id;
      var lat = response.location_suggestions[0].latitude;
      var long = response.location_suggestions[0].longitude;

      console.log(entityId);

      // if else to assign zomato cuisine IDs to food input values
      if (food === "american") {
        cuisine = 1;
      } else if (food === "burgers") {
          cuisine = 168;
      } else if (food === "chinese") {
          cuisine = 25;
      } else if (food === "fastFood") {
          cuisine = 40;
      } else if (food === "indian") {
          cuisine = 148;
      } else if (food === "italian") {
          cuisine = 55;
      } else if (food === "mexican") {
          cuisine = 73;
      } else if (food === "pizza") {
          cuisine = 82;
      } else if (food === "sushi") {
          cuisine = 177;
      };

      // second query endpoint search to combine all parameters from form except price
      var queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=" + entityId + "&entity_type=city&lat=" + lat + "&lon=" + long + "&radius=" + distance + "&cuisines=" + cuisine + "&sort=real_distance&order=asc&apikey=fc365d62a0c922660dbdd5fbb407fa71";
      
      $.ajax({
        url: queryURL,
        method: "GET"
>>>>>>> 2d64d1749e7adcef922f52ec5398d9a6ccab0a0d
    
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
    });
    }

    $("#formDisplay").hide();
    $("#resultsDisplay").show();
    displayGif();

  });

})


// cuisine ID's
      
// var american = 1
// var burger = 168
// var chinese = 25
// var fastfood = 40
// var indian = 148
// var italian = 55
// var mexican = 73
// var pizza = 82
// var sushi = 177
         











