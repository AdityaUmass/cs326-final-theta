UFit API Representation

The purpose of our website is to help UMass Amherst students live a more active lifestyle, whether is finding gyms partners, posting achievements, or finding information about upcoming sporting events on campus.
The UFit API demostrates ways in which these core features are implemented.

## User Account Creation

The API uses the path: */createuser* for account creation.

```
app.post("/createuser", function(req, res) {
    
    // extract information here
    username = req.body.accountemail;
    loggedin = true;

    reload(userfile, "users");

    trackUsers.users.push(req.body);
    let str = JSON.stringify(trackUsers);
    fs.writeFileSync(userfile, str);

    // reload page
    res.redirect('/');
});
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
