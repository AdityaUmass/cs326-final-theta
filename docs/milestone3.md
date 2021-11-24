# UFit Database

## Description and Implementation

UFit uses MongoDB Atlas as a database to store information. The types of data stored in the database are Users and Posts, and their structure is presented below:


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

As you can see, a ```name```, ```username```, and ```password``` are required fields to be entered.

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

## Division of Labor

Aditya: Handled post rendering on front page in case of filtered or unfiltered posts. Handled mechanism of retrieving and filtering posts from database based on user-input filters. Completed functionality for liking posts such that when a post's like-button is clicked, the post is checked to see if the user has liked it before. If so, the post's like count is decremented and the logged in user is removed from the list of users liking the posts. The opposite happens if the post has not been liked previously.

Raghav: Handled retrieving a users Posts from the database and rendering them to the user's account page. Also responsible for updating and deleting a Post in the database when the user updates the content of a Post or deletes one of their Posts. 

Brandon Figueredo: Created the User and Post document models. Set up user account creation, login and signout, and handled user authentication with Passport and Bcryptjs for password hashing. Responsible for updating User documents in the database when a user changes their name, username or password, as well as updated the "liked_username" array of usernames of a Post document to reflect the change in the user's username/email address of previous Post's they had liked with their old email.

