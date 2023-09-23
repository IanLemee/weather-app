const apiKey = "e5b4f1555e359fcaab9b57a617f176eb"
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`

const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city) {
    const response = await fetch(apiUrl + city  + `&appid=${apiKey}`)
    if(response.status == 404) {
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
    } else {
        var data = await response.json()    

    console.log(data);

    document.querySelector(".city").innerHTML = data.name
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + " °C"
    document.querySelector(".max-temp").innerHTML = Math.round(data.main.temp_max) + " °C"
    document.querySelector(".min-temp").innerHTML = Math.round(data.main.temp_min) + " °C"

    if(data.weather[0].main == "Clouds") {
        weatherIcon.src = "assets/clouds.png"
    } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "assets/clear.png"
    } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "assets/rain.png"
    } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "assets/drizzle.png"
    } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "assets/mist.png"
    }

    if (data.main.temp >= "26") {
        document.querySelector(".card").classList.add("quente")
    } else if (data.main.temp <= "20") {
        document.querySelector(".card").classList.remove("quente")
        document.querySelector(".card").classList.add("frio")
    } else if (data.main.temp >= "25" && data.main.temp <= "21") {
        document.querySelector(".card").classList.remove("frio")
        document.querySelector(".card").classList.add("normal")
    }

    document.querySelector(".error").style.display = "none"
    document.querySelector(".weather").style.display = "block"
    }
    
}

searchBox.addEventListener('focus', () => {
    document.querySelector(".span").classList.add("span-active")
})

searchBox.addEventListener('focusout', (target) => {
    document.querySelector(".span").classList.remove("span-active")
})

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value)
    searchBox.value = ''
})