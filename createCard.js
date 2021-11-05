

function renderAccountPage(element, data, body){
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

function renderAccountModal(postID, postEmails, body){

    const modalParent1 = document.createElement("div");
    modalParent1.classList.add("modal", "fade");
    modalParent1.setAttribute("id", "modal" + postID);
    modalParent1.setAttribute("tabindex", "-1");
    modalParent1.setAttribute("role", "dialog");
    body.appendChild(modalParent1);

    const modalParent2 = document.createElement("div");
    modalParent2.classList.add("modal-dialog");
    modalParent2.setAttribute("role", "document");
    modalParent2.appendChild(modalParent2);

    const modalParent3 = document.createElement("div");
    modalParent3.classList.add("modal-content");
    modalParent2.appendChild(modalParent3);

    const modalHeader = document.createElement("div");
    modalHeader.classList.add("modal-header");

    const modalTitle = document.createElement("h5");
    modalTitle.classList.add("modal-title");
    modalTitle.innerText = "Participants";
    modalHeader.appendChild(modalTitle);
    
    const modalButton = document.createElement("button");
    modalButton.classList.add("btn-close");
    modalButton.setAttribute("type", "button");
    modalButton.setAttribute("data-bs-dismiss", "modal");
    modalHeader.appendChild(modalButton); 

    const modalBody = document.createElement("div");

    let i = 0;
    postEmails.forEach(email => {
        const modalForm = document.createElement("div");
        const checkBox = document.createElement("input");
        checkBox.setAttribute("type","checkbox");
        checkBox.setAttribute("value","");
        checkBox.setAttribute("id","modal"+postID+"check" + i);
        
        checkBox.classList.add("form-check");
        modalForm.appendChild(checkBox);
        const label = document.createElement("label");
        label.classList.add("form-check-label");
        label.setAttribute("for","modal"+postID+"check"+i);
    
        i = i+1;

        label.innerText = email;

        modalBody.appendChild(modalForm);
    });

    const modalFooter = document.createElement("div");
    modalFooter.classList.add("modal-footer");
    const modalFooterButton = document.createElement("button");
    modalFooterButton.classList.add("btn", "btn-primary");
    modalFooter.appendChild(modalFooterButton);

    modalParent3.appendChild(modalHeader);
    modalParent3.appendChild(modalBody);
    modalParent3.appendChild(modalFooter);


    //ADD TO BODY
    body.appendChild(modalParent1);
}