var apiKey = "d92ced05b52c75363d286d99b7c4f774"
var cityFormEl = document.querySelector("#city-search");
var cityInputEl = document.querySelector("#city");
var currentDate = dayjs().format("MM/DD/YYYY");
var currentWeatherEl = document.querySelector("#current-weather");

var formEventHandler = function(event) {
    event.preventDefault();
    var nameText = cityInputEl.value.trim();
    getCityCoords(nameText);

    cityInputEl.value = "";
};

cityFormEl.addEventListener("submit", formEventHandler)

var getWeatherInfo = function(lat, lon, cityName) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey).then(function(response) {
        response.json().then(function(data) {
            displayCurrentWeather(data, cityName);
            weatherForecast(data);

            if (!savedCities.find(m => m === cityName)) {
                savedCities.push(cityName);
                saveCity(cityName);
            }

            storeButtons();
        });
    }).catch(function(error) {
        currentWeatherEl.innerHTML = "";
        currentWeatherEl.setAttribute("class", "current-weather border border-secondary");
        
        var headerEl = document.createElement("h3");
        headerEl.innerText = "There was an error finding the weather!";
        headerEl.setAttribute("class", "fs-3");
        currentWeatherEl.appendChild(headerEl);
    });
};
var getCityCoords = function(cityName) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey).then(function(response) {
        response.json().then(function(data) {
            getWeatherInfo(data.coord.lat, data.coord.lon, cityName)
        });
    })catch(function(error) {
        currentWeatherEl.innerHTML = "";
        currentWeatherEl.setAttribute("class", "current-weather border border-secondary");
        
        var headerEl = document.createElement("h3");
        headerEl.innerText = "There was an error finding the weather!";
        headerEl.setAttribute("class", "fs-3");
        currentWeatherEl.appendChild(headerEl);
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

var weatherForecast = function(data) {
    for (i = 0; i < 5; i++) {
        var forecastDay = dayjs().add((i + 1), "day").format("MM/DD/YYYY");
        var boxEl = document.querySelector("#day-" + i);
        boxEl.innerHTML = '<h4 class="card-title">' + forecastDay + '</h4><p class="card-text">Temp: ' + data.daily[i].temp.day +'°F</p><p class="card-text">Wind: ' + data.daily[i].wind_speed + 'MPH</p><p class="card-text">Humidity: ' + data.daily[i].humidity + '%</p>';
    }
}

var saveCity = function(cityName) {
    var sidebarButtonEl = document.querySelector("#saved-buttons");

    var cityButtonEl = document.createElement("button");
    cityButtonEl.setAttribute("class", "btn btn-secondary");
    cityButtonEl.setAttribute("id", cityName)
    cityButtonEl.textContent = cityName;
    cityButtonEl.addEventListener("click", function() {getCityCoords(cityName)});

    sidebarButtonEl.appendChild(cityButtonEl);
};

var storeButtons = function () {
    var citiesString = JSON.stringify(savedCities);
    localStorage.setItem("buttons", citiesString);
}

var loadButtons = function() {
    var citiesString = localStorage.getItem("buttons");

    if (!citiesString) {
        savedCities = [];
    }
    else {
        savedCities = JSON.parse(citiesString);
        for (i = 0; i < savedCities.length; i++) {
            saveCity(savedCities[i]);
        }
    };
};

loadButtons();
