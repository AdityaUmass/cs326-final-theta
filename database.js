const mongoose = require('mongoose');

let secrets;
let password;

if(!process.env.PASSWORD) {
    secrets = require("./secrets");
    password = secrets.dbURL;
} else {
    password = process.env.PASSWORD;
}

mongoose.connect(password).then(function() {
    console.log("Database connected");
}).catch(error => handleError(error));
