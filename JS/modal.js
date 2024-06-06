// Modal container
const modalContainer = document.getElementById("modal");

// Individuals modals
const modalOne = document.getElementById("modal-1");
const modalTwo = document.getElementById("modal-2");

// All focusables elements inside modal
const focusableSelector = "button, a, select, input";
let focusables = [];

// When Esc is pressed call closeModal()
window.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
        closeModal();
    }
    if (e.key === "Tab" && modalContainer.ariaHidden === "false") {
        focusInModal(e);
    }
});

// When pressing tab focus elements inside current modal
function focusInModal(e) {
    e.preventDefault();
    let index = focusables.findIndex(f => f === modalContainer.querySelector(":focus"));

    // If pressing shift while pressing tab go backward
    e.shiftKey === true ? index -- : index++;

    if (index >= focusables.length) {
        index = 0;
    } else if (index < 0) {
        index = focusables.length - 1;
    }
    focusables[index].focus();
}

// Click outside of modal call closeModal()
function clickOutsideClose(e) {
    if (e.target.id === "modal") {
        closeModal()
    }
}

// Set container to visible
function openModal() {
    // Show modal container
    modalContainer.ariaModal = "true";
    modalContainer.ariaHidden = "false";
    modalContainer.classList.remove("hidden");

    // Show first modal
    modalOne.ariaHidden = "false";
    modalOne.classList.remove("hidden");

    // Add close outside of modal listener
    window.addEventListener("click", clickOutsideClose);
    focusables = Array.from(modalOne.querySelectorAll(focusableSelector));
}

// Set container to hidden and reset individuals modals
function closeModal() {
    // Hide modal container
    modalContainer.ariaModal = "false";
    modalContainer.ariaHidden = "true";
    modalContainer.classList.add("hidden");
    modalContainer.setAttribute("aria-labelledby", "modal-1-title");

    // Hide individuals modals
    modalOne.ariaHidden = "true";
    modalTwo.ariaHidden = "true";
    modalOne.classList.add("hidden");
    modalTwo.classList.add("hidden");

    // Remove close outside of modal listener
    window.removeEventListener("click", clickOutsideClose);
}

// Set modal visible and hide the other
function switchToModal(id) {
    if (id === 1) {
        // Hide modal 2
        modalTwo.ariaHidden = "true";
        modalTwo.classList.add("hidden");

        // Show modal 1 and change modal aria-label
        modalOne.ariaHidden = "false";
        modalOne.classList.remove("hidden");
        modalContainer.setAttribute("aria-labelledby", "modal-1-title");

        // Change focusables elements to current modal
        focusables = Array.from(modalOne.querySelectorAll(focusableSelector));
    } else {
        // Hide modal 1
        modalOne.ariaHidden = "true";
        modalOne.classList.add("hidden");

        // Show modal 2 and change modal aria-label
        modalTwo.ariaHidden = "false";
        modalTwo.classList.remove("hidden");
        modalContainer.setAttribute("aria-labelledby", "modal-2-title");

        // Change focusables elements to current modal
        focusables = Array.from(modalTwo.querySelectorAll(focusableSelector));
    }
}
