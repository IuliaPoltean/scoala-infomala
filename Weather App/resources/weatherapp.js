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
        return alert("Please enter the city name in enlgish");
    }
    forecastDescription = await response.json();
    drawWeatherForcast(urlForecastWeather, cityName);
}

function drawWeatherForcast() {
    document.querySelector(".prognozaAcum").classList.remove("hidden");

    let list = forecastDescription.list;
    let allDays = document.querySelectorAll(".dayColumn");
    let idxDay = 0;
    let currentDate = list[0].dt_txt.substr(0, 10);

    allDays[idxDay].innerHTML = `<div class="date">Ziua: <span>${currentDate}</span></div>`

    for (let i = 0; i < list.length; i++) {
        let icon = "http://openweathermap.org/img/w/" + list[i]['weather'][0]['icon'] + ".png";
        let dateList = list[i].dt_txt.substr(0, 10);

        if (dateList === currentDate) {
            allDays[idxDay].innerHTML += `
                <div><img src="${icon}"></span></div>
                <div>Hour: <span>${list[i].dt_txt.substr(11, 5)}</span></div>
                <div>Temperature: <span>${list[i].main.temp + " °C"}</span></div>
                <div>Description: <span>${list[i].weather[0].description}</span></div>`
        } else {
            
            idxDay += 1;
            currentDate = dateList;
            allDays[idxDay].innerHTML = `<div class="date">Ziua: <span>${currentDate}</span></div>`
            i--;
        }
    }
}

async function prognozaAcum() {
    let cityName = document.querySelector("#cityName").value;
    await forecastNow(cityName);
}
