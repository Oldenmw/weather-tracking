var apiKey = "d92ced05b52c75363d286d99b7c4f774"

document.querySelector("#city-search").addEventListener("submit", function() {
    event.preventDefault();
    var nameText = document.querySelector("#city").value;
    getWeatherInfo(nameText);
});

var getWeatherInfo = function(cityName) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
};