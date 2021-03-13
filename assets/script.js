var searchHistory = document.querySelector('.search-history')
var cityPrint = document.querySelector('.city-info')
var cityNameEl = document.querySelector('.city-name')
var dateEl = document.querySelector('.current-date')
var tempEl = document.querySelector('.temp')
var humEl = document.querySelector('.hum')
var windEl = document.querySelector('.wind-speed')
var uvEl = document.querySelector('.uv-index')
var dataDay = $('.day-forecast')
var currentIcon = document.querySelector('.current-icon')

var submitBtn = document.querySelector('.submit-btn')
var savedBtn = document.querySelector('.saved-btn')


var savedCities = []

function init() {
    freshLoad()
}

// this is for the Current weather
function printResultsCCurrent(cityInfoCurrent){
    console.log(cityInfoCurrent)
    cityNameEl.textContent = cityInfoCurrent.name
    dateEl.textContent = moment().format('MMMM Do YYYY');
    tempEl.textContent = Math.ceil(cityInfoCurrent.main.temp)
    humEl.textContent = cityInfoCurrent.main.humidity
    windEl.textContent = cityInfoCurrent.wind.speed
    
    // needed for the UV index
    var latEl = cityInfoCurrent.coord.lat                  
    var lonEl = cityInfoCurrent.coord.lon  
    fetchForecastUV(latEl, lonEl)

    // Icon logic 
    var currentTime =  moment().unix()
    var sunsetValue = cityInfoCurrent.sys.sunset
    var sunset = moment(sunsetValue).unix()
    if (currentTime > sunset){
        currentIcon.classList.add('fa-moon')
    } else if (cityInfoCurrent.weather[0].icon === '02d'){
        currentIcon.classList.add('fa-cloud-sun')
      } else if (cityInfoCurrent.weather[0].icon === '04d'){
       currentIcon.classList.add('fa-cloud-sun')
      } else if (cityInfoCurrent.weather[0].icon === '01d'){
       currentIcon.classList.add('fa-sun')
      } else if (cityInfoCurrent.weather[0].icon === '01n'){
       currentIcon.classList.add('fa-sun')
      } else if (cityInfoCurrent.weather[0].icon === '50d'){
       currentIcon.classList.add('fa-smog')
      } else if (cityInfoCurrent.weather[0].icon === '13d'){
       currentIcon.classList.add('fa-snowflake')
      } else if (cityInfoCurrent.weather[0].icon === '11d'){
       currentIcon.classList.add('fa-cloud-rain')
      } else if (cityInfoCurrent.weather[0].icon === '10d'){
       currentIcon.classList.add('fa-cloud-rain')
      } else if (cityInfoCurrent.weather[0].icon === '09d'){
       currentIcon.classList.add('fa-cloud-rain')
      }

}

function printResults (cityLookUpUV){

    dataDay.each(function(){
          var keyPair = $(this).data('day')  
          var valuePair = cityLookUpUV.daily[keyPair]
          var dayDate = $('.day-dat')
          var dayTemp = $('.day-temp')
          var dayHum =$('.day-hum')
          
          if (valuePair){
              var dateTime = moment.unix(valuePair.dt)
              var tempthen = Math.ceil(valuePair.temp.day)
              var dayFore = $('.localfore')
              $(this).find(dayDate).text(moment(dateTime).format("MM-DD-YYYY") )
              $(this).find(dayTemp).text(tempthen)
              $(this).find(dayHum).text(valuePair.humidity)
              if (valuePair.weather[0].icon === '02d'){
                $(this).find(dayFore).addClass('fa-cloud-sun')
              } else if (valuePair.weather[0].icon === '04d'){
                $(this).find(dayFore).addClass('fa-cloud-sun')
              } else if (valuePair.weather[0].icon === '01d'){
                $(this).find(dayFore).addClass('fa-sun')
              } else if (valuePair.weather[0].icon === '50d'){
                $(this).find(dayFore).addClass('fa-smog')
              } else if (valuePair.weather[0].icon === '13d'){
                $(this).find(dayFore).addClass('fa-snowflake')
              } else if (valuePair.weather[0].icon === '11d'){
                $(this).find(dayFore).addClass('fa-cloud-rain')
              } else if (valuePair.weather[0].icon === '10d'){
                $(this).find(dayFore).addClass('fa-cloud-rain')
              } else if (valuePair.weather[0].icon === '09d'){
                $(this).find(dayFore).addClass('fa-cloud-rain')
              }
          }
    })
  
    
}

function queryInput(event){
    event.preventDefault();

    var cityInput = document.querySelector('#city-control').value
    if (!cityInput){
        window.alert('Please put a city into the search bar')
        return;
    }
    saveCity()
    // apiSearch(cityInput)
    apiSearchCurrent(cityInput)
}

function queryInputBtn(e){ 
    // this is giving the problem of grabbing the frist class with saved-btn and not the button selected

    var cityInput = e.target.value
    
    // apiSearch(cityInput)
    apiSearchCurrent(cityInput)
}

// Fetch for all the forecast data

// Fetch for the current data and for the Lat and Lon 
function apiSearchCurrent(cityInput){
    cityPrint.classList.remove('hide')
    var cityLookUpCurrent = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityInput + '&units=imperial&appid=0f9afbf13ed5dbd1109884bf6550b637'

    fetch(cityLookUpCurrent)
        .then(function (response) {
            if (!response.ok){
                window.alert('incorrect ID')
                throw response.json();
            }
            
            return response.json();
        })
        .then(function (cityInfoCurrent){
            printResultsCCurrent(cityInfoCurrent);              
        })

}  

// Fetch for the UV index and the forecast Data
function fetchForecastUV (latEl, lonEl){
    var cityLookUpUV = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latEl + '&lon=' + lonEl +'&exclude=hourly,alerts&units=imperial&appid=0f9afbf13ed5dbd1109884bf6550b637'

    fetch(cityLookUpUV)
    .then(function (response) {
        if (!response.ok){
            window.alert('incorrect ID')
            throw response.json();
        }
     
        return response.json();
    })
    .then(function (cityLookUpUV){
        var uvBackEL = cityLookUpUV.current.uvi 
        uvEl.textContent = cityLookUpUV.current.uvi 
        if (uvBackEL > 11){
            uvEl.style.backgroundColor = 'purple';
        } else if (uvBackEL > 8 ){
            uvEl.style.backgroundColor = 'red';
        } else if (uvBackEL > 6 ){
            uvEl.style.backgroundColor = 'orange';
        }else if (uvBackEL > 3 ){
            uvEl.style.backgroundColor = 'yellow';
        } else if (uvBackEL > 0){
            uvEl.style.backgroundColor = 'green';
        } else {
            uvEl.style.backgroundColor = 'black';
        }
        printResults(cityLookUpUV);
        }
    )
}

// these are the functions used to help saved the data 
function saveCity (cityInput){
    var cityInput = document.querySelector('#city-control').value
    var savedCity = JSON.parse((localStorage.getItem('Saved Cities')))

    savedCities = []
    if(savedCity){
        savedCities.push(cityInput)
        var newArray = savedCities.concat(savedCity)
        console.log(newArray)
        localStorage.setItem('Saved Cities', JSON.stringify(newArray))
    } else {
        savedCities.push(cityInput)
        localStorage.setItem('Saved Cities', JSON.stringify(savedCities))
    }
    readCity()
}

function readCity(){
    var newArray = JSON.parse((localStorage.getItem('Saved Cities')))
    searchHistory.innerHTML = " "
    for (var i = 0; i < newArray.length; i++){
        var btnName = newArray[i]
        var button = document.createElement('button')
        button.classList.add('saved-btn')
        searchHistory.appendChild(button) 
        button.innerHTML = btnName
        button.setAttribute('value',btnName)
        }
}
    

function freshLoad(){
    var savedCity = JSON.parse((localStorage.getItem('Saved Cities')))
    if (!savedCity){
        return
    }else{
        for (var i = 0; i < savedCity.length; i++){
            var btnName = savedCity[i]
            var button = document.createElement('button')
            button.classList.add('saved-btn')
            searchHistory.appendChild(button) 
            button.innerText = btnName
            button.setAttribute('value',btnName)
        }
    }
    
}

init ()
submitBtn.addEventListener('click', queryInput) 
// add a key down event for enter if the search bar is not empty 

document.addEventListener('click', function(e){
    if(e.target && e.target.classList== 'saved-btn'){
        queryInputBtn (e)
    }
}) 

