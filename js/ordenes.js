const formulario = document.getElementById("formOrdenes");
const lista = document.getElementById("listaOrdenes");
const mensaje = document.getElementById("mensajeOrden");

let ordenes = JSON.parse(localStorage.getItem("ordenesTaller")) || [];

function mostrarOrdenes() {
    lista.innerHTML = "";

    ordenes.forEach((orden, indice) => {
        const fila = document.createElement("tr");

        [
            orden.cliente,
            orden.placa,
            orden.trabajo,
            orden.mecanico,
            "Bs " + Number(orden.costo).toFixed(2),
            orden.estado
        ].forEach(valor => {
            const celda = document.createElement("td");
            celda.textContent = valor;
            fila.appendChild(celda);
        });

        const accion = document.createElement("td");
        const boton = document.createElement("button");

        boton.textContent = "Eliminar";
        boton.type = "button";
        boton.addEventListener("click", () => {
            ordenes.splice(indice, 1);
            guardarOrdenes();
        });

        accion.appendChild(boton);
        fila.appendChild(accion);
        lista.appendChild(fila);
    });
}

function guardarOrdenes() {
    localStorage.setItem("ordenesTaller", JSON.stringify(ordenes));
    mostrarOrdenes();
}

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const orden = {
        cliente: document.getElementById("clienteOrden").value.trim(),
        placa: document.getElementById("placaOrden").value.trim(),
        trabajo: document.getElementById("trabajo").value.trim(),
        mecanico: document.getElementById("mecanico").value.trim(),
        costo: document.getElementById("costo").value,
        estado: document.getElementById("estado").value
    };

    ordenes.push(orden);
    guardarOrdenes();

    mensaje.textContent = "Orden registrada correctamente.";
    mensaje.style.color = "#4ade80";

    formulario.reset();
});

mostrarOrdenes();