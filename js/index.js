import data from "/js/data.js";
localStorage.setItem("userData", JSON.stringify(data.users));
console.log("User Data:", JSON.parse(localStorage.getItem("userData")));