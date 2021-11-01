const express = require("express");

const app = express();

app.use(express.static("public"));

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

app.listen(8080, function() {
    console.log("Server started on port 8080");
});