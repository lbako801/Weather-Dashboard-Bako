// ADD CITY SEARCHES TO LOCAL STORAGE

// select the city input and form elements
const cityInput = $("#city-input-value");
const cityForm = $("#city-input");

// add an event listener to the form on submission
cityForm.on("submit", function (e) {
  // prevent the default form submission behavior
  e.preventDefault();

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
    <ul>
      ${searchHistory.map((city) => `<li>${city.toUpperCase()}</li>`).join("")}
    </ul>
  `);

  const apiKey = "429fe2eb476f82ad84de7d98ea2ce8df";

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
});
