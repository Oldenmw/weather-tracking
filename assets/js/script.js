var apiKey = "d92ced05b52c75363d286d99b7c4f774"
var cityFormEl = document.querySelector("#city-search");
var cityInputEl = document.querySelector("#city");
var currentDate = dayjs().format("DD/MM/YYYY");
var currentWeatherEl = document.querySelector("#current-weather");

var formEventHandler = function(event) {
    event.preventDefault();
    var nameText = cityInputEl.value.trim();
    getWeatherInfo(nameText);

    cityInputEl.value = "";
};

cityFormEl.addEventListener("submit", formEventHandler)

var getWeatherInfo = function(cityName) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey).then(function(response) {
        response.json().then(function(data) {
            displayCurrentWeather(data, cityName);
        });
    });
};

var displayCurrentWeather = function(data, city) {
    currentWeatherEl.innerHTML = "";
    currentWeatherEl.setAttribute("class", "current-weather border border-secondary");

    var headerEl = document.createElement("h3");
    headerEl.innerText = city + " (" + currentDate + ")";
    headerEl.setAttribute("class", "fs-3");
    currentWeatherEl.appendChild(headerEl);

    var infoEl = document.createElement("p");
    infoEl.innerText = "Temp: " + data.main.temp + "°F";
    currentWeatherEl.appendChild(infoEl);

    var infoEl = document.createElement("p");
    infoEl.innerText = "Wind: " + data.wind.speed + " MPH";
    currentWeatherEl.appendChild(infoEl);

    var infoEl = document.createElement("p");
    infoEl.innerText = "Humidity: " + data.main.humidity + "%";
    currentWeatherEl.appendChild(infoEl);

    var infoEl = document.createElement("p");
    infoEl.innerText = "UV Index: " + data.wind.speed;
    currentWeatherEl.appendChild(infoEl);
};