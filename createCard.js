function renderAccountPage(element, data){
    element.innerHTML = '';

    data.forEach(post => {
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
        span1.innerText = "Days: " + post["days"].split(", ") + " |";
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

        const buttonEmail = document.createElement("button");
        buttonEmail.classList.add("btn", "btn-spl");
        buttonEmail.setAttribute("data-bs-toggle", "modal");
        buttonEmail.setAttribute("data-bs-target", "modal" + post[_id]);
        buttonEmail.innerText = "See all interested";
        divFooter.appendChild(buttonEmail);

        const buttonUpdate = document.createElement("button");
        buttonUpdate.classList.add("btn", "btn-primary", "flr");
        buttonUpdate.innerText = "Update"
        divFooter.appendChild(buttonUpdate);

        const buttonDelete = document.createElement("button");
        buttonDelete.classList.add("btn", "btn-danger", "flr");
        buttonDelete.innerText = "Delete"
        divFooter.appendChild(buttonDelete);

        divCard.appendChild(divFooter);

        //Add card to list
        element.appendChild(divCard);
    });
}