// ADD CITY SEARCHES TO LOCAL STORAGE

// select the city input and form elements
const cityInput = document.getElementById('city-input-value');
const cityForm = document.getElementById('city-input');

// add an event listener to the form on submission
cityForm.addEventListener('submit', function(e) {
  // prevent the default form submission behavior
  e.preventDefault();
  
  // get the value of the city input
  const city = cityInput.value;

  // store the city value in local storage
    localStorage.setItem('city', city);
    // SEARCH HISTORY FROM LOCAL STORAGE

// select the history container element
const historyContainer = document.getElementById('history-container');

// retrieve the list of previous searches from local storage
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

// add the most recent search to the search history list
if (searchHistory.indexOf(city) === -1) {
  searchHistory.unshift(city);
}

// keep only the most recent 5 searches
searchHistory = searchHistory.slice(0, 5);

// store the updated search history list in local storage
localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
console.log('searchHistory:', searchHistory);

// display the search history in the history container
historyContainer.innerHTML = `
  <ul>
    ${searchHistory.map(city => `<li>${city.toUpperCase()}</li>`).join('')}
  </ul>
`;

});



