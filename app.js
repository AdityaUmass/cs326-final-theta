const express = require("express");


const app = express();

app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/home.html");
})

app.listen(8080, function() {
    console.log("Server started on port 8080");
});