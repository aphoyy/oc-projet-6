let projectsList = [];
let categoriesList = [];
let currentFilter = 1;
let filteredList = [];

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
        // Define every project variables
        const id = "projet-" + projectsList[i]["id"];
        const imageUrl = projectsList[i]["imageUrl"];
        const image = '<img src="' + imageUrl + '" alt="' + projectsList[i]["title"] +'" />';
        const figcaption = "<figcaption>" + projectsList[i]["title"] + "</figcaption>";
        const project = '<figure class="projects" id=' + id + ">" + image + figcaption + "</figure>";
        // Display the project at the end
        document
            .getElementById("gallery")
            .insertAdjacentHTML("beforeend", project);
    }
}

async function getCategories() {
	const response = await fetch("http://localhost:5678/api/categories");
	categoriesList  = await response.json();
    displayCategories();
}

function displayCategories() {
    const categoriesDiv = document.getElementById("categories");
    categoriesDiv.insertAdjacentHTML(
        "beforeend",
        `<button id="filter-0" onclick="filterClick(0)" class="filter-selected">Tous</button>`
    );
    for (i = 0; i < categoriesList.length; i++) {
        const category = 
            `<button id="filter-` +
            (i + 1) +
            `" onclick="filterClick(` +
            (i + 1) +
            `)">`+
            categoriesList[i]["name"] +
            "</button>";
        categoriesDiv.insertAdjacentHTML("beforeend", category);
    }
}

function filterClick(value) {
    // Remove class from previous filter
    document
        .getElementById("filter-" + currentFilter).classList
        .remove("filter-selected");
    // Add class to new filter
    document
        .getElementById("filter-" + value).classList
        .add("filter-selected");
    currentFilter = value;
    handleCategory();
}

function handleCategory() {
    // Remove the hidden class from all projects
    Array.from(document.getElementsByClassName("hidden")).forEach((element) => {
        element.classList.remove("hidden")
    });
    filteredList = [];
    // If currentFilter equal to zero show all
    if (currentFilter !== 0) {
        // Make a list of all projects that aren't from the same category
        projectsList.map((x) => {
            if (x.categoryId !== currentFilter) {
                filteredList.push(x.id);
            }
        })
        // Make every projects from the list display: none
        for (i = 0; i < filteredList.length; i++) {
            document.getElementById("projet-" + filteredList[i]).classList.add("hidden");
        }
    }
}