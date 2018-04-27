const moment = require('moment');

module.exports = class StopPoint {
    constructor(lineId, towards, expectedArrival){
        this.lineId = lineId;
        this.towards = towards;
        this.expectedArrival = moment(expectedArrival);
    }
    stopPrint (){
        return (
            "Bus Number: " + this.lineId +
            "\nGoing to: " + this.towards +
            "\nExpected to arrive at: " + this.expectedArrival.format("H:mm D/MM/YYYY")
    );
}
}



