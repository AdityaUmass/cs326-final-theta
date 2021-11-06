/* jshint esversion: 6*/
const fs = require("fs");
const express = require("express");
//const homeJS = require("./public/js/home.js"); 

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let username = "";
let loggedin = false;
let account = {};


// // function reloads the file (for temporary persistant storage)
// function reload(filename, kind) {
    
//     if (fs.existsSync(filename)) {
//         let someStr = fs.readFileSync(filename);
//         trackUsers = JSON.parse(someStr);   
//     }
// }

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

app.get("/account", function(req, res) {    
    //pull data from the database using global username
    //render that data on to account.html
    res.sendFile(__dirname + "/account.html");
});

app.get("/postJSON", function(req, res){
    res.sendFile(__dirname + "/posts.json");
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

    let trackUsers = { users: [] };
    if(fs.existsSync("users.json")) {
        trackUsers = JSON.parse(fs.readFileSync("users.json"));
    }
    
    let userExists = trackUsers.users.some(user => user.accountemail === req.body.accountemail);
    
    if(userExists) {
        res.status(400).send('An account with that email already exists');
    }
    
    // extract information here
    username = req.body.accountemail;
    loggedin = true;

    trackUsers.users.push(req.body);
    let str = JSON.stringify(trackUsers);
    fs.writeFileSync("users.json", str);

    // reload page
    res.redirect('/');
});

app.post("/loginuser", function(req, res) {
    
    //console.log(req.body);

    // find user info
    // what to do with this info? Send to client, print, etc...

    let trackUsers = JSON.parse(fs.readFileSync('users.json'));
    let user = trackUsers.users.find(x => x.accountemail === req.body.accountemail);

    //console.log(user);

    if(user === undefined) {
        res.status(400).send('Account not found');
    } else {
        // then the user was found, but password authentication is still needed (next milestone?)
        // extract information here
        if(user.accountpassword !== req.body.accountpassword) {
            res.status(400).send('Incorrect password');
        }
    
        username = req.body.accountemail;
        loggedin = true;
        res.redirect('/');
    }
});

app.get("/signout", function(req, res) {
    loggedin = false;
    username = "";
    res.redirect('/');
});

app.get("/updateInfo", function(req, res) {
    res.sendFile(__dirname + "/accountUpdate.html");
})

app.post("/updateAccountInfo", function(req, res) {
    
    let trackUsers = JSON.parse(fs.readFileSync('users.json'));
    let user = trackUsers.users.find(x => x.accountemail === username);

    if(req.body.useremail.length !== 0) {
        user.accountemail = req.body.useremail;
    }

    if(req.body.accountname.length !== 0) {
        user.accountname = req.body.accountname;
    }

    if(req.body.userpassword.length !== 0) {
        user.accountpassword = req.body.userpassword;
    }

    fs.writeFileSync("users.json", JSON.stringify(trackUsers));

    // display that changes were saved

    res.redirect('/updateInfo');
});



app.post("/createPost", function(req, res) {
    console.log(req.body);

    let posts = JSON.parse(fs.readFileSync("posts.json"));

    let post = {}
    let formData = req.body;

    post["author"] = username;
    post["liked_count"] = 0;
    post["liked_username"] = [];
    post["_id"] = posts.length + 1;

    post["title"] = formData.title;
    post["content"] = formData.content;
    post["activity"] = formData.activity;
    post["workout"] = formData.workout;
    post["duration"] = formData.duration;
    post["time"] = formData.time;
    post["contact"] = formData.contact;
    
    if(formData["date"].length !== 0) {
        post["date"] = formData.date;
        post["days"] = [];
    } else {
        let days = [];
        if ("Monday" in formData) {
            days.push("Monday");
        }

        if ("Tuesday" in formData) {
            days.push("Tuesday");
        }

        if ("Wednesday" in formData) {
            days.push("Wednesday");
        }

        if ("Thursday" in formData) {
            days.push("Thursday");
        }

        if ("Friday" in formData) {
            days.push("Friday");
        }

        if ("Saturday" in formData) {
            days.push("Saturday");
        }

        if ("Sunday" in formData) {
            days.push("Sunday");
        }

        post["days"] = days;
        post["date"] = "";
    }
    
    posts.push(post);

    fs.writeFile("posts.json", JSON.stringify(posts), (err) => {
        "Post creation error.";
    });

    res.sendFile(__dirname + "/home.html");
    //homeJS.render(posts, username);
});

app.post("/filter", function(req, res) {
    console.log(req.body);

    let posts = JSON.parse(fs.readFileSync("posts.json"));
    let filterData = req.body;

    let filteredPosts = [...posts];

    if (filterData["activity"].length !== 0) {
        filteredPosts = filteredPosts.filter(elem => ("activity" in elem));
        filteredPosts = filteredPosts.filter(elem => (elem["activity"] === filterData["activity"]));
    }

    if (filterData["workout"].length !== 0) {
        filteredPosts = filteredPosts.filter(elem => ("workout" in elem));
        filteredPosts = filteredPosts.filter(elem => (elem["workout"] === filterData["workout"]));
    }

    if (filterData["duration"].length !== 0) {
        filteredPosts = filteredPosts.filter(elem => ("duration" in elem));
        filteredPosts = filteredPosts.filter(elem => (elem["duration"] === filterData["duration"]));
        
    }

    if (filterData["time"].length !== 0) {
        filteredPosts = filteredPosts.filter(elem => ("activity" in elem));
        filteredPosts = filteredPosts.filter(elem => (elem["activity"] === filterData["activity"]));
    }

    if(filterData["date"].length !== 0) {
        filteredPosts = filteredPosts.filter(elem => ("date" in elem));
        filteredPosts = filteredPosts.filter(elem => (elem["date"] === filterData["date"]));
    } else {
        
        if ("Monday" in filterData) {
            filteredPosts = filteredPosts.filter(elem => ("Monday" in elem));
        }

        if ("Tuesday" in filterData) {
            filteredPosts = filteredPosts.filter(elem => ("Tuesday" in elem));
        }

        if ("Wednesday" in filterData) {
            filteredPosts = filteredPosts.filter(elem => ("Wednesday" in elem));
        }

        if ("Thursday" in filterData) {
            filteredPosts = filteredPosts.filter(elem => ("Thursday" in elem));
        }

        if ("Friday" in filterData) {
            filteredPosts = filteredPosts.filter(elem => ("Friday" in elem));
        }

        if ("Saturday" in filterData) {
            filteredPosts = filteredPosts.filter(elem => ("Saturday" in elem));
        }

        if ("Sunday" in formData) {
            filteredPosts = filteredPosts.filter(elem => ("Sunday" in elem));
        }
    }
    //render them acordingly
    res.sendFile(__dirname + "/home.html");
    //homeJS.render(filteredPosts, username);
});

app.get("/like/:postID", function(req, res) {
    let postID = req.params.postID;
    let posts = JSON.parse(fs.readFileSync("posts.json"));

    const postIndex = posts.findIndex(elem => elem._id === postID);

    if(posts[postIndex]["liked_username"].includes(username)) {
        posts[postIndex].liked_count--;
        const index = posts[postIndex]["liked_username"].indexOf(username);
        posts[postIndex]["liked_username"].splice(index, 1);
    } else {
        posts[postIndex].liked_count++;
        posts[postIndex]["liked_username"].push(username);
    }
});

app.listen(8080, function() {
    
});