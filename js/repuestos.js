const formRepuestos = document.getElementById("formRepuestos");
const listaRepuestos = document.getElementById("listaRepuestos");

let repuestos = JSON.parse(localStorage.getItem("repuestosTaller")) || [];

function guardarRepuestos() {
    localStorage.setItem("repuestosTaller", JSON.stringify(repuestos));
}

function mostrarRepuestos() {
    listaRepuestos.innerHTML = "";

    repuestos.forEach((repuesto, indice) => {
        const fila = document.createElement("tr");

        [
            repuesto.nombre,
            repuesto.codigo,
            repuesto.cantidad,
            "Bs " + Number(repuesto.precio).toFixed(2)
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
            repuestos.splice(indice, 1);
            guardarRepuestos();
            mostrarRepuestos();
        });

        celdaAccion.appendChild(boton);
        fila.appendChild(celdaAccion);
        listaRepuestos.appendChild(fila);
    });
}

formRepuestos.addEventListener("submit", function(event) {
    event.preventDefault();

    const repuesto = {
        nombre: document.getElementById("nombreRepuesto").value.trim(),
        codigo: document.getElementById("codigo").value.trim().toUpperCase(),
        cantidad: Number(document.getElementById("cantidad").value),
        precio: Number(document.getElementById("precioRepuesto").value)
    };

    if (repuestos.some(r => r.codigo === repuesto.codigo)) {
        alert("Este código ya está registrado.");
        return;
    }

    repuestos.push(repuesto);
    guardarRepuestos();
    mostrarRepuestos();
    formRepuestos.reset();

    document.getElementById("mensajeRepuesto").textContent =
        "Repuesto registrado correctamente.";
});

mostrarRepuestos();