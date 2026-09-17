/* FILTROS DE LA TIENDA */

const filtros =
    document.querySelectorAll(".filtro-tienda");

const secciones =
    document.querySelectorAll(".categoria-productos");

filtros.forEach(function(filtro) {

    filtro.addEventListener("click", function() {

        const categoria =
            filtro.dataset.filtro;

        filtros.forEach(function(item) {

            item.classList.remove("activo");

        });

        filtro.classList.add("activo");

        secciones.forEach(function(seccion) {

            if (
                categoria === "todos" ||
                seccion.dataset.seccion === categoria
            ) {

                seccion.style.display = "block";

            } else {

                seccion.style.display = "none";

            }

        });

    });

});


/* CATEGORÍAS SUPERIORES */

const categorias =
    document.querySelectorAll(".categoria");

categorias.forEach(function(categoria) {

    categoria.addEventListener("click", function() {

        const nombreCategoria =
            categoria.dataset.categoria;

        const filtro =
            document.querySelector(
                '.filtro-tienda[data-filtro="' +
                nombreCategoria +
                '"]'
            );

        if (filtro) {

            filtro.click();

            const productosTienda =
                document.querySelector(
                    ".productos-tienda"
                );

            if (productosTienda) {

                productosTienda.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }

    });

});


/* =========================================
   CARRITO
   ========================================= */

/* CARGAR CARRITO GUARDADO */

let carrito =
    JSON.parse(
        localStorage.getItem(
            "carritoArteYSabor"
        )
    ) || [];


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

const botonesProducto =
    document.querySelectorAll(".btn-detalle");


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

        carritoElemento.classList.add("mostrar");

    }

    if (fondoCarrito) {

        fondoCarrito.classList.add("mostrar");

    }

}


/* =========================================
   CERRAR CARRITO
   ========================================= */

function cerrarCarritoFuncion() {

    if (carritoElemento) {

        carritoElemento.classList.remove("mostrar");

    }

    if (fondoCarrito) {

        fondoCarrito.classList.remove("mostrar");

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
   MENSAJE AL PASAR EL MOUSE
   ========================================= */

botonesProducto.forEach(function(boton) {

    const mensaje =
        document.createElement("span");

    mensaje.classList.add(
        "mensaje-carrito"
    );

    mensaje.textContent =
        "¿Quieres agregarlo al carrito?";

    boton.parentElement.appendChild(
        mensaje
    );

    boton.addEventListener(
        "mouseenter",
        function() {

            mensaje.classList.add(
                "mostrar"
            );

        }
    );

    boton.addEventListener(
        "mouseleave",
        function() {

            mensaje.classList.remove(
                "mostrar"
            );

        }
    );

});


/* =========================================
   PREPARAR BOTONES DE PRODUCTOS
   ========================================= */

botonesProducto.forEach(function(boton) {

    const nombre =
        boton.dataset.nombre;

    const productoExistente =
        carrito.find(
            function(producto) {

                return producto.nombre === nombre;

            }
        );


    /*
       SI EL PRODUCTO YA ESTABA EN EL
       CARRITO, MOSTRARLO COMO AGREGADO
    */

    if (productoExistente) {

        boton.childNodes[0].textContent =
            "✓ En el carrito";

        boton.classList.add(
            "agregado"
        );

    } else {

        boton.childNodes[0].textContent =
            "Comprar";

    }

});


/* =========================================
   AGREGAR PRODUCTO
   ========================================= */

botonesProducto.forEach(function(boton) {

    const nombre =
        boton.dataset.nombre;

    const precio =
        Number(
            boton.dataset.precio
        );


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


            /* SI YA ESTÁ EN EL CARRITO */

            if (productoExistente) {

                abrirCarrito();

                return;

            }


            /* AGREGAR UNA UNIDAD */

            carrito.push({

                nombre: nombre,

                precio: precio,

                cantidad: 1

            });


            /* GUARDAR */

            guardarCarrito();


            /* CAMBIAR BOTÓN */

            boton.childNodes[0].textContent =
                "✓ En el carrito";

            boton.classList.add(
                "agregado"
            );


            actualizarCarrito();

        }
    );

});


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


    /* =====================================
       CONTADOR
       ===================================== */

    if (contadorCarrito) {

        contadorCarrito.textContent =
            cantidadTotal;

    }


    /* =====================================
       TOTAL
       ===================================== */

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

                        restaurarBotonProducto(
                            carrito[indice].nombre
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


                    const producto =
                        carrito[indice];


                    restaurarBotonProducto(
                        producto.nombre
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
   RESTAURAR BOTÓN DEL PRODUCTO
   ========================================= */

function restaurarBotonProducto(
    nombreProducto
) {

    botonesProducto.forEach(
        function(boton) {

            if (
                boton.dataset.nombre ===
                nombreProducto
            ) {

                boton.childNodes[0].textContent =
                    "Comprar";

                boton.classList.remove(
                    "agregado"
                );

            }

        }
    );

}


/* =========================================
   FINALIZAR COMPRA
   ========================================= */

const btnComprar =
    document.getElementById(
        "btnComprar"
    );


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


            /* BORRAR CARRITO GUARDADO */

            guardarCarrito();


            /* RESTAURAR BOTONES */

            botonesProducto.forEach(
                function(boton) {

                    boton.childNodes[0].textContent =
                        "Comprar";

                    boton.classList.remove(
                        "agregado"
                    );

                }
            );


            actualizarCarrito();

            cerrarCarritoFuncion();

        }
    );

}


/* =========================================
   INICIAR CARRITO
   ========================================= */

actualizarCarrito();