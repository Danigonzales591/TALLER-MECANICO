const formVehiculos = document.getElementById("formVehiculos");
const listaVehiculos = document.getElementById("listaVehiculos");

let vehiculos = JSON.parse(localStorage.getItem("vehiculosTaller")) || [];

function guardarVehiculos() {
    localStorage.setItem("vehiculosTaller", JSON.stringify(vehiculos));
}

function mostrarVehiculos() {
    listaVehiculos.innerHTML = "";

    vehiculos.forEach((vehiculo, indice) => {
        const fila = document.createElement("tr");

        [
            vehiculo.propietario,
            vehiculo.placa,
            vehiculo.marca,
            vehiculo.modelo,
            vehiculo.anio,
            vehiculo.color || "-"
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
            vehiculos.splice(indice, 1);
            guardarVehiculos();
            mostrarVehiculos();
        });

        celdaAccion.appendChild(boton);
        fila.appendChild(celdaAccion);
        listaVehiculos.appendChild(fila);
    });
}

formVehiculos.addEventListener("submit", function(event) {
    event.preventDefault();

    const vehiculo = {
        propietario: document.getElementById("propietario").value.trim(),
        placa: document.getElementById("placa").value.trim().toUpperCase(),
        marca: document.getElementById("marcaVehiculo").value.trim(),
        modelo: document.getElementById("modelo").value.trim(),
        anio: document.getElementById("anio").value,
        color: document.getElementById("color").value.trim()
    };

    if (vehiculos.some(v => v.placa === vehiculo.placa)) {
        alert("Esta placa ya está registrada.");
        return;
    }

    vehiculos.push(vehiculo);
    guardarVehiculos();
    mostrarVehiculos();
    formVehiculos.reset();

    document.getElementById("mensajeVehiculo").textContent =
        "Vehículo registrado correctamente.";
});

mostrarVehiculos();