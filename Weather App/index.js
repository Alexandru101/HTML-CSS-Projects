const apiKey = "da5cc509bc967933cf9f957a7a06eb9b"
const cityInput = document.getElementById("city");

async function getWeather(){
    const city = document.getElementById("city").value;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        document.getElementById("cityName").textContent = weatherData.name;
        document.getElementById("temperature").textContent = `Temperature ${weatherData.main.temp}°C`
        document.getElementById("description").textContent = weatherData.weather[0].description;

        const weatherIcon = weatherData.weather[0].icon;
        document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        const forecastDays = document.querySelectorAll('.day');
        forecastDays.forEach((day, index) => {
            const forecast = forecastData.list[index * 8];
            const forecastIcon = forecast.weather[0].icon;
            
            const weekday = new Date(forecast.dt_txt).toLocaleDateString('en-US', { weekday: 'long' });
            day.querySelector('.weekday').textContent = weekday;
            day.querySelector('.icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${forecastIcon}@2x.png" alt="weather icon not found">`;
            day.querySelector('.temp').textContent = `${Math.round(forecast.main.temp)}°C`;
        })
    } catch (error){
        console.log(`Error fetching weather data: ${error}`);
    }
}

cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter"){
        getWeather();
    }
})
