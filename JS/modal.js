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

    // Make a loop around 0 and focusables length
    if (index >= focusables.length) {
        index = 0;
    } else if (index < 0) {
        index = focusables.length - 1;
    }

    // Focus the element
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
    // Set which modal is visible or not
    let visibleModal;
    let hiddenModal;
    if (id === 1) {
        visibleModal = modalOne;
        hiddenModal = modalTwo;
    } else if (id === 2) {
        visibleModal = modalTwo;
        hiddenModal = modalOne;
    }

    // Hide the other modal
    hiddenModal.ariaHidden = "true";
    hiddenModal.classList.add("hidden");

    // Show current modal and change modal labelledby
    visibleModal.ariaHidden = "false";
    visibleModal.classList.remove("hidden");
    modalContainer.setAttribute("aria-labelledby", id === 1 ? "modal-1-title" : "modal-2-title");

    // Get all clickable elements from current modal
    focusables = Array.from(visibleModal.querySelectorAll(focusableSelector));
}
