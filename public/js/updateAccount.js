const input = document.getElementById('email');
input.addEventListener('keyup', checkUsername);

// as the user is typing, send the user to the server and check for it in the database
async function checkUsername() {

    let url = "https://ufit326.herokuapp.com/checkUsernameTaken"; // CHANGE THIS TO HEROKU PATH
    
    let datatosend = { username: document.getElementById("email").value };
    let res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datatosend)
    });
  
    if (res.ok) {
  
      let isFound = await res.json();
  
      if (isFound.taken === 'taken') {
        console.log('username is already taken');
  
        // display error message for a few seconds 
        const writeBox = document.getElementById("taken");
        writeBox.innerHTML = "Username already in use!";
        setTimeout(() => {
          writeBox.innerHTML = "";
        }, 5000);
  
      } else {
        console.log('username available');
      }
    } else {
      console.log('error awaiting json response');
    }
  
  }
  
