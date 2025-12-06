import "./style.css";

function getWeatherInfo(cityName, apiKey) {
    return new Promise( (resolove) => { 
        fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?key=${apiKey}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log(response);
            resolove(response);
        });
    });
};

let input = document.querySelector(".search > input");
let button = document.querySelector(".search > button");
button.addEventListener('click', () => {
    displayWeatherInfo(input.value);
});

async function displayWeatherInfo(cityName) {
    let display = document.querySelector(".body-left");
    
    let weatherInfo = await getWeatherInfo(cityName, "KVD85U3K57WFPHZ3B9XDQ3G38");
    
    let conditions = display.querySelector(".w-conditions");
    let temp = display.querySelector(".w-temp");
    let description = display.querySelector(".w-description");
    let sunrise = display.querySelector(".w-sunrise");
    let sunset = display.querySelector(".w-sunset");

    conditions.textContent = weatherInfo.currentConditions.conditions;
    temp.textContent = `${weatherInfo.currentConditions.temp}F (feels like:${weatherInfo.currentConditions.feelslike}F)`;
    description.textContent = weatherInfo.description;
    sunrise.textContent = `sunrise: ${weatherInfo.currentConditions.sunrise}`;
    sunset.textContent = `sunset: ${weatherInfo.currentConditions.sunset}`;
}
