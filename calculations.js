/*
Module is responsible for calculations.
*/

//function calculating an average temperature
//param temperatures - array 
var calcAverageTemp = function (temperatures) {
    
    if (temperatures.length === 0 ) {
        return false;
    } else {

        let equal = 0;

        for (let i = 0; i < temperatures.length; i++){
            if (isNaN(temperatures[i])) {
                return false;
            } 
            equal += temperatures[i];
        }

        return (equal/temperatures.length).toFixed(1);
    }
};

/*test
var exampleTemp = [16, 17, 18];
console.log(calcAverageTemp(exampleTemp));

exampleTemp = ["pies", 17, 18];
console.log(calcAverageTemp(exampleTemp));
 */

