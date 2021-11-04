const fs = require("fs");
const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const userfile = "userFile.json";
let trackUsers = { users: [] };

const postsFile = "postFile.json";
let trackPosts = { posts: [] };

let username = "";
let loggedin = false;

// function reloads the file (for temporary persistant storage)
function reload(filename, kind) {
    
    if (fs.existsSync(filename)) {
        let someStr = fs.readFileSync(filename);
        
        if(kind === "users") {
            trackUsers = JSON.parse(someStr);
        } else {
            // file for posts
        }
    } else {
        
    }
}

// creates a user
function createUser(req, res) {
    
    reload(userfile, "users");

    trackUsers.users.push(req.body);
    let str = JSON.stringify(trackUsers);
    fs.writeFileSync(userfile, str);
    
    // console.log(trackUsers.users);
}

// 
function readUser(req, res) {

    reload(userfile, "users");
    
    // what to do with this info? Send to client, print, etc...
    let user = trackUsers.users.find(x => x === req.body.accountemail);

    if(user === undefined) {
        return;
        //res.send("User not found in the system");
    } else {
        res.send("user found");
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
    
    if(loggedin) {
        res.sendFile(__dirname + "/navbarlog.html");
    } else {
        res.sendFile(__dirname + "/navbar.html");
    }

});

app.get("/signout", function(req, res) {
    loggedin = false;
    username = "";
    res.redirect('/');
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
    
    console.log(req.body);

    // extract information here
    username = req.body.accountemail;
    loggedin = true;


    createUser(req, res);

    // reload page
    res.redirect('/');
});

app.post("/loginuser", function(req, res) {
    
    console.log(req.body);

    // extract information here
    username = req.body.accountemail;
    loggedin = true;

    // find user info
    readUser(req, res);
    res.redirect('/');
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