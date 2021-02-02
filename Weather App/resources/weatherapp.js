let urlCurrentWeather = "https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=";

let weatherDescription = {};

async function weatherNow(cityName) {
    const response = await fetch(urlCurrentWeather + cityName);

    if (response.status != 200) {
        return alert("Please enter the city name in enlgish");
    }
    weatherDescription = await response.json();
    drawWeatherNow(weatherDescription, cityName);
}

function drawWeatherNow(weatherDescription, cityName) {
    document.querySelector(".vremeaAcum").classList.remove("hidden");
    let str = "";
    str = `
    <div class="weahterNowColumns">
        <div>
            <img id="wicon" src="https://openweathermap.org/img/w/${weatherDescription?.weather[0].icon}.png" alt="Weather icon">
            <p>Descriere: ${weatherDescription?.weather[0].main}</p>
            <p>Umiditate: ${weatherDescription?.main.humidity} %</p>
            <p>Presiune: ${weatherDescription?.main.pressure} mmHg</p>
            <p>Temperatura curenta: ${weatherDescription?.main.temp} °C</p>
            <p>Minima zilei: ${weatherDescription?.main.temp_min} °C</p>
            <p>Maxima zilei: ${weatherDescription?.main.temp_max} °C</p>
        </div>
        <div class="map">
        <iframe width="100%" height="100%" id="gmap_canvas" src="https://maps.google.com/maps?q=${cityName}&t=&z=11&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" ></iframe>
        </div>
    </div>
    `;
    document.querySelector(".vremeaList").innerHTML = str;
}

async function vremeaAcum() {
    let cityName = document.querySelector("#cityName").value;
    await weatherNow(cityName);
}

let urlForecastWeather = "https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=";

let forecastDescription = {};

async function forecastNow(cityName) {
    const response = await fetch(urlForecastWeather + cityName);

    if (response.status != 200) {
        return alert("BAAAAAA IN ENGLEZA ORASUL!");
    }
    forecastDescription = await response.json();
    drawWeatherForcast(forecastDescription, cityName);
}

function drawWeatherForcast() {
    document.querySelector(".prognozaAcum").classList.remove("hidden");
    let forecastColumnsStr = ``;
    let daysArray = [];

    forecastDescription.list?.forEach(element => {
        const date = new Date(element.dt * 1000);

        // Construct days
        let year = date.getFullYear();
        let month = date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();
        let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        let dayString = day + '/' + month + '/' + year;

        if (!daysArray.includes(dayString)) {
            daysArray.push(dayString);
        }

        // Construct forecast items
        const hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        let hour = hours + ":" + minutes;

        forecastColumnsStr += `
            <div class="weatherForecasstColumns">
                <img id="wicon" src="https://openweathermap.org/img/w/${element.weather[0].icon}.png" alt="Weather icon">
                <p>Ora: ${hour}</p>
                <p>Temperatura: ${element.main.temp}</p>
                <p>Descriere: ${element.weather[0].main}</p>
            </div>
            `
    });

    // Draw forecast items
    document.querySelector(".prognozaList").innerHTML = forecastColumnsStr;
}

async function prognozaAcum() {
    let cityName = document.querySelector("#cityName").value;
    await forecastNow(cityName);
}
