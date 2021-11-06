async function render() {
    //render all posts using for loop
    //add special styling to liked posts.
    let renderData = await fetch("/renderjson");
    if (renderData.ok) {
        renderData = await renderData.json();
        console.log(renderData);
    } else {
        return;
    }

    let posts = renderData["posts"];
    let username = renderData["author"];

    const element = document.getElementsByClassName("col-8 postlist")[0];
    

    element.innerHTML = "";

    posts.forEach(post => {
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
        span1.innerText = "Days: " + post["days"].join(", ") + " |";
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

        const interestedSpan = document.createElement("span")
        interestedSpan.classList.add("text-muted");
        interestedSpan.innerText = post["liked_count"] + " interested";
        divBody.appendChild(interestedSpan);

        divCard.appendChild(divBody);

        //BUILD FOOTER
        const divFooter = document.createElement("div");
        divFooter.classList.add("card-footer");

        divCard.appendChild(divFooter);

        //Add card to list

        
        element.appendChild(divCard);
    });
    
}

function likeFormatting() {
    
}

window.onload = render;

// module.exports = {
//     render: render,
//     likeFormatting: likeFormatting

// };