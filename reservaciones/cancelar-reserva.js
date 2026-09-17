
/* =========================================================
   ELEMENTOS
========================================================= */

const btnConsultar =
    document.getElementById("btn-consultar");

const btnMostrarCancelar =
    document.getElementById("btn-mostrar-cancelar");

const consultaReserva =
    document.getElementById("consulta-reserva");

const cancelacionReserva =
    document.getElementById("cancelacion-reserva");

const formularioConsulta =
    document.getElementById("formulario-consulta");

const formularioCancelacion =
    document.getElementById("formulario-cancelacion");

const modalConsulta =
    document.getElementById("modal-consulta");

const modalCancelacion =
    document.getElementById("modal-cancelacion");

const resumenCancelacion =
    document.getElementById("resumen-cancelacion");


/* =========================================================
   LÍMITES
========================================================= */

const LIMITE_NOMBRE = 60;
const LIMITE_CORREO = 100;
const LIMITE_MOTIVO = 1000;


/* =========================================================
   FUNCIÓN PARA EVITAR DESBORDAMIENTO
========================================================= */

function prepararTextoLargo(elemento) {

    if (!elemento) {
        return;
    }

    elemento.style.maxWidth =
        "100%";

    elemento.style.boxSizing =
        "border-box";

    elemento.style.overflowWrap =
        "anywhere";

    elemento.style.wordBreak =
        "break-word";

    elemento.style.whiteSpace =
        "normal";

    elemento.style.overflowX =
        "hidden";
}


/* =========================================================
   PREPARAR ELEMENTOS DE LA PÁGINA
========================================================= */

prepararTextoLargo(
    resumenCancelacion
);

prepararTextoLargo(
    modalConsulta
);

prepararTextoLargo(
    modalCancelacion
);


/* =========================================================
   MOSTRAR CONSULTA
========================================================= */

btnConsultar.addEventListener(
    "click",
    function() {

        consultaReserva.classList.remove(
            "oculto"
        );

        cancelacionReserva.classList.add(
            "oculto"
        );

        consultaReserva.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }
);


/* =========================================================
   MOSTRAR CANCELACIÓN
========================================================= */

btnMostrarCancelar.addEventListener(
    "click",
    function() {

        cancelacionReserva.classList.remove(
            "oculto"
        );

        consultaReserva.classList.add(
            "oculto"
        );

        cancelacionReserva.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }
);


/* =========================================================
   FECHA MÍNIMA
========================================================= */

const hoy =
    new Date();

const año =
    hoy.getFullYear();

const mes =
    String(
        hoy.getMonth() + 1
    ).padStart(
        2,
        "0"
    );

const dia =
    String(
        hoy.getDate()
    ).padStart(
        2,
        "0"
    );

const fechaHoy =
    `${año}-${mes}-${dia}`;


document.getElementById(
    "fecha-consulta"
).min =
    fechaHoy;


document.getElementById(
    "fecha-cancelacion"
).min =
    fechaHoy;


/* =========================================================
   VALIDAR NOMBRE
========================================================= */

function nombreValido(nombre) {

    return /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/.test(
        nombre.trim()
    );

}


/* =========================================================
   NOMBRE DE CONSULTA
========================================================= */

const nombreConsulta =
    document.getElementById(
        "nombre-consulta"
    );


if (nombreConsulta) {

    nombreConsulta.maxLength =
        LIMITE_NOMBRE;

    nombreConsulta.addEventListener(
        "input",
        function() {

            nombreConsulta.value =
                nombreConsulta.value
                    .replace(
                        /[0-9]/g,
                        ""
                    )
                    .substring(
                        0,
                        LIMITE_NOMBRE
                    );

        }
    );

}


/* =========================================================
   NOMBRE DE CANCELACIÓN
========================================================= */

const nombreCancelacion =
    document.getElementById(
        "nombre-cancelacion"
    );


if (nombreCancelacion) {

    nombreCancelacion.maxLength =
        LIMITE_NOMBRE;

    nombreCancelacion.addEventListener(
        "input",
        function() {

            nombreCancelacion.value =
                nombreCancelacion.value
                    .replace(
                        /[0-9]/g,
                        ""
                    )
                    .substring(
                        0,
                        LIMITE_NOMBRE
                    );

        }
    );

}


/* =========================================================
   CORREO DE CANCELACIÓN
========================================================= */

const correoCancelacion =
    document.getElementById(
        "correo-cancelacion"
    );


if (correoCancelacion) {

    correoCancelacion.maxLength =
        LIMITE_CORREO;

    correoCancelacion.addEventListener(
        "input",
        function() {

            if (
                correoCancelacion.value.length >
                LIMITE_CORREO
            ) {

                correoCancelacion.value =
                    correoCancelacion.value.substring(
                        0,
                        LIMITE_CORREO
                    );

            }

        }
    );

}

const correoConsulta =
    document.getElementById("correo-consulta");

if (correoConsulta) {

    correoConsulta.maxLength =
        LIMITE_CORREO;

    correoConsulta.addEventListener(
        "input",
        function() {

            if (
                correoConsulta.value.length >
                LIMITE_CORREO
            ) {

                correoConsulta.value =
                    correoConsulta.value.substring(
                        0,
                        LIMITE_CORREO
                    );
            }
        }
    );
}
/* =========================================================
   MOTIVO
========================================================= */

const motivoCampo =
    document.getElementById(
        "motivo"
    );


if (motivoCampo) {

    motivoCampo.maxLength =
        LIMITE_MOTIVO;

    motivoCampo.addEventListener(
        "input",
        function() {

            if (
                motivoCampo.value.length >
                LIMITE_MOTIVO
            ) {

                motivoCampo.value =
                    motivoCampo.value.substring(
                        0,
                        LIMITE_MOTIVO
                    );

            }

        }
    );

}


/* =========================================================
   CONSULTAR RESERVA
========================================================= */

formularioConsulta.addEventListener(
    "submit",
    function(evento) {

        evento.preventDefault();

        const nombre =
            document.getElementById(
                "nombre-consulta"
            ).value
                .trim()
                .substring(
                    0,
                    LIMITE_NOMBRE
                );


        if (!nombreValido(nombre)) {

            alert(
                "El nombre no puede contener números."
            );

            document.getElementById(
                "nombre-consulta"
            ).focus();

            return;

        }


        modalConsulta.classList.add(
            "mostrar"
        );

    }
);


/* =========================================================
   CANCELAR RESERVA
========================================================= */

formularioCancelacion.addEventListener(
    "submit",
    function(evento) {

        evento.preventDefault();


        const nombre =
            document.getElementById(
                "nombre-cancelacion"
            ).value
                .trim()
                .substring(
                    0,
                    LIMITE_NOMBRE
                );


        const correo =
            document.getElementById(
                "correo-cancelacion"
            ).value
                .trim()
                .substring(
                    0,
                    LIMITE_CORREO
                );


        const fecha =
            document.getElementById(
                "fecha-cancelacion"
            ).value;


        const hora =
            document.getElementById(
                "hora-cancelacion"
            ).value;


        const motivo =
            document.getElementById(
                "motivo"
            ).value
                .trim()
                .substring(
                    0,
                    LIMITE_MOTIVO
                );


        /* VALIDAR NOMBRE */

        if (!nombreValido(nombre)) {

            alert(
                "El nombre no puede contener números."
            );

            document.getElementById(
                "nombre-cancelacion"
            ).focus();

            return;

        }


        /* VALIDAR CAMPOS */

        if (
            !fecha ||
            !hora ||
            !motivo
        ) {

            alert(
                "Por favor completa todos los campos obligatorios."
            );

            return;

        }


        /* VALIDAR FECHA */

        const fechaObjeto =
            new Date(
                fecha + "T00:00:00"
            );


        if (
            fechaObjeto.getDay() === 0
        ) {

            alert(
                "Los domingos no tenemos servicio."
            );

            return;

        }


        /* FECHA BONITA */

        const fechaBonita =
            fechaObjeto.toLocaleDateString(
                "es-CO",
                {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            );


        /* =================================================
           CREAR RESUMEN
        ================================================= */

        resumenCancelacion.innerHTML =
            "";


        function agregarDato(
            etiqueta,
            valor
        ) {

            const linea =
                document.createElement(
                    "div"
                );


            const etiquetaElemento =
                document.createElement(
                    "strong"
                );

            etiquetaElemento.textContent =
                etiqueta;


            const valorElemento =
                document.createElement(
                    "span"
                );

            valorElemento.textContent =
                valor;


            /* EVITAR DESBORDAMIENTO */

            linea.style.maxWidth =
                "100%";

            linea.style.boxSizing =
                "border-box";

            linea.style.overflowWrap =
                "anywhere";

            linea.style.wordBreak =
                "break-word";

            linea.style.whiteSpace =
                "normal";


            valorElemento.style.maxWidth =
                "100%";

            valorElemento.style.overflowWrap =
                "anywhere";

            valorElemento.style.wordBreak =
                "break-word";

            valorElemento.style.whiteSpace =
                "pre-wrap";


            linea.appendChild(
                etiquetaElemento
            );

            linea.appendChild(
                valorElemento
            );


            resumenCancelacion.appendChild(
                linea
            );

        }


        agregarDato(
            "Nombre:",
            nombre
        );


        agregarDato(
            "📧 Correo:",
            correo
        );


        agregarDato(
            "📅 Fecha:",
            fechaBonita
        );


        agregarDato(
            "🕐 Horario:",
            hora
        );


        agregarDato(
            "💬 Motivo:",
            motivo
        );


        /* MOSTRAR MODAL */

        modalCancelacion.classList.add(
            "mostrar"
        );

    }
);


/* =========================================================
   CERRAR CONSULTA
========================================================= */

document.getElementById(
    "cerrar-consulta"
).addEventListener(
    "click",
    function() {

        modalConsulta.classList.remove(
            "mostrar"
        );

    }
);


/* =========================================================
   ACEPTAR CONSULTA
========================================================= */

document.getElementById(
    "aceptar-consulta"
).addEventListener(
    "click",
    function() {

        modalConsulta.classList.remove(
            "mostrar"
        );

    }
);


/* =========================================================
   CERRAR CANCELACIÓN
========================================================= */

document.getElementById(
    "cerrar-cancelacion"
).addEventListener(
    "click",
    function() {

        modalCancelacion.classList.remove(
            "mostrar"
        );

    }
);


/* =========================================================
   VOLVER A RESERVAS
========================================================= */

document.getElementById(
    "volver-reservas"
).addEventListener(
    "click",
    function() {

        window.location.href =
            "reservaciones.html";

    }
);


/* =========================================================
   CERRAR MODALES AFUERA
========================================================= */

modalConsulta.addEventListener(
    "click",
    function(evento) {

        if (
            evento.target ===
            modalConsulta
        ) {

            modalConsulta.classList.remove(
                "mostrar"
            );

        }

    }
);


modalCancelacion.addEventListener(
    "click",
    function(evento) {

        if (
            evento.target ===
            modalCancelacion
        ) {

            modalCancelacion.classList.remove(
                "mostrar"
            );

        }

    }
);
