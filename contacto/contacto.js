/* =========================================
   FORMULARIO DE CONTACTO
   ========================================= */

const formularioContacto =
    document.getElementById(
        "formularioContacto"
    );


const mensajeFormulario =
    document.getElementById(
        "mensajeFormulario"
    );


const nombre =
    document.getElementById(
        "nombre"
    );


const correo =
    document.getElementById(
        "correo"
    );


const asunto =
    document.getElementById(
        "asunto"
    );


const mensaje =
    document.getElementById(
        "mensaje"
    );


const contadorMensaje =
    document.querySelector(
        ".contador-mensaje"
    );


/* =========================================
   LÍMITES
   ========================================= */

if (nombre) {

    nombre.addEventListener(
        "input",
        function() {

            if (
                nombre.value.length > 60
            ) {

                nombre.value =
                    nombre.value.slice(
                        0,
                        60
                    );

            }

        }
    );

}


if (correo) {

    correo.addEventListener(
        "input",
        function() {

            if (
                correo.value.length > 100
            ) {

                correo.value =
                    correo.value.slice(
                        0,
                        100
                    );

            }

        }
    );

}


if (asunto) {

    asunto.addEventListener(
        "input",
        function() {

            if (
                asunto.value.length > 100
            ) {

                asunto.value =
                    asunto.value.slice(
                        0,
                        100
                    );

            }

        }
    );

}


/* =========================================
   CONTADOR DEL MENSAJE
   ========================================= */

if (mensaje) {

    mensaje.addEventListener(
        "input",
        function() {

            if (
                mensaje.value.length > 500
            ) {

                mensaje.value =
                    mensaje.value.slice(
                        0,
                        500
                    );

            }


            if (contadorMensaje) {

                contadorMensaje.textContent =
                    mensaje.value.length +
                    " / 500 caracteres";

            }

        }
    );

}


/* =========================================
   ENVIAR FORMULARIO
   ========================================= */

if (formularioContacto) {

    formularioContacto.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const nombreValor =
                nombre.value.trim();


            const correoValor =
                correo.value.trim();


            const asuntoValor =
                asunto.value.trim();


            const mensajeValor =
                mensaje.value.trim();


            /* VALIDAR */

            if (!nombreValor) {

                mensajeFormulario.textContent =
                    "Por favor escribe tu nombre.";

                nombre.focus();

                return;

            }


            if (
                nombreValor.length > 60
            ) {

                mensajeFormulario.textContent =
                    "El nombre no puede superar los 60 caracteres.";

                nombre.focus();

                return;

            }


            if (!correoValor) {

                mensajeFormulario.textContent =
                    "Por favor escribe tu correo.";

                correo.focus();

                return;

            }


            if (
                correoValor.length > 100
            ) {

                mensajeFormulario.textContent =
                    "El correo no puede superar los 100 caracteres.";

                correo.focus();

                return;

            }


            if (!asuntoValor) {

                mensajeFormulario.textContent =
                    "Por favor escribe un asunto.";

                asunto.focus();

                return;

            }


            if (!mensajeValor) {

                mensajeFormulario.textContent =
                    "Por favor escribe un mensaje.";

                mensaje.focus();

                return;

            }


            /* CONFIRMACIÓN */

            mensajeFormulario.textContent =
                "¡Gracias, " +
                nombreValor +
                "! Tu mensaje ha sido enviado correctamente. ❤️";


            formularioContacto.reset();


            if (contadorMensaje) {

                contadorMensaje.textContent =
                    "0 / 500 caracteres";

            }

        }
    );

}