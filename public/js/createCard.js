//const fs = require("fs");
//import fs from "fs";
console.log("hi");
let dictionary = {};
const response = await fetch(
    "../../myAccountJSON"
);
if (response.ok) {
    dictionary = await response.json();
}
console.log(dictionary);

// const data = [
//     {
//       "author": "",
//       "liked_count": 0,
//       "liked_username": [],
//       "_id": 1,
//       "title": "vfcdxs",
//       "content": " vfcdv fcdsxza",
//       "activity": "Gym",
//       "days": ["Monday"],
//       "workout": "Upper-Body",
//       "duration": "3",
//       "time": "05:48",
//       "contact": " fvcdsxaz",
//       "date": "2021-11-24"
//     }
//   ]

// if (fs.existsSync("cs326-final-theta\\users.json")) {
//     let someStr = fs.readFileSync(filename);
//     data = JSON.parse(someStr);   
// }

//console.log(data);

renderAccountPage(dictionary);

function renderAccountPage(data){
    const element = document.getElementById("posts");

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

        const buttonEmail = document.createElement("button");
        buttonEmail.setAttribute("type","button");
        buttonEmail.classList.add("btn", "btn-spl");
        buttonEmail.setAttribute("data-bs-toggle", "modal");
        buttonEmail.setAttribute("data-bs-target", "#modal" + post["_id"]);
        buttonEmail.innerText = "See all interested";
        divFooter.appendChild(buttonEmail);

        const buttonUpdate = document.createElement("a");
        buttonUpdate.classList.add("btn", "btn-primary", "flr");
        const hrefString1 = "/accountUpdate/" + post["_id"];
        buttonUpdate.setAttribute("href", hrefString1);
        buttonUpdate.innerText = "Update"
        divFooter.appendChild(buttonUpdate);

        const buttonDelete = document.createElement("a");
        buttonDelete.classList.add("btn", "btn-danger", "flr");
        const hrefString2 = "/accountDelete/" + post["_id"];
        buttonDelete.setAttribute("href", hrefString2);
        buttonDelete.innerText = "Delete";
        divFooter.appendChild(buttonDelete);

        divCard.appendChild(divFooter);

        //Add card to list
        element.appendChild(divCard);

        //render account modal
        renderAccountModal(post._id, post.liked_username, document.getElementById("modalList"));
    });
}

function renderAccountModal(postID, postEmails, body){

    const modalParent1 = document.createElement("div");
    modalParent1.classList.add("modal", "fade");
    modalParent1.setAttribute("id", "modal" + postID);
    modalParent1.setAttribute("tabindex", "-1");
    modalParent1.setAttribute("role", "dialog");
    

    const modalParent2 = document.createElement("div");
    modalParent2.classList.add("modal-dialog");
    modalParent2.setAttribute("role", "document");
    modalParent1.appendChild(modalParent2);

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
    modalBody.classList.add("modal-body");

    let i = 0;
    postEmails.forEach(email => {
        const modalForm = document.createElement("div");
        modalForm.classList.add("form-check");

        const checkBox = document.createElement("input");
        checkBox.setAttribute("type","checkbox");
        checkBox.setAttribute("value",email);
        checkBox.setAttribute("id","modal"+postID+"check" + i);
        checkBox.classList.add("form-check-input");
        modalForm.appendChild(checkBox);
        
        const label = document.createElement("label");
        label.classList.add("form-check-label");
        label.setAttribute("id", "modal"+postID+"label"+i);
        label.setAttribute("for","modal"+postID+"check"+i);
    
        i = i+1;

        label.innerText = email;
        modalForm.appendChild(label);

        modalBody.appendChild(modalForm);
    });

    const modalFooter = document.createElement("div");
    modalFooter.classList.add("modal-footer");
    const modalFooterButton = document.createElement("a");
    modalFooterButton.classList.add("btn", "btn-primary");
    modalFooterButton.innerText = "Email Selected";
    modalFooterButton.addEventListener("click", () => createEmailLink(postID,postEmails.length));
    modalFooterButton.setAttribute("type", "button");
    
    modalFooter.appendChild(modalFooterButton);

    modalParent3.appendChild(modalHeader);
    modalParent3.appendChild(modalBody);
    modalParent3.appendChild(modalFooter);

    body.appendChild(modalParent1);

}

function createEmailLink(postID, emailCount){
    let i = 0;
    let emailStr = [];
    while (i < emailCount){
        console.log("modal"+postID+"check" + i);
        console.log(document.getElementById("modal"+postID+"check" + i));
        if (document.getElementById("modal"+postID+"check" + i) != null &&
         document.getElementById("modal"+postID+"check" + i).checked &&
         document.getElementById("modal"+postID+"label" + i).innerText != null
         ){
            emailStr.push(document.getElementById("modal"+postID+"label" + i).innerText);
        }
        i++;
    }
    if (emailStr.length > 0){
        window.location.replace("mailto:" + emailStr.join(","));
    }
}

// module.exports = {
//     renderAccountPage: renderAccountPage
// };