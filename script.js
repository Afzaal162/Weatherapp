async function getWeather() {
      const city = document.getElementById("cityInput").value || "London";
      const apiKey = "ff70b8b6dc4542bab93140247250209";
      const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();

        document.getElementById("weatherResult").innerHTML = `
          <div class="weather-card">
            <h3>${data.location.name}, ${data.location.country}</h3>
            <img src="https:${data.current.condition.icon}" alt="Weather Icon">
            <div class="temperature">${data.current.temp_c}°C</div>
            <div class="condition">${data.current.condition.text}</div>
            <p>💧 Humidity: ${data.current.humidity}%</p>
            <p>🌬 Wind: ${data.current.wind_kph} kph</p>
          </div>
        `;
      } catch (error) {
        document.getElementById("weatherResult").innerHTML = `
          <p style="color:red;">❌ ${error.message}</p>
        `;
      }
    }