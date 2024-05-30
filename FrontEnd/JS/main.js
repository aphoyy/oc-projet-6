// Get user from local storage and export it
const user = JSON.parse(window.localStorage.getItem("user"));
export { user };

let projectList = [];
export { projectList };

const mainGallery = document.getElementById("gallery");
const modalGallery = document.getElementById("modal-gallery");

window.onload = getProjects();

// Get the projects and set a list of them
async function getProjects() {
	const response = await fetch("http://localhost:5678/api/works");
	projectList = await response.json();
    loadProjects();
}

function loadProjects() {
    // Reset both gallery
    mainGallery.innerHTML = "";
    modalGallery.innerHTML = "";

    // Load every project
    for (let i = 0; i < projectList.length; i++) {
        const id = projectList[i]["id"];

        // Main gallery
        const mainImage = document.createElement("img");
        mainImage.src = projectList[i]["imageUrl"];
        mainImage.classList.add("gallery__img");
        mainImage.alt = projectList[i]["title"];

        const mainId = "project-" + id;
        const mainFigure = document.createElement("figure");
        mainFigure.id = mainId;
        mainFigure.classList.add("projects");

        const text = document.createElement("figcaption");
        text.innerText = projectList[i]["title"];
        text.classList.add("gallery__text");

        mainFigure.append(mainImage, text);
        mainGallery.append(mainFigure);

        // Modal gallery
        const modalId = "modal-project" + id;
        const modalFigure = document.createElement("figure");
        modalFigure.id = modalId;
        modalFigure.classList.add("gallery__content");

        const modalImage = document.createElement("img");
        modalImage.src = projectList[i]["imageUrl"];
        modalImage.classList.add("gallery__img");
        modalImage.alt = projectList[i]["title"];

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("gallery__delete-button");
        deleteButton.onclick = () => deleteProject(id);

        const deleteLogo = document.createElement("img");
        deleteLogo.src = "./assets/icons/trash-can.svg";
        deleteLogo.classList.add("gallery__delete-logo");
        deleteLogo.alt = "Delete logo";

        deleteButton.append(deleteLogo);
        modalFigure.append(modalImage, deleteButton);
        modalGallery.append(modalFigure);
    }
}

// Delete project with id
async function deleteProject(id) {
    try {
        const response = await fetch("http://localhost:5678/api/works/" + id, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + user.token
            }
        })
        if (response.status === 500) {
            return console.error("Erreur inattendu");
        } else if (response.status === 401) {
            return console.error("Accès non autorisé");
        } else if (response.status === 204) {
            console.log("Projet supprimé");
            getProjects()
        }
    } catch (error) {
        console.error("Error", error);
    }
}

// Replace default submit by addProject()
document.querySelector("#add-project").addEventListener("submit", function(e) {
    e.preventDefault();
    addProject();
})

// Add new project using form data
async function addProject() {
    const formData = new FormData(document.querySelector("#add-project"));
    try {
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + user.token
            },
            body: formData
        });
        if (response.status === 500) {
            return console.error("Erreur inattendu");
        } else if (response.status === 401) {
            return console.error("Accès non autorisé");
        } else if (response.status === 400) {
            return console.error("Mauvaise requête");
        } else if (response.status === 201) {
            console.log("Projet ajouté"),
            getProjects()
        }
    } catch (error) {
        console.error("Error", error);
    }
}