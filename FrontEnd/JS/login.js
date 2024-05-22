window.onload = addListenerSubmit()

function addListenerSubmit() {
    const loginForm = document.querySelector(".login-form");
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        postLogin();
    });
}

async function postLogin() {
    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                'accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": document.getElementById("email").value,
                "password": document.getElementById("password").value
            })
        });
        const result = await response.json();
        console.log("Success:", response.status);
        if (response.status === 401) {
            alert("Mauvaise combinaison d'email et de mot de passe");
        } else if (response.status === 404) {
            alert("Utilisateur inconnu")
        } else if (response.status === 200) {
            window.localStorage.setItem("user", JSON.stringify(result));
            window.location.href="/";
        }
    } catch (error) {
        console.error("Error", error);
    }
}