import data from "/js/data.js";
localStorage.setItem("userData", JSON.stringify(data.users));
console.log("User Data:", JSON.parse(localStorage.getItem("userData")));
localStorage.setItem("movieData", JSON.stringify(data.movies));

console.log("Movie Data:", JSON.parse(localStorage.getItem("movieData")));
localStorage.setItem("currentUser", JSON.stringify({}));
const movies = JSON.parse(localStorage.getItem("movieData"));

const logBtn = document.getElementById("log");
const overlay = document.getElementById("loginOverlay");
const submitBtn = document.getElementById("loginSubmit");
const message = document.getElementById("loginMessage");
const switchForm = document.getElementById("switchForm");
const formTitle = document.getElementById("formTitle");
const userBtn = document.getElementById("UserBtn");
const movieCardTemplate = document.getElementById("movieCardTemplate");


let isRegister = false;
let isLogged = false;

// Movie Cards
const cards = [];

//genrate movie cards

function generateMovieCards(genre) {
    const movieContainer = document.getElementById(genre);
    movies.forEach((movie) => {
        if (!movie.genre.map(g => g.toLowerCase()).includes(genre.toLowerCase())) {
            return;
        }
        const card = movieCardTemplate.content.cloneNode(true);
        card.getElementById("movie-image").src = movie.img;
        card.getElementById("movie-image").alt = movie.title;
        card.getElementById("movie-title").textContent = movie.title;
        movieContainer.appendChild(card);
        cards.push(card);
    });
}


function login(username,password){
    let error = true
    let users = JSON.parse(localStorage.getItem("userData"))
    for (let i = 0; i < users.length;i++ ){
        if (username == users[i].username && password == users[i].password){
            error = false
            localStorage.setItem("currentUser", JSON.stringify(users[i]))
            console.log("Login successful")
            isLogged = true
            logBtn.classList.add("invisible")
            userBtn.textContent = users[i].username
            userBtn.classList.remove("invisible")
            overlay.style.display = "none"
            break
        }
    }
    if (error){
        console.log("Login failed")
    }
}

function CreateAcount(Username,Password) {
    let exists = false
    let users = JSON.parse(localStorage.getItem("userData"))
    for (let i = 0; i < users.length;i++ ){
        if (Username == users[i].username){
            exists = true
        }
    }
    if (!exists){
        users.push({username: Username, password: Password, admin: false, saved: []})
        localStorage.setItem("userData", JSON.stringify(users))
        console.log("Account created")
    }
}
if (isLogged){
    logBtn.classList.add("invisible")
}
if(!isLogged){
    logBtn.classList.remove("invisible")
}

function logout(){
    localStorage.setItem("currentUser", JSON.stringify({}))
    console.log("Logged out")
    isLogged = false
    logBtn.classList.remove("invisible")
    userBtn.classList.add("invisible")
}

// abrir modal
logBtn.addEventListener("click", () => {
  overlay.style.display = "flex";
});

// fechar modal ao clicar fora
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.style.display = "none";
  }
});

// alternar login <-> registo
switchForm.addEventListener("click", () => {
  isRegister = !isRegister;

  formTitle.textContent = isRegister ? "Registo" : "Login";
  submitBtn.textContent = isRegister ? "Criar conta" : "Entrar";
  switchForm.innerHTML = isRegister
    ? "Já tens conta? <span>Login</span>"
    : "Não tens conta? <span>Criar conta</span>";

  message.textContent = "";
});

// submit
submitBtn.addEventListener("click", () => {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (user === "" || pass === "") {
    message.textContent = "Preenche todos os campos.";
    message.style.color = "red";
    return;
  }
  else{login(user, pass);}
  if (isRegister) {

    CreateAcount(user, pass);

    message.textContent = "Conta criada com sucesso!";
    message.style.color = "lime";

    isRegister = false;

    setTimeout(() => {
      formTitle.textContent = "Login";
      submitBtn.textContent = "Entrar";
      switchForm.innerHTML = "Não tens conta? <span>Criar conta</span>";
      message.textContent = "";
    }, 1000);

  } else {
    const savedUser = localStorage.getItem("username");
    const savedPass = localStorage.getItem("password");

    if (user === savedUser && pass === savedPass) {
      message.textContent = "Login com sucesso!";
      message.style.color = "lime";

      localStorage.setItem("loggedIn", "true");

      setTimeout(() => {
        overlay.style.display = "none";
        logBtn.textContent = user;
      }, 800);
    } else {
      message.textContent = "Username ou password errados.";
      message.style.color = "red";
    }
  }
});

console.log("Generating movie cards...");

generateMovieCards("action");
generateMovieCards("comedy");