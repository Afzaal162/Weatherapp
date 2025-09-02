const apiKey = "ff70b8b6dc4542bab93140247250209";
const weatherCard = document.getElementById("weather-card");

async function fetchWeather(city) {
    try {
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("API request failed");

        const data = await response.json();
        console.log(data);

        weatherCard.innerHTML = `
          <h2>${data.location.name}, ${data.location.country}</h2>
          <p>Temperature: ${data.current.temp_c}°C</p>
          <p>Condition: ${data.current.condition.text}</p>
          <img src="${data.current.condition.icon}" alt="weather icon">
          <h3>5-Day Forecast:</h3>
          <ul>
            ${data.forecast.forecastday.map(day => `
              <li>
                ${day.date}: ${day.day.avgtemp_c}°C, ${day.day.condition.text}
                <img src="${day.day.condition.icon}">
              </li>
            `).join("")}
          </ul>
        `;
    } catch (error) {
        weatherCard.innerHTML = `<p class="text-red-500">❌ ${error.message}</p>`;
    }
}

function getWeather() {
    const city = document.getElementById("cityInput").value || "London";
    fetchWeather(city);
}

// Default weather on load
window.addEventListener("load", () => {
    fetchWeather("London");
});
