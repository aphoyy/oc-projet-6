import { user } from "./main.js";

window.onload = () => {
    // If no user is found return
    if (user === null) return;

    const header = document.getElementById("header");
    const projectTitle = document.getElementById("projects");
    const loginLink = document.getElementById("login-link");

    // Display edit mode banner
    header.insertAdjacentHTML("beforebegin", `
        <div class="edit-banner" id="edit-banner">
            <img class="edit-banner__img" src="./assets/icons/edit-white.svg">
            <h3 class="edit-banner__text">Mode édition</h3>
        </div>
    `);
    
    // Display edit mode button
    projectTitle.insertAdjacentHTML("afterend", `
        <button class="portfolio__edit-button" id="edit-button" onclick="openModal()">
            <img class="portfolio__edit-img" src="./assets/icons/edit-black.svg">
            modifier
        </button>
    `);

    // Logout link
    const logout = document.createElement("a");
    logout.href = "/";
    logout.id = "logout"
    logout.innerText = "logout"

    // Save login and replace it by logout
    const login = loginLink.innerHTML;
    loginLink.innerHTML = "";
    loginLink.append(logout);

    // Clear local storage
    document.getElementById("logout").addEventListener("click", (e) => {
        // Prevent page from loading and clear local storage
        e.preventDefault();
        window.localStorage.clear()

        // Remove all edit elements and replace logout by login
        document.getElementById("edit-banner").remove();
        document.getElementById("edit-button").remove();
        loginLink.innerHTML = login;
    });
}