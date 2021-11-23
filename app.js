/* jshint esversion: 6*/
const fs = require("fs");
const { RSA_NO_PADDING } = require("constants");
const express = require('express');

// user authentication modules
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcryptjs = require("bcryptjs");

// database modules
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// connect the database
const connect = require("./database");

// database schemas
const User = require("./models/user");
const Post = require("./models/post");

//const homeJS = require("./public/js/home.js"); 
let username = '';
let loggedin = false;
let filtered = false;


const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(async function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

// use passport local strategy
passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) { 
            return done(err);
        }

        if (!user) {
            return done(null, false, { message: "Incorrect username" });
        }
        
        bcryptjs.compare(password, user.password, (err, res) => {
            
            if(res) {
                console.log("passwords match");
                return done(null, user);
            } else if(err) {
                console.log(err);
                return done(err);
            } else {
                console.log("passwords dont match");
                return done(null, false);
            }
        });
      });
    })
);

// keep these here *IMPORTANT*
app.use(passport.initialize());
app.use(passport.session());


// checks whether a user is logged in
function isLoggedIn(req, res, next) {
    
    // console.log(req.user);
    if(req.user) { // user is not logged in
        next();
    } else {
        res.sendFile(__dirname + "/home.html"); // user is not logged in
    }
}

// endpoint for homepage
app.get("/", function(req, res) {
    
    //render functions
    if (!filtered) {
        let posts = JSON.parse(fs.readFileSync("posts.json"));
        Post.find({}, function(err, foundPosts) {
            if (!err) {
                let renderInfo = {"userName": username, "posts": foundPosts};

                fs.writeFile("render.json", JSON.stringify(renderInfo), (err) => {
                    "Write error.";
                });
            }
        });   
    } else {
        filtered = false;
    }
    res.sendFile(__dirname + "/home.html");
});

// enpoint for creating a user
app.post('/createUser', function(req, res) {
    
    bcryptjs.hash(req.body.password, 10, (err, hashedPassword) => {
        // handle error
        if(err) {
            console.log("couldn't hash password");
        }
        // store user into the database
        const user = new User({
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword,
            posts: []
        }).save().then(entry => {
            console.log(entry);
        }).catch(err => {
            console.log(err);
        });

    });

    res.redirect("/");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
}));

app.get("/signout", (req, res) => {
    req.logout();
    res.redirect("/");
});


// endpoint will get the posts page
app.get("/post", function(req, res) {
    res.sendFile(__dirname + "/post.html");
});

// endpoint will send the navigation bar based on login status
app.get("/navbar", function(req, res) {
    
    if(req.user) {
        res.sendFile(__dirname + "/navbarlog.html");
    } else {
        res.sendFile(__dirname + "/navbar.html");
    }

});

// endpoint which gets all posts for the account
app.get("/account", function(req, res) {    
    res.sendFile(__dirname + "/account.html");
});

// endpoint will get an accounts posts file
app.get("/myAccountJSON", function(req, res){
    try {
        const username = req.user["username"];
        //pull from the database
        Post.find({author: username}, function(err, result) {
            if (err) throw err;
            res.send(result); 
        });
        //console.log(posts);
        //res.json(posts);

    } catch (error) {
        console.log(error);
    }
});

// endpoint which deletes a post on the account
app.get("/accountDelete/:postID", function(req, res){
    //get card's id and delete from the persistent storage/data

    const postID = req.params.postID;
    console.log(postID);

    Post.deleteOne({author: req.user["username"], _id: postID }, function(err, result) {
        if (err) throw err;
        res.redirect('/account');
    });

});

// endpoint which deletes a post on the account
app.get("/accountUpdate/:postID", function(req, res){
    //get card's id and delete from the persistent storage/data


    let updatedPost = {};
    fs.writeFileSync("update.json", "");

    const postID = req.params.postID;

    console.log(postID);

    if (fs.existsSync("posts.json")){
        let posts = JSON.parse(fs.readFileSync("posts.json"));
        for (let i = 0; i < posts.length; i++){
            if (posts[i]["_id"] == postID && posts[i]["author"] == username){
                updatedPost = posts[i];
                posts.splice(i,1);
                break;
            }
        }
        fs.writeFileSync("posts.json",JSON.stringify(posts));
        update = true;
        fs.writeFileSync("update.json",JSON.stringify({"post": updatedPost, "update": update}));
    }

    res.redirect('/post');

});

app.get("/updateJSON", function(req, res){
    res.sendFile(__dirname + "/update.json");
    update = false;
});


// endpoint will send the clubs_news page
app.get("/clubnews", function(req, res) {
    res.sendFile(__dirname + "/clubs_news.html");
});

// endpoint for going to the update info page
app.get("/updateInfo", function(req, res) {
    res.sendFile(__dirname + "/accountUpdate.html");
})

// endpoint for updating user account information
app.post("/updateAccountInfo", isLoggedIn, async function(req, res) {
    
    console.log(req.body);
    
    // save old email
    let oldEmail = req.user.username;
    
    if(req.body.useremail.length !== 0) {
            
        User.findOneAndUpdate({ username: req.user.username }, {username: req.body.useremail}).catch(err => {
            console.log(err);
        });
        
    }

    if(req.body.accountname.length !== 0) {
        User.findOneAndUpdate({ username: req.user.username }, {name: req.body.accountname}).catch(err => {
            console.log(err);
        });
    }

    if(req.body.userpassword.length !== 0) {

        //need to hash the password first
        bcryptjs.hash(req.body.userpassword, 10, (err, hashedPassword) => {
            // handle error
            if(err) {
                console.log("couldn't hash password");
            }
            
            User.findOneAndUpdate({ username: req.user.username }, {password: hashedPassword}).catch(err => {
                console.log(err);
            });
        });
    }
    
    // find every instance of the old username in each liked_username array
    try {
        await Post.updateMany({ liked_username : oldEmail}, { $set: {"liked_username.$" : req.user.username}});
    } catch (error) {
        console.log(error);
    }

    res.redirect('/account');
});


// endpoint for creating a new post
app.post("/createPost", isLoggedIn, function(req, res) {
    
    console.log(req.user);
    console.log('entering create a post endpoint');    
    
    const post = new Post({
        author: req.user.username,
        liked_count: 0,
        liked_username: [],
        title: req.body.title,
        content: req.body.content,
        activity: req.body.activity,
        workout: req.body.workout,
        duration: req.body.duration,
        time: req.body.time,
        contact: req.body.contact,
        date: req.body.date,
        days: req.body.days
    }).save().then(entry => {
        console.log(entry);
    }).catch(err => {
        console.log(err);
        console.log('post couldn\'t be saved in database');
    });
    
    res.redirect("/");
});

app.post("/filter", function(req, res) {

    let posts = Post.find({});
    let filterData = req.body;

    let filteredPosts = [...posts];
    if ("activity" in filterData) {
        if (filterData["activity"].length !== 0) {
            filteredPosts = filteredPosts.filter(elem => ("activity" in elem));
            filteredPosts = filteredPosts.filter(elem => (elem["activity"] === filterData["activity"]));
        }
    }

    if ("workout" in filterData) {
        if (filterData["workout"].length !== 0) {
            filteredPosts = filteredPosts.filter(elem => ("workout" in elem));
            filteredPosts = filteredPosts.filter(elem => (elem["workout"] === filterData["workout"]));
        }
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
            filteredPosts = filteredPosts.filter(elem => (elem["days"].includes("Monday")));
        }

        if ("Tuesday" in filterData) {
            filteredPosts = filteredPosts.filter(elem => (elem["days"].includes("Tuesday")));
        }

        if ("Wednesday" in filterData) {
            filteredPosts = filteredPosts.filter(elem => (elem["days"].includes("Wednesday")));
        }

        if ("Thursday" in filterData) {
            filteredPosts = filteredPosts.filter(elem => (elem["days"].includes("Thursday")));
        }

        if ("Friday" in filterData) {
            filteredPosts = filteredPosts.filter(elem => (elem["days"].includes("Friday")));
        }

        if ("Saturday" in filterData) {
            filteredPosts = filteredPosts.filter(elem => (elem["days"].includes("Saturday")));
        }

        if ("Sunday" in filterData) {
            filteredPosts = filteredPosts.filter(elem => (elem["days"].includes("Sunday")));
        }
    }

    let renderInfo = {"userName": req.user.username, "posts": filteredPosts};

    fs.writeFile("render.json", JSON.stringify(renderInfo), (err) => {
        "Write error.";
    });

    filtered = true;
    //render them acordingly
    res.redirect("/");
    //homeJS.render(filteredPosts, username);
});

app.get("/like/:postID", async function(req, res) {
    if(!req.user) {
        alert("User not logged in");
        res.redirect("/");
    }
    let postID = parseInt(req.params.postID);
    // let posts = JSON.parse(fs.readFileSync("posts.json"));
    let renderData = (JSON.parse(fs.readFileSync("render.json")));
    let postsRender = renderData["posts"];

    const likedPost = Post.findOne({"_id": postID});

    // const postIndex = posts.findIndex(elem => elem._id === postID);
    const postIndexRender = postsRender.findIndex(elem => elem._id === postID);
    
    // if(posts[postIndex]["liked_username"].includes(username)) {
    //     posts[postIndex].liked_count--;
    //     postsRender[postIndexRender].liked_count--;

    //     const index = posts[postIndex]["liked_username"].indexOf(username);
    //     posts[postIndex]["liked_username"].splice(index, 1);

    //     const indexRender = postsRender[postIndexRender]["liked_username"].indexOf(username);
    //     postsRender[postIndexRender]["liked_username"].splice(indexRender, 1);


    // } else {
    //     posts[postIndex].liked_count++;
    //     posts[postIndex]["liked_username"].push(username);

    //     postsRender[postIndexRender].liked_count++;
    //     postsRender[postIndexRender]["liked_username"].push(username);
    // }

    // fs.writeFile("posts.json", JSON.stringify(posts), (err) => {
    //     "Post creation error.";
    // });

    if(likedPost["liked_username"].includes(req.user.username)) {
        const index = likedPost["liked_username"].indexOf(req.user.username);
        likedPost["liked_username"].splice(index, 1);
        try {
            await Post.findOneAndUpdate({"_id": postID}, {$set: {liked_count: likedPost["liked_count"] - 1, liked_username: likedPost["liked_username"]}});
        } catch (error) {
            console.log(error);
        }
        postsRender[postIndexRender].liked_count--;
        postsRender[postIndexRender]["liked_username"].splice(indexRender, 1);

        
    } else {
        likedPost["liked_username"].push(req.user.username);
        try {
            await Post.findOneAndUpdate({"_id": postID}, {$set: {liked_count: likedPost["liked_count"] - 1, liked_username: likedPost["liked_username"]}});
        } catch (error) {
            console.log(error);
        }
        postsRender[postIndexRender].liked_count++;
        postsRender[postIndexRender]["liked_username"].push(req.user.username);
    }

    renderData["posts"] = postsRender;

    fs.writeFile("render.json", JSON.stringify(renderData), (err) => {
        "Post creation error.";
    });

    res.redirect("/");
});

app.get("/renderjson", function(req, res) {
    res.sendFile(__dirname + "/render.json");
});

app.listen(8080, function(err) {
    if(err) {
        console.log("couldn't connect to server");
    }
});


