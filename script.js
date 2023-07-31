// API key
var apiKey = '9f337e411827aaa24790c7ee9ee91bbc';
//var apiKey = '7ab439372a6b7834b1058543aced3bee' Personal key, but doesn't fetch correctly


// City search button and input box
var searchBtn = document.querySelector('#searchBtn');
var searchInput = document.querySelector('input');
var citySearch = [];



searchBtn.addEventListener('click', handleSearch)
function handleSearch ( ) {
    if (!searchInput)
    return;

    var city = searchInput.value;
fetchWeather(city)
addToHistory(city);
}

function fetchWeather (city) {
    var apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`
    fetch(apiUrlWeather).then(response => response.json( )).then(data => {
        console.log(data);
        displayWeather(data)
        fetchForecast(data)
    })
}

function fetchForecast (data) {
    var apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&appid=${apiKey}`
    fetch(apiUrlForecast).then(response => response.json( )).then(data => {
        console.log(data)
    })
}



function displayWeather (data) {

var date = dayjs.unix(data.dt).format('MMM D, YYYY');

document.getElementById('city').textContent=data.name;
document.getElementById('date').textContent= date;
document.getElementById('icon').src=`https://openweathermap.org/img/w/${data.weather[0].icon}.png`
document.getElementById('temp').textContent = data.main.temp + ' F'
document.getElementById('hum').textContent = data.main.humidity + ' %'
document.getElementById('ws').textContent = data.wind.speed + ' mph'
}

function displayForecast (data) {
    document.getElementById("forecast_weather").innerHTML = '';
    for (let i = 3; i < data.length; i+=8) {

        let card = document.createElement("div");

        var changeDate = days.js.unix(data[i].dt).format('MM D, YYYY');

        let date = document.createDocumentFragment("h3");
        date.textContent = changeDate;

        let temp = document.createElement('p');
        temp.textContent = data[i].main.temp;

        let hum = document.createElement('p');
        hum.textContent = data[i].main.temp;

        let ws = document.createElement('p');
        ws.textContent = data[i].wind.speed;

        let icon = document.createElement('img');
        icon.src = `https://openweathermap.org/img/w/${data[i].weather[0].icon}.png`
        card.append(date,icon,temp,hum,ws);
        card.classList.add("forecast_card");
        card.classList.add("day-" + i);
        document.getElementById('forecast_weather').append
    }
}

function addToHistory (city) {
    if (citySearch.indexOf(city)!==-1)
    {return}
    citySearch.push(city)
    localStorage.setItem("searcHistory", JSON.stringify(citySearch))
    renderHistory();
}

function renderHistory() {

    document.getElementById("history").innerHTML = " ";
    for (i=citySearch.length-1;i>=0;i--)
    {
      let historyButton = document.createElement("button");
      historyButton.textContent = citySearch[i];
      document.getElementById("history").append(historyButton); 
    }
}

document.getElementById("history").addEventListener('click', function(event) {
    if (event.target.tagName === "BUTTON") {
        var city = event.target.textContent;
        fetchWeather(city);
    }
});

window.addEventListener('load', function () {

let savedSearches = this.localStorage.getItem('history');
if (savedSearches) {
    citySearch = JSON.parse(savedSearches);
    renderHistory();
}
});
