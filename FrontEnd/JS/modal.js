// Modal container
const modalContainer = document.getElementById("modal");

// Individuals modals
const modalOne = document.getElementById("modal-1");
const modalTwo = document.getElementById("modal-2");

// Set container to visible
function openModal() {
    modalContainer.classList.remove("hidden");
}

// Set container to hidden and reset individuals modals
function closeModal() {
    modalContainer.classList.add("hidden");
    modalOne.classList.remove("hidden");
    modalTwo.classList.add("hidden");
}

// When Esc is pressed call closeModal()
window.addEventListener("keydown", function(e) {
    e.key === "Escape" ? closeModal() : null;
});

// Set modal visible and hide the other
function switchToModal(id) {
    id === 1 ? modalTwo.classList.add("hidden") : modalOne.classList.add("hidden");
    document.getElementById("modal-" + id).classList.remove("hidden");
}