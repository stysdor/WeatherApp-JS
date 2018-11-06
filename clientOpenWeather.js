/*
Module is responsible for making request to OpenWeatherMap.
To add:
-possibility to find a city from the whole world (now it't only Poland)
-better way to send results then weatherObject
-don't use globals
*/


//object with information about weather in the city 
var weatherObject = {
        name: "",
        temperatures: []
    }; 

//variables to get connection to OpenWheatherMap
const openWeatherMapKey = "112964494ecb52aa1eade6307413e33f";
const server = "http://api.openweathermap.org/data/2.5/forecast?";
const ending = ",PL&lang=pl&units=metric&APPID=";

//Other variables
var gettingData = false; //flag
var request; 
var results;


//function stoping extra requests being sent
var checkIfDataRequested = function() {
    //console.log("checkIfDataRequested - gettingData = " + gettingData);
    while (gettingData === true) {
        request.abort();
        gettingData = false;
    }
};

//function making the weather request
var getWeather = function(city) {
    gettingData = true;
    //console.log(city + " " + typeof(city) + city.length);

    var requestString = server 
                        + "q=" + city
                        + ending + openWeatherMapKey;
    //console.log(requestString);

    return new Promise(function(resolve, reject) {

        //getting XMLHttpRequest
        if(window.XMLHttpRequest) { 
           request = new XMLHttpRequest(); 
            
        } else {
            //alert('Nie można utworzyć zapytania');
            console.log("Nie mozna utworzyc zapytania.");
            return false;
        }


        request.open("GET", requestString, true);
        //console.log(request.readyState);
        request.addEventListener('load', () => resolve(proccessResults(request.responseText)));
        request.addEventListener('error', () => reject(request.statusText));
        request.send(null);
        //console.log(request.readyState);
    });


};


//function taking JSON results and processing them
var proccessResults = function(response) {
  //console.log("Jestem w processResults");
    try { 
        if(request.readyState === 4) {
            //console.log("readyState == 4");
            if(request.status === 200) {
               // console.log("status == 200");
                results = JSON.parse(response);
                return jsonToWeatherObject(results);
            } else {
               // console.log("Wystąpił problem z zapytaniem. Request status = " + request.status);
                alert("Wystąpił problem z zapytaniem.");
            }
        } else {
            //console.log("Request.readyState: " + request.readyState);
        }
    } catch(e) { 
        alert("Złapany wyjątek: " + e.description);
    }  

};

//function returns an array with the name of the city and all temperatures 
var jsonToWeatherObject = function(weatherItem) {
    //console.log("Jestem w jsonToWeatherObject");
    weatherObject.name = weatherItem.city.name;
    for(var i of weatherItem.list) {
        weatherObject.temperatures.push(i.main.temp);
    }
    return weatherObject;
};

//function removing the data
var resetData = function () {
    weatherObject.name = "";
    weatherObject.temperatures = [];
};






