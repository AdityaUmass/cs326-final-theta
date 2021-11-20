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
