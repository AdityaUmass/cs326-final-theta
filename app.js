/* jshint esversion: 6*/
const fs = require("fs");
const express = require("express");
const { RSA_NO_PADDING } = require("constants");
//const homeJS = require("./public/js/home.js"); 

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let username = "";
let loggedin = false;
let filtered = false

// endpoint for homepage
app.get("/", function(req, res) {
    //render functions
    if (!filtered) {
        let posts = JSON.parse(fs.readFileSync("posts.json"));
        let renderInfo = {"userName": username, "posts": posts};

        fs.writeFile("render.json", JSON.stringify(renderInfo), (err) => {
            "Write error.";
        });
    } else {
        filtered = false;
    }
    res.sendFile(__dirname + "/home.html");
});

// endpoint will get the posts page
app.get("/post", function(req, res) {
    res.sendFile(__dirname + "/post.html");
});

// endpoint will send the navigation bar based on login status
app.get("/navbar", function(req, res) {
    
    if(loggedin) {
        res.sendFile(__dirname + "/navbarlog.html");
    } else {
        res.sendFile(__dirname + "/navbar.html");
    }

});

// endpoint which gets all posts for the account
app.get("/account", function(req, res) {    
    //pull data from the database using global username
    //render that data on to account.html

    if(!loggedin) {
        res.status(400).send("User not logged in");
        return;
    }

    if (fs.existsSync("posts.json")){
        let posts = JSON.parse(fs.readFileSync("posts.json"));
        let i = {};
        loggedInPosts = [];
        posts.forEach(i => {
            console.log(i);
            if (i["author"] === username){
                loggedInPosts.push(i);
            }
        });
        console.log(loggedInPosts);
        fs.writeFileSync("myAccount.json", JSON.stringify(loggedInPosts));
    }
    else {
        fs.writeFileSync("myAccount.json", "[]");
    }
    res.sendFile(__dirname + "/account.html");
});

// endpoint will get an accounts posts file
app.get("/myAccountJSON", function(req, res){
    res.sendFile(__dirname + "/myAccount.json");
});

// endpoint which deletes a post on the account
app.get("/accountDelete/:postID", function(req, res){
    //get card's id and delete from the persistent storage/data

    if(!loggedin) {
        res.status(400).send("User not logged in");
        return;
    }

    const postID = req.params.postID;
    console.log(postID);
    if (fs.existsSync("posts.json")){
        let posts = JSON.parse(fs.readFileSync("posts.json"));
        for (let i = 0; i < posts.length; i++){
            if (posts[i]["_id"] == postID && posts[i]["author"] == username){
                posts.splice(i,1);
                break;
            }
        }
        fs.writeFileSync("posts.json",JSON.stringify(posts));
    }

    res.redirect('/account');

});

// endpoint updates a post on the account
app.get("/accountUpdate", function(req,res){
    //get card's id and pull data and 
});

// endpoint will send the clubs_news page
app.get("/clubnews", function(req, res) {
    res.sendFile(__dirname + "/clubs_news.html");
});

// endpoint for creating a new user
app.post("/createuser", function(req, res) {
    
    // opens a file
    let trackUsers = { users: [] };
    if(fs.existsSync("users.json")) {
        trackUsers = JSON.parse(fs.readFileSync("users.json"));
    }
    
    // finds user
    let userExists = trackUsers.users.some(user => user.accountemail === req.body.accountemail);
    
    // sends an error if the user already exists
    if(userExists) {
        res.status(400).send('An account with that email already exists');
        return;
    }
    
    // extract information here
    username = req.body.accountemail;
    loggedin = true;

    // push the user for the file
    trackUsers.users.push(req.body);
    let str = JSON.stringify(trackUsers);
    fs.writeFileSync("users.json", str);

    // reload page
    res.redirect('/');
});

// endpoint for logging in
app.post("/loginuser", function(req, res) {
 
    // open file and find user
    let trackUsers = JSON.parse(fs.readFileSync('users.json'));
    let user = trackUsers.users.find(x => x.accountemail === req.body.accountemail);


    // checks if the user exists
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

// endpoint for signing out
app.get("/signout", function(req, res) {
    loggedin = false;
    username = "";
    res.redirect('/');
});

// endpoint for going to the update info page
app.get("/updateInfo", function(req, res) {
    res.sendFile(__dirname + "/accountUpdate.html");
})

// endpoint for updating user account information
app.post("/updateAccountInfo", function(req, res) {
    
    // save old email
    let oldEmail = username;
    
    // open the file and find the user if there is one
    let trackUsers = JSON.parse(fs.readFileSync('users.json'));
    let user = trackUsers.users.find(x => x.accountemail === username);

    // check if the email was changed
    if(req.body.useremail.length !== 0) {
        
        user.accountemail = req.body.useremail;
        
        // change username
        username = user.accountemail;

        // update the posts file to replace the old email with the new email
        let posts = JSON.parse(fs.readFileSync("posts.json"));    
        
        posts.forEach( post => { 
        
            if(post["author"] === oldEmail) {
                post["author"] = username;
            }
            
            post["liked_username"].forEach( (name, index) => {
                if(name === oldEmail) {
                    post["liked_username"][index] = username;
                }        
            });
    
        });

        // write the new file
        fs.writeFileSync("posts.json", JSON.stringify(posts));


        // update the render file to replace the old email with the new email
        let render = JSON.parse(fs.readFileSync("render.json"));

        if(render["userName"] === oldEmail) {
            render["userName"] = username;
        }

        render["posts"].forEach( post => { 
        
            if(post["author"] === oldEmail) {
                post["author"] = username;
            }
            
            post["liked_username"].forEach( (name, index) => {
                if(name === oldEmail) {
                    post["liked_username"][index] = username;
                }        
            });
    
        });

        fs.writeFileSync("render.json", JSON.stringify(render));
    
    }

    // check if the account name was changed
    if(req.body.accountname.length !== 0) {
        user.accountname = req.body.accountname;
    }

    // check if the password was changed
    if(req.body.userpassword.length !== 0) {
        user.accountpassword = req.body.userpassword;
    }

    // write the new users
    fs.writeFileSync("users.json", JSON.stringify(trackUsers));

    // display that changes were saved

    res.redirect('/updateInfo');
});


// endpoint for creating a new post
app.post("/createPost", function(req, res) {
    if(!loggedin) {
        res.status(400).send("User not logged in");
        return;
    }

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

    let renderInfo = {"userName": username, "posts": posts};

    fs.writeFile("render.json", JSON.stringify(renderInfo), (err) => {
        "Write error.";
    });

    res.redirect("/");
    //homeJS.render(posts, username);
});

app.post("/filter", function(req, res) {
    console.log(req.body);

    let posts = JSON.parse(fs.readFileSync("posts.json"));
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

    let renderInfo = {"userName": username, "posts": filteredPosts};

    fs.writeFile("render.json", JSON.stringify(renderInfo), (err) => {
        "Write error.";
    });

    filtered = true;
    //render them acordingly
    res.redirect("/");
    //homeJS.render(filteredPosts, username);
});

app.get("/like/:postID", function(req, res) {
    if(!loggedin) {
        res.status(400).send("User not logged in");
        return;
    }
    let postID = parseInt(req.params.postID);
    let posts = JSON.parse(fs.readFileSync("posts.json"));
    let renderData = (JSON.parse(fs.readFileSync("render.json")));
    let postsRender = renderData["posts"];

    

    const postIndex = posts.findIndex(elem => elem._id === postID);
    const postIndexRender = postsRender.findIndex(elem => elem._id === postID);
    console.log(postIndex);
    if(posts[postIndex]["liked_username"].includes(username)) {
        posts[postIndex].liked_count--;
        postsRender[postIndexRender].liked_count--;

        const index = posts[postIndex]["liked_username"].indexOf(username);
        posts[postIndex]["liked_username"].splice(index, 1);

        const indexRender = postsRender[postIndexRender]["liked_username"].indexOf(username);
        postsRender[postIndexRender]["liked_username"].splice(indexRender, 1);


    } else {
        posts[postIndex].liked_count++;
        posts[postIndex]["liked_username"].push(username);

        postsRender[postIndexRender].liked_count++;
        postsRender[postIndexRender]["liked_username"].push(username);
    }

    fs.writeFile("posts.json", JSON.stringify(posts), (err) => {
        "Post creation error.";
    });

    renderData["posts"] = postsRender;

    fs.writeFile("render.json", JSON.stringify(renderData), (err) => {
        "Post creation error.";
    });

    res.redirect("/");
});

app.get("/renderjson", function(req, res) {
    res.sendFile(__dirname + "/render.json");
});

app.listen(process.env.PORT || 8080, function() {
    
});
