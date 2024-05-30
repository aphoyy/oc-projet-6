import { projectList } from "./main.js";

let categoryList = [];
let blacklist = [];
let currentCategory = 0;

window.onload = getCategories()

async function getCategories() {
	const response = await fetch("http://localhost:5678/api/categories");
	categoryList = await response.json();
    displayCategories();
}

function displayCategories() {
    // Insert "all" category
    const container = document.getElementById("categories-container");
    const initialButton = document.createElement("button");
    initialButton.id = "category-0";
    initialButton.classList.add("portfolio__button", "selected");
    initialButton.innerText = "Tous";
    initialButton.onclick = () => categoryClick(0);

    container.append(initialButton);

    // Insert every category
    for (let i = 0; i < categoryList.length; i++) {
        const categoryButton = document.createElement("button");
        const categoryPosition = (i + 1);
        categoryButton.id = "category-" + categoryPosition;
        categoryButton.classList.add("portfolio__button");
        categoryButton.innerText = categoryList[i]["name"];
        categoryButton.onclick = () => categoryClick(categoryPosition);

        container.append(categoryButton);
    }
}

function categoryClick(value) {
    // Remove class from previous category
    document
        .getElementById("category-" + currentCategory).classList
        .remove("selected");
    // Add class to new category
    document
        .getElementById("category-" + value).classList
        .add("selected");
    // Set it as the new current category
    currentCategory = value;
    handleCategory();
}

function handleCategory() {
    // Remove hidden class from all projects and reset blacklist
    Array.from(document.getElementsByClassName("projects hidden")).forEach((project) => {
        project.classList.remove("hidden");
    });
    blacklist = [];

    if (currentCategory !== 0) {
        // Make a blacklist of all projects that aren't from the same category
        projectList.map((project) => {
            if (project.categoryId !== currentCategory) {
                blacklist.push(project.id);
            }
        })
        // Set blacklisted projects hidden
        for (let i = 0; i < blacklist.length; i++) {
            document.getElementById("project-" + blacklist[i]).classList.add("hidden");
        }
    }
}