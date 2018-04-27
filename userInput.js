const readline = require("readline-sync");

module.exports = class UserInput {
    static userStringInput(message){
        console.log(message);
        return readline.prompt();
    }
}