import "./style.css";

import {
    getDay,
} from "date-fns";



function getWeatherInfo(cityName) {
    return new Promise( (resolove) => { 
        fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?key=KVD85U3K57WFPHZ3B9XDQ3G38`)
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log(response);
            resolove(response);
        });
    });
}

let input = document.querySelector(".search > input");
let button = document.querySelector(".search > button");
button.addEventListener('click', () => {
    displayWeatherInfo(input.value);
});

function weekdayString(dayOfTheWeek) {
    switch (dayOfTheWeek) {
        case 0:
            return "Sunday";
            break;
        case 1:
            return "Monday";
            break;
        case 2:
            return "Tuesday";
            break;
        case 3:
            return "Wednesday";
            break;
        case 4:
            return "Thursday";
            break;
        case 5:
            return "Friday";
            break;
        case 6:
            return "Saturday";
            break;
    }
}

async function displayWeatherInfo(cityName) {
    let display = document.querySelector(".body-left");
    
    let weatherInfo = await getWeatherInfo(cityName);

    let conditions = display.querySelector(".w-conditions");
    let temp = display.querySelector(".w-temp");
    let description = display.querySelector(".w-description");
    let sunrise = display.querySelector(".w-sunrise");
    let sunset = display.querySelector(".w-sunset");

    let titles = display.querySelectorAll(".title");
    let descriptions = display.querySelectorAll(".description");

    console.log(titles);
    console.log(descriptions);

    
    conditions.textContent = weatherInfo.currentConditions.conditions;
    temp.textContent = `${weatherInfo.currentConditions.temp}F (feels like:${weatherInfo.currentConditions.feelslike}F)`;
    description.textContent = weatherInfo.description;
    sunrise.textContent = `sunrise: ${weatherInfo.currentConditions.sunrise}`;
    sunset.textContent = `sunset: ${weatherInfo.currentConditions.sunset}`;
    
    let today = getDay(weatherInfo.days[0].datetime);
    let counter = today;
    titles.forEach(title => {
        counter++;
        title.textContent = weekdayString(counter);
    });
    counter = today;

    descriptions.forEach(description => {
        description.textContent = weatherInfo.days[counter].conditions;
        counter++;
    });
}

