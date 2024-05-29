document.querySelector(".form").addEventListener("submit", function (e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get("email");
    const password = data.get("password");
    userLogin(email, password);
});

async function userLogin(email, password) {
    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        });
        const result = await response.json();
        if (response.status === 401) {
            alert("Mot de passe incorrect");
        } else if (response.status === 404) {
            alert("Impossible de trouver cet utilisateur");
        } else if (response.status === 200) {
            window.localStorage.setItem("user", JSON.stringify(result));
            window.location.href = "/";
        }
    } catch (error) {
        console.error("Error", error);
    }
}