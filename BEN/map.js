var map;
function loadMapScenario(){
    map = new Microsoft.Maps.Map(document.getElementById('myMap'), {


        /* No need to set credentials if already passed in URL */
        center: new Microsoft.Maps.Location(29.4241, -98.4936),
        //29.4241, -98.4936
        zoom: 12,
        disableStreetside: true,
        disableBirdseye: true,
        showMapTypeSelector: false,
        showLogo: false
    });

    Microsoft.Maps.loadModule('Microsoft.Maps.AutoSuggest', function () {
        var options = {
            maxResults: 4,
            businessSuggestions: true,
            map: map
        };
        var manager = new Microsoft.Maps.AutosuggestManager(options);
        manager.attachAutosuggest('#searchBox', '#searchBoxContainer', selectedSuggestion);


    });

    function selectedSuggestion(suggestionResult) {
        map.entities.clear();
        map.setView({ bounds: suggestionResult.bestView });
        var pushpin = new Microsoft.Maps.Pushpin(suggestionResult.location);
        map.entities.push(pushpin);
        document.getElementById('printoutPanel').innerHTML =suggestionResult.formattedSuggestion;// + '<br> Lat: ' + suggestionResult.location.latitude + '<br> Lon: ' + suggestionResult.location.longitude;
        console.log(suggestionResult.formattedSuggestion.split(',')[0]);
        var restaurant = suggestionResult.formattedSuggestion.split(',')[0];
        console.log("restaurant: "+ restaurant);


        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://nutritionix-api.p.rapidapi.com/v1_1/search/" + restaurant + "%20&?fields=item_name%2citem_id%2Cbrand_name%2Cnf_total_carbohydrate%2Cnf_calories%2Cnf_total_fat%2Cnf_sodium%2Cnf_sugars",
            "method": "GET",
            "headers":{
                "x-rapidapi-host": "nutritionix-api.p.rapidapi.com",
                "x-rapidapi-key": "2d71861cc4msh37c14b3184fafd7p15bc13jsn19101ce3d6e2"
            }
        }

        $.ajax(settings).done(function (response) {
            clearDiv($('.nutriCont'));
            var nutriCont = $('<div class="columns nutriCont">');
            for(var i = 0; i < 5; i++){
                var nutriFacts = response.hits[i].fields;
                var nutritionCard = $('<div class= "column card">');
                var nutritionTitle = $('<h2 class= "title">').text(nutriFacts.brand_name);
                var nutriItem = $('<h4 class="subtitle">').text(nutriFacts.item_name);
                var nutriText = $('<ul class="card-content">');
                var nutriServ = $('<li>').text("-Serving Size: " + nutriFacts.nf_serving_size_qty);
                var nutriCarb = $('<li>').text("-Total Carbohydrates: " + nutriFacts.nf_total_carbohydrate);
                var nutriCal = $('<li>').text("-Total Calories: " + nutriFacts.nf_calories);
                var nutriFat = $('<li>').text("-Total Fat: " + nutriFacts.nf_total_fat);
                var nutriSod = $('<li>').text("-Total Sodium: " + nutriFacts.nf_sodium);
                var nutriSug = $('<li>').text("-Total Sugars: " + nutriFacts.nf_sugars);

                nutritionCard.append(nutritionTitle);
                nutriText.append(nutriItem);
                nutriText.append(nutriServ);
                nutriText.append(nutriCarb);
                nutriText.append(nutriCal);
                nutriText.append(nutriFat);
                nutriText.append(nutriSod);
                nutriText.append(nutriSug);
                nutritionCard.append(nutriText);

                nutriCont.append(nutritionCard);
            }
            $('.hero-body').before(nutriCont);
            console.log(response);
        });

        function clearDiv(div){
            div.remove()
        }


        Microsoft.Maps.Events.addHandler(pushpin, 'click', function(){
            Microsoft.Maps.loadModule('Microsoft.Maps.Directions', function () {
                var loc;
                var latcoords;
                var longcoords;
                navigator.geolocation.getCurrentPosition(function(position){
                    latcoords = position.coords.latitude;
                    longcoords = position.coords.longitude;
                    loc = new Microsoft.Maps.Location(position.coords.latitude, position.coords.longitude);

                    var directionsManager = new Microsoft.Maps.Directions.DirectionsManager(map);
                    // Set Route Mode to walking
                    directionsManager.setRequestOptions({ routeMode: Microsoft.Maps.Directions.RouteMode.walking });
                    var waypoint1 = new Microsoft.Maps.Directions.Waypoint({ location: new Microsoft.Maps.Location(latcoords,longcoords) });
                    var waypoint2 = new Microsoft.Maps.Directions.Waypoint({ location: new Microsoft.Maps.Location(suggestionResult.location.latitude,suggestionResult.location.longitude) });
                    directionsManager.addWaypoint(waypoint1);
                    directionsManager.addWaypoint(waypoint2);
                    // Set the element in which the itinerary will be rendered
                    directionsManager.setRenderOptions({ itineraryContainer: document.getElementById('printoutPanel2') });
                    directionsManager.calculateDirections();
                });


            });
        });

    }





}