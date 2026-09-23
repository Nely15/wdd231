const spotlightList = document.querySelector("#spotlight-list");
const currentWeather = document.querySelector("#current-weather");
const forecastList = document.querySelector("#forecast-list");

const apiKey = "d76a67bcc5468dd5821b81c9093dc68e";

const latitude = 25.9018;
const longitude = -97.4975;

async function getSpotlights() {
    try {

        const response = await fetch("data/members.json");

        if (!response.ok) {

            throw new Error(`Unable to load member data: ${response.status}`);

        }

        const members = await response.json();

        const eligibleMembers = members.filter(member =>
            member.membership === 2 || member.membership === 3
        );

        eligibleMembers.sort(() => 0.5 - Math.random());

        const selectedMembers = eligibleMembers.slice(0,3);

        displaySpotlights(selectedMembers);
        
    } catch (error) {

        console.error("Error loading spotlights:", error);
        spotlightList.innerHTML = "<p>Sorry,the business spotlights could not be loaded.</p>";

    }

}

function displaySpotlights(members)  {
    spotlightList.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("article");

        card.classList.add("spotlight-card");

        card.innerHTML =`
        <img src="images/${member.image}" alt="${member.name} logo">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <p>Membership: ${getMembershipLevel(member.membership)}</p>
        <a href="${member.website}" target="_blank" rel="noopener"> Visit Website </a>
        
        `;
        spotlightList.appendChild(card);

    });

}

function getMembershipLevel(membership) {

        if (membership === 3) {
            return "Gold";
        } else if (membership === 2) {
            return "Silver";
        } else {
            return "Member";
        }
    }


async function getWeather() {

    try {
        const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

        const currentResponse = await fetch(currentUrl);

        if (!currentResponse.ok) {
            throw new Error(`Curet weather error: ${currentResponse.status}`);
        }

        const forecastResponse = await fetch(forecastUrl);

        if (!forecastResponse.ok) {
            throw new Error(`Forecast error: ${forecastResponse.status}`);
        }

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        displayCurrentWeather(currentData);
        displayForecast(forecastData);

    } catch (error) {
        console.error("Error loading weather:", error);

        currentWeather.innerHTML =
            "<p>Sorry, the weather information could not be loaded.</p>";

        forecastList.innerHTML = 
            "<p>Sorry, the forecast information could not be loaded.</p>";

    }

}

function displayCurrentWeather(data) {
    currentWeather.innerHTML = `
    <p><strong>Temperature:</strong> ${Math.round(data.main.temp)}°F</p>
    <p><strong>Conditions:</strong> ${data.weather[0].description}</p>
    `;

}

function displayForecast(data) {
    forecastList.innerHTML = "";

    const forecastDays = [];

    const today = new Date().toLocaleDateString();

    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateString = date.toLocaleDateString();

        if (
            dateString !== today && 
            !forecastDays.some(day => day.date === dateString)
        ) {
            forecastDays.push({
                date: dateString,
                temperature: item.main.temp
            });

        }

    });

    forecastDays.slice(0, 3).forEach(day => {

        const forecastCard = document.createElement("article");

        forecastCard.innerHTML = `

            <h4>${formatDate(day.date)}</h4>
            <p>${Math.round(day.temperature)}°F</p>
        `;

        forecastList.appendChild(forecastCard);

    });

}

function formatDate(dateString) {

    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
        weekday: "long"

    });

}

getSpotlights();
getWeather();