// List of all projects and categories
let projectsList = [];
let categoriesList = [];

let blacklist = [];
let currentCategory = 0;

window.onload = getProjects();
window.onload = getCategories();

async function getProjects() {
	const response = await fetch("http://localhost:5678/api/works");
	projectsList  = await response.json();
    displayProjects();
}

function displayProjects() {
    // Loop until every projet are displayed
    for (i = 0; i < projectsList.length; i ++) {
        // Define every project parts
        const id = "projet-" + projectsList[i]["id"];
        const image = '<img src="' + projectsList[i]["imageUrl"] + '" alt="' + projectsList[i]["title"] +'" />';
        const text = "<figcaption>" + projectsList[i]["title"] + "</figcaption>";
        // Display the project at the end of gallery
        document
            .getElementById("gallery")
            .insertAdjacentHTML("beforeend", '<figure class="projects" id=' + id + ">" + image + text + "</figure>");
    }
}

async function getCategories() {
	const response = await fetch("http://localhost:5678/api/categories");
	categoriesList  = await response.json();
    displayCategories();
}

function displayCategories() {
    const container = document.getElementById("categories-container");
    // Add "all" filter
    container.insertAdjacentHTML(
        "beforeend",
        `<button id="filter-0" onclick="filterClick(0)" class="filter-selected">Tous</button>`
    );
    // Add every other filter | + 1 because "all" is 0
    for (i = 0; i < categoriesList.length; i++) {
        const category = 
            `<button id="filter-` +
            (i + 1) +
            `" onclick="filterClick(` +
            (i + 1) +
            `)">`+
            categoriesList[i]["name"] +
            "</button>";
        container.insertAdjacentHTML("beforeend", category);
    }
}

function filterClick(value) {
    // Remove class from previous filter
    document
        .getElementById("filter-" + currentCategory).classList
        .remove("filter-selected");
    // Add class to new filter
    document
        .getElementById("filter-" + value).classList
        .add("filter-selected");
    currentCategory = value;
    handleCategory();
}

function handleCategory() {
    // Make all the hidden projects reappear
    Array.from(document.getElementsByClassName("hidden")).forEach((project) => {
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
    document.getElementById("header").insertAdjacentHTML("beforebegin", `
    <div id="edit-mode">
        <img class="edit-img" src="./assets/icons/edit-white.svg">
        <h3 class="edit-text">Mode édition</h3>
    </div>
    `);
    document.getElementById("projets").insertAdjacentHTML("afterend", `
        <div id="edit-button">
            <img class="edit-img" src="./assets/icons/edit-black.svg">
            <h3 class="edit-text">modifier</h3>
        </div>
    `);
}