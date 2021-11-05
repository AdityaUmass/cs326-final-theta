# UFit API Representation

The purpose of UFit is to help UMass Amherst students live a more active lifestyle, whether it's by finding gyms partners, sharing recent achievements, or finding information about upcoming sporting events on campus. The UFit API demostrates ways in which these core features are implemented.

All requests are handled through HTTP. UFit uses the root path: ```insert heroku path here```. To send a request, this root path should be specified and followed by any of the following paths below.

## User Account Creation

The API uses the path: ```/createuser``` for account creation. Below is a preview of how to send a request to create an account

```
POST herokurootpath/createuser
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
- accountemail: the email address of the user, which will be the username to login
- accountname: the user's name
- accountpassword: the user's password
- posts: a list of the user's created posts


## Post Creation

To create a post, use the path: ```/createPost``` as shown below
```
POST herokuroothpath/createPost
```

A post request for each post is sent as a JSON object. A representation is displayed below:
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




# Client User Interface

## User Account Creation

![login_interface1](public/Images/Screen Shot 2021-11-05 at 3.01.39 PM.png)
The user is prompted 
![login_interface2](public/Images/Screen Shot 2021-11-05 at 1.14.56 PM.png)








