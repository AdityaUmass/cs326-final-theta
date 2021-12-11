# Team Theta

## UFit

## Fall 2021

## About UFit

UFit is a web application that gives UMass Amherst students and staff the opportunity to post about fitness related content. Users have the ability to find workout partners, start pickup basketball games, or share achievements, all through UFit. Filter posts from individuals by workout or activity type, date and time, or see all posts from users at UMass. There is currently no platform like UFit that allows students and staff at UMass to connect with each other centered around their athletic endeavors (<- maybe edit that).




## Team Members

* Aditya Kumar Roy Chowdhury - AdityaUmass
* Raghav Malpani - RaghavGame
* Brandon Figueredo - Brandredo



## User Interface


### Home/Posts page

Home Page View
![Homepage Image 1](https://github.com/AdityaUmass/cs326-final-theta/blob/master/public/Images/homepagef.png)

With Single-Day Activity Filter Enabled
![Homepage Image 2](https://github.com/AdityaUmass/cs326-final-theta/blob/master/public/Images/singledaytogglef.png)

With Multi-Day Activity Filter Enabled
![Homepage Image 3](https://github.com/AdityaUmass/cs326-final-theta/blob/master/public/Images/multidaytogglef.png)


### Navigation Menu

Not Logged in
![offcanvas2](https://github.com/AdityaUmass/cs326-final-theta/blob/master/public/Images/Screen%20Shot%202021-12-11%20at%2011.10.34%20AM.png)

Logged in
![offcanvas2](https://github.com/AdityaUmass/cs326-final-theta/raw/master/public/Images/offcanvasf.png)

### Login & Signup

Login Modal
![login](https://github.com/AdityaUmass/cs326-final-theta/blob/master/public/Images/loginf.png)

Signup Modal
![signup](https://github.com/AdityaUmass/cs326-final-theta/blob/master/public/Images/signupf.png)




### Account Page

Account Page View
![account Image 1](https://github.com/AdityaUmass/cs326-final-theta/blob/master/public/Images/accountf.png)

Display of usernames that have like your post
![account Image 2](https://github.com/AdityaUmass/cs326-final-theta/blob/master/public/Images/likedinterestedf.png)

### Update Account Page

Update account page
![update account](https://github.com/AdityaUmass/cs326-final-theta/blob/master/public/Images/updateaccf.png)

### Create A Post Page

Create A Post
![post Image 1](https://github.com/AdityaUmass/cs326-final-theta/blob/master/public/Images/createapostf.png)


## API

| Endpoint | Functionality |
| --- | --- |
| ```GET /``` | Accesses the homepage |
| ```GET /post``` | Accesses the "Create a Post" page |
| ```GET /clubnews``` | Accesses the "Clubs & News page |
| ```GET /updateInfo``` | Accesses the "Update Account" page |
| ```GET /account``` | Accesses "Account" page |
| ```GET /failureLogin``` | Accesses "Failed Login" page |
| ```POST /createuser``` | To create an account |
| ```POST /login``` | Handles logging in |
| ```GET /signout``` | Handles signing out |
| ```POST /updateAccountInfo``` | Processes account update information |
| ```GET /myAccountJSON``` | Find a users' posts |
| ```GET /accountDelete/:postID``` | Deletes a users' specific post |
| ```GET /accountUpdate/:postID``` | Updates a users' specific post |
| ```POST /createPost``` | To create a post |
| ```POST /filter``` | Filters posts on the homepage by criteria |
| ```GET /like/:postID``` | Likes a specific post |
| ```GET /navbar``` | Renders different navigation bars according to login status |



## Database

Our application uses MongoDB Atlas for the database. In the database we'll store a user's account credentials along with all posts created on UFit. Below you will find a representation of each 'collection' that is stored in the database.

### User
This document is used for when the client creates an account on UFit.
```
User document {
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    posts: {
        type: [String],
        required: false
    }
}
```

**name**: the name of the user

**username**: the username (email address) of the user, which will be used to login

**password**: the password to the user's account

**posts**: an array of Posts created by the user

As you can see, a ```name```, ```username```, and ```password``` are required fields to be entered in order to create an account.

### Post

Below is a representation of a Post document in the database. This is used when a user creates a post from their account:
```
Post document {

    author: {
        type: String,
        required: true
    },
    liked_count: Number,
    liked_username: [String],
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    activity: String,
    workout: String,
    duration: String,
    time: String,
    contact: {
        type: String,
        required: true
    },
    date: String,
    days: [String]
}
```

**author**: the name of the user who created the post

**liked_count**: the number of users who liked the post

**liked_username**: the username (email addresses) of the users who have liked the post

**title**: the title of the post - signifies what the post is about

**content**: a brief description related to the purpose of the post

**activity**: the activity type that a user can select (i.e. Gym, Cardio, etc)

**workout**: the workout type that a user can select (i.e. Upper Body, Lower Body, etc)

**duration**: how long the user plans to spend doing this event

**time**: the time the user wants to start the event

**contact**: the contact information of the user (i.e. email address, phone, social media, etc)

**date**: the day this event will take place

**days**: if this event will be reoccuring, this is a list of days the event will take place

A Post can be about looking for a workout partner, posting an achievement, or hosting a sporting event. Since there is a lot of variation for a Post, the only required fields are a: ```title```, ```content```, and ```contact```.



## URL Routes

* Main Home Page: accessible to all

```https://ufit326.herokuapp.com/``` 

* Clubs & News Page: accessible to all
 
```https://ufit326.herokuapp.com/clubnews```

* Create a Post Page: accessible only to users who have a valid account and are logged in
 
```https://ufit326.herokuapp.com/post```

* Account Page: accessible only to user who are logged in
 
```https://ufit326.herokuapp.com/account```

* Update Account Page: accessible only to user who are logged in
 
```https://ufit326.herokuapp.com/updateInfo```



## Authentication

Secure account credentials is a very important aspect of web development, and UFit utilizates password hashing and salting to accomplish this need. UFit implements PassportJS' local strategy along with Express Sessions to create and log in users, and a login session remains persistent across the application until a user signs out. All passwords are salted and hashed with an NPM package called BCryptJS. These secure passwords are the ones uploaded to the database.

## Division of Labor

Aditya Kumar Roy Chowdbury - Responsible for Post creation and rendering on homepage, contributions to the navbar design, filtering of posts on home page, and liking/unliking user posts. Handled post filteration and liking using MongoDB. Created general Express outline for server-side implementation.

Raghav Malpani

Brandon Figueredo - Responsible for user account creation, logging in and signing out using PassportJS and BCryptJS. Created functionality for a user to update their account information. Handled User and Post creation to the MongoDB database. Created Clubs & News page.

All - We all contributed to each milestone writeup. We also all made UI styling changes.

## Conclusion

The team worked well together in order to complete the goals and ideas we originally set out with and through the process, we even added new ideas such as the "Update Account" page. Initially, the project looked daunting due to our limited experience with designing a full-stack product but as the milestones progressed, we found ourselves to be more comfortable with the project overall. Designing the front-end of the website in Milestone 1 was likely the largest technical hurdle we faced as we were all very new to CSS and Bootstrap styling. Figuring out how to propagate information from the server-side code to the browser-side was also a challenge that took some time to figure out. Collaborating in person in order to work through these challenges was what helped us find solutions efficiently. 

Each of us focused on the implementation of specific components of the website throughout the duration of the project, which enabled us to complete work rapidly. Apart from learning to collaborate effectively, we learned a lot of new ideas in web development such as working with a non-relational database, uploading a site live, and encryption/authorization measures. The project offered a good opportunity to learn how to connect servers, databases, and a front-end to form a complete product. Something our team would have liked to know before starting on the project would be how to connect the database with the server-side code. This is because we essentially implemented most of the functionality of the website during Milestone 2 using files to store data as text. If we had this information prior, we could have saved some time in the database implementation section and maybe combined the two milestones. On a more general level, we would have liked to have a clearer idea of how many changes to the original idea over the course of the project (WHAT DOES THIS MEAN?). Sometimes, we were unsure of whether to add improvements to the site, as we were unaware of the exact rules around adding new features after the first milestone. 

Working as a team while each of us was still learning languages such as HTML and CSS, frameworks like Bootstrap and Express, and using version control software like GitHub, it really encouraged us to share ideas and discuss approaches to difficulties we encountered along the way. The collaboration aspect of this course was invaluable exposure for what each of us will likely experience in our professional careers.


# Heroku Application Link

[UFit](https://ufit326.herokuapp.com/)

