// ==================== BOTÓN CONOCE MÁS ====================

const boton = document.getElementById("btnBienvenida");

boton.addEventListener("click", function() {
    alert("¡Bienvenido a la Cafetería Arte y Sabor! ☕❤️");
    window.location.href = "../nosotros/nosotros.html";
});

// ==================== BOTÓN VER MÁS - FAVORITOS ====================

const btnVerMas = document.getElementById("btnVerMas");
const productosExtra = document.getElementById("productosExtra");

btnVerMas.addEventListener("click", function() {
    if (!productosExtra.classList.contains("mostrar")) {
        productosExtra.classList.add("mostrar");
        btnVerMas.textContent = "Ir al menú";
    } else {
        window.location.href = "../menu/menu.html";
    }
});

// ==================== BOTÓN VER MÁS - TIENDA ====================

const btnVerMasTienda = document.getElementById("btnVerMasTienda");
const productosTiendaExtra = document.getElementById("productosTiendaExtra");

btnVerMasTienda.addEventListener("click", function() {
    if (!productosTiendaExtra.classList.contains("mostrar")) {
        productosTiendaExtra.classList.add("mostrar");
        btnVerMasTienda.textContent = "Ir a la tienda";
    } else {
        window.location.href = "../tienda/tienda.html";
    }
});

/* =========================================
   BOTÓN RESERVACIONES
========================================= */

const fechaEvento = document.getElementById("fechaEvento");
const btnReservaciones = document.getElementById("btnReservaciones");

if (fechaEvento && btnReservaciones) {

    /* Obtener la fecha de hoy */

    const hoy = new Date();

    const año = hoy.getFullYear();

    const mes = String(
        hoy.getMonth() + 1
    ).padStart(2, "0");

    const dia = String(
        hoy.getDate()
    ).padStart(2, "0");

    const fechaHoy =
        `${año}-${mes}-${dia}`;

    /* No permitir fechas anteriores a hoy */

    fechaEvento.min = fechaHoy;

    /* Botón de reservaciones */

    btnReservaciones.addEventListener("click", function() {

        /* Comprobar que haya una fecha */

        if (fechaEvento.value === "") {

            alert(
                "Por favor, selecciona una fecha antes de continuar."
            );

            return;
        }

        /* Comprobar que no sea una fecha anterior */

        if (fechaEvento.value < fechaHoy) {

            alert(
                "No puedes seleccionar una fecha anterior a hoy."
            );

            fechaEvento.value = "";

            return;
        }

        /* Ir a reservaciones */

        window.location.href =
            "../reservaciones/reservaciones.html?fecha=" +
            fechaEvento.value;

    });

}

/* BOTONES AGREGAR AL CARRITO */

const botonesCarrito =
    document.querySelectorAll(".btn-carrito");


botonesCarrito.forEach(function(boton) {

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


    const precioTexto =
        boton.textContent;


    const precio =
        Number(
            precioTexto
                .replace("$", "")
                .replace(/\s/g, "")
                .replace(/\./g, "")
                .replace(",", ".")
        );


    /* COMPROBAR SI YA ESTÁ EN EL CARRITO */

    const productoExistente =
        carrito.find(function(item) {

            return item.nombre === nombre;

        });


    if (productoExistente) {

        boton.textContent =
            "✓ En el carrito";

        boton.style.backgroundColor =
            "#8B6F47";

        boton.dataset.carrito =
            "true";

    }


    /* CLICK */

    boton.addEventListener(
        "click",
        function() {

            const productoExistente =
                carrito.find(function(item) {

                    return item.nombre === nombre;

                });


            /* SI YA ESTÁ, ABRIR CARRITO */

            if (productoExistente) {

                abrirCarrito();

                return;

            }


            /* AGREGAR */

            carrito.push({

                nombre: nombre,

                precio: precio,

                cantidad: 1

            });


            /* GUARDAR */

            localStorage.setItem(
                "carritoArteYSabor",
                JSON.stringify(carrito)
            );


            /* CAMBIAR BOTÓN */

            boton.textContent =
                "✓ En el carrito";

            boton.style.backgroundColor =
                "#8B6F47";

            boton.dataset.carrito =
                "true";


            /* ACTUALIZAR CARRITO */

            actualizarCarrito();

        }
    );

});