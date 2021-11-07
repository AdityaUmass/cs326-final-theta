# UFit API Representation

The purpose of UFit is to help UMass Amherst students live a more active lifestyle, whether it's by finding gyms partners, sharing recent achievements, or finding information about upcoming sporting events on campus. The UFit API demostrates ways in which these core features are implemented.

All requests are handled through HTTP. UFit uses the root path: ```https://ufit326.herokuapp.com/```. To send a request, this root path should be specified and followed by any of the following paths below.

## User Account Creation

The API uses the path: ```/createuser``` for account creation. Below is a preview of how to send a request to create an account

```
POST https://ufit326.herokuapp.com/createuser
```

The endpoint will process a request in the form of a JSON object created from the login modal. A representation is shown below for the user John Smith:
```
{
  accountemail: 'johnsmith@gmail.com',
  accountname: 'John Smith',
  accountpassword: 'password123'
  posts: []
}
```

A request body for account creation is composed of the following:
- String : **accountemail** - the email address of the user, which will be the username to login
- String : **accountname** - the user's name
- String : **accountpassword** - the user's password
- Array[Posts] : **posts** - a list of the user's created posts


## Post Creation

To create a post, use the path: ```/createPost``` as shown below
```
POST https://ufit326.herokuapp.com/createPost
```

A post request for each post is sent as a JSON object. A representation of the minimal fiels of a request is displayed below:
```
{
  title: 'Just benched 225',
  content: 'After two years I finally reach a 225 pound bench press. Ecstatic!',
  activity: 'Gym',
  workout: 'Upper-Body',
  time: '',
  duration: '',
  date: '',
  contact: 'Instagram: JSmith12'
}
```
The request is sent as a JSON object containing the information provided by a user. Note that the only required fields to make a post are the title, content, and contact fields. A request will vary depending on what information that user decides to fill out.

A request body for a post creation is composed of the following:

- String : **title** - The title of a post
- String : **content** - A brief description about the user's intent of the post
- String : **activity** - The activity type of this post
- String : **workout** - The workout type of this post
- String : **time** - The time of day in which the user would like to workout (in the format: HH:MM:XM )
- String : **duration** - The duration of the workout (in format: hours )
- String : **date** - The date of the workout (in format: MM:DD:YYYY )
- String : **contact** - A brief description of the user's contact information

When a post is created, the server will add additional fields to a post object
```
{
  author: 'test@umass.edu',
  liked_count: 1,
  liked_username: [ 'test@umass.edu' ],
  _id: 1,
  title: 'hbgvf',
  content: 'gbvfcdsx',
  activity: 'Gym',
  workout: 'Upper-Body',
  duration: '1',
  time: '22:19',
  contact: 'Snap',
  date: '2021-11-03',
  days: []
}
```

## Logging In (Read)

To login into an account, the API uses path: ```/loginuser```. A request example is shown below:
```
POST https://ufit326.herokuapp.com/loginuser
```

A login request is sent as a JSON object with the following fields:

```
{ accountemail: 'johnsmith@gmail.com', accountpassword: 'password123' }
```

## Login Status and Navigation Bar

Depending on whether a user is logged in, the endpoint ```/navbar``` will serve the website with the correct navigation menu. When not logged in, the navigation bar will consist of two buttons: ```Login``` and ```Sign Up```. Upon logging in, the server will make a get request to ```/navbar``` and use the nagivation bar with the button ```Sign Out```.

## Signing out
To sign out of the account, the API uses a GET request to path: ```/signout```:
```
GET https://ufit326.herokuapp.com/signout
``` 

## Accessing Home Page
To access the home page, the API uses a GET request to path: ```/```:
```
GET https://ufit326.herokuapp.com/
``` 

## Accessing "Create a Post" page
To access the home page, the API uses a GET request to path: ```/post```:
```
GET https://ufit326.herokuapp.com/post
``` 

## Accessing "Clubs and News" page
To access the home page, the API uses a GET request to path: ```/clubnews```:
```
GET https://ufit326.herokuapp.com/clubnews
``` 

## Updating Posts or User Information

To update user information, the API uses the path: ```/updateInfo``` like so:

```POST https://ufit326.herokuapp.com/updateInfo```

This path then uses the API endpoint ```/updateAccountInfo``` to process the entered information from the form

```POST https://ufit326.herokuapp.com/updateAccountInfo```

<!-- Updating a user account can only be done when a user is logged in. -->

The body of the request is displayed below. Note that the fields are optional. A user can update their email without changing their password, for example.

```
{ accountname: 'Tyler', useremail: '', userpassword: '' }
```

This request will update the user's account name to "Tyler", with no further changes to the account. In general, any non-empty field from the above request will be updated. All stored posts that either store the email as author or in likedd_username will be updated if required.

## Rendering Posts on the Accounts Page

To render the relevant logged-in account's posts, the API uses the path: ```/account```.

A request is made like so:
```GET https://ufit326.herokuapp.com/account```

The endpoint filters the posts.json page and fills a new file called myAccount.json that contains the relevant posts created by the logged-in user. 

## Reading Posts on the Accounts Page

A front-end module for accounts.html uses this API path (```myAccountJSON```) to fetch the JSON file for the logged in account. 

A request is made like so:
```GET https://ufit326.herokuapp.com/myAccountJSON```

The endpoint then redirects to ```/account```.

## Deleting Posts on the Accounts Page

For deleting a post, the API uses the path: ```/accountDelete/:postID```, where ```postID``` is the ID of a post the user has previously created. 

A request is made like so:
```GET https://ufit326.herokuapp.com/accountDelete/:postID```

Howvever, the delete only occurs if (a) the post meant to be deleted was originally created by the currently logged-in user and (b) the post meant to be deleted actually exists.

An example request is displayed below to delete a post with ID: 12
```
GET https://ufit326.herokuapp.com/accountDelete/12
```

## Liking/Unliking posts on the Home page
If logged in, the home page allows you to like or unlike posts. In order to do this, the API using a GET request to the path ```/like/:postID``` as such:
```
GET https://ufit326.herokuapp.com/like/:postID
```
the postID is the unique ID of the post we use to identify it in posts.json and render.json to update its "liked_count" and "liked_username" accordingly.

The endpoint then redirects to ```/```.

# Handling Request Errors

The API will respond with standard Express error status codes when an error is encountered. It will also display a brief message describing the error.

1) If a new user tries to create an account but the email address already exists in the system
```
res.status(400).send('An account with that email already exists');
```

2) If an existing user tries to login with an incorrect password.
```
res.status(400).send('Incorrect password');
```

3) If a client tries to login but uses an incorrect email.
```
res.status(400).send('Account not found');
```

4) If a user tries to access the account page and they are not logged in.
```
res.status(400).send("User not logged in");
```

5) If a user tries to create a post and they are not logged in.
```
res.status(400).send("User not logged in");
```

6) If a user tries to like a post and they are not logged in.
```
res.status(400).send("User not logged in");
```


# Client User Interface

The interface images below show the different user-friendly interfaces the user will use to interact with their account information, their post content, and other users' content uploaded to UFit.

## (CREATE) User Account & Post Creation

![account_interface1](https://github.com/AdityaUmass/cs326-final-theta/blob/master/public/Images/Screen%20Shot%202021-11-05%20at%203.01.39%20PM.png)
When the user click the "Sign Up" button in the navigation bar, they're issued a prompt to enter information that will be used for their account.

![account_interface2](https://github.com/AdityaUmass/cs326-final-theta/blob/master/public/Images/Screen%20Shot%202021-11-05%20at%201.14.56%20PM.png)
You can see that after account creation, the user is logged in and redirected to the homepage.

## (READ) User Login

![login_interface](https://github.com/AdityaUmass/cs326-final-theta/blob/master/public/Images/Screenshot%202021-11-05%20210614.png)
When the user clicks the "Login" button in the navigation bar, an prompt box will open, allowing them to input their account information.

## (UPDATE) Updating User Details and Liking Posts

![updateuser_interface](https://github.com/AdityaUmass/cs326-final-theta/blob/master/public/Images/Screenshot%202021-11-05%20205834.png)
Through this simple interface, the user has the option to update their account information. All changes will be saved to the database.

![like_interface1](https://github.com/AdityaUmass/cs326-final-theta/blob/master/public/Images/Desktop%20Screenshot%202021.11.06%20-%2019.43.40.66.png)
Before a user likes a post in the feed, the like button will appear white.

![like_interface2](https://github.com/AdityaUmass/cs326-final-theta/blob/master/public/Images/Desktop%20Screenshot%202021.11.06%20-%2019.43.48.32.png)
After liking a post, the button will turn grey and the number of interested users will update.


## (DELETE) Deleting Posts

![delete_interface1](https://github.com/AdityaUmass/cs326-final-theta/blob/master/public/Images/Desktop%20Screenshot%202021.11.05%20-%2022.27.56.04.png)
The user will have the option to delete any of the posts they've made. In this preview we'll delete the second post labeled "Looking for a gym partner".

![delete_interface2](https://github.com/AdityaUmass/cs326-final-theta/blob/master/public/Images/Desktop%20Screenshot%202021.11.05%20-%2022.28.27.74%20(2).png)
The "Looking for a gym partner" post has now been removed from the users profile.


# Updates to the Project

In order for the user to change their account information, we added an HTML file called ```accountUpdate.html```, and its associated CSS file ```accountUpdate.css```.

# Division of Labor Breakdown

Aditya: Created main server-starter template. Responsible for creating the HTML for each post and rendering them to homepage. Handled how posts are filtered by activity/workout, time/day, etc. Generated endpoints for creating a post, filtering a post, and liking a post.

Raghav: Responsible for creating a generic HTML card creation script that was repurposed for the accounts and home page. Rendered the cards on the account page. Created post deletion functionality and the ability to update the content of a post. Generate endpoints for navigating to the user's account page, deleting posts, and updating the content of a post.

Brandon Figueredo: Handled login and signup functionality, as well as updating user information. Generate endpoints for creating a user, logging into an account, and updating a user's account.

# Heroku Application

```
https://ufit326.herokuapp.com/
```
