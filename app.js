const productos = [
    { nombre: "1001", tipo: "Base", imagen: "img/base1001.jpg", precio: 15000 },
    { nombre: "1018", tipo: "Base", imagen: "img/base1018.jpg", precio: 15200 },
    { nombre: "1019", tipo: "Base", imagen: "img/base1019.jpg", precio: 15500 },
    { nombre: "B09", tipo: "Base", imagen: "img/baseB09.jpg", precio: 15800 },
    { nombre: "B11", tipo: "Base", imagen: "img/baseB11.jpg", precio: 16000 },
    { nombre: "B13", tipo: "Base", imagen: "img/baseB13.jpg", precio: 16200 },
    { nombre: "1003", tipo: "Blenders", imagen: "img/blenders1003.jpg", precio: 16500 },
    { nombre: "1005", tipo: "Blenders", imagen: "img/blenders1005.jpg", precio: 16700 },
    { nombre: "1006", tipo: "Blenders", imagen: "img/blenders1006.jpg", precio: 17000 },
    { nombre: "B30", tipo: "Blenders", imagen: "img/blendersB30.jpg", precio: 17200 },
    { nombre: "B32", tipo: "Blenders", imagen: "img/blendersB32.jpg", precio: 17500 },
    { nombre: "N012", tipo: "Labios", imagen: "img/labiosN012.jpg", precio: 18000 },
    { nombre: "N014", tipo: "Labios", imagen: "img/labiosN014.jpg", precio: 18200 },
    { nombre: "N034", tipo: "Labios", imagen: "img/labiosN034.jpg", precio: 18500 },
    { nombre: "N080", tipo: "Labios", imagen: "img/labiosN080.jpg", precio: 18800 },
    { nombre: "108", tipo: "Labios", imagen: "img/labiosN108.jpg", precio: 19000 },
    { nombre: "N109", tipo: "Labios", imagen: "img/labiosN109.jpg", precio: 19200 },
    { nombre: "N110", tipo: "Labios", imagen: "img/labiosN110.jpg", precio: 19500 },
    { nombre: "N112", tipo: "Labios", imagen: "img/labiosN112.jpg", precio: 19800 },
    { nombre: "N130", tipo: "Labios", imagen: "img/labiosN130.jpg", precio: 20000 },
    { nombre: "N131", tipo: "Labios", imagen: "img/labiosN131.jpg", precio: 20500 },
    { nombre: "1003", tipo: "Ojos", imagen: "img/ojos1003.jpg", precio: 21000 },
    { nombre: "1005", tipo: "Ojos", imagen: "img/ojos1005.jpg", precio: 21200 },
    { nombre: "1006", tipo: "Ojos", imagen: "img/ojos1006.jpg", precio: 21500 },
    { nombre: "1007", tipo: "Ojos", imagen: "img/ojos1007.jpg", precio: 22000 },
    { nombre: "1008", tipo: "Ojos", imagen: "img/ojos1008.jpg", precio: 22500 },
    { nombre: "1016", tipo: "Ojos", imagen: "img/ojos1016.jpg", precio: 23000 },
    { nombre: "1017", tipo: "Ojos", imagen: "img/ojos1017.jpg", precio: 23500 },
    { nombre: "1020", tipo: "Ojos", imagen: "img/ojos1020.jpg", precio: 24000 },
    { nombre: "1021", tipo: "Ojos", imagen: "img/ojos1021.jpg", precio: 24500 },
    { nombre: "1010", tipo: "Polvo", imagen: "img/polvo1010.jpg", precio: 25000 },
    { nombre: "1018", tipo: "Polvo", imagen: "img/polvo1018.jpg", precio: 25500 },
    { nombre: "1019", tipo: "Polvo", imagen: "img/polvo1019.jpg", precio: 26000 },
    { nombre: "1020", tipo: "Polvo", imagen: "img/polvo1020.jpg", precio: 26500 }
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
            <span class="modo-uso-item">${producto.tipo}</span>
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

    // Asignar los eventos a los botones del carrito
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
function hacerVisibleCarrito() {
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items = document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}

function agregarItemAlCarrito(titulo, precio, imagenSrc) {
    const itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    const nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for (let i = 0; i < nombresItemsCarrito.length; i++) {
        if (nombresItemsCarrito[i].innerText === titulo) {
            // Si el producto ya está en el carrito, incrementa la cantidad
            const cantidadInput = nombresItemsCarrito[i].parentElement.querySelector('.carrito-item-cantidad');
            const cantidad = parseInt(cantidadInput.value);
            cantidadInput.value = cantidad + 1;

            // Actualizar el precio del producto en el carrito
            const precioUnitario = parseInt(precio.replace('$', '').replace(',', ''));
            const nuevoPrecioTotal = (cantidad + 1) * precioUnitario;
            const precioCarrito = nombresItemsCarrito[i].parentElement.querySelector('.carrito-item-precio');
            precioCarrito.innerText = `$${nuevoPrecioTotal.toLocaleString()}`;

            // Actualizar el total del carrito
            actualizarTotal();
            return;
        }
    }

    // Si el producto no está en el carrito, agregarlo
    const item = document.createElement('div');
    item.classList.add('item');

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
            <i class="fa-solid fa-trash-can btn-eliminar"></i>
        </div>
    `;
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    // Vuelve a llamar a la función ready para asignar eventos
    ready();

    // Actualizar el total del carrito
    actualizarTotal();
}


// Función para eliminar un item del carrito
function eliminarItemCarrito(event) {
    const buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    actualizarTotal();
}

// Función para sumar cantidad
function sumarCantidad(event) {
    const botonSumar = event.target;
    const inputCantidad = botonSumar.previousElementSibling;
    let cantidad = parseInt(inputCantidad.value);
    cantidad += 1;
    inputCantidad.value = cantidad;

    const item = botonSumar.closest('.carrito-item');
    const titulo = item.getElementsByClassName('carrito-item-titulo')[0].innerText;

    // Buscar el precio original del producto en la lista 'productos'
    const producto = productos.find(p => p.nombre === titulo);
    const precioBase = producto.precio;

    // Calcular el nuevo precio total
    const nuevoPrecioTotal = cantidad * precioBase;

    // Actualizar el precio en el carrito
    const precio = item.getElementsByClassName('carrito-item-precio')[0];
    precio.innerText = `$${nuevoPrecioTotal.toLocaleString()}`;

    // Actualizar el total general del carrito
    actualizarTotal();
}

// Función para restar cantidad
function restarCantidad(event) {
    const botonRestar = event.target;
    const inputCantidad = botonRestar.nextElementSibling;
    let cantidad = parseInt(inputCantidad.value);

    if (cantidad > 1) {
        cantidad -= 1;
        inputCantidad.value = cantidad;

        const item = botonRestar.closest('.carrito-item');
        const titulo = item.getElementsByClassName('carrito-item-titulo')[0].innerText;

        // Buscar el precio original del producto en la lista 'productos'
        const producto = productos.find(p => p.nombre === titulo);
        const precioBase = producto.precio;

        // Calcular el nuevo precio total
        const nuevoPrecioTotal = cantidad * precioBase;

        // Actualizar el precio en el carrito
        const precio = item.getElementsByClassName('carrito-item-precio')[0];
        precio.innerText = `$${nuevoPrecioTotal.toLocaleString()}`;

        // Actualizar el total general del carrito
        actualizarTotal();
    }
}


// Función para actualizar el total
function actualizarTotal() {
    let total = 0; // Reinicia el total a 0
    const itemsCarrito = document.getElementsByClassName('carrito-items')[0];
    const productosCarrito = itemsCarrito.getElementsByClassName('carrito-item');

    // Iterar sobre los productos en el carrito
    for (let i = 0; i < productosCarrito.length; i++) {
        const producto = productosCarrito[i];

        // Obtener el título y la cantidad del producto
        const titulo = producto.getElementsByClassName('carrito-item-titulo')[0].innerText;
        const inputCantidad = producto.getElementsByClassName('carrito-item-cantidad')[0];
        const cantidad = parseInt(inputCantidad.value) || 0; // Asegurar que sea un número

        // Buscar el precio base del producto desde la lista "productos"
        const productoBase = productos.find(p => p.nombre === titulo);

        if (productoBase) {
            // Calcular el subtotal del producto y añadirlo al total
            total += productoBase.precio * cantidad;
        } else {
            console.error(`Producto con título "${titulo}" no encontrado en la lista 'productos'.`);
        }
    }

    // Actualizar el total mostrado en el HTML
    const totalCarrito = document.getElementsByClassName('carrito-precio-total')[0];
    if (totalCarrito) {
        totalCarrito.innerText = `$${total.toLocaleString()}`;
    } else {
        console.error("No se encontró el elemento '.carrito-precio-total' en el DOM.");
    }
}


// Función para manejar el botón de pago
function pagarClicked() {
    alert("Gracias por tu compra. ¡Pronto recibirás tu pedido!");
    // Aquí podrías agregar más lógica para manejar el pago
}