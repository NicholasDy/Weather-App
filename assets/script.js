// going to need a if statement that is going to change the colour based on the danger of the UV index

// local storage that is going to keep the information ready for a later search
    // each button is going to be for an array that can be kept for later 
    // key value pair ("City", X)

// two event listeners 
    // one for the submit button to take the data and pass it along to the fetch 
    // one for the recall from the localstorage

// fetch to grab the infomation from the API 
    // parameters for the api 
    // one call API https://openweathermap.org/forecast5

    // api key 0f9afbf13ed5dbd1109884bf6550b637

// taking the data from the api and then applying it to the new cards
    // append the cards to the box 

// icon for the sun 
/* <i class="far fa-sun"></i> */
// <i class="fas fa-cloud-sun"></i>
/* <i class="fas fa-wind"></i> */
// <i class="fas fa-cloud-rain"></i>
// <i class="fas fa-cloud-showers-heavy"></i>
// <i class="fas fa-snowflake"></i>

var searchHistory = document.querySelector('.search-history')
var cityPrint = document.querySelector('.city-info')
var cityNameEl = document.querySelector('.city-name')
var dateEl = document.querySelector('.current-date')
var tempEl = document.querySelector('.temp')
var humEl = document.querySelector('.hum')
var windEl = document.querySelector('.wind-speed')
var uvEl = document.querySelector('.uv-index')
var dataDay = $('.day-forecast')

var submitBtn = document.querySelector('.submit-btn')
var savedBtn = document.querySelector('.saved-btn')


var savedCities = []

function init() {
    freshLoad()
}

// this is for the Current weather
function printResultsCCurrent(cityInfoCurrent){
    cityNameEl.textContent = cityInfoCurrent.name
    dateEl.textContent = moment().format('MMMM Do YYYY');
    tempEl.textContent = Math.ceil(cityInfoCurrent.main.temp)
    humEl.textContent = cityInfoCurrent.main.humidity
    windEl.textContent = cityInfoCurrent.wind.speed
    console.log(cityInfoCurrent.main)
    // needed for the UV index
    var latEl = cityInfoCurrent.coord.lat                  
    var lonEl = cityInfoCurrent.coord.lon  
    fetchForecastUV(latEl, lonEl)

    if (uvEl >= 11){
        uvEl.style.backgroundColor = 'purple';
    } else if (uvEl >= 8 ){
        uvEl.style.backgroundColor = 'red';
    } else if (uvEl >= 6 ){
        uvEl.style.backgroundColor = 'orange';
    }else if (uvEl >= 8 ){
        uvEl.style.backgroundColor = 'yellow';
    } else if (uvEl >= 8 ){
        uvEl.style.backgroundColor = 'green';
    } else {
        uvEl.style.backgroundColor = 'black';
    }
}

function printResults (cityLookUpUV){
//     <div class="day-forecast card text-white bg-primary m-2" data-day ='0'>
    //     <div class="card-header">Date</div>
    //     <div class="card-body">
    //         <i class="far fa-2x"></i>
    //         <p class="card-text">Temperature</p>
    //         <p class="card-text">Humidity</p>
    //     </div>
//      </div>
    
    dataDay.each(function(){
          var keyPair = $(this).data('day')
          console.log(keyPair)
          var valuePair = cityLookUpUV.daily[keyPair]
          console.log(valuePair)
          var dayTemp = $('.day-temp')
          if (valuePair){
              $(this).children(dayTemp).text(valuePair.temp.day)
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
            console.log(cityInfoCurrent)
            printResultsCCurrent(cityInfoCurrent);              
        })

}  

// Fetch for the UV index excluding the extra data to reduce load 
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
        console.log(cityLookUpUV)
        uvEl.textContent = cityLookUpUV.current.uvi  
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
            console.log(savedCities)
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

