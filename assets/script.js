// let now = moment();
let currentDayDiv = document.getElementById("singledayData");
let forecastDiv = document.getElementById("forecastDiv");
let searchBtn = document.getElementById("searchBtn");
let historyArr = JSON.parse(localStorage.getItem("historyArr")) || [];
// var day = dayjs(today);
// console.log(day);
// var date = day.$M + "-" + day.$D + "-" + day.$y;
// var time = day.$H + ":" + day.$m + ":" + day.$s;
// var dateTime = date + " " + time;
// document.getElementById("currentDay").innerHTML = dateTime;

function createButton(cityName) {
  var historyButton = document.createElement("button");
  historyButton.textContent = cityName;
  let historyDiv = document.getElementById("history");
  historyButton.addEventListener("click", function () {
    currentDayDiv.innerHTML = "";

    let api_key = "de1ebdbab3dcbe90af84b3193af5cd9b";
    console.log(cityName);
    let queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&units=imperial`;
    fetch(queryUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let cityNameDiv = document.createElement("div");
        cityNameDiv.innerHTML = data.name; //data.name

        let todayDate = document.createElement("div");
        todayDate.innerHTML = moment.unix(data.dt).format("MM/DD/YY");

        let tempDiv = document.createElement("div");
        tempDiv.innerHTML = data.main.temp; //data.main.temp

        let humidityDiv = document.createElement("div");
        humidityDiv.innerHTML = data.main.humidity; //data.main.humidity

        let windDiv = document.createElement("div");
        windDiv.innerHTML = data.wind.speed; //data.wind.speed

        let iconDiv = document.createElement("img");
        iconDiv.setAttribute(
          "src",
          "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
        );
        iconDiv.setAttribute("class", "iconStyle");
        currentDayDiv.append(
          cityNameDiv,
          tempDiv,
          humidityDiv,
          windDiv,
          todayDate,
          iconDiv
        );
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
  currentDayDiv.innerHTML = "Today's Weather:";
  let cityName = document.querySelector("#cityName").value;
  createButton(cityName);
  historyArr.push(cityName);
  localStorage.setItem("historyArr", JSON.stringify(historyArr));
  let api_key = "de1ebdbab3dcbe90af84b3193af5cd9b";
  console.log(cityName);
  let queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&units=imperial`;
  fetch(queryUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let cityNameDiv = document.createElement("div");
      cityNameDiv.innerHTML = data.name; //data.name

      let todayDate = document.createElement("div");
      todayDate.innerHTML = moment.unix(data.dt).format("MM/DD/YY");

      let tempDiv = document.createElement("div");
      tempDiv.innerHTML = data.main.temp; //data.main.temp

      let humidityDiv = document.createElement("div");
      humidityDiv.innerHTML = data.main.humidity; //data.main.humidity

      let windDiv = document.createElement("div");
      windDiv.innerHTML = data.wind.speed; //data.wind.speed

      let iconDiv = document.createElement("img");
      iconDiv.setAttribute(
        "src",
        "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
      );
      iconDiv.setAttribute("class", "iconStyle");

      currentDayDiv.append(
        cityNameDiv,
        tempDiv,
        humidityDiv,
        windDiv,
        todayDate,
        iconDiv
      );
    });
  getForecastData(cityName);
}

function getForecastData(cityName) {
  forecastDiv.innerHTML = "";
  let api_key = "de1ebdbab3dcbe90af84b3193af5cd9b";
  let queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${api_key}&units=imperial`;
  fetch(queryUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let fiveDayHeader = document.createElement("h2");
      fiveDayHeader.innerHTML = "Five Day Forecast";
      forecastDiv.append(fiveDayHeader);
      for (let index = 5; index < data.list.length; index = index + 8) {
        console.log(data.list[index]);

        let cardDiv = document.createElement("div");
        cardDiv.setAttribute("class", "cardData");
        // let currentForecastDate = now.add(i + 1, "d");
        let forecastDate = document.createElement("h3");
        forecastDate.textContent = moment
          .unix(data.list[index].dt)
          .format("MM/DD/YY");
        // console.log(currentForecastDate);
        let forecastTemp = document.createElement("div");
        forecastTemp.innerHTML = "Temp: " + data.list[index].main.temp;

        let humidityDiv = document.createElement("div");
        humidityDiv.innerHTML = "Humidity: " + data.list[index].main.humidity;

        let windDiv = document.createElement("div");
        windDiv.innerHTML = "Wind Speed: " + data.list[index].wind.speed;

        let iconDiv = document.createElement("img");
        iconDiv.setAttribute(
          "src",
          "http://openweathermap.org/img/wn/" +
            data.list[index].weather[0].icon +
            "@2x.png"
        );

        cardDiv.append(
          forecastTemp,
          humidityDiv,
          windDiv,
          iconDiv,
          forecastDate
        );
        forecastDiv.append(cardDiv);
      }
    });
}

searchBtn.addEventListener("click", getWeather);
