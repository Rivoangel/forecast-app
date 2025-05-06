function displayTemperature(response) {
let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let descriptionElement= document.querySelector("#description");
  let humidityElement= document.querySelector("#humidity");
  let windSpeedElement=document.querySelector("#wind-speed");
  let currentDateElement=document.querySelector("#current-date");
  let date= new Date(response.data.time * 1000);
  let iconElement=document.querySelector("#icon");
  
  console.log(response.data)
  
  iconElement.innerHTML=`<img src="${response.data.condition.icon_url}" class="temp-icon"/>`;
  cityElement.innerHTML= response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML=`${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML=`${response.data.wind.speed}km/h`;
  currentDateELement.innerHTML= formatDate(date)//`${date.getDay()} ${date.getHours()}:${date.getMinutes()}`
  temperatureElement.innerHTML = temperature;

  getForecast(response.data.city);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "c4904cc93otb1dacc041bcba0f2ab309";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}  


function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function getForecast(city) {
  let apiKey = "c4904cc93otb1dacc041bcba0f2ab309";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios(apiUrl).then(displayForecast);

  /*console.log(apiUrl);*/
}

function formatDay(timestamp){
  let date= new Date(timestamp * 1000);
  let days=["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
  return days[date.getDay()];
}

function displayForecast(response){
  console.log(response.data);
   
   //let days=["Tue","Wed","Thur","Fri", "Sat"];//
   let forecastHtml="";

response.data.daily.forEach(function(day,index) {
  if (index < 5){
forecastHtml =
  forecastHtml +
  `            
  <div class="weather-forecast-day">
      <div class="weather-forecast-date">${formatDay(day.time)}</div>
      <div class="weather-forecast-forecast-icon"><img src="${day.condition.icon_url}"/></div>
      <div class="weather-forecast-temps"> 
           <div class="weather-forecast-temp"> 
               <strong>${Math.round(day.temperature.maximum)}°C </strong>
           </div>
          <div class="weather-forecast-temp"> ${Math.round(
            day.temperature.minimum)}°C</div>
      </div>            
    </div>`;}
});
 let forecastElement = document.querySelector("#forecast");
 forecastElement.innerHTML= forecastHtml;
}


let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
getForecast();