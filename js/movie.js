const logBtn = document.getElementById("log");
const overlay = document.getElementById("loginOverlay");
const submitBtn = document.getElementById("loginSubmit");
const message = document.getElementById("loginMessage");
const switchForm = document.getElementById("switchForm");
const formTitle = document.getElementById("formTitle");
const userBtn = document.getElementById("UserBtn");
const descriptionInput = document.getElementById("descriptionInput");
const saveDescriptionBtn = document.getElementById("saveDescriptionBtn");
const editBtn = document.getElementById("EditBtn");
const platAddBtn = document.getElementById("platadd");
const platSelect = document.getElementById("PlatSelect");
const editDescriptionDiv = document.getElementById("EditDescription");
const addPlatDiv = document.getElementById("AddPlat");
const TopBtn = document.getElementById("TopBtn");



const movie = JSON.parse(localStorage.getItem("SelectMovie"));
const platformsData = JSON.parse(localStorage.getItem("platformData"));

const platformsSection = document.getElementById("platformsSection");
const platformTemplate = document.getElementById("platforms");

if (movie === null) {
    window.location.href = "index.html";  // redirecionar para a página inicial se nenhum filme estiver selecionado
}



let isRegister = false;
let isLogged = false;
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let Edit = false;

if (currentUser.admin){
    editBtn.classList.remove("invisible")
}

if (movie.top){
    TopBtn.textContent = "Remove from Top"
}
else{
    TopBtn.textContent = "Add to Top"
}

function toggleTopStatus(){
    let movies = JSON.parse(localStorage.getItem("movieData"));
    if (movie.top){
        movie.top = false;
        TopBtn.textContent = "Add to Top"
    }
    else{
        movie.top = true;
        TopBtn.textContent = "Remove from Top"
    }
    localStorage.setItem("SelectMovie", JSON.stringify(movie));
    for (let i=0; i<movies.length; i++){
        if (movies[i].title === movie.title){
            movies[i].top = movie.top;
            break;
        }
    }
    localStorage.setItem("movieData", JSON.stringify(movies));
}
TopBtn.addEventListener("click", toggleTopStatus);

editBtn.addEventListener("click", () => {
    if (!Edit) {
        editDescriptionDiv.classList.remove("invisible");
        editDescriptionDiv.classList.add("active");

        addPlatDiv.classList.remove("invisible");
        addPlatDiv.classList.add("active");

        document.querySelectorAll("#deleteplat").forEach(btn => {
            btn.classList.remove("invisible");
        });

        TopBtn.classList.remove("invisible");

        Edit = true;
    } else {
        editDescriptionDiv.classList.add("invisible");
        editDescriptionDiv.classList.remove("active");

        addPlatDiv.classList.add("invisible");
        addPlatDiv.classList.remove("active");

        document.querySelectorAll("#deleteplat").forEach(btn => {
            btn.classList.add("invisible");
        });

        TopBtn.classList.add("invisible");

        Edit = false;
    }
});



if (JSON.parse(localStorage.getItem("currentUser"))?.username){
    isLogged = true
    userBtn.textContent = JSON.parse(localStorage.getItem("currentUser")).username
    userBtn.classList.remove("invisible")
    logBtn.classList.add("invisible")
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
        users.push({username: Username, password: Password})
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

function saveDescription(){
    if (!Edit){
        alert("You must be in edit mode to save changes.");
        return;
    } 
    movie.description = descriptionInput.value;
    localStorage.setItem("SelectMovie", JSON.stringify(movie));
    let movies = JSON.parse(localStorage.getItem("movieData"));
    for (let i=0; i<movies.length; i++){
        if (movies[i].title === movie.title){
            movies[i].description = movie.description;
            break;
        }
    }
    localStorage.setItem("movieData", JSON.stringify(movies));
    MovieDescription.textContent = movie.description;
    console.log("Description saved:", movie.description);
}
saveDescriptionBtn.addEventListener("click", saveDescription);

function deleteplatform(DelPlat){
    if (!Edit){
        alert("You must be in edit mode to delete platforms.");
        return;
    } 
    const selectedPlatform = DelPlat;
    let platforms = movie.platforms;
    for (let i = 0; i < platforms.length; i++){
        if (platforms[i] === selectedPlatform){
            platforms.splice(i, 1);
            break;
        }
    }
    movie.platforms = platforms;
    localStorage.setItem("SelectMovie", JSON.stringify(movie));
    let movies = JSON.parse(localStorage.getItem("movieData"));
    for (let i=0; i<movies.length; i++){
        if (movies[i].title === movie.title){
            movies[i].platforms = movie.platforms;
            break;
        }
    }
    localStorage.setItem("movieData", JSON.stringify(movies));
    platformsSection.innerHTML = "";
    generatelogos();
    platSelect.innerHTML = "<option value='' disabled selected>Escolhe uma plataforma</option>";
    populatePlatformSelect();
}

const MoviePoster = document.getElementById("MoviePoster");
const MovieTitle = document.getElementById("MovieTitle");
const MovieDescription = document.getElementById("Description");
const MovieDetails = document.getElementById("FullDescription");
const MoviePlatforms = document.getElementById("platformsSection");


MoviePoster.src = movie.img;
MovieTitle.textContent = movie.title;
MovieDescription.textContent = movie.description;
const Savemovie = document.getElementById("saveMovie");
const Unsavemovie = document.getElementById("unsaveMovie");

for (let i = 0; i < JSON.parse(localStorage.getItem("currentUser"))?.saved?.length;i++ ){
    if (movie.title == JSON.parse(localStorage.getItem("currentUser")).saved[i]){
        Savemovie.classList.add("invisible");
        Unsavemovie.classList.remove("invisible");
        break;
    }
}

function savemovie(){
    if (!isLogged){
        alert("Please log in to save movies.");
        return;
    }
    let exist = false
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let users = JSON.parse(localStorage.getItem("userData"));
    for (let i = 0; i < currentUser.saved.length;i++ ){
        if (movie.title == currentUser.saved[i]){
            alert("Movie already saved.");
            exist = true
            break;
        }
    }
    if (!exist){
    
    console.log("Saving movie:", movie.title);
    currentUser.saved.push(movie.title);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    // Update userData in localStorage
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === currentUser.username) {
            users[i] = currentUser;
            localStorage.setItem("userData", JSON.stringify(users));
            Savemovie.classList.add("invisible");
            Unsavemovie.classList.remove("invisible");
            break;
        }}
    }console.log("Movie saved:", movie.title);
}


Savemovie.addEventListener("click", savemovie);

function unsavemovie(){
    if (!isLogged){
        alert("Please log in to unsave movies.");
        return;
    }
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let users = JSON.parse(localStorage.getItem("userData"));
    for (let i = 0; i < currentUser.saved.length;i++ ){
        if (movie.title == currentUser.saved[i]){
            currentUser.saved.splice(i, 1);
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            // Update userData in localStorage
            for (let j = 0; j < users.length; j++) {
                if (users[j].username === currentUser.username) {
                    users[j] = currentUser;
                    localStorage.setItem("userData", JSON.stringify(users));
                    Unsavemovie.classList.add("invisible");
                    Savemovie.classList.remove("invisible");
                    break;
                }}
            console.log("Movie unsaved:", movie.title);
            return;
        }}}

function generatelogos(){
    movie.platforms.forEach((platform) => {
        const plat = platformsData.find(p => p.name === platform);
        if (plat) {
            const card = platformTemplate.content.cloneNode(true);
            const imgEl = card.querySelector(".platform-image");
            const nameEl = card.querySelector(".platform-name");
            
            imgEl.src = plat.img;
            imgEl.alt = plat.name;
            nameEl.textContent = plat.name;
            /*const deletePlatBtn = card.querySelector(".deleteplat");
            deletePlatBtn.addEventListener("click", () => {
                deleteplatform(plat.name);
            });*/
             const deletePlatBtn = card.querySelector("#deleteplat");
            deletePlatBtn.addEventListener("click", () => {
                deleteplatform(plat.name);
            });
            platformsSection.appendChild(card);
        }
    });
}
      
Unsavemovie.addEventListener("click", unsavemovie);

function populatePlatformSelect() {
    const platSelect = document.getElementById("PlatSelect");
    const availablePlatforms = platformsData.filter(platform => 
        !movie.platforms.includes(platform.name)
    );
    
    availablePlatforms.forEach(platform => {
        const option = document.createElement("option");
        option.value = platform.name;
        option.textContent = platform.name;
        platSelect.appendChild(option);
    });
}

function addPlatform() {
    let movies = JSON.parse(localStorage.getItem("movieData"));
    const selectedPlatform = platSelect.value;
    if (selectedPlatform && !movie.platforms.includes(selectedPlatform)) {
        movie.platforms.push(selectedPlatform);
        localStorage.setItem("SelectMovie", JSON.stringify(movie));
        for (let i=0; i<movies.length; i++){
            if (movies[i].title === movie.title){
                movies[i].platforms = movie.platforms;
                break;
            }
        }
        localStorage.setItem("movieData", JSON.stringify(movies));
        platformsSection.innerHTML = "";
        generatelogos();
        platSelect.innerHTML = "<option value='' disabled selected>Escolhe uma plataforma</option>";
        populatePlatformSelect();
    }
}

platAddBtn.addEventListener("click", addPlatform);

generatelogos();
populatePlatformSelect();