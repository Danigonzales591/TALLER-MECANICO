const formulario = document.getElementById("formLogin");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const password = document.getElementById("password").value;
    const mensaje = document.getElementById("mensaje");

    if (usuario === "talleradmin" && password === "280601") {
        mensaje.textContent = "Acceso correcto. Bienvenido.";
        mensaje.style.color = "#4ade80";

        setTimeout(function() {
            window.location.href = "pages/inicio.html";
        }, 800);

    } else {
        mensaje.textContent = "Usuario o contraseña incorrectos.";
        mensaje.style.color = "#ff6b6b";
    }
});