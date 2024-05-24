const apiKey = "0296b0f510b322912cee56b777d131f6";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city){
    if (!city) {
        alert("Please enter a city name");
        return;
    }

    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        // console.log(data);
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".max-temp1").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " m/s";

        switch(data.weather[0].main) {
            case "Clouds":
                weatherIcon.src = "images/clouds.png";
                break;
            case "Clear":
                weatherIcon.src = 'images/clear.png';
                break;
            case "Rain":
                weatherIcon.src = 'images/rain.png';
                break;
            case "Drizzle":
                weatherIcon.src = 'images/drizzle.png';
                break;
            case "Mist":
                weatherIcon.src = 'images/mist.png';
                break;
            default:
                weatherIcon.src = '';
        }
    } catch (error) {
        alert(error.message);
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
    searchBox.value=""
});

checkWeather("new york")
