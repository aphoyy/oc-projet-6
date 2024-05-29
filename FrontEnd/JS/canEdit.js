// If no user is found return
if (user !== null) {
    // Display edit mode banner
    document.getElementById("header").insertAdjacentHTML("beforebegin", `
        <div class="edit-banner">
            <img class="edit-banner__img" src="./assets/icons/edit-white.svg">
            <h3 class="edit-banner__text">Mode édition</h3>
        </div>
    `);
    // Display edit mode button
    document.getElementById("projects").insertAdjacentHTML("afterend", `
        <button class="portfolio__edit-button" id="edit-button" onclick="openModal()">
            <img class="portfolio__edit-img" src="./assets/icons/edit-black.svg">
            modifier
        </button>
    `);
    // Replace login by logout
    document.getElementById("login-link").innerHTML = 
    `<a href="/" onclick="window.localStorage.clear()">logout</a>`;
}