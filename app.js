const productos = [
    { nombre: "Box Engasse", imagen: "img/boxengasse.png", precio: 15000 },
    { nombre: "English Horse", imagen: "img/englishrose.png", precio: 25000 },
    { nombre: "Knock Nap", imagen: "img/knocknap.png", precio: 35000 },
    { nombre: "La Night", imagen: "img/lanight.png", precio: 18000 },
    { nombre: "Silver All", imagen: "img/silverall.png", precio: 32000 },
    { nombre: "Skin Glam", imagen: "img/skinglam.png", precio: 18000 },
    { nombre: "Midimix", imagen: "img/midimix.png", precio: 54000 },
    { nombre: "Sir Blue", imagen: "img/sirblue.png", precio: 32000 },
    { nombre: "Middlesteel", imagen: "img/middlesteel.png", precio: 42800 },
];

document.addEventListener("DOMContentLoaded", () => {
    const contenedorItems = document.querySelector(".contenedor-items");

    // Generar los productos
    productos.forEach(producto => {
        const item = document.createElement("div");
        item.classList.add("item");

        item.innerHTML = `
            <span class="titulo-item">${producto.nombre}</span>
            <img src="${producto.imagen}" alt="${producto.nombre}" class="img-item">
            <span class="precio-item">$${producto.precio.toLocaleString()}</span>
            <button class="boton-item">Agregar al Carrito</button>
        `;

        contenedorItems.appendChild(item);
    });

    // Asignar el evento a los botones "Agregar al Carrito"
    const botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for (let i = 0; i < botonesAgregarAlCarrito.length; i++) {
        botonesAgregarAlCarrito[i].addEventListener('click', agregarAlCarritoClicked);
    }

    // Agregar funcionalidad a otros botones del carrito
    ready();
});

// Función para ejecutar los eventos relacionados con el carrito
function ready() {
    // Eliminar elementos del carrito
    const botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for (let i = 0; i < botonesEliminarItem.length; i++) {
        botonesEliminarItem[i].addEventListener('click', eliminarItemCarrito);
    }

    // Sumar cantidad
    const botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for (let i = 0; i < botonesSumarCantidad.length; i++) {
        botonesSumarCantidad[i].addEventListener('click', sumarCantidad);
    }

    // Restar cantidad
    const botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for (let i = 0; i < botonesRestarCantidad.length; i++) {
        botonesRestarCantidad[i].addEventListener('click', restarCantidad);
    }

    // Funcionalidad para el botón de pagar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked);
}

// Función para agregar un item al carrito
function agregarAlCarritoClicked(event) {
    const button = event.target;
    const item = button.parentElement;
    const titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    const precio = item.getElementsByClassName('precio-item')[0].innerText;
    const imagenSrc = item.getElementsByClassName('img-item')[0].src;

    agregarItemAlCarrito(titulo, precio, imagenSrc);
    hacerVisibleCarrito();
}

// Función que hace visible el carrito
function hacerVisibleCarrito(){
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';  // Aseguramos que el carrito esté siempre visible, sin animación de ocultar
    carrito.style.opacity = '1'; // Aseguramos que el carrito sea visible

    var items = document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%'; // Ajustamos el contenido para que no ocupe toda la pantalla
}

// Función que agrega un item al carrito
function agregarItemAlCarrito(titulo, precio, imagenSrc) {
    const item = document.createElement('div');
    item.classList.add('item');
    const itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    const nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for (let i = 0; i < nombresItemsCarrito.length; i++) {
        if (nombresItemsCarrito[i].innerText == titulo) {
            alert("El item ya se encuentra en el carrito");
            return;
        }
    }

    const itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `;
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.appendChild(item);

    // Funcionalidad para eliminar el item
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    // Funcionalidad para restar cantidad
    const botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click', restarCantidad);

    // Funcionalidad para sumar cantidad
    const botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click', sumarCantidad);

    // Actualizar total
    actualizarTotalCarrito();
}

// Función para aumentar la cantidad
function sumarCantidad(event) {
    const buttonClicked = event.target;
    const selector = buttonClicked.parentElement;
    let cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}

// Función para reducir la cantidad
function restarCantidad(event) {
    const buttonClicked = event.target;
    const selector = buttonClicked.parentElement;
    let cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    if (cantidadActual > 1) {
        cantidadActual--;
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}

// Función para eliminar un item del carrito
function eliminarItemCarrito(event) {
    const buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    actualizarTotalCarrito();
    ocultarCarrito();
}



// Función para actualizar el total del carrito
function actualizarTotalCarrito() {
    const carritoContenedor = document.getElementsByClassName('carrito')[0];
    const carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    let total = 0;

    for (let i = 0; i < carritoItems.length; i++) {
        const item = carritoItems[i];
        const precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        const precio = parseFloat(precioElemento.innerText.replace('$', '').replace('.', ''));
        const cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        const cantidad = cantidadItem.value;
        total += precio * cantidad;
    }

    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString("es") + ",00";
}

// Función para procesar el pago
function pagarClicked() {
    alert("Gracias por la compra");
    const carritoItems = document.getElementsByClassName('carrito-items')[0];
    while (carritoItems.hasChildNodes()) {
        carritoItems.removeChild(carritoItems.firstChild);
    }
    actualizarTotalCarrito();
    ocultarCar
}