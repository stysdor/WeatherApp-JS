/*
Module is responsible for adding and removing data from localStorage
*/

//function adding new city
var addCity = function (city, avrTemp) {
    if (localStorage.getItem(city) === null) {
        if(!isNaN(avrTemp)) {
            localStorage.setItem(city, avrTemp);
        }
    }
};

//function removing the city
var removeCity = function (city) {
    if(localStorage.getItem(city)) {
        var isOk = confirm("Do  you really want to remove: " + city + "?");
        if (isOk) {
            localStorage.removeItem(city);
            location.reload();
        }
    } else {
        return false;
    }
};

//function removing all the cities
var removeAll = function () {
    if (localStorage.length > 0) {
        var isOk = confirm("Do you really want to remove all cities?");
        if (isOk) {
            for (var key in localStorage) {
                localStorage.removeItem(key);
            }
            location.reload();
        }
    }
};