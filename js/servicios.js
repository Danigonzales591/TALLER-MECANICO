const formServicios = document.getElementById("formServicios");
const listaServicios = document.getElementById("listaServicios");

let servicios = JSON.parse(localStorage.getItem("serviciosTaller")) || [];

function guardarServicios() {
    localStorage.setItem("serviciosTaller", JSON.stringify(servicios));
}

function mostrarServicios() {
    listaServicios.innerHTML = "";

    servicios.forEach((servicio, indice) => {
        const fila = document.createElement("tr");

        [
            servicio.nombre,
            servicio.descripcion || "-",
            "Bs " + Number(servicio.precio).toFixed(2),
            servicio.duracion || "-"
        ].forEach(dato => {
            const celda = document.createElement("td");
            celda.textContent = dato;
            fila.appendChild(celda);
        });

        const celdaAccion = document.createElement("td");
        const boton = document.createElement("button");

        boton.textContent = "Eliminar";
        boton.type = "button";

        boton.addEventListener("click", function() {
            servicios.splice(indice, 1);
            guardarServicios();
            mostrarServicios();
        });

        celdaAccion.appendChild(boton);
        fila.appendChild(celdaAccion);
        listaServicios.appendChild(fila);
    });
}

formServicios.addEventListener("submit", function(event) {
    event.preventDefault();

    const servicio = {
        nombre: document.getElementById("nombreServicio").value.trim(),
        descripcion: document.getElementById("descripcion").value.trim(),
        precio: Number(document.getElementById("precioServicio").value),
        duracion: document.getElementById("duracion").value.trim()
    };

    servicios.push(servicio);
    guardarServicios();
    mostrarServicios();
    formServicios.reset();

    document.getElementById("mensajeServicio").textContent =
        "Servicio registrado correctamente.";
});

mostrarServicios();