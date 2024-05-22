let projectsList = [];
let categoriesList = [];

window.onload = getProjects();

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
}