import * as fs from 'fs';

const filepath = "saveState.txt";
let file = {};

const express = require("express");

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function reload(filename) {
    if (fs.existsSync(filename)) {
        let someStr = fs.readFileSync(filename);
        counter = JSON.parse(someStr);
    }
    else {
        counter = {};
    }
}


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/home.html");
});

app.get("/post", function(req, res) {
    res.sendFile(__dirname + "/post.html");
});

app.get("/navbar", function(req, res) {
    res.sendFile(__dirname + "/navbar.html");
});

app.get("/account", function(req, res) {
    res.sendFile(__dirname + "/account.html");
});

app.get("/clubnews", function(req, res) {
    res.sendFile(__dirname + "/clubs_news.html");
});

app.post("/createuser", function(req, res) {
    res.send('request to signup received');
    console.log(req.body);

    // extract information here

    // reload page
});

app.post("/loginuser", function(req, res) {
    res.send('request to login received');
    console.log(req.body);

    // extract information here

    // reload page

});

app.listen(8080, function() {
    console.log("Server started on port 8080");
});