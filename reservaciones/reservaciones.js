/* CALENDARIO */

const mesActualElemento = document.getElementById("mes-actual");
const diasCalendario = document.getElementById("dias-calendario");
const botonMesAnterior = document.getElementById("mes-anterior");
const botonMesSiguiente = document.getElementById("mes-siguiente");
const fechaInput = document.getElementById("fecha");
const horariosContenedor = document.getElementById("horarios");
const horaInput = document.getElementById("hora");

let fechaActual = new Date();
let fechaSeleccionada = null;


/* CARGAR FECHA RECIBIDA DESDE LA URL */

const parametros = new URLSearchParams(
    window.location.search
);

const fechaRecibida = parametros.get("fecha");


/* FECHAS BLOQUEADAS */

const fechasBloqueadas = [
    "2026-09-06",
    "2026-09-13",
    "2026-09-20",
    "2026-09-27"
];


/* FECHAS LIMITADAS */

const fechasLimitadas = [
    "2026-09-05",
    "2026-09-12",
    "2026-09-19",
    "2026-09-26"
];


/* HORARIOS */

const horariosDisponibles = [
    "9:00 a. m.",
    "11:00 a. m.",
    "1:00 p. m.",
    "3:00 p. m.",
    "5:00 p. m."
];


/* FORMATO DE FECHA */

function obtenerFechaFormato(fecha) {

    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");

    return `${año}-${mes}-${dia}`;
}


/* FECHA BLOQUEADA */

function esFechaBloqueada(fecha) {

    return fechasBloqueadas.includes(
        obtenerFechaFormato(fecha)
    );
}


/* FECHA LIMITADA */

function esFechaLimitada(fecha) {

    return fechasLimitadas.includes(
        obtenerFechaFormato(fecha)
    );
}


/* DOMINGO */

function esDomingo(fecha) {

    return fecha.getDay() === 0;
}


/* SÁBADO */

function esSabado(fecha) {

    return fecha.getDay() === 6;
}


/* FECHA DE HOY */

function esHoy(fecha) {

    const hoy = new Date();

    return (
        fecha.getDate() === hoy.getDate() &&
        fecha.getMonth() === hoy.getMonth() &&
        fecha.getFullYear() === hoy.getFullYear()
    );
}


/* FECHA PASADA */

function esFechaPasada(fecha) {

    const hoy = new Date();

    hoy.setHours(0, 0, 0, 0);

    const fechaComparar = new Date(fecha);

    fechaComparar.setHours(0, 0, 0, 0);

    return fechaComparar < hoy;
}


/* CARGAR FECHA RECIBIDA */

function cargarFechaRecibida() {

    if (!fechaRecibida) {
        return;
    }

    const partes = fechaRecibida.split("-");

    if (partes.length !== 3) {
        return;
    }

    const año = Number(partes[0]);
    const mes = Number(partes[1]) - 1;
    const dia = Number(partes[2]);

    const fecha = new Date(
        año,
        mes,
        dia
    );


    /* VERIFICAR QUE LA FECHA SEA VÁLIDA */

    if (
        isNaN(fecha.getTime()) ||
        obtenerFechaFormato(fecha) !== fechaRecibida
    ) {

        return;
    }


    /* NO CARGAR FECHAS PASADAS */

    if (esFechaPasada(fecha)) {
        return;
    }


    /* NO CARGAR DOMINGOS */

    if (esDomingo(fecha)) {
        return;
    }


    /* NO CARGAR FECHAS BLOQUEADAS */

    if (esFechaBloqueada(fecha)) {
        return;
    }


    /* GUARDAR FECHA */

    fechaSeleccionada = fecha;


    /* MOSTRAR EL MES CORRECTO */

    fechaActual = new Date(
        año,
        mes,
        1
    );


    /* MOSTRAR FECHA EN EL INPUT */

    fechaInput.value =
        fecha.toLocaleDateString(
            "es-CO",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );
}


/* GENERAR CALENDARIO */

function generarCalendario() {

    diasCalendario.innerHTML = "";

    const año = fechaActual.getFullYear();
    const mes = fechaActual.getMonth();

    const primerDia = new Date(
        año,
        mes,
        1
    );

    const ultimoDia = new Date(
        año,
        mes + 1,
        0
    );

    const primerDiaSemana =
        primerDia.getDay();

    const nombreMes =
        fechaActual.toLocaleDateString(
            "es-CO",
            {
                month: "long",
                year: "numeric"
            }
        );

    mesActualElemento.textContent =
        nombreMes;


    /* ESPACIOS DEL CALENDARIO */

    for (
        let i = 0;
        i < primerDiaSemana;
        i++
    ) {

        const espacio =
            document.createElement("div");

        espacio.classList.add(
            "dia",
            "vacio"
        );

        diasCalendario.appendChild(
            espacio
        );
    }


    /* CREAR DÍAS */

    for (
        let dia = 1;
        dia <= ultimoDia.getDate();
        dia++
    ) {

        const fecha =
            new Date(
                año,
                mes,
                dia
            );

        const boton =
            document.createElement("button");

        boton.type = "button";

        boton.classList.add(
            "dia"
        );

        boton.textContent = dia;

        const fechaFormato =
            obtenerFechaFormato(
                fecha
            );


        /* FECHAS PASADAS */

        if (
            esFechaPasada(fecha)
        ) {

            boton.classList.add(
                "bloqueado"
            );

            boton.disabled = true;

        } else if (
            esFechaBloqueada(fecha)
        ) {

            boton.classList.add(
                "bloqueado"
            );

            boton.disabled = true;

        } else if (
            esDomingo(fecha)
        ) {

            boton.classList.add(
                "bloqueado"
            );

            boton.disabled = true;

        } else if (
            esFechaLimitada(fecha) ||
            esSabado(fecha)
        ) {

            boton.classList.add(
                "limitado"
            );

        } else {

            boton.classList.add(
                "disponible"
            );
        }


        /* HOY */

        if (
            esHoy(fecha)
        ) {

            boton.classList.add(
                "hoy"
            );
        }


        /* FECHA SELECCIONADA */

        if (
            fechaSeleccionada &&
            obtenerFechaFormato(
                fechaSeleccionada
            ) === fechaFormato
        ) {

            boton.classList.add(
                "seleccionado"
            );
        }


        /* SELECCIONAR FECHA */

        boton.addEventListener(
            "click",
            function() {

                seleccionarFecha(
                    fecha
                );

            }
        );

        diasCalendario.appendChild(
            boton
        );
    }
}


/* SELECCIONAR FECHA */

function seleccionarFecha(fecha) {

    if (
        esFechaPasada(fecha)
    ) {

        alert(
            "No puedes seleccionar una fecha anterior a hoy."
        );

        return;
    }


    /* DOMINGOS */

    if (
        esDomingo(fecha)
    ) {

        return;
    }


    /* FECHAS BLOQUEADAS */

    if (
        esFechaBloqueada(fecha)
    ) {

        return;
    }


    /* GUARDAR FECHA */

    fechaSeleccionada =
        fecha;


    /* FORMATO BONITO */

    const fechaBonita =
        fecha.toLocaleDateString(
            "es-CO",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );


    /* MOSTRAR FECHA */

    fechaInput.value =
        fechaBonita;


    /* ACTUALIZAR CALENDARIO */

    generarCalendario();


    /* MOSTRAR HORARIOS */

    mostrarHorarios();
}


/* MOSTRAR HORARIOS */

function mostrarHorarios() {

    horariosContenedor.innerHTML = "";

    horaInput.value = "";


    if (
        !fechaSeleccionada
    ) {

        horariosContenedor.innerHTML =
            '<p class="mensaje-horarios">Selecciona primero una fecha.</p>';

        return;
    }


    let horarios = [
        ...horariosDisponibles
    ];


    /* HORARIOS LIMITADOS */

    if (
        esFechaLimitada(
            fechaSeleccionada
        ) ||
        esSabado(
            fechaSeleccionada
        )
    ) {

        horarios = [
            "9:00 a. m.",
            "1:00 p. m.",
            "5:00 p. m."
        ];
    }


    /* CREAR BOTONES DE HORARIO */

    horarios.forEach(
        function(hora) {

            const boton =
                document.createElement(
                    "button"
                );

            boton.type =
                "button";

            boton.classList.add(
                "btn-hora"
            );

            boton.textContent =
                hora;


            boton.addEventListener(
                "click",
                function() {

                    document
                        .querySelectorAll(
                            ".btn-hora"
                        )
                        .forEach(
                            function(item) {

                                item.classList.remove(
                                    "seleccionado"
                                );

                            }
                        );


                    boton.classList.add(
                        "seleccionado"
                    );

                    horaInput.value =
                        hora;
                }
            );


            horariosContenedor.appendChild(
                boton
            );
        }
    );
}


/* MES ANTERIOR */

botonMesAnterior.addEventListener(
    "click",
    function() {

        const hoy =
            new Date();

        const mesActual =
            new Date(
                fechaActual.getFullYear(),
                fechaActual.getMonth(),
                1
            );

        const primerMesPermitido =
            new Date(
                hoy.getFullYear(),
                hoy.getMonth(),
                1
            );


        if (
            mesActual <=
            primerMesPermitido
        ) {

            return;
        }


        fechaActual.setMonth(
            fechaActual.getMonth() - 1
        );


        generarCalendario();
    }
);


/* MES SIGUIENTE */

botonMesSiguiente.addEventListener(
    "click",
    function() {

        fechaActual.setMonth(
            fechaActual.getMonth() + 1
        );

        generarCalendario();
    }
);


/* EXPERIENCIA OTRA */

const experiencia =
    document.getElementById(
        "experiencia"
    );

const otraExperienciaContenedor =
    document.getElementById(
        "otra-experiencia-contenedor"
    );

const otraExperiencia =
    document.getElementById(
        "otra-experiencia"
    );


experiencia.addEventListener(
    "change",
    function() {

        if (
            experiencia.value === "Otra"
        ) {

            otraExperienciaContenedor.style.display =
                "flex";

            otraExperiencia.required =
                true;

        } else {

            otraExperienciaContenedor.style.display =
                "none";

            otraExperiencia.required =
                false;

            otraExperiencia.value =
                "";
        }
    }
);


/* NOMBRE */

const nombre =
    document.getElementById(
        "nombre"
    );


if (nombre) {

    nombre.addEventListener(
        "input",
        function() {

            nombre.value =
                nombre.value.replace(
                    /[0-9]/g,
                    ""
                );
        }
    );
}


/* TELÉFONO */

const telefono =
    document.getElementById(
        "telefono"
    );


telefono.addEventListener(
    "input",
    function() {

        telefono.value =
            telefono.value.replace(
                /\D/g,
                ""
            );


        if (
            telefono.value.length > 10
        ) {

            telefono.value =
                telefono.value.substring(
                    0,
                    10
                );
        }
    }
);


/* VALIDAR TELÉFONO */

function telefonoValido(numero) {

    return /^3\d{9}$/.test(
        numero
    );
}


/* FORMULARIO */

const formulario =
    document.getElementById(
        "formulario-reserva"
    );

const confirmacion =
    document.getElementById(
        "confirmacion"
    );

const resumenReserva =
    document.getElementById(
        "resumen-reserva"
    );

const tituloConfirmacion =
    document.getElementById(
        "titulo-confirmacion"
    );

const mensajeConfirmacion =
    document.getElementById(
        "mensaje-confirmacion"
    );

const editarReserva =
    document.getElementById(
        "editar-reserva"
    );

const confirmarReserva =
    document.getElementById(
        "confirmar-reserva"
    );

const nuevaReserva =
    document.getElementById(
        "nueva-reserva"
    );


/* MOSTRAR RESUMEN */

function mostrarResumen() {

    const nombreValor =
        document.getElementById(
            "nombre"
        ).value.trim();

    const telefonoValor =
        document.getElementById(
            "telefono"
        ).value.trim();

    const correoValor =
        document.getElementById(
            "correo"
        ).value.trim();

    const personas =
        document.getElementById(
            "personas"
        ).value;

    const tipoExperiencia =
        experiencia.value;

    const otraExperienciaValor =
        otraExperiencia.value.trim();

    const mensaje =
        document.getElementById(
            "mensaje"
        ).value.trim();


    /* PERSONAS */

    let personasTexto;


    if (
        personas === "mas-de-10"
    ) {

        personasTexto =
            "Más de 10 personas";

    } else {

        personasTexto =
            `${personas} ${
                personas == 1
                ? "persona"
                : "personas"
            }`;
    }


    /* EXPERIENCIA */

    let experienciaTexto =
        tipoExperiencia;


    if (
        tipoExperiencia === "Otra"
    ) {

        experienciaTexto =
            otraExperienciaValor ||
            "Otra";
    }


    /*
     * CREAR EL RESUMEN SIN UTILIZAR
     * innerHTML CON LOS DATOS DEL USUARIO.
     *
     * Esto permite que los datos se traten
     * como texto y evita problemas con HTML
     * introducido por el usuario.
     */

    resumenReserva.innerHTML = "";


    function agregarDato(etiqueta, valor) {

        const linea =
            document.createElement("div");

        linea.classList.add(
            "resumen-linea"
        );


        const etiquetaElemento =
            document.createElement("strong");

        etiquetaElemento.textContent =
            etiqueta;


        const valorElemento =
            document.createElement("span");

        valorElemento.textContent =
            valor;


        linea.appendChild(
            etiquetaElemento
        );

        linea.appendChild(
            valorElemento
        );


        resumenReserva.appendChild(
            linea
        );
    }


    agregarDato(
        "Nombre:",
        nombreValor
    );

    agregarDato(
        "Teléfono:",
        telefonoValor
    );

    agregarDato(
        "Correo:",
        correoValor
    );

    agregarDato(
        "Fecha:",
        fechaInput.value
    );

    agregarDato(
        "Horario:",
        horaInput.value
    );

    agregarDato(
        "Personas:",
        personasTexto
    );

    agregarDato(
        "Experiencia:",
        experienciaTexto
    );


    if (mensaje) {

        agregarDato(
            "Mensaje:",
            mensaje
        );
    }
}


/* FORMULARIO */

formulario.addEventListener(
    "submit",
    function(evento) {

        evento.preventDefault();


        /* FECHA */

        if (
            !fechaSeleccionada
        ) {

            alert(
                "Por favor selecciona una fecha."
            );

            return;
        }


        /* FECHA PASADA */

        if (
            esFechaPasada(
                fechaSeleccionada
            )
        ) {

            alert(
                "La fecha seleccionada ya pasó. Por favor elige una fecha futura."
            );


            fechaSeleccionada =
                null;

            fechaInput.value =
                "";

            horariosContenedor.innerHTML =
                '<p class="mensaje-horarios">Selecciona primero una fecha.</p>';

            generarCalendario();

            return;
        }


        /* HORARIO */

        if (
            !horaInput.value
        ) {

            alert(
                "Por favor selecciona un horario."
            );

            return;
        }


        /* TELÉFONO */

        const numeroTelefono =
            telefono.value.trim();


        if (
            !telefonoValido(
                numeroTelefono
            )
        ) {

            alert(
                "Por favor ingresa un número de celular colombiano válido de 10 dígitos."
            );

            telefono.focus();

            return;
        }


        /* MOSTRAR RESUMEN */

        mostrarResumen();


        tituloConfirmacion.textContent =
            "Revisa tu reserva";

        mensajeConfirmacion.textContent =
            "Verifica que todos tus datos estén correctos antes de confirmar.";


        editarReserva.style.display =
            "inline-block";

        confirmarReserva.style.display =
            "inline-block";

        nuevaReserva.style.display =
            "none";


        /* MOSTRAR MODAL */

        confirmacion.classList.add(
            "mostrar"
        );
    }
);


/* EDITAR RESERVA */

editarReserva.addEventListener(
    "click",
    function() {

        confirmacion.classList.remove(
            "mostrar"
        );

        nombre.focus();
    }
);


/* CONFIRMAR RESERVA */

confirmarReserva.addEventListener(
    "click",
    function() {

        /* CAMBIAR A CONFIRMACIÓN FINAL */

        tituloConfirmacion.textContent =
            "¡Reserva confirmada!";

        mensajeConfirmacion.textContent =
            "Gracias por elegir Arte y Sabor. Tu reserva ha sido confirmada.";


        editarReserva.style.display =
            "none";

        confirmarReserva.style.display =
            "none";

        nuevaReserva.style.display =
            "inline-block";


        /* LIMPIAR FORMULARIO */

        formulario.reset();

        fechaSeleccionada =
            null;

        fechaInput.value =
            "";

        horaInput.value =
            "";

        horariosContenedor.innerHTML =
            '<p class="mensaje-horarios">Selecciona primero una fecha.</p>';

        otraExperienciaContenedor.style.display =
            "none";

        otraExperiencia.required =
            false;


        /*
         * IMPORTANTE:
         * El calendario se regenera exactamente
         * como antes.
         */

        generarCalendario();
    }
);


/* CERRAR CONFIRMACIÓN */

const cerrarConfirmacion =
    document.getElementById(
        "cerrar-confirmacion"
    );


cerrarConfirmacion.addEventListener(
    "click",
    function() {

        confirmacion.classList.remove(
            "mostrar"
        );
    }
);


/* NUEVA RESERVA */

nuevaReserva.addEventListener(
    "click",
    function() {

        confirmacion.classList.remove(
            "mostrar"
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
);


/* CERRAR AL HACER CLICK AFUERA */

confirmacion.addEventListener(
    "click",
    function(evento) {

        if (
            evento.target ===
            confirmacion
        ) {

            confirmacion.classList.remove(
                "mostrar"
            );
        }
    }
);


/* CANCELAR RESERVA */

const botonCancelar =
    document.getElementById(
        "btn-cancelar"
    );


if (botonCancelar) {

    botonCancelar.addEventListener(
        "click",
        function() {

            const confirmar =
                confirm(
                    "¿Estás seguro de que quieres cancelar o modificar tu reserva?"
                );


            if (confirmar) {

                window.location.href =
                    "cancelar-reserva.html";
            }
        }
    );
}


/* INICIAR */

cargarFechaRecibida();

generarCalendario();


/* MOSTRAR HORARIOS DE LA FECHA RECIBIDA */

if (fechaSeleccionada) {

    mostrarHorarios();
}
