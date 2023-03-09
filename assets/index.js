// ADD CITY SEARCHES TO LOCAL STORAGE

// select the city input and form elements
const cityInput = $("#city-input-value");
const cityForm = $("#city-input");

// add an event listener to the form on submission
cityForm.on("submit", function (e) {
  // prevent the default form submission behavior
  e.preventDefault();

  //display any hidden elements
  $(".hide").removeClass("hide");

  // get the value of the city input
  const city = cityInput.val();

  // store the city value in local storage
  localStorage.setItem("city", city);

  // SEARCH HISTORY FROM LOCAL STORAGE

  // select the history container element
  const historyContainer = $("#history-container");

  // retrieve the list of previous searches from local storage
  let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

  // add the most recent search to the search history list
  if (searchHistory.indexOf(city) === -1) {
    searchHistory.unshift(city);
  }

  // keep only the most recent 5 searches
  searchHistory = searchHistory.slice(0, 5);

  // store the updated search history list in local storage
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

  // display the search history in the history container
  historyContainer.html(`
  <h2>SEARCH HISTORY</h2>
    <ul class="history-list">
 
      ${searchHistory.map((city) => `<li class="history">${city.toUpperCase()}</li>`).join("")}
    </ul>
  `);
  // select the search history list


// add a click event listener to the search history items
historyContainer.on("click", "li", function () {
  const city = $(this).text().toLowerCase();

  // update the city input value and submit the form to fetch the weather data
  cityInput.val(city);
  cityForm.submit();
});

  const apiKey = "070c0875f7058ccc51b3035cc54b1570";

  // GET LAT AND LON OF CITY
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Unable to get location information");
      }
    })
    .then((data) => {
      const lat = data.coord.lat;
      const lon = data.coord.lon;
console.log(data);
      // GET CURRENT WEATHER DATA USING LAT AND LON
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      fetch(weatherUrl)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Unable to get weather information");
          }
        })
        .then((weatherData) => {
          // display the weather data on your webpage
          const currentWeatherContainer = $("#current-weather-container");
          const temperatureInFahrenheit =
            ((weatherData.main.temp - 273.15) * 9) / 5 + 32;
          const date = new Date(weatherData.dt * 1000);
          const dateString = `${
            date.getMonth() + 1
          }/${date.getDate()}/${date.getFullYear()}`;
          currentWeatherContainer.html(`
            <p>Temperature: ${temperatureInFahrenheit.toFixed(1)} &deg;F</p>
            <p>Humidity: ${weatherData.main.humidity}%</p>
            <p>Date: ${dateString}</p>
            <p>Wind Speed:${weatherData.wind.speed} mph</p>
            `);
          // show the current weather container on your webpage
          currentWeatherContainer.removeClass("hide");
        })
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));
  // GET 5-DAY FORECAST DATA
// Map API image conditions to use my own SVGs
const weatherConditionToSvgMap = {
  Clear: "./assets/images/day.svg",
  Rain: "./assets/images/rainy.svg",
  Clouds: "./assets/images/cloudy-day.svg",
  Snow: "./assets/images/snowy.svg",
  Thunderstorm: ".assets//images/thunder.svg",
};

const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
fetch(forecastUrl)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Unable to get forecast information");
    }
  })
  .then((forecastData) => {
    console.log("Forecast data:", forecastData);
    // display the forecast data on your webpage
    const forecastContainer = $("#forecast-container");
    forecastContainer.html("");
    const forecastList = forecastData.list;
    for (let i = 0; i < forecastList.length; i += 8) {
      const forecast = forecastList[i];
      const date = new Date(forecast.dt * 1000);
      const dateString = `${
        date.getMonth() + 1
      }/${date.getDate()}/${date.getFullYear()}`;
      const weatherCondition = forecast.weather[0].main;
      const svgSrc = weatherConditionToSvgMap[weatherCondition];
      const temperatureInFahrenheit =
        ((forecast.main.temp - 273.15) * 9) / 5 + 32;
      const windSpeed = forecast.wind.speed;
      const humidity = forecast.main.humidity;
      forecastContainer.append(`
        <div class="card">
          <p>${dateString}</p>
          <img src="${svgSrc}" />
          <p>Temperature: ${temperatureInFahrenheit.toFixed(1)} &deg;F</p>
          <p>Wind Speed: ${windSpeed} mph</p>
          <p>Humidity: ${humidity}%</p>
        </div>
      `);
    }
    // show the forecast container on your webpage
    forecastContainer.removeClass("hide");
  })
  .catch((error) => console.error(error));
});