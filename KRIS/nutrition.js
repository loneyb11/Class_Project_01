var itemName;
var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://nutritionix-api.p.rapidapi.com/v1_1/search/" + itemName + "?fields=item_name%252Citem_id%252Cbrand_name%252Cnf_calories%252Cnf_total_fat",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "nutritionix-api.p.rapidapi.com",
		"x-rapidapi-key": "b7186c0b94msh122f6f3fbdc7ddcp1986dejsn6e7dbef52a47"
	}
}

$.ajax(settings).done(function (response) {
	console.log(response);
});