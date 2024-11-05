const API_BASE_URL = "https://api-gateway.example.com"; // Cambia por la URL real de tu API Gateway

async function login(event) {
    event.preventDefault(); // Evita el recargo de la página

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error("Error en la autenticación");
        }

        const data = await response.json();
        saveToken(data.token); // Guarda el token usando auth.js
        window.location.href = "catalog.html"; // Redirige al catálogo tras el login
    } catch (error) {
        console.error("Error:", error);
        alert("Usuario o contraseña incorrectos");
    }
}

// Agregar evento al formulario de login
document.getElementById("login-form").addEventListener("submit", login);