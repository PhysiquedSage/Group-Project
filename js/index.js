import data from "/js/data.js";
localStorage.setItem("userData", JSON.stringify(data.users));
console.log("User Data:", JSON.parse(localStorage.getItem("userData")));
localStorage.setItem("movieData", JSON.stringify(data.movies));

console.log("Movie Data:", JSON.parse(localStorage.getItem("movieData")));
localStorage.setItem("currentUser", JSON.stringify({}));

function login(username,password){
    error = true
    users = JSON.parse(localStorage.getItem("userData"))
    for (let i = 0; i < users.length;i++ ){
        if (username == users[i].username && password == users[i].password){
            error = false
            localStorage.setItem("currentUser", JSON.stringify(users[i]))
            console.log("Login successful")
            break
        }
    }
    if (error){
        console.log("Login failed")
    }
}

function logout(){
    localStorage.setItem("currentUser", JSON.stringify({}))
    console.log("Logged out")
};
