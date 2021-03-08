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

var submitBtn = document.querySelector('.submit-btn')

function queryInput(event){
    event.preventDefault();

    var cityInput = document.querySelector('#city-control').value
    if (!cityInput){
        window.alert('Please put a city into the search bar')
        return;
    }

    apiSearch(cityInput)
    // saveCity(cityInput)
}

function apiSearch(cityInput){
    var cityLookUp = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityInput + '&appid=0f9afbf13ed5dbd1109884bf6550b637'

    console.log(cityLookUp)

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
}  

// function readData

// function to post the data to the sheet

// function saveCity (cityInput){
    // this is going to about saving the city to the local storage
    // creating the btn with class of saved-city
// }

submitBtn.addEventListener('click', queryInput)
// create an event listener for the btns that are coming from the search history