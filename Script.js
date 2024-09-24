// Simulador Boliche

// Precio de entrada por persona
const precioEntrada = 9000;

// Clase Bebida con constructor
class Bebida {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

// Crear bebidas usando el constructor de la clase Bebida
const bebidas = [
    new Bebida("Cerveza", 7000),
    new Bebida("Agua", 3500),
    new Bebida("Caipi Frutos Rojos", 10000),
    new Bebida("Caipi Maracuya", 10000),
    new Bebida("Caipi Absolut", 10000),
    new Bebida("Caipi Smirnoff", 10000),
    new Bebida("Fernet con Coca", 8500),
    new Bebida("Vodka con Speed", 6790),
    new Bebida("Botella de Fernet", 90000),
    new Bebida("Caipiroska Absolut con Maracuya", 14000),
    new Bebida("Caipiroska Absolut con Frutos Rojos", 14000),
    new Bebida("Caipiroska Absolut", 14000),
    new Bebida("Caipiroska Smirnoff", 14000)
];

// Función para validar el número de la bebida seleccionada
function validarSeleccion(seleccion, max) {
    return !isNaN(seleccion) && seleccion > 0 && seleccion <= max;
}

// Función para encontrar una bebida específica usando find()
function encontrarBebida(nombre) {
    return bebidas.find(bebida => bebida.nombre.toLowerCase() === nombre.toLowerCase());
}

// Función para calcular el total de bebidas seleccionadas
function calcularTotalBebidas(bebidasSeleccionadas) {
    return bebidasSeleccionadas.reduce((total, bebidaSeleccionada) => {
        let bebida = encontrarBebida(bebidaSeleccionada.nombre);
        if (bebida) {
            return total + (bebida.precio * bebidaSeleccionada.cantidad);
        } else {
            console.warn(`Bebida no encontrada: ${bebidaSeleccionada.nombre}`);
            return total; // O manejarlo de otra forma
        }
    }, 0);
}

// Nueva función para seleccionar bebidas
function seleccionarBebidas() {
    const seleccionBebidas = [];
    let continuar = true;

    while (continuar) {
        let mensajeBebidas = "Selecciona una bebida:\n";
        bebidas.forEach((bebida, index) => {
            mensajeBebidas += `${index + 1}. ${bebida.nombre} - $${bebida.precio}\n`;
        });

        let seleccion = parseInt(prompt(mensajeBebidas)) - 1;
        if (validarSeleccion(seleccion + 1, bebidas.length)) {
            let cantidad = parseInt(prompt(`¿Cuántas ${bebidas[seleccion].nombre} quieres?`)) || 0;
            if (cantidad > 0) {
                seleccionBebidas.push({ nombre: bebidas[seleccion].nombre, cantidad });
            } else {
                alert("Cantidad no válida.");
            }
        } else {
            alert("Selección no válida.");
        }

        continuar = prompt("¿Quieres agregar otra bebida? (si/no)").toLowerCase() === "si";
    }

    return seleccionBebidas;
}

// Función para calcular el total de entradas
function totalEntrada(cantidadEntradas) {
    return cantidadEntradas * precioEntrada;
}

// Función para calcular el costo de las mesas VIP
function calcularMesasVIP() {
    const cantidadMesasVIPInput = document.getElementById('cantidad-mesas-vip');
    let totalMesasVIP = 0;

    if (cantidadMesasVIPInput) {
        const cantidadMesasVIP = parseInt(cantidadMesasVIPInput.value) || 0;

        if (cantidadMesasVIP > 0) {
            totalMesasVIP = cantidadMesasVIP * 156000; // Precio por mesa VIP
        } else {
            alert("Por favor selecciona una cantidad válida de mesas VIP.");
        }
    } else {
        console.error("Elemento del DOM para mesa VIP no encontrado.");
    }

    return totalMesasVIP;
}

// Nueva función para calcular el total
function calcularTotal() {
    const cantidadEntradasInput = document.getElementById('cantidad-entradas');
    const cantidadEntradas = parseInt(cantidadEntradasInput.value) || 0;
    const totalEntradasHTML = totalEntrada(cantidadEntradas);

    // Seleccionar bebidas
    const bebidasSeleccionadas = seleccionarBebidas();
    const totalBebidasHTML = calcularTotalBebidas(bebidasSeleccionadas);
    const totalMesasVIPHTML = calcularMesasVIP();
    const totalFinalHTML = totalEntradasHTML + totalBebidasHTML + totalMesasVIPHTML;

    // Mostrar el total a pagar en la página
    const resultadoEntradas = document.getElementById('resultado-entradas');
    const resultadoBebidas = document.getElementById('resultado-bebidas');
    const resultadoMesaVIP = document.getElementById('resultado-mesa-vip');
    const resultadoTotal = document.getElementById('resultado-total');
    const tablaDatos = document.getElementById('tabla-datos').getElementsByTagName('tbody')[0];
    const tablaNombreApellido = document.getElementById('tabla-nombre-apellido').getElementsByTagName('tbody')[0];

    // Limpiar tabla antes de llenarla
    tablaDatos.innerHTML = '';
    tablaNombreApellido.innerHTML = ''; // Limpiar tabla de nombre y apellido

    // Obtener nombre y apellido
    const nombreInput = document.getElementById('nombre').value;
    const apellidoInput = document.getElementById('apellido').value;

    // Agregar nombre y apellido a la nueva tabla
    const filaNombre = tablaNombreApellido.insertRow();
    filaNombre.insertCell().textContent = "Nombre";
    filaNombre.insertCell().textContent = nombreInput;

    const filaApellido = tablaNombreApellido.insertRow();
    filaApellido.insertCell().textContent = "Apellido";
    filaApellido.insertCell().textContent = apellidoInput;

    // Agregar entradas a la tabla
    const filaEntradas = tablaDatos.insertRow();
    filaEntradas.insertCell().textContent = "Entradas";
    filaEntradas.insertCell().textContent = cantidadEntradas;
    filaEntradas.insertCell().textContent = `$${precioEntrada}`;
    filaEntradas.insertCell().textContent = `$${totalEntradasHTML}`;

    // Agregar bebidas a la tabla
    for (const bebidaSeleccionada of bebidasSeleccionadas) {
        const bebida = encontrarBebida(bebidaSeleccionada.nombre);
        const filaBebidas = tablaDatos.insertRow();
        filaBebidas.insertCell().textContent = bebida.nombre;
        filaBebidas.insertCell().textContent = bebidaSeleccionada.cantidad;
        filaBebidas.insertCell().textContent = `$${bebida.precio}`;
        filaBebidas.insertCell().textContent = `$${bebida.precio * bebidaSeleccionada.cantidad}`;
    }

    // Agregar mesas VIP a la tabla
    const filaVIP = tablaDatos.insertRow();
    const cantidadMesasVIP = parseInt(document.getElementById('cantidad-mesas-vip').value) || 0;
    filaVIP.insertCell().textContent = "Mesas VIP";
    filaVIP.insertCell().textContent = cantidadMesasVIP > 0 ? cantidadMesasVIP : '0';
    filaVIP.insertCell().textContent = `$156000`;
    filaVIP.insertCell().textContent = `$${totalMesasVIPHTML}`;

    // Mostrar total en la tabla
    const filaTotal = tablaDatos.insertRow();
    filaTotal.insertCell().textContent = "Total";
    filaTotal.insertCell().textContent = '';
    filaTotal.insertCell().textContent = '';
    filaTotal.insertCell().textContent = `$${totalFinalHTML}`;

    // Mostrar resultados en pantalla
    resultadoEntradas.textContent = `Total Entradas: $${totalEntradasHTML}`;
    resultadoBebidas.textContent = `Total Bebidas: $${totalBebidasHTML}`;
    resultadoMesaVIP.textContent = `Total Mesas VIP: $${totalMesasVIPHTML}`;
    resultadoTotal.textContent = `Total Final: $${totalFinalHTML}`;

    // Guardar datos en localStorage
    localStorage.setItem('datosBoliche', JSON.stringify({
        entradas: cantidadEntradas,
        bebidas: bebidasSeleccionadas,
        mesasVIP: cantidadMesasVIP,
        nombre: nombreInput,
        apellido: apellidoInput,
        total: totalFinalHTML
    }));
}

// Función para cargar datos desde localStorage
function cargarDatos() {
    const datos = JSON.parse(localStorage.getItem('datosBoliche'));
    if (datos) {
        document.getElementById('cantidad-entradas').value = datos.entradas || 0;
        document.getElementById('nombre').value = datos.nombre || '';
        document.getElementById('apellido').value = datos.apellido || '';

        // Aquí puedes agregar la lógica para cargar bebidas y mesas VIP
    }
}

// Llamar a cargarDatos al cargar la página
window.onload = function() {
    cargarDatos(); // Cargar datos desde localStorage
    manejarSeleccionVIP(); // Inicializa el manejo de la selección VIP
}

// Función adicional para manejar la selección VIP
function manejarSeleccionVIP() {
    const vipSelect = document.getElementById('mesa-vip'); // Select del HTML
    const cantidadMesasVIPInput = document.getElementById('mesa-vip-section'); // Contenedor para la cantidad de mesas VIP

    if (vipSelect && cantidadMesasVIPInput) {
        vipSelect.addEventListener('change', function() {
            if (vipSelect.value === "si") {
                cantidadMesasVIPInput.style.display = 'block';  // Muestra la sección de cantidad de mesas VIP
            } else {
                cantidadMesasVIPInput.style.display = 'none';   // Oculta la sección de cantidad de mesas VIP si seleccionan "No"
                document.getElementById('cantidad-mesas-vip').value = '0';  // Restablece el valor a 0 cuando se oculta
            }
        });
    } else {
        console.error("Elemento del DOM para select mesa VIP o input mesas VIP no encontrado.");
    }
}

// Asegúrate de que la función se ejecute una vez que la página esté completamente cargada
window.onload = function() {
    cargarDatos(); // Cargar datos desde localStorage
    manejarSeleccionVIP(); // Inicializa el manejo de la selección VIP
};
