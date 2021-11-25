console.log("hi");


let dictionary = {};


const response = await fetch("../../updateJSON");
if (response.ok) {
  dictionary = await response.json();
}
console.log(dictionary);

if (dictionary.update) {
  prefillPosts(dictionary.post);
}

function prefillPosts(post) {
  document.getElementById("postTitle").value = post["title"];
  document.getElementById("postContent").value = post["content"];
  document.getElementById("activity").value = post["activity"];
  document.getElementById("workout").value = post["workout"];
  document.getElementById("time").value = post["time"];
  document.getElementById("duration").value = post["duration"];
  document.getElementById("contact").value = post["contact"];
}
