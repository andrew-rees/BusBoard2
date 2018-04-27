const readline = require('readline-sync');
const UserInput = require('./userInput.js');
const StopPoint = require('./stopPoint.js');
const request = require('request');
const moment = require('moment');

//////////////////////////////////////////////
//REQUEST USER INPUT AND INSERT INTO WEBSITE//
/////////////////////////////////////////////

const stopIDFromUser = UserInput.userStringInput("Hello, welcome to the Softwire Office Bus Finder \nPlease enter your stop ID (I suggest 490008660N for Lady Somerset Road)");

function validStop(stopId) {
    if (stopId === "490008660N") {
        return true;
    }
    else {
        return false;
    }
}
if(validStop(stopIDFromUser)) {
    const urlToPass = "https://api.tfl.gov.uk/StopPoint/" + stopIDFromUser + "/Arrivals?app_id=80448403&app_key=1838b580516c2c1af21129253487f634"
    request(urlToPass, function (error, response, body) { //the website for stop 490008660N
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

        let stopPoints = [];
        let jsonArr = JSON.parse(body)
        jsonArr.forEach(obj => {
            let stopPoint =  new StopPoint (obj.lineId, obj.towards, obj.expectedArrival);
            stopPoints.push(stopPoint);
        });
        stopPoints.sort(function(a, b)
            {
            return a.expectedArrival - b.expectedArrival
        }) 
        stopPoints.forEach(
            function (a){
                console.log(a.stopPrint())
            })
    });
} else {
    console.log("This is not a valid stop")
}