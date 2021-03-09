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

var submitBtn = document.querySelector('.submit-btn')
var savedBtn = document.querySelector('.saved-btn')

var savedCities = []

function init() {
    freshLoad()
}

function queryInput(event){
    event.preventDefault();

    // going to have to create an if else statment that takes either the btn or the input value
    var cityInput = document.querySelector('#city-control').value
    if (!cityInput){
        window.alert('Please put a city into the search bar')
        return;
    }

    apiSearch(cityInput)
    // saveCity(cityInput)
}

function queryInputBtn(){

    var cityInput = document.querySelector('.saved-btn').value
    
    apiSearch(cityInput)
}

function apiSearch(cityInput){
    var cityLookUp = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityInput + '&appid=0f9afbf13ed5dbd1109884bf6550b637'
    
    console.log(cityLookUp)
    console.log(cityInput)

    fetch(cityLookUp)
        .then(function (response) {
            if (!response.ok){
                window.alert('incorrect ID')
                throw response.json();
            }
            
            return response.json();
        })
        .then(function (cityInfo){
            console.log(cityInfo)
        })
    
    saveCity()
}  

// function readData

// function to post the data to the sheet



function saveCity (cityInput){
    // this is going to about saving the city to the local storage
    // creating the btn with class of saved-city
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
    // this is going to have to be for a for each function
    var newArray = JSON.parse((localStorage.getItem('Saved Cities')))
    searchHistory.innerHTML = " "
    for (var i = 0; i < newArray.length; i++){
        var btnName = newArray[i]
        var button = document.createElement('button')
        button.classList.add('saved-btn')
        searchHistory.appendChild(button) 
        button.innerHTML = btnName
        button.setAttribute('value',btnName)
        button.onclick = queryInputBtn
        }
    // savedBtn.addEventListener('click', queryInputBtn) 
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
            button.onclick = queryInputBtn
        }
    }
    
}

init ()
submitBtn.addEventListener('click', queryInput) 
// document.addEventListener('click', function(e){
//     if(e.target && e.target.classList== 'saved-btn'){
        
//     }
// }) 

// create an event listener for the btns that are coming from the search history