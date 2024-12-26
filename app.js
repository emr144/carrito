document.addEventListener("DOMContentLoaded", async () => {
    const contenedorItems = document.querySelector(".contenedor-items");

    try {
        // Hacer la solicitud al backend
        const response = await fetch('productos.json'); //IMPORTANTE!!!!
        if (!response.ok) {
            throw new Error("Error al obtener los productos");
        }
        const productos = await response.json();

        // Generar los productos en el DOM
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

        // Asignar eventos después de crear los productos
        const botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
        for (let i = 0; i < botonesAgregarAlCarrito.length; i++) {
            botonesAgregarAlCarrito[i].addEventListener('click', agregarAlCarritoClicked);
        }
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }

    // Asignar los eventos relacionados con el carrito
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
    Swal.fire({
        title: 'Gracias por tu compra',
        text: '¡Pronto recibirás tu pedido!',
        icon: 'success',
        confirmButtonText: 'OK'
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const botonFlotante = document.getElementById("boton-flotante");

    // Mostrar el botón solo en pantallas pequeñas y cuando hay scroll
    function toggleBotonFlotante() {
        if (window.innerWidth <= 850 && window.scrollY > 200) {
            botonFlotante.style.display = "flex";
        } else {
            botonFlotante.style.display = "none";
        }
    }

    // Llevar al final de la página al hacer clic
    botonFlotante.addEventListener("click", function () {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        });
    });

    // Verificar en scroll y en resize
    window.addEventListener("scroll", toggleBotonFlotante);
    window.addEventListener("resize", toggleBotonFlotante);

    // Inicializar
    toggleBotonFlotante();
});
