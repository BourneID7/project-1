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
    var cuisine;
    var distance = $("#distance").val();
    var city = $("#city").val().trim().toLowerCase();

    // display user choices at top of results screen above matching restaurant results
    var userChoiceDiv = $('<div class="centered">');
    var userChoiceH5 = $('<h5 class="dark">');
    var userFoodP = $('<p>');
    var userPriceP = $('<p>');
    var priceDisplay = "";
    if (price == 1) {
        priceDisplay = "$";
      } else if (price == 2) {
        priceDisplay = "$$";
      } else if (price == 3) {
        priceDisplay = "$$$";
      } else {
        priceDisplay = "$$$$";
      };
    
    userChoiceH5.text("Your Selections");
    userFoodP.text("You chose: " + food.toUpperCase());
    userPriceP.text("Your budget is: " + priceDisplay);
    userChoiceDiv.append(userChoiceH5);
    userChoiceDiv.append(userFoodP);
    userChoiceDiv.append(userPriceP);
    $("#userChoices").append(userChoiceDiv);

    // first query locations endpoint to get city id      
    var cityId = "https://developers.zomato.com/api/v2.1/locations?query=" + city + "&count=1&apikey=fc365d62a0c922660dbdd5fbb407fa71";
    $.ajax({
      url: cityId,
      method: "GET"
  
    }).then(function(response) {      

      console.log(response); 
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
      } else if (food === "fast food") {
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
    
        }).then(function(response) {      
          console.log(response);
          
          // filter results by price
          var filteredResults = response.restaurants.filter(function(obj) {
            var priceObj = obj.restaurant.price_range;
            console.log(priceObj);
            return priceObj == parseInt(price);

          })  
          console.log(filteredResults);

          // display restaurant results
          var restResults = filteredResults;
          
          // if no results are found display message and reload button

          if (restResults.length==0){
            var noresDiv = $('<div class="card">');
            var noresP = $('<p class="card-text">');
            noresP.text("You've been too picky. Try again or cook at home!");
            var reloadButton = $('<button class="btn btn-dark webBtn">');
            reloadButton.attr("id", "reload");
            reloadButton.text("Try again");
            noresDiv.append(noresP);
            noresDiv.append(reloadButton);
            $("#results").append(noresDiv);
            $("#reload").on("click", function(event) {
              event.preventDefault();
              window.location.reload();
            });
          }
          // if results are found display restaurants
          else {
            for (var i = 0; i < restResults.length; i++) {
              var restDiv = $('<div class="card">');
              var restH5 = $('<h5 class=""card-header>');
              var restpic= $('<img class="card-img-top">');
              var restP = $('<p class="card-text">');
              var restA = $('<a class="btn btn-dark webBtn">');
              var restName = restResults[i].restaurant.name;
              var restpicurl = restResults[i].restaurant.photos_url;
              var restLoc = restResults[i].restaurant.location.address;
              var resturl = restResults[i].restaurant.url;
              restH5.text(restName);
              restA.attr("href", resturl);
              restA.text("Check it out!");
              restP.text(restLoc);
              restpic.attr("src", restpicurl);
              restpic.attr("alt", "restaraunt");

              $("#results").append(restDiv);
              restDiv.append(restH5);
              // restDiv.append(restpic);
              restDiv.append(restP);
              restDiv.append(restA);

        };
      };  
    });

    // query giphy api to get images of chosen type of food

    function displayGif() {
      
      var chosenfood = $("#foodType").val() + " food";
      console.log (chosenfood);
      var queryURL2 = "https://api.giphy.com/v1/gifs/search?api_key=Kc3B8vMettxiRAYXD1ePoUIDMSYc4Tf3&q="+chosenfood+"&limit=10&offset=0&rating=G&lang=en";
      
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
        };
      });
    };

      $("#formDisplay").hide();
      $("#resultsDisplay").show();
      displayGif();

    });

  });

})