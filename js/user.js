import data from "/js/data.js";
if (!localStorage.getItem("userData")) {
    localStorage.setItem("userData", JSON.stringify(data.users));
    localStorage.setItem("movieData", JSON.stringify(data.movies));

}
localStorage.setItem("SelectMovie", (null));

console.log("Movie Data:", JSON.parse(localStorage.getItem("movieData")));

const movies = JSON.parse(localStorage.getItem("movieData"));

const logBtn = document.getElementById("log");
const overlay = document.getElementById("loginOverlay");
const logoutbtn = document.getElementById("logoutBtn");
const usernameDisplay = document.getElementById("usernameDisplay");
const movieCardTemplate = document.getElementById("movieCardTemplate");


let isRegister = false;
let isLogged = false;

if (JSON.parse(localStorage.getItem("currentUser"))){
    isLogged = true
    usernameDisplay.textContent = JSON.parse(localStorage.getItem("currentUser")).username
}

// Movie Cards
const cards = [];

//genrate movie cards

function generateMovieCards(genre) {
    const movieContainer = document.getElementById(genre);        
    const savedMovies = JSON.parse(localStorage.getItem("currentUser"))?.saved || [];
    console.log("Saved Movies:", savedMovies);
    movies.forEach((movie) => {

        for (let i = 0; i < savedMovies.length; i++) {
            if (movie.title === savedMovies[i]) {
                const card = movieCardTemplate.content.cloneNode(true);
                const movieImage = card.getElementById("movie-image");
                movieImage.src = movie.img;
                movieImage.alt = movie.title;
                card.getElementById("movie-title").textContent = movie.title;
                movieContainer.appendChild(card);
                
                const cardElement = movieContainer.lastElementChild;
                cardElement.addEventListener('click', () => {     // butom para a página destino
                    localStorage.setItem("SelectMovie", JSON.stringify(movie));
                    console.log(localStorage.getItem("SelectMovie", JSON.stringify(movie)));   //console log para verificar o destino atual, retirar depois
                    window.location.href = "movie.htm";  // redirecionar para a página do filme
                });
                cards.push(cardElement);
            }}
    });
}

function logout(){
    localStorage.setItem("currentUser", JSON.stringify({}))
    console.log("Logged out")
    isLogged = false
    window.location.href = "index.html";  // redirecionar para a página inicial após logout
}
logoutbtn.addEventListener("click", logout);

generateMovieCards("savedMovies");