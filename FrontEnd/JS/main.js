let projectsList = [];
let categoriesList = [];
let previousFilter = 0;

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
        const project = "<figure id=" + id + ">" + image + figcaption + "</figure>";
    
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
    console.log(value)
    // Remove class from previous filter
    document
        .getElementById("filter-" + previousFilter).classList
        .remove("filter-selected");
    // Add class to new filter
    document
        .getElementById("filter-" + value).classList
        .add("filter-selected");
    previousFilter = value;
}