import data from "/js/data.js";
if (!localStorage.getItem("userData")) {
    localStorage.setItem("userData", JSON.stringify(data.users));
    localStorage.setItem("movieData", JSON.stringify(data.movies));

}
localStorage.setItem("SelectMovie", (null));

console.log("Movie Data:", JSON.parse(localStorage.getItem("movieData")));

const movies = JSON.parse(localStorage.getItem("movieData"));
let NewDesc="";
let NewTitle="";

const logBtn = document.getElementById("log");
const overlay = document.getElementById("loginOverlay");
const logoutbtn = document.getElementById("logoutBtn");
const usernameDisplay = document.getElementById("usernameDisplay");
const movieCardTemplate = document.getElementById("movieCardTemplate");
const descriptionInput = document.getElementById("descInput");
const titleInput = document.getElementById("movieTitleInput");
const addmovieBtn = document.getElementById("addMovieBtn");
const toggleAddMovieBtn = document.getElementById("toggleAddMovieBtn");
const addMovieForm = document.getElementById("addMovieForm");
const cancelAddMovieBtn = document.getElementById("cancelAddMovieBtn");

let isRegister = false;
let isLogged = false;

if (JSON.parse(localStorage.getItem("currentUser"))){
    isLogged = true
    usernameDisplay.textContent = JSON.parse(localStorage.getItem("currentUser")).username

}
const currentUser = JSON.parse(localStorage.getItem("currentUser"))
if (currentUser?.admin){
    document.getElementById("addmovie").classList.remove("invisible");
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

function saveDescription(){
    const movie = JSON.parse(localStorage.getItem("SelectMovie"));
    const descriptionInput = document.getElementById("descriptionInput");
    if (!descriptionInput) {
        alert("Description input not found.");
        return;
    }
    movie.description = descriptionInput.value;
    localStorage.setItem("SelectMovie", JSON.stringify(movie));
    let moviesData = JSON.parse(localStorage.getItem("movieData"));
    for (let i=0; i<moviesData.length; i++){
        if (moviesData[i].title === movie.title){
            moviesData[i].description = movie.description;
            break;
        }
    }
    localStorage.setItem("movieData", JSON.stringify(moviesData));
    console.log("Description saved:", movie.description);
}

function addPlatform() {
    const movie = JSON.parse(localStorage.getItem("SelectMovie"));
    const platSelect = document.getElementById("PlatSelect");
    let moviesData = JSON.parse(localStorage.getItem("movieData"));
    const selectedPlatform = platSelect.value;
    if (selectedPlatform && !movie.platforms.includes(selectedPlatform)) {
        movie.platforms.push(selectedPlatform);
        localStorage.setItem("SelectMovie", JSON.stringify(movie));
        for (let i=0; i<moviesData.length; i++){
            if (moviesData[i].title === movie.title){
                moviesData[i].platforms = movie.platforms;
                break;
            }
        }
        localStorage.setItem("movieData", JSON.stringify(moviesData));
        console.log("Platform added:", selectedPlatform);
    }
}

function toggleTopStatus(){
    const movie = JSON.parse(localStorage.getItem("SelectMovie"));
    let moviesData = JSON.parse(localStorage.getItem("movieData"));
    if (movie.top){
        movie.top = false;
    }
    else{
        movie.top = true;
    }
    localStorage.setItem("SelectMovie", JSON.stringify(movie));
    for (let i=0; i<moviesData.length; i++){
        if (moviesData[i].title === movie.title){
            moviesData[i].top = movie.top;
            break;
        }
    }
    localStorage.setItem("movieData", JSON.stringify(moviesData));
    console.log("Top status toggled:", movie.top);
}

generateMovieCards("savedMovies");

descriptionInput.addEventListener("change", function(){
    NewDesc = descriptionInput.value;
    console.log("NewDesc:", NewDesc);
});

titleInput.addEventListener("change", function(){
    NewTitle = titleInput.value;
    console.log("NewTitle:", NewTitle);
});

function addMovie() {
    if (NewTitle === "" || NewDesc === ""){
        alert("Please fill in all fields.");
        return;
    }
    
    // Get selected genres
    const genreCheckboxes = document.querySelectorAll("input[name='genre']:checked");
    const selectedGenres = [];
    for (let i = 0; i < genreCheckboxes.length; i++) {
        selectedGenres.push(genreCheckboxes[i].value);
    }
    
    // Get selected platforms
    const platformCheckboxes = document.querySelectorAll("input[name='platform']:checked");
    const selectedPlatforms = [];
    for (let i = 0; i < platformCheckboxes.length; i++) {
        selectedPlatforms.push(platformCheckboxes[i].value);
    }
    
    if (selectedGenres.length === 0) {
        alert("Please select at least one genre.");
        return;
    }
    
    let moviesData = JSON.parse(localStorage.getItem("movieData"));
    const newMovie = {
        title: NewTitle,
        description: NewDesc,
        genre: selectedGenres,
        img: "img/movies/shrek.jpg",
        platforms: selectedPlatforms,
        top: false
    };

    moviesData.push(newMovie);
    localStorage.setItem("movieData", JSON.stringify(moviesData));

    NewTitle = "";
    NewDesc = "";
    
    // Clear checkboxes
    document.querySelectorAll("input[name='genre']").forEach(cb => cb.checked = false);
    document.querySelectorAll("input[name='platform']").forEach(cb => cb.checked = false);
    
    alert("Movie added successfully!");
    console.log("New movie added:", newMovie);
    location.reload();
}

// Toggle Add Movie Form
toggleAddMovieBtn.addEventListener("click", function() {
    addMovieForm.classList.toggle("active");
});

// Cancel button
cancelAddMovieBtn.addEventListener("click", function() {
    addMovieForm.classList.remove("active");
});


addmovieBtn.addEventListener("click", addMovie);

console.log(isLogged)