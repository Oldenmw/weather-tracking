var apiKey = "d92ced05b52c75363d286d99b7c4f774"
var cityFormEl = document.querySelector("#city-search");
var cityInputEl = document.querySelector("#city");
var currentDate = dayjs().format("DD/MM/YYYY");
var currentWeatherEl = document.querySelector("#current-weather");

var formEventHandler = function(event) {
    event.preventDefault();
    var nameText = cityInputEl.value.trim();
    getCityCoords(nameText);

    cityInputEl.value = "";
};

cityFormEl.addEventListener("submit", formEventHandler)

var getWeatherInfo = function(lat, lon, cityName) {
    fetch("http://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey).then(function(response) {
        response.json().then(function(data) {
            displayCurrentWeather(data, cityName);
        });
    });
};
var getCityCoords = function(cityName) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey).then(function(response) {
        response.json().then(function(data) {
            getWeatherInfo(data.coord.lat, data.coord.lon, cityName)
        });
    });
}

var displayCurrentWeather = function(data, city) {
    currentWeatherEl.innerHTML = "";
    currentWeatherEl.setAttribute("class", "current-weather border border-secondary");

    var headerEl = document.createElement("h3");
    headerEl.innerText = city + " (" + currentDate + ")";
    headerEl.setAttribute("class", "fs-3");
    currentWeatherEl.appendChild(headerEl);

    var infoEl = document.createElement("p");
    infoEl.innerText = "Temp: " + data.current.temp + "°F";
    currentWeatherEl.appendChild(infoEl);

    var infoEl = document.createElement("p");
    infoEl.innerText = "Wind: " + data.current.wind_speed + " MPH";
    currentWeatherEl.appendChild(infoEl);

    var infoEl = document.createElement("p");
    infoEl.innerText = "Humidity: " + data.current.humidity + "%";
    currentWeatherEl.appendChild(infoEl);

    var infoEl = document.createElement("p");
    infoEl.innerText = "UV Index: " + data.current.uvi;
    currentWeatherEl.appendChild(infoEl);
};