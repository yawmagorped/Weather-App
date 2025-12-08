import "./style.css";
import loading from "./images/loading_gray.gif";
import {
    getDay,
} from "date-fns";


let input = document.querySelector(".search > input");
let button = document.querySelector(".search > button");
button.addEventListener('click', () => {
    displayWeatherInfo(input.value);
});

input.addEventListener('keypress', (e) => {
    if(e.key === 'Enter')
        displayWeatherInfo(input.value);
});

function getWeatherInfo(cityName) {
    return new Promise( (resolove) => { 
        loadingDisplay(1);
        fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?key=KVD85U3K57WFPHZ3B9XDQ3G38&unitGroup=metric`)
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log(response);
            resolove(response);
        })
        .catch(function(reject) {
            loadingDisplay(0);
            console.error(reject);
        });
    });
}

const loadingDisplay =( (toggle) => {
    if (toggle) {
        let img = document.createElement("img");
        img.src = loading;
        button.after(img);
    }
    else {
        let img = button.nextElementSibling;
        img.remove();
    }
});

function weekdayString(dayOfTheWeek) {
    switch (dayOfTheWeek % 7) {
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
    
    //check for valid cityName

    let weatherInfo = await getWeatherInfo(cityName);

    let address = display.querySelector(".w-cityName");
    let conditions = display.querySelector(".w-conditions");
    let temp = display.querySelector(".w-temp");
    let description = display.querySelector(".w-description");
    let sunrise = display.querySelector(".w-sunrise");
    let sunset = display.querySelector(".w-sunset");

    let titles = display.querySelectorAll(".title");
    let descriptions = display.querySelectorAll(".description");

    console.log(titles);
    console.log(descriptions);

    address.textContent = weatherInfo.resolvedAddress;
    conditions.textContent = weatherInfo.currentConditions.conditions;
    temp.textContent = `${weatherInfo.currentConditions.temp}C (feels like:${weatherInfo.currentConditions.feelslike}C)`;
    description.textContent = weatherInfo.description;
    sunrise.textContent = `sunrise: ${weatherInfo.currentConditions.sunrise}`;
    sunset.textContent = `sunset: ${weatherInfo.currentConditions.sunset}`;
    
    let today = getDay(weatherInfo.days[0].datetime);
    let counter = today;
    titles.forEach(title => {
        counter++;
        title.textContent = weekdayString(counter);
    });
    titles[0].textContent = "Tomorrow";

    counter = today;

    descriptions.forEach(description => {
        let img = description.querySelector("img");
        counter++;
        img.alt = weatherInfo.days[counter].conditions;
        import(`./images/weatherIcons/${weatherInfo.days[counter].icon}.png`).then(function(response) {
            console.log(response);
            img.src = response.default;
        })
        description.append(img);
    });
    loadingDisplay(0);
}

displayWeatherInfo("Tehran");
