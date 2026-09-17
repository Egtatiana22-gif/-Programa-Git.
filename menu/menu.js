/* =========================================================
   FILTROS DEL MENÚ
========================================================= */

const filtros =
    document.querySelectorAll(".filtro");

const secciones =
    document.querySelectorAll(".categoria-productos");


filtros.forEach(function(filtro) {

    filtro.addEventListener("click", function() {

        const categoria =
            filtro.dataset.filtro;


        /* Quitar activo */

        filtros.forEach(function(item) {

            item.classList.remove("activo");

        });


        /* Activar filtro */

        filtro.classList.add("activo");


        /* Mostrar categorías */

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



/* =========================================================
   CATEGORÍAS SUPERIORES
========================================================= */

const categorias =
    document.querySelectorAll(".categoria");


categorias.forEach(function(categoria) {

    categoria.addEventListener("click", function() {

        const nombreCategoria =
            categoria.dataset.categoria;


        const filtro =
            document.querySelector(
                '.filtro[data-filtro="' +
                nombreCategoria +
                '"]'
            );


        if (filtro) {

            filtro.click();


            const carta =
                document.querySelector(
                    ".carta-menu"
                );


            if (carta) {

                carta.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }

    });

});



/* =========================================================
   BOTÓN DE EXPERIENCIAS
========================================================= */

const btnExperiencias =
    document.querySelector(
        ".btn-experiencias"
    );


if (btnExperiencias) {

    btnExperiencias.addEventListener(
        "click",
        function() {

            window.location.href =
                "../reservaciones.html";

        }
    );

}



/* =========================================================
   BOTÓN ESPECIALIDAD
========================================================= */

const btnEspecialidad =
    document.querySelector(
        ".btn-especialidad"
    );


if (btnEspecialidad) {

    btnEspecialidad.addEventListener(
        "click",
        function() {

            const favoritos =
                document.querySelector(
                    ".favoritos-menu"
                );


            if (favoritos) {

                favoritos.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }
    );

}



/* =========================================================
   CARRITO
========================================================= */

/*
 * USAMOS EL MISMO CARRITO
 * QUE USA LA TIENDA
 */

let carrito =
    JSON.parse(
        localStorage.getItem(
            "carritoArteYSabor"
        )
    ) || [];



/* =========================================================
   GUARDAR CARRITO
========================================================= */

function guardarCarrito() {

    localStorage.setItem(
        "carritoArteYSabor",
        JSON.stringify(carrito)
    );

}



/* =========================================================
   ELEMENTOS DEL CARRITO
========================================================= */

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



/* =========================================================
   ABRIR CARRITO
========================================================= */

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



/* =========================================================
   CERRAR CARRITO
========================================================= */

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



/* =========================================================
   BOTÓN DEL CARRITO
========================================================= */

if (btnCarrito) {

    btnCarrito.addEventListener(
        "click",
        function(evento) {

            evento.preventDefault();

            abrirCarrito();

        }
    );

}



/* =========================================================
   CERRAR CARRITO
========================================================= */

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



/* =========================================================
   BOTONES DE PRODUCTOS
========================================================= */

const botonesProducto =
    document.querySelectorAll(
        ".btn-detalle"
    );



/* =========================================================
   PREPARAR PRODUCTOS DEL MENÚ
========================================================= */

botonesProducto.forEach(
    function(boton) {

        const producto =
            boton.closest(
                ".producto-menu"
            );


        if (!producto) {

            return;

        }


        /*
         * BUSCAR NOMBRE
         *
         * Algunos productos usan h3
         * y otros usan h4.
         */

        const nombreElemento =
            producto.querySelector(
                "h3, h4"
            );


        /*
         * BUSCAR PRECIO
         */

        const precioElemento =
            producto.querySelector(
                "strong"
            );


        if (
            !nombreElemento ||
            !precioElemento
        ) {

            return;

        }


        const nombre =
            nombreElemento.textContent.trim();


        /*
         * Quitar $, espacios y puntos
         *
         * Ejemplo:
         * "$ 6.500"
         *
         * se convierte en:
         * 6500
         */

        const precio =
            Number(
                precioElemento.textContent
                    .replace("$", "")
                    .replace(/\s/g, "")
                    .replace(/\./g, "")
                    .replace(",", ".")
            );


        /*
         * GUARDAR DATOS EN EL BOTÓN
         */

        boton.dataset.nombre =
            nombre;

        boton.dataset.precio =
            precio;


        /*
         * COMPROBAR SI YA ESTÁ
         * EN EL CARRITO
         */

        const productoExistente =
            carrito.find(
                function(item) {

                    return item.nombre ===
                        nombre;

                }
            );


        if (productoExistente) {

            boton.textContent =
                "✓ En el carrito";

            boton.style.backgroundColor =
                "#8B6F47";

            boton.dataset.carrito =
                "true";

        } else {

            boton.textContent =
                "Comprar";

            boton.style.backgroundColor =
                "#4A5A3A";

            boton.dataset.carrito =
                "false";

        }

    }
);



/* =========================================================
   MENSAJE AL PASAR EL MOUSE
========================================================= */

document.addEventListener(
    "mouseover",
    function(evento) {

        const boton =
            evento.target.closest(
                ".btn-detalle"
            );


        if (!boton) {

            return;

        }


        if (
            boton.dataset.carrito ===
            "true"
        ) {

            return;

        }


        if (
            boton.querySelector(
                ".mensaje-carrito"
            )
        ) {

            return;

        }


        const mensaje =
            document.createElement(
                "span"
            );


        mensaje.className =
            "mensaje-carrito";


        mensaje.textContent =
            "¿Quieres agregarlo al carrito?";


        mensaje.style.position =
            "absolute";

        mensaje.style.bottom =
            "calc(100% + 8px)";

        mensaje.style.left =
            "50%";

        mensaje.style.transform =
            "translateX(-50%)";

        mensaje.style.backgroundColor =
            "#4A5A3A";

        mensaje.style.color =
            "#FFFFFF";

        mensaje.style.padding =
            "8px 12px";

        mensaje.style.borderRadius =
            "8px";

        mensaje.style.fontSize =
            "13px";

        mensaje.style.whiteSpace =
            "nowrap";

        mensaje.style.zIndex =
            "1000";

        mensaje.style.pointerEvents =
            "none";


        if (
            getComputedStyle(boton).position ===
            "static"
        ) {

            boton.style.position =
                "relative";

        }


        boton.appendChild(
            mensaje
        );

    }
);



/* =========================================================
   QUITAR MENSAJE
========================================================= */

document.addEventListener(
    "mouseout",
    function(evento) {

        const boton =
            evento.target.closest(
                ".btn-detalle"
            );


        if (!boton) {

            return;

        }


        if (
            evento.relatedTarget &&
            boton.contains(
                evento.relatedTarget
            )
        ) {

            return;

        }


        const mensaje =
            boton.querySelector(
                ".mensaje-carrito"
            );


        if (mensaje) {

            mensaje.remove();

        }

    }
);



/* =========================================================
   ACTUALIZAR CARRITO
========================================================= */

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

    carrito.forEach(
        function(
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

        }
    );


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


    /* BOTONES SUMAR */

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


    /* BOTONES RESTAR */

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
                        carrito[indice].cantidad <=
                        0
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


    /* BOTONES ELIMINAR */

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



/* =========================================================
   RESTAURAR BOTÓN
========================================================= */

function restaurarBotonProducto(
    nombreProducto
) {

    botonesProducto.forEach(
        function(boton) {

            if (
                boton.dataset.nombre ===
                nombreProducto
            ) {

                boton.textContent =
                    "Comprar";

                boton.style.backgroundColor =
                    "#4A5A3A";

                boton.dataset.carrito =
                    "false";

            }

        }
    );

}



/* =========================================================
   AGREGAR PRODUCTO
========================================================= */

document.addEventListener(
    "click",
    function(evento) {

        const boton =
            evento.target.closest(
                ".btn-detalle"
            );


        if (!boton) {

            return;

        }


        const nombre =
            boton.dataset.nombre;


        const precio =
            Number(
                boton.dataset.precio
            );


        /*
         * SI YA EXISTE
         */

        const productoExistente =
            carrito.find(
                function(producto) {

                    return producto.nombre ===
                        nombre;

                }
            );


        if (productoExistente) {

            abrirCarrito();

            return;

        }


        /*
         * AGREGAR PRODUCTO
         */

        carrito.push({

            nombre: nombre,

            precio: precio,

            cantidad: 1

        });


        guardarCarrito();


        /*
         * CAMBIAR BOTÓN
         */

        boton.textContent =
            "✓ En el carrito";


        boton.style.backgroundColor =
            "#8B6F47";


        boton.dataset.carrito =
            "true";


        /*
         * QUITAR MENSAJE
         */

        const mensaje =
            boton.querySelector(
                ".mensaje-carrito"
            );


        if (mensaje) {

            mensaje.remove();

        }


        actualizarCarrito();

    }
);



/* =========================================================
   FINALIZAR COMPRA
========================================================= */

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


            carrito = [];


            guardarCarrito();


            botonesProducto.forEach(
                function(boton) {

                    boton.textContent =
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



/* =========================================================
   INICIAR
========================================================= */

actualizarCarrito();