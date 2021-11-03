const fs = require("fs");
const express = require("express");

const filepath = "saveState.txt";
let file = {};

const username = "";
const loggedin = false;

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
    //render functions
    res.sendFile(__dirname + "/home.html");
});

app.get("/post", function(req, res) {
    res.sendFile(__dirname + "/post.html");
});

app.get("/navbar", function(req, res) {
    res.sendFile(__dirname + "/navbar.html");
});

app.get("/account", function(req, res) {    
    //pull data from the database using global username
    //render that data on to account.html
    res.sendFile(__dirname + "/account.html");
});

app.get("/accountDelete", function(req, res){
    //get card's id and delete from the persistent storage/data
});

app.get("/accountUpdate", function(req,res){
    //get card's id and pull data and 
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

app.post("/createPost", function(req, res) {
    console.log(req.body);
    //creator
    //likes
    //likedusers
    //unique-id
    res.redirect("/");
});

app.listen(8080, function() {
    console.log("Server started on port 8080");
});