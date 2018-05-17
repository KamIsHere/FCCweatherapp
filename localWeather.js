var btn = $("#btn1");
btn.hide();

  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      $("#data").html("Latitude: " + lat + "<br>Longitude: " + long);

       var api = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + long;
        $.getJSON(api, function(data){
           var celsius = (data.main.temp).toFixed(1);
           var fahrenheit = (celsius * 9 / 5 + 32).toFixed(1);
           var changeTemp = true;


           function getWeather() {
             $("#temp").html("Temperature:  " + fahrenheit + "&#8457");
             $("#weather").html(data.weather[0].description.toUpperCase());
             $("#city").html("City: " + data.name);
             $("#country").html("Country: " + data.sys.country);
             $("#windspeed").html("Windspeed: " + data.wind.speed + " mph");
             $("#humidity").html(data.main.humidity + "% Humidity");

             // Make a background image according to users weather.
             var weatherImg = $("<img>");
             weatherImg.attr('src', data.weather[0].icon);
             weatherImg.appendTo("#weather");
             btn.show();
           }
          getWeather();

          $("#btn1").click(function() {
            if (changeTemp === false) {
            $("#temp").html("Temperature: " + celsius + "&#8451");
            changeTemp = true;

            } else {
            $("#temp").html("Temperature: " + fahrenheit + "&#8457");
            changeTemp = false;

          }

            })
          });
        });
       }
