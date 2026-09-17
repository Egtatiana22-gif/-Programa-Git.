/* =========================================
   CARRITO GENERAL DE ARTE Y SABOR
   ========================================= */

/* CARGAR CARRITO GUARDADO */

let carrito =
    JSON.parse(
        localStorage.getItem("carritoArteYSabor")
    ) || [];


/* ELEMENTOS DEL CARRITO */

const carritoElemento =
    document.getElementById("carrito");

const fondoCarrito =
    document.getElementById("fondoCarrito");

const btnCarrito =
    document.getElementById("btnCarrito");

const cerrarCarrito =
    document.getElementById("cerrarCarrito");

const carritoProductos =
    document.getElementById("carritoProductos");

const contadorCarrito =
    document.getElementById("contadorCarrito");

const totalCarrito =
    document.getElementById("totalCarrito");

const btnComprar =
    document.getElementById("btnComprar");


/* =========================================
   GUARDAR CARRITO
   ========================================= */

function guardarCarrito() {

    localStorage.setItem(
        "carritoArteYSabor",
        JSON.stringify(carrito)
    );

}


/* =========================================
   ABRIR CARRITO
   ========================================= */

function abrirCarrito() {

    if (carritoElemento) {

        carritoElemento.classList.add(
            "mostrar"
        );

    }

    if (fondoCarrito) {

        fondoCarrito.classList.add(
            "mostrar"
        );

    }

}


/* =========================================
   CERRAR CARRITO
   ========================================= */

function cerrarCarritoFuncion() {

    if (carritoElemento) {

        carritoElemento.classList.remove(
            "mostrar"
        );

    }

    if (fondoCarrito) {

        fondoCarrito.classList.remove(
            "mostrar"
        );

    }

}


/* =========================================
   BOTÓN DEL CARRITO
   ========================================= */

if (btnCarrito) {

    btnCarrito.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            abrirCarrito();

        }
    );

}


/* =========================================
   CERRAR CARRITO
   ========================================= */

if (cerrarCarrito) {

    cerrarCarrito.addEventListener(
        "click",
        cerrarCarritoFuncion
    );

}


if (fondoCarrito) {

    fondoCarrito.addEventListener(
        "click",
        cerrarCarritoFuncion
    );

}


/* =========================================
   GUARDAR TEXTO ORIGINAL
   ========================================= */

function guardarTextoOriginalBotones() {

    const botonesProducto =
        document.querySelectorAll(
            ".btn-detalle"
        );


    botonesProducto.forEach(
        function(boton) {

            if (
                !boton.dataset.textoOriginal
            ) {

                boton.dataset.textoOriginal =
                    boton.childNodes[0].textContent.trim();

            }

        }
    );


    const botonesCarrito =
        document.querySelectorAll(
            ".btn-carrito"
        );


    botonesCarrito.forEach(
        function(boton) {

            if (
                !boton.dataset.textoOriginal
            ) {

                boton.dataset.textoOriginal =
                    boton.textContent.trim();

            }

        }
    );

}


/* =========================================
   RESTAURAR BOTÓN DEL PRODUCTO
   ========================================= */

function restaurarBotonProducto(
    nombreProducto
) {

    /* BOTONES DEL MENÚ */

    const botonesProducto =
        document.querySelectorAll(
            ".btn-detalle"
        );


    botonesProducto.forEach(
        function(boton) {

            if (
                boton.dataset.nombre ===
                nombreProducto
            ) {

                boton.childNodes[0].textContent =
                    boton.dataset.textoOriginal ||
                    "Comprar";

                boton.classList.remove(
                    "agregado"
                );

            }

        }
    );


    /* BOTONES DE INICIO */

    const botonesCarrito =
        document.querySelectorAll(
            ".btn-carrito"
        );


    botonesCarrito.forEach(
        function(boton) {

            const producto =
                boton.closest(".producto") ||
                boton.closest(".producto-tienda");


            if (!producto) {

                return;

            }


            const nombreElemento =
                producto.querySelector("h4");


            if (!nombreElemento) {

                return;

            }


            const nombre =
                nombreElemento.textContent.trim();


            if (
                nombre ===
                nombreProducto
            ) {

                boton.textContent =
                    boton.dataset.textoOriginal ||
                    "Comprar";

                boton.style.backgroundColor =
                    "#4A5A3A";

                boton.dataset.carrito =
                    "false";

            }

        }
    );

}


/* =========================================
   ACTUALIZAR CARRITO
   ========================================= */

function actualizarCarrito() {

    if (!carritoProductos) {

        return;

    }

    carritoProductos.innerHTML = "";


    /* CARRITO VACÍO */

    if (carrito.length === 0) {

        carritoProductos.innerHTML =
            '<p class="carrito-vacio">' +
            'Tu carrito está vacío.' +
            '</p>';


        if (contadorCarrito) {

            contadorCarrito.textContent =
                "0";

        }


        if (totalCarrito) {

            totalCarrito.textContent =
                "$0";

        }

        guardarCarrito();

        return;

    }


    let cantidadTotal = 0;

    let total = 0;


    /* MOSTRAR PRODUCTOS */

    carrito.forEach(function(
        producto,
        indice
    ) {

        cantidadTotal +=
            producto.cantidad;

        total +=
            producto.precio *
            producto.cantidad;


        const item =
            document.createElement(
                "div"
            );


        item.classList.add(
            "item-carrito"
        );


        item.innerHTML = `

            <div class="item-carrito-info">

                <h4>
                    ${producto.nombre}
                </h4>

                <p>
                    $${producto.precio.toLocaleString("es-CO")}
                </p>

            </div>


            <div class="cantidad-carrito">

                <button
                    class="btn-cantidad btn-restar"
                    data-indice="${indice}">
                    −
                </button>

                <span>
                    ${producto.cantidad}
                </span>

                <button
                    class="btn-cantidad btn-sumar"
                    data-indice="${indice}">
                    +
                </button>

            </div>


            <strong class="subtotal-carrito">

                $${(
                    producto.precio *
                    producto.cantidad
                ).toLocaleString("es-CO")}

            </strong>


            <button
                class="eliminar-item"
                data-indice="${indice}">
                🗑
            </button>

        `;


        carritoProductos.appendChild(
            item
        );

    });


    /* CONTADOR */

    if (contadorCarrito) {

        contadorCarrito.textContent =
            cantidadTotal;

    }


    /* TOTAL */

    if (totalCarrito) {

        totalCarrito.textContent =
            "$" +
            total.toLocaleString("es-CO");

    }


    /* =====================================
       BOTONES SUMAR
       ===================================== */

    const botonesSumar =
        document.querySelectorAll(
            ".btn-sumar"
        );


    botonesSumar.forEach(
        function(boton) {

            boton.addEventListener(
                "click",
                function() {

                    const indice =
                        Number(
                            boton.dataset.indice
                        );


                    carrito[indice].cantidad++;


                    guardarCarrito();

                    actualizarCarrito();

                }
            );

        }
    );


    /* =====================================
       BOTONES RESTAR
       ===================================== */

    const botonesRestar =
        document.querySelectorAll(
            ".btn-restar"
        );


    botonesRestar.forEach(
        function(boton) {

            boton.addEventListener(
                "click",
                function() {

                    const indice =
                        Number(
                            boton.dataset.indice
                        );


                    carrito[indice].cantidad--;


                    if (
                        carrito[indice].cantidad <= 0
                    ) {

                        const nombreProducto =
                            carrito[indice].nombre;


                        restaurarBotonProducto(
                            nombreProducto
                        );


                        carrito.splice(
                            indice,
                            1
                        );

                    }


                    guardarCarrito();

                    actualizarCarrito();

                }
            );

        }
    );


    /* =====================================
       BOTONES ELIMINAR
       ===================================== */

    const botonesEliminar =
        document.querySelectorAll(
            ".eliminar-item"
        );


    botonesEliminar.forEach(
        function(boton) {

            boton.addEventListener(
                "click",
                function() {

                    const indice =
                        Number(
                            boton.dataset.indice
                        );


                    const nombreProducto =
                        carrito[indice].nombre;


                    restaurarBotonProducto(
                        nombreProducto
                    );


                    carrito.splice(
                        indice,
                        1
                    );


                    guardarCarrito();

                    actualizarCarrito();

                }
            );

        }
    );

}


/* =========================================
   BOTONES DE PRODUCTOS
   ========================================= */

function prepararProductos() {

    const botonesProducto =
        document.querySelectorAll(
            ".btn-detalle"
        );


    botonesProducto.forEach(
        function(boton) {

            /* GUARDAR TEXTO ORIGINAL */

            if (
                !boton.dataset.textoOriginal
            ) {

                boton.dataset.textoOriginal =
                    boton.childNodes[0].textContent.trim();

            }


            const nombre =
                boton.dataset.nombre;

            const precio =
                Number(
                    boton.dataset.precio
                );


            /* COMPROBAR SI YA ESTÁ AGREGADO */

            const productoExistente =
                carrito.find(
                    function(producto) {

                        return producto.nombre ===
                            nombre;

                    }
                );


            if (productoExistente) {

                boton.childNodes[0].textContent =
                    "✓ En el carrito";

                boton.classList.add(
                    "agregado"
                );

            } else {

                boton.childNodes[0].textContent =
                    boton.dataset.textoOriginal ||
                    "Comprar";

            }


            /* CLICK */

            boton.addEventListener(
                "click",
                function() {

                    const productoExistente =
                        carrito.find(
                            function(producto) {

                                return producto.nombre ===
                                    nombre;

                            }
                        );


                    /* SI YA EXISTE */

                    if (productoExistente) {

                        abrirCarrito();

                        return;

                    }


                    /* AGREGAR PRODUCTO */

                    carrito.push({

                        nombre: nombre,

                        precio: precio,

                        cantidad: 1

                    });


                    guardarCarrito();


                    boton.childNodes[0].textContent =
                        "✓ En el carrito";


                    boton.classList.add(
                        "agregado"
                    );


                    actualizarCarrito();

                }
            );

        }
    );

}


/* =========================================
   FINALIZAR COMPRA
   ========================================= */

if (btnComprar) {

    btnComprar.addEventListener(
        "click",
        function() {

            if (carrito.length === 0) {

                alert(
                    "Tu carrito está vacío. " +
                    "Agrega algún producto antes de continuar."
                );

                return;

            }


            alert(
                "¡Gracias por tu compra en Arte y Sabor! ☕🧶\n\n" +
                "La función de pago estará disponible próximamente."
            );


            /* VACIAR CARRITO */

            carrito = [];


            guardarCarrito();


            /* ACTUALIZAR PRODUCTOS */

            const botonesProducto =
                document.querySelectorAll(
                    ".btn-detalle"
                );


            botonesProducto.forEach(
                function(boton) {

                    boton.childNodes[0].textContent =
                        boton.dataset.textoOriginal ||
                        "Comprar";

                    boton.classList.remove(
                        "agregado"
                    );

                }
            );


            /* ACTUALIZAR BOTONES DE INICIO */

            const botonesInicio =
                document.querySelectorAll(
                    ".btn-carrito"
                );


            botonesInicio.forEach(
                function(boton) {

                    boton.textContent =
                        boton.dataset.textoOriginal ||
                        "Comprar";

                    boton.style.backgroundColor =
                        "#4A5A3A";

                    boton.dataset.carrito =
                        "false";

                }
            );


            actualizarCarrito();

            cerrarCarritoFuncion();

        }
    );

}


/* =========================================
   INICIAR
   ========================================= */

guardarTextoOriginalBotones();

prepararProductos();

actualizarCarrito();