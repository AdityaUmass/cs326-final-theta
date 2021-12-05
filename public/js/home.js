async function render() {
  //render all posts using for loop
  //add special styling to liked posts.
  let renderData = await fetch("/renderjson");
  if (renderData.ok) {
    renderData = await renderData.json();
    //console.log(renderData);
  } else {
    return;
  }

  let posts = renderData["posts"];
  let username = renderData["author"];

  const element = document.getElementsByClassName("col-8 postlist")[0];

  element.innerHTML = "";

  posts.forEach((post) => {
    const divCard = document.createElement("div");
    divCard.classList.add("post");
    divCard.classList.add("card");

    //BUILD HEADER
    const divHeader = document.createElement("div");
    divHeader.classList.add("card-header");

    const span1 = document.createElement("span");
    const span2 = document.createElement("span");
    const span3 = document.createElement("span");
    const span4 = document.createElement("span");
    if (post["date"].length !== 0) {
      span1.innerText = "Date: " + post["date"] + " |";
    } else {
      span1.innerText = "Days: " + post["days"].join(", ") + " |";
    }
    span2.innerText = "Activity Type: " + post["activity"] + " |";
    span3.innerText = "Time: " + post["date"] + " |";
    span4.innerText = "Duration (hrs): " + post["duration"];

    divHeader.appendChild(span1);
    divHeader.appendChild(span2);
    divHeader.appendChild(span3);
    divHeader.appendChild(span4);

    divCard.appendChild(divHeader);

    //BUILD BODY
    const divBody = document.createElement("div");
    divBody.classList.add("card-body");

    const divTitle = document.createElement("h4");
    divTitle.classList.add("card-title");
    divTitle.innerText = post["title"];
    divBody.appendChild(divTitle);

    const bodyText = document.createElement("p");
    bodyText.classList.add("card-text");
    bodyText.innerText = post["content"];
    divBody.appendChild(bodyText);

    const likeLink = document.createElement("a");
    likeLink.classList.add("btn");
    likeLink.classList.add("btn-light");

    likeLink.classList.add("likebutton");
    likeLink.setAttribute("id", post["_id"]);

    const icon = document.createElement("i");
    icon.classList.add("far");
    icon.classList.add("fa-heart");
    likeLink.appendChild(icon);
    likeLink.setAttribute("href", "/like/" + post["_id"]);
    divBody.appendChild(likeLink);

    const interestedSpan = document.createElement("span");
    interestedSpan.classList.add("text-muted");
    interestedSpan.innerText = post["liked_count"] + " interested";
    divBody.appendChild(interestedSpan);

    divCard.appendChild(divBody);

    //BUILD FOOTER
    const divFooter = document.createElement("div");
    divFooter.classList.add("card-footer");

    const contactSpan = document.createElement("span");
    contactSpan.innerText = "Contact: " + post["contact"];
    divFooter.appendChild(contactSpan);

    divCard.appendChild(divFooter);

    element.appendChild(divCard);
  });
}

window.onload = render().then(createColors).then(runChecker);

function createColors() {
  const likes = document.getElementsByClassName("likebutton");

  for (let i = 0; i < likes.length; ++i) {
    let id = likes[i].id;

    if (window.localStorage.getItem("color" + id) === null) {
      window.localStorage.setItem("color" + id, "white");
    } else {
      likes[i].style.backgroundColor = window.localStorage.getItem(
        "color" + id
      );
    }
  }

  for (let m = 0; m < likes.length; ++m) {
    likes[m].addEventListener("click", likeFormatting);
  }
}

function likeFormatting() {
  if (window.localStorage.getItem("color" + this.id) === "white") {
    this.style.backgroundColor = "LightGrey";
    window.localStorage.setItem("color" + this.id, "LightGrey");
  } else {
    this.style.backgroundColor = "white";
    window.localStorage.setItem("color" + this.id, "white");
  }
}

// as the user is typing, send the user to the server and check for it in the database
async function checkUsername() {

  let url = "http://localhost:8080/checkUsernameTaken"; // CHANGE THIS TO HEROKU PATH

  let datatosend = { username: document.getElementById("emailSignup").value };
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
      const writeBox = document.getElementById("usernameTaken");
      writeBox.innerHTML = "Username already in use";
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

// function to run after the page is fully loaded. Continuously checks a taken username as the user is typing
function runChecker() {
  const isTaken = document.getElementById("emailSignup");
  isTaken.addEventListener('keyup', checkUsername);
}
