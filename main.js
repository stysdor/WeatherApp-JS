/*
Modul is responsible for displaying list of cities, adding event listeners and connect all others modules.
*/

(function() {
    "use strict"

//Getting elements 
var el = function (element) {
    if (element.charAt(0) === "#") { 
        return document.querySelector(element); 
    } else { 
        return document.querySelectorAll(element); 
    }
};


//Variables
var currentCity = el("#city"), //current city input
    form = el("#choosecity"), //form
    addBut = el("#submit"),
    removeBut = el("#removeAll"), //removeAll button
    table = el("#temp-table"); //table, where list of cities will be appear


currentCity.focus();

//function downloading list of cities from localStorage and showing them
var displayListOfCities = function() {
    if (localStorage.length > 0) {
        for (var key in localStorage) {
           displayCity(key);
        }
    }
};

//function creating row with the city and average temperature
var displayCity = function (city) {
    if(localStorage.getItem(city) != null) {
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        
        var nr = table.rows.length - 1; //number of row
        
        cell1.innerHTML = nr;
        cell2.innerHTML = city;
        cell3.innerHTML = localStorage.getItem(city) + "<sup>o</sup>C";
        
        var button = document.createElement("button");
        button.classList.add("remove-button");
        button.innerText = "Remove";
        
        cell4.appendChild(button);
        button.addEventListener("click", function(){removeCity(city);}, false);     
    }
};


//function connecting all modules to add new city and average temperature
var addCityHandler = function() {
    //checkIfDataRequested();
    var city = currentCity.value;
   // console.log(city);
    getWeather(city).then(function(res) {
        console.log(weatherObject);
        if (res.name) {
            res.averageTemp = calcAverageTemp(res.temperatures);
            addCity(res.name, res.averageTemp);
            resetData(); 
            location.reload();
        }
    }) .catch(function(error) {
        alert("Nie udało się pobrać danych.")
    });  
};


/**********************************/
/**** Adding eventListeners ****/
//form.addEventListener("submit", addCityHandler, false);
addBut.addEventListener("click", addCityHandler, false);
removeBut.addEventListener("click", removeAll, false);

onload = displayListOfCities;

}());
