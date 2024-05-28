// Current user
const user = JSON.parse(window.localStorage.getItem("user"));

// List of all projects and categories
let projectsList = [];
let categoriesList = [];

let blacklist = [];
let currentCategory = 0;

// Load right after set variables
window.onload = () => {
    getProjects();
    getCategories();
    edit();
}

// Get and set the projects list
async function getProjects() {
	const response = await fetch("http://localhost:5678/api/works");
	projectsList  = await response.json();
    displayProjects();
}

// Display every projects from the list
function displayProjects() {
    // Loop until every projet are displayed
    for (i = 0; i < projectsList.length; i ++) {
        // Define every project parts
        const id = "projet-" + projectsList[i]["id"];
        const image = '<img class="gallery__img" src="' + projectsList[i]["imageUrl"] + '" alt="' + projectsList[i]["title"] +'" />';
        const text = '<figcaption class="gallery__text">' + projectsList[i]["title"] + '</figcaption>';
        // Display the project at the end of gallery
        document
            .getElementById("gallery")
            .insertAdjacentHTML("beforeend", '<figure class="projects" id=' + id + ">" + image + text + "</figure>");
    }
}

// Get and set the categories
async function getCategories() {
	const response = await fetch("http://localhost:5678/api/categories");
	categoriesList  = await response.json();
    displayCategories();
}

// Display "all" category and every other categories
function displayCategories() {
    const container = document.getElementById("categories-container");
    // Add "all" filter
    container.insertAdjacentHTML(
        "beforeend",
        `<button id="filter-0" onclick="filterClick(0)" class="portfolio__button selected">Tous</button>`
    );
    // Add every other filter | + 1 because "all" is 0
    for (i = 0; i < categoriesList.length; i++) {
        const category = 
            `<button id="filter-` +
            (i + 1) +
            `" onclick="filterClick(` +
            (i + 1) +
            `)"`+
            'class="portfolio__button">' +
            categoriesList[i]["name"] +
            "</button>";
        container.insertAdjacentHTML("beforeend", category);
    }
}

function filterClick(value) {
    // Remove class from previous filter
    document
        .getElementById("filter-" + currentCategory).classList
        .remove("selected");
    // Add class to new filter
    document
        .getElementById("filter-" + value).classList
        .add("selected");
    currentCategory = value;
    handleCategory();
}

function handleCategory() {
    // Make all the hidden projects reappear
    Array.from(document.getElementsByClassName("projects hidden")).forEach((project) => {
        project.classList.remove("hidden")
    });
    // Reset the blacklist
    blacklist = [];
    // If currentCategory equal to zero display every projets
    if (currentCategory !== 0) {
        // Make a blacklist of all projects that aren't from the same category
        projectsList.map((project) => {
            if (project.categoryId !== currentCategory) {
                blacklist.push(project.id);
            }
        })
        // Make every projects from the blacklist disappear
        for (i = 0; i < blacklist.length; i++) {
            document.getElementById("projet-" + blacklist[i]).classList.add("hidden");
        }
    }
}

function edit() {
    // If user is logged display edit mode
    if (user !== null) { 
        // Display edit mode banner
        document.getElementById("header").insertAdjacentHTML("beforebegin", `
            <div class="edit-banner">
                <img class="edit-banner__img" src="./assets/icons/edit-white.svg">
                <h3 class="edit-banner__text">Mode édition</h3>
            </div>
        `);
        // Display edit mode button
        document.getElementById("projets").insertAdjacentHTML("afterend", `
            <button class="portfolio__edit-button" id="edit-button" onclick="openModal()">
                <img class="portfolio__edit-img" src="./assets/icons/edit-black.svg">
                modifier
            </button>
        `);
        // Replace login by logout
        document.getElementById("login").innerHTML = 
        `<a href="/" onclick="window.localStorage.clear()">logout</a>`;
    }
}

const modal = document.getElementById("modal");

function openModal() {
    modal.classList.remove("hidden");
    const deleteButton = `
        <button class="modal-delete" onclick="console.log('quack')">
            <img class="modal-delete-logo" src="./assets/icons/trash-can.svg" alt="Delete logo" />
        </button>
    `
    for (i = 0; i < projectsList.length; i ++) {
        // Define every project parts
        const id = "modal-projet-" + projectsList[i]["id"];
        const image = '<img src="' + projectsList[i]["imageUrl"] + '" alt="' + projectsList[i]["title"] +'" />';
        // Display the project at the end of gallery
        document
            .getElementById("modal-gallery")
            .insertAdjacentHTML("beforeend", '<figure class="modal-projects" id=' + id + ">" + image + deleteButton + "</figure>");
    }
    focusables = Array.from(modal.querySelectorAll(focusablesSelector));
}

function closeModal() {
    modal.classList.add("hidden");
    document.getElementById("modal-gallery").innerHTML = '';
}