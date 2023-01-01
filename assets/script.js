let currentDayDiv = document.getElementById("singledayData");
let forecastDiv = document.getElementById("forecastDiv");
let searchBtn = document.getElementById("searchBtn");
let historyArr = JSON.parse(localStorage.getItem("historyArr")) || [];

function createButton(cityName) {
  var historyButton = document.createElement("button");
  historyButton.textContent = cityName;
  let historyDiv = document.getElementById("history");
  historyButton.addEventListener("click", function () {
    currentDayDiv.innerHTML = "";

    let api_key = "de1ebdbab3dcbe90af84b3193af5cd9b";
    console.log(cityName);
    let queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}`;
    fetch(queryUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let cityNameDiv = document.createElement("div");
        cityNameDiv.innerHTML = data.name; //data.name

        let tempDiv = document.createElement("div");
        tempDiv.innerHTML = data.main.temp; //data.main.temp

        let humidityDiv = document.createElement("div");
        humidityDiv.innerHTML = data.main.humidity; //data.main.humidity

        let windDiv = document.createElement("div");
        windDiv.innerHTML = data.wind.speed; //data.wind.speed

        currentDayDiv.append(cityNameDiv, tempDiv, humidityDiv, windDiv);
      });
    getForecastData(cityName);
  });
  historyDiv.append(historyButton);
}
for (let index = 0; index < historyArr.length; index++) {
  createButton(historyArr[index]);
}
function getWeather(event) {
  event.preventDefault();
  currentDayDiv.innerHTML = "";
  let cityName = document.querySelector("#cityName").value;
  createButton(cityName);
  historyArr.push(cityName);
  localStorage.setItem("historyArr", JSON.stringify(historyArr));
  let api_key = "de1ebdbab3dcbe90af84b3193af5cd9b";
  console.log(cityName);
  let queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}`;
  fetch(queryUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let cityNameDiv = document.createElement("div");
      cityNameDiv.innerHTML = data.name; //data.name

      let tempDiv = document.createElement("div");
      tempDiv.innerHTML = data.main.temp; //data.main.temp

      let humidityDiv = document.createElement("div");
      humidityDiv.innerHTML = data.main.humidity; //data.main.humidity

      let windDiv = document.createElement("div");
      windDiv.innerHTML = data.wind.speed; //data.wind.speed

      currentDayDiv.append(cityNameDiv, tempDiv, humidityDiv, windDiv);
    });
  getForecastData(cityName);
}

function getForecastData(cityName) {
  forecastDiv.innerHTML = "";
  let api_key = "de1ebdbab3dcbe90af84b3193af5cd9b";
  let queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${api_key}`;
  fetch(queryUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      for (let index = 5; index < data.list.length; index = index + 8) {
        console.log(data.list[index]);
        let cardDiv = document.createElement("div");
        cardDiv.setAttribute("class", "card");
        let forecastTemp = document.createElement("div");
        forecastTemp.innerHTML = "temp:" + data.list[index].main.temp;

        let humidityDiv = document.createElement("div");
        humidityDiv.innerHTML = "Humidity:" + data.list[index].main.humidity;

        cardDiv.append(forecastTemp, humidityDiv);
        forecastDiv.append(cardDiv);
      }
    });
}

searchBtn.addEventListener("click", getWeather);
