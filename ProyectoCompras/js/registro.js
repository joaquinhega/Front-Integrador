// Función de registro
async function register(event) {
    event.preventDefault(); // Evita el recargo de la página

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error("Error en el registro");
        }

        alert("Registro exitoso. Ahora puedes iniciar sesión.");
        window.location.href = "login.html"; // Redirige al login tras el registro
    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo completar el registro");
    }
}

// Agregar evento al formulario de registro
document.getElementById("register-form").addEventListener("submit", register);