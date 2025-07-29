// Weather App JS using OpenWeatherMap API
const weatherApi = {
  key: "828cc99e0335c9476a8f751b7c386d9a",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
};

document.getElementById('weatherForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const city = document.getElementById('cityInput').value.trim();
    const resultDiv = document.getElementById('weatherResult');
    resultDiv.textContent = 'Loading...';

    if (!city) {
        resultDiv.textContent = 'Please enter a city name.';
        return;
    }

    try {
        const response = await fetch(`${weatherApi.baseUrl}?q=${encodeURIComponent(city)}&appid=${weatherApi.key}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        const weather = data.weather[0].description;
        const temp = data.main.temp;
        const feels = data.main.feels_like;
        const icon = data.weather[0].icon;
        resultDiv.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon">
            <p><strong>${weather.charAt(0).toUpperCase() + weather.slice(1)}</strong></p>
            <p>Temperature: ${temp}&deg;C (feels like ${feels}&deg;C)</p>
        `;
    } catch (error) {
        resultDiv.textContent = error.message;
    }
});
