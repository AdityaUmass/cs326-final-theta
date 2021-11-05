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

        element.appendChild(divHeader);

        //BUILD BODY
        const 
    });
}