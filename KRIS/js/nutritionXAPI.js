console.log("nutri is read")
$('#searchBox').on('change', function (event){
    event.preventDefault();



    var restaurant = $(event.formattedSuggestion);
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
        clearDiv($('.card'));
        var nutriFacts = response.hits[0].fields;
        var nutritionCard = $('<div class= "card">');
        var nutritionTitle = $('<h4 class= "card-title justify-content-center">').text(nutriFacts.brand_name);
        var nutriText = $('<div class="card-text">');
        var nutriItem = $('<h2>').text(nutriFacts.item_name);
        var nutriServ = $('<div>').append($('<p>').text("Serving Size: " + nutriFacts.nf_serving_size_qty));
        var nutriCal = $('<div>').append($('<p>').text("Total Calories per Serving: " + nutriFacts.nf_calories));
        var nutriFat = $('<div>').append($('<p>').text("Total Fat per Serving: " + nutriFacts.nf_total_fat));

        nutritionCard.append(nutritionTitle);
        nutriText.append(nutriItem);
        nutriText.append(nutriServ);
        nutriText.append(nutriCal);
        nutriText.append(nutriFat);
        nutritionCard.append(nutriText);

        $(document.body).append(nutritionCard);
        console.log(response);
    });

    function clearDiv(div){
        div.remove()
    }
})