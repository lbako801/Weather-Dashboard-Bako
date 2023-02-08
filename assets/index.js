// const apiKey = '429fe2eb476f82ad84de7d98ea2ce8df';

function getCityName(event) {
    event.preventDefault();
    const searchValue = document.getElementById('city-input-value');
    console.log(searchValue);
    var cityName = searchValue.value;
    console.log(cityName);
}

const cityForm = document.getElementById('city-input')

cityForm.addEventListener('submit', getCityName)
