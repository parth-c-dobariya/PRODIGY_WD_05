const apiEndpoint = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'e5a1bf37b37cedd2009adf4ef1770e93'; // Removed the extra 'E' at the end
const locationInput = document.getElementById('location-input');
const getWeatherBtn = document.getElementById('get-weather-btn');
const currentWeatherSection = document.getElementById('current-weather');

getWeatherBtn.addEventListener('click', async () => {
    const location = locationInput.value.trim();
    if (location) {
        try {
            const response = await fetch(`${apiEndpoint}?q=${location}&units=metric&appid=${apiKey}`); // Corrected the template string
            const data = await response.json();
            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;

            currentWeatherSection.innerHTML = `
                <h2>Current Weather</h2>
                <p id="weather-description">${weatherDescription}</p>
                <p id="temperature">Temperature: ${temperature}°C</p>
                <p id="humidity">Humidity: ${humidity}%</p>
                <p id="wind-speed">Wind Speed: ${windSpeed} m/s</p>
            `;
        } catch (error) {
            console.error(error);
            currentWeatherSection.innerHTML = `
                <h2>Error</h2>
                <p>Failed to retrieve weather data. Please try again.</p>
            `;
        }
    } else {
        currentWeatherSection.innerHTML = `
            <h2>Error</h2>
            <p>Please enter a location.</p>
        `;
    }
});

navigator.geolocation.getCurrentPosition(async (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    try {
        const response = await fetch(`${apiEndpoint}?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`);
        const data = await response.json();
        const weatherDescription = data.weather[0].description;
        const temperature = data.main.temp;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        currentWeatherSection.innerHTML = `
            <h2>Current Weather</h2>
            <p id="weather-description">${weatherDescription}</p>
            <p id="temperature">Temperature: ${temperature}°C</p>
            <p id="humidity">Humidity: ${humidity}%</p>
            <p id="wind-speed">Wind Speed: ${windSpeed} m/s</p>
        `;
    } catch (error) {
        console.error(error);
        currentWeatherSection.innerHTML = `
            <h2>Error</h2>
            <p>Failed to retrieve weather data. Please try again.</p>
        `;
    }
}, (error) => {
    console.error(error);
    currentWeatherSection.innerHTML = `
        <h2>Error</h2>
        <p>Failed to retrieve location. Please try again.</p>
    `;
});