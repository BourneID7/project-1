$(document).ready(function() {

    $("button").on("click", function() {

      var foodType = $(this).data();
        
        var queryURL = " https://api.yelp.com/v3/businesses/{id}" +
          foodType + "&api_key=EO8evVJvdxgy_jWvbaXxTBz6u0MUF_AXfohi1MGgMHIymv6UTm53rrKWDqTy-JsELgptEAAn6t7Gl77n_QrFktV-zgmte1-3ENdVKxcEOhS7PZzYlaZG_cgY3wDeXHYx&limit=10";
    
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {      
    
          console.log(response);


         











})