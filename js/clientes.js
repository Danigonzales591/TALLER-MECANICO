const formularioClientes = document.getElementById("formClientes");
const listaClientes = document.getElementById("listaClientes");

let clientes = JSON.parse(localStorage.getItem("clientesTaller")) || [];

function mostrarClientes() {
    listaClientes.innerHTML = "";

    clientes.forEach((cliente, indice) => {
        const fila = document.createElement("tr");

        [cliente.nombre, cliente.telefono, cliente.correo, cliente.direccion]
            .forEach(dato => {
                const celda = document.createElement("td");
                celda.textContent = dato || "-";
                fila.appendChild(celda);
            });

        const accion = document.createElement("td");
        const boton = document.createElement("button");

        boton.textContent = "Eliminar";
        boton.type = "button";

        boton.addEventListener("click", function() {
            clientes.splice(indice, 1);
            guardarClientes();
            mostrarClientes();
        });

        accion.appendChild(boton);
        fila.appendChild(accion);
        listaClientes.appendChild(fila);
    });
}

function guardarClientes() {
    localStorage.setItem("clientesTaller", JSON.stringify(clientes));
}

formularioClientes.addEventListener("submit", function(event) {
    event.preventDefault();

    const cliente = {
        nombre: document.getElementById("nombre").value.trim(),
        telefono: document.getElementById("telefono").value.trim(),
        correo: document.getElementById("correo").value.trim(),
        direccion: document.getElementById("direccion").value.trim()
    };

    if (!cliente.nombre || !cliente.telefono) {
        alert("Completa el nombre y teléfono.");
        return;
    }

    clientes.push(cliente);
    guardarClientes();
    mostrarClientes();

    formularioClientes.reset();

    document.getElementById("mensajeCliente").textContent =
        "Cliente registrado correctamente.";
});

mostrarClientes();