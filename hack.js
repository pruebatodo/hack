const boletosDisponibles = Array.from({ length: 60000 }, (_, index) => 
  ` ${String(index + 1).padStart(5, '0')}`
);

let boletosSeleccionados = [];

function mostrarNumerosDisponibles() {
  const contenedorNumeros = document.getElementById('contenedorNumeros');
  contenedorNumeros.innerHTML = '';

  boletosDisponibles.forEach((boleto) => {
      const boton = document.createElement('button');
      boton.textContent = boleto;
      boton.addEventListener('click', () => seleccionarBoleto(boleto));
      contenedorNumeros.appendChild(boton);
      boton.style.borderRadius = '10px';
      boton.style.fontFamily = 'Arial, sans-serif';
      boton.style.fontWeight = 'bold';
      boton.style.fontSize = '16px';
      boton.style.textTransform = 'uppercase';
  });

  contenedorNumeros.style.backgroundColor = '#70b578';
  contenedorNumeros.style.border = '15px solid #008F39';
}
 
 
const contenedorNumeros = document.getElementById('contenedorNumeros');

contenedorNumeros.addEventListener('click', (event) => {
    const botonSeleccionado = event.target;

    if (botonSeleccionado.tagName === 'BUTTON') {
        cambiarColorSeleccionado(botonSeleccionado);
        mostrarNumeroArriba(botonSeleccionado.textContent);
    }
});

function mostrarNumeroArriba(numero) {

}


function cambiarColorSeleccionado(boton) {
  if (boton.classList.contains('seleccionado')) {
    boton.classList.remove('seleccionado');
    boton.style.backgroundColor = ''; 
  } else {
    boton.classList.add('seleccionado');
    boton.style.backgroundColor = '#008F39';
  }
}

function seleccionarBoleto(numeroSeleccionado) {
 
  const boletoExistente = boletosSeleccionados.find((boleto) => boleto.numero === numeroSeleccionado);

  if (boletoExistente) {
    const indice = boletosSeleccionados.findIndex((boleto) => boleto.numero === numeroSeleccionado);
    boletosSeleccionados.splice(indice, 1);

    mostrarNumerosAleatorios(boletosSeleccionados);
  } else {
    obtenerNumerosAleatorios((numerosAleatorios) => {
      const nuevoBoleto = { numero: numeroSeleccionado, oportunidades: numerosAleatorios };
      boletosSeleccionados.push(nuevoBoleto);
      mostrarNumerosAleatorios(boletosSeleccionados);
    });
  }
}


function obtenerNumerosAleatorios(callback) {
  const boletosDisponibles = Array.from({ length: 60000 }, (_, index) => 
    `${String(index + 1).padStart(5, '0')}`
  );

  const cantidadBoletos = 5; 
  const boletosAleatorios = [];

  while (boletosAleatorios.length < cantidadBoletos) {
    const indiceAleatorio = Math.floor(Math.random() * boletosDisponibles.length);
    const boletoAleatorio = boletosDisponibles[indiceAleatorio];

    if (!boletosAleatorios.includes(boletoAleatorio)) {
      boletosAleatorios.push(boletoAleatorio);
    }
  }

  callback(boletosAleatorios);
}




let costoTotal = 5;

const precioUnitario = 0;

function mostrarNumerosAleatorios(boletos) {
  const contenedorOportunidadesSeleccionadas = document.getElementById('contenedorOportunidadesSeleccionadas');

  contenedorOportunidadesSeleccionadas.innerHTML = '';

  if (boletos.length > 0) {
      const encabezadoNumeroBoleto = document.createElement('h3');
      encabezadoNumeroBoleto.id = 'encabezadoNumeroBoleto';
      encabezadoNumeroBoleto.textContent = 'Oportunidades';

      contenedorOportunidadesSeleccionadas.style.display = 'flex';
      contenedorOportunidadesSeleccionadas.style.flexDirection = 'column';
      contenedorOportunidadesSeleccionadas.style.alignItems = 'center';

      contenedorOportunidadesSeleccionadas.appendChild(encabezadoNumeroBoleto);
  } else {
      contenedorOportunidadesSeleccionadas.style.display = 'none';
      return;
  }

  boletos.forEach((boleto) => {
      const numeroBoleto = boleto.numero;
      const oportunidades = boleto.oportunidades;

      const nuevoContenedorBoleto = document.createElement('div');
      nuevoContenedorBoleto.id = `boleto-${numeroBoleto}`;
      nuevoContenedorBoleto.className = 'boleto-container';
      nuevoContenedorBoleto.style.display = 'flex';
      nuevoContenedorBoleto.style.flexDirection = 'row';
      nuevoContenedorBoleto.style.alignItems = 'flex-start';

      const botonBoletoNegro = document.createElement('button');
      botonBoletoNegro.textContent = numeroBoleto;
      botonBoletoNegro.style.backgroundColor = '#000';
      botonBoletoNegro.style.color = '#fff';

      const contenidoOportunidades = document.createElement('p');
      contenidoOportunidades.textContent = `[${oportunidades.join(', ')}]`;
      contenidoOportunidades.style.margin = '0';
      contenidoOportunidades.style.fontSize = '14px';

      nuevoContenedorBoleto.appendChild(botonBoletoNegro);
      nuevoContenedorBoleto.appendChild(contenidoOportunidades);

      contenedorOportunidadesSeleccionadas.appendChild(nuevoContenedorBoleto);
  });

  const cantidadBoletosSeleccionados = boletos.length;
  const contenedorCantidadBoletos = document.createElement('div');
  contenedorCantidadBoletos.id = 'contenedorCantidadBoletos';
  contenedorCantidadBoletos.textContent = `${cantidadBoletosSeleccionados} BOLETO(S) SELECCIONADO(S)`;
  contenedorOportunidadesSeleccionadas.appendChild(contenedorCantidadBoletos);

  costoTotal = cantidadBoletosSeleccionados * precioUnitario;
  const contenedorCostoTotal = document.createElement('div');
  contenedorCostoTotal.id = 'contenedorCostoTotal';
  contenedorCostoTotal.textContent = `Costo Total: $${costoTotal}`;
  contenedorOportunidadesSeleccionadas.appendChild(contenedorCostoTotal);

  const botonReservar = document.createElement('button');
  botonReservar.id = 'botonReservar';
  botonReservar.textContent = 'Reservar';
  botonReservar.addEventListener('click', mostrarVentanaEmergente);
  botonReservar.style.backgroundColor = '#000'; 
  botonReservar.style.color = 'white';
  botonReservar.disabled = cantidadBoletosSeleccionados === 0; 

  contenedorOportunidadesSeleccionadas.appendChild(botonReservar);
}
function bloquearSeleccionBoletos() {
  const contenedorNumeros = document.getElementById('contenedorNumeros');
  contenedorNumeros.style.pointerEvents = 'none';
}

function desbloquearSeleccionBoletos() {
  const contenedorNumeros = document.getElementById('contenedorNumeros');
  contenedorNumeros.style.pointerEvents = 'auto';
}


function mostrarVentanaEmergente() {
  cerrarVentanaEmergente();

  bloquearSeleccionBoletos();
  

  const fondoObscuro = document.createElement('div');
  fondoObscuro.className = 'fondo-obscuro';

  fondoObscuro.addEventListener('click', (event) => {
    if (event.target === fondoObscuro) {
      cerrarVentanaEmergente(ventanaEmergente, fondoObscuro);
    }
  });

  const ventanaEmergente = document.createElement('div');
  ventanaEmergente.className = 'ventana-emergente';

  const mensajeBienvenida = document.createElement('p');
  mensajeBienvenida.textContent = 'LLENA TUS DATOS Y DA CLICK EN APARTAR';

  const mensajeSeleccion = document.createElement('p');
  mensajeSeleccion.textContent = `${boletosSeleccionados.length} BOLETO SELECCIONADO`;

  const camponumero = document.createElement('input');
  camponumero.placeholder = 'NÚMERO numero (10 dígitos)';
  camponumero.addEventListener('input', validarInformacion);

  const campoNombre = document.createElement('input');
  campoNombre.placeholder = 'NOMBRE(S)';
  campoNombre.addEventListener('input', validarInformacion);

  const campoApellido = document.createElement('input');
  campoApellido.placeholder = 'APELLIDOS';
  campoApellido.addEventListener('input', validarInformacion);

  const estadosMexico = [
    "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas",
    "Chihuahua", "Coahuila", "Colima", "Durango", "Guanajuato", "Guerrero", "Hidalgo",
    "Jalisco", "México", "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca",
    "Puebla", "Mexico", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora",
    "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"
];

const selectEstado = document.createElement('select');
selectEstado.id = 'selectEstado';

estadosMexico.forEach(estado => {
    const option = document.createElement('option');
    option.value = estado;
    option.textContent = estado;
    selectEstado.appendChild(option);
});
const mensajeadicional = document.createElement('h8');
mensajeadicional.textContent = '¡Al finalizar serás redirigido a número para enviar la información de tu boleto!';

const botonEnviarReserva = document.createElement('button');
botonEnviarReserva.textContent = 'RESERVAR BOLETOS';
botonEnviarReserva.addEventListener('click', () => {
    const numeronumero = camponumero.value;
    const nombre = campoNombre.value;
    const apellido = campoApellido.value;
    const estadoSeleccionado = selectEstado.value;

    if (numeronumero && /^\d+$/.test(numeronumero) && nombre && apellido && estadoSeleccionado) {
        const cantidadBoletos = boletosSeleccionados.length;

        const mensaje = `Hola, ¡He apartado boletos para la rifa!
**RIFA ENTRE AMIGOS Mexico**

**Boletos seleccionados (${cantidadBoletos} boletos):**
${boletosSeleccionados.map(boleto => `*${boleto.numero}* (Oportunidades: ${boleto.oportunidades.join(', ')})`).join('\n')}

**Nombre:** ${nombre} ${apellido}

**Enlace para ver las cuentas de pago:**
https://tulinkdecuentas/cuentas.html

**El siguiente paso es enviar la foto del comprobante de pago por este medio.**

**Costo Total:** {Tu costo de boletos} pesos MX
**Celular:** {numeronumero}`;

        const urlnumero = `https://wa.me/+51944218045?text=${encodeURIComponent(mensaje)}`;

        const temporizador = document.createElement('p');
        temporizador.textContent = 'Redirigiendo...';
        ventanaEmergente.appendChild(temporizador);

        setTimeout(() => {
            window.location.href = urlnumero;
        }, 2000);
    } else {
        alert('Por favor, ingrese un número de número válido.');
    }
});

const botonCerrar = document.createElement('span');
botonCerrar.className = 'cerrar-ventana';
botonCerrar.innerHTML = 'X';
botonCerrar.addEventListener('click', () => {
    cerrarVentanaEmergente(ventanaEmergente, fondoObscuro);
});

  ventanaEmergente.appendChild(botonCerrar);
  ventanaEmergente.appendChild(mensajeBienvenida);
  ventanaEmergente.appendChild(mensajeSeleccion);
  ventanaEmergente.appendChild(camponumero);
  ventanaEmergente.appendChild(campoNombre);
  ventanaEmergente.appendChild(campoApellido);
  ventanaEmergente.appendChild(selectEstado);
  ventanaEmergente.appendChild(mensajeadicional);
  ventanaEmergente.appendChild(botonEnviarReserva);
  

  document.body.appendChild(fondoObscuro);
  document.body.appendChild(ventanaEmergente);

  function validarInformacion() {
    const numeronumero = camponumero.value;
    const nombre = campoNombre.value;
    const apellido = campoApellido.value;
    const estadoSeleccionado = selectEstado.value;

    const informacionCompleta = numeronumero && /^\d+$/.test(numeronumero) && nombre && apellido && estadoSeleccionado;

    botonEnviarReserva.disabled = !informacionCompleta;
}
}

function cerrarVentanaEmergente(ventanaEmergente, fondoObscuro) {
  if (ventanaEmergente && fondoObscuro) {
    ventanaEmergente.remove();
    fondoObscuro.remove();
    desbloquearSeleccionBoletos();
  }
}


mostrarNumerosDisponibles();





document.getElementById('btnMaquinaSuerte').addEventListener('click', function() {
  abrirVentanaEmergente(); 
});

function abrirVentanaEmergente() {
  bloquearSeleccionBoletos();

  var ventanaEmergente = document.createElement('div');
  ventanaEmergente.className = 'ventana-emergente';

   var fondoOscuro = document.createElement('div');
   fondoOscuro.className = 'fondo-oscuro';
   document.body.appendChild(fondoOscuro);

ventanaEmergente.innerHTML = `
<style>
#boletosGeneradosContainer ul {
  list-style-type: none;
  padding-left: 0;
}

.fondo-oscuro {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8); 
  z-index: 999; 
}

.boton-reservar {
  background-color: green;
  color: #ffffff;
  padding: 2vw 5vw; /* Utilizando unidades de viewport para hacerlo responsive */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 2vw; /* Tamaño de fuente también en unidades de viewport */
  text-align: center;
}

.boton-reservar:hover {
  background-color: darkgreen; /* Cambié el color en hover para mayor contraste */
}


</STYLE>
<div class="contenido-ventana" style= border: 2px solid #ccc; border-radius: 10px; background-color: #f0f0f0; max-width: 400px; margin: 0 auto;"><br><br>
    <h2 style="text-align: center; font-size: 24px; margin-bottom: 20px; color: #333;">Modo demo</h2>
    
    <button id="cerrarVentana" class="cerrar-ventana" style="width: 50px; padding: 5px; background-color: #dc3545; font-size: 15px; color: white; border: none; border-radius: 5px; cursor: pointer; margin-bottom: 20px;">Cerrar</button>
    
`;

const boletosDisponibles = Array.from({ length: 60000 }, (_, index) => `Boleto ${index + 1}`);
const oportunidadesDisponibles = Array.from({ length: 10 }, (_, index) => `Oportunidad ${index + 1}`);

document.body.appendChild(ventanaEmergente);

document.getElementById('cerrarVentana').addEventListener('click', function() {
    desbloquearSeleccionBoletos();
    document.body.removeChild(fondoOscuro);
    document.body.removeChild(ventanaEmergente);
});

document.getElementById('numBoletos').addEventListener('change', function() {
    var seleccion = document.getElementById('numBoletos').value;
    var botonGenerar = document.getElementById('generarBoletosBtn');

    botonGenerar.disabled = (seleccion === "");
});

document.getElementById('generarBoletosBtn').addEventListener('click', function() {
    document.getElementById('boletosGeneradosContainer').innerHTML = '';

    var numBoletos = parseInt(document.getElementById('numBoletos').value, 10);
    mostrarCargando(); 

    setTimeout(function() {
        var contenedorResultado = document.getElementById('boletosGeneradosContainer');
        contenedorResultado.innerHTML = '';
        generarBoletos(numBoletos, contenedorResultado); 
        ocultarCargando(); 
    }, 3000);
});

function generarBoletos(numBoletos, contenedorResultado) {
    contenedorResultado.innerHTML = '';

    if (boletosDisponibles.length >= numBoletos) {
        let totalBoletosGenerados = 0;
        let boletosGeneradosArray = [];

        const boletosAleatorios = shuffleArray(boletosDisponibles).slice(0, numBoletos);

        boletosAleatorios.forEach(boleto => {
            boletosGeneradosArray.push(boleto);
            contenedorResultado.innerHTML += `<p>${boleto}</p>`;
            obtenerYMostrarOportunidades(boleto, contenedorResultado);
            totalBoletosGenerados++;
        });

        const botonReservar = document.createElement('button');
        botonReservar.id = 'botonReservar';
        botonReservar.textContent = 'Reservar';
        botonReservar.addEventListener('click', function(event) {
            event.preventDefault(); 
            const boletosGenerados = obtenerBoletosGenerados();

            const oportunidadesAsociadas = obtenerOportunidadesAsociadas();

            mostrarFormularioReserva(totalBoletosGenerados, boletosGenerados, oportunidadesAsociadas);  
        });

        contenedorResultado.appendChild(botonReservar);

        const contenedorCantidadBoletosTexto = document.createElement('div');
        contenedorResultado.appendChild(contenedorCantidadBoletosTexto);
    } else {
        contenedorResultado.innerHTML = "<p>No hay suficientes boletos disponibles</p>";
    }
}

function obtenerYMostrarOportunidades(numeroBoleto, contenedorResultado) {
    const numerosAleatorios = [];
    while (numerosAleatorios.length < 5 && oportunidadesDisponibles.length > 0) {
        const index = Math.floor(Math.random() * oportunidadesDisponibles.length);
        const numeroAleatorio = oportunidadesDisponibles[index];
        numerosAleatorios.push(numeroAleatorio);
        oportunidadesDisponibles.splice(index, 1); 
    }

    const oportunidadesTexto = `Oportunidades para ${numeroBoleto}: ${numerosAleatorios.join(', ')}`;
    contenedorResultado.innerHTML += `<p>${oportunidadesTexto}</p>`;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
}

function obtenerBoletosGenerados() {
}

function obtenerOportunidadesAsociadas() {
}

function mostrarCargando() {
    document.getElementById('cargando').style.display = 'block';
}

function ocultarCargando() {
    document.getElementById('cargando').style.display = 'none';
}
var boletosGeneradosArray = [];
var oportunidadesArray = [];

function generarBoletosDesdeFirebase() {
  var numBoletos = parseInt(document.getElementById('numBoletos').value, 10);
  
  var contenedorResultado = document.getElementById('boletosGeneradosContainer');
  contenedorResultado.innerHTML = '';

  const boletosRef = ref(database, '');
  onValue(boletosRef, (snapshot) => {
    const data = snapshot.val();
    var boletosDisponibles = []; 

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const boleto = data[key];
        if (boleto.estado === "APartar") {
          boletosDisponibles.push(key); 
        }
      }
    
    }


const contenedorCantidadBoletos = document.createElement('div');
contenedorCantidadBoletos.id = 'contenedorCantidadBoletos';
contenedorResultado.appendChild(contenedorCantidadBoletos); 

if (boletosDisponibles.length >= numBoletos) {
  boletosDisponibles = shuffleArray(boletosDisponibles);

  let totalBoletosGenerados = 0;
  for (let i = 0; i < numBoletos; i++) {
    var boletoGenerado = boletosDisponibles[i];
    boletosGeneradosArray.push(boletoGenerado); 
    contenedorResultado.innerHTML += `<p>${boletoGenerado}</p>`;
    obtenerYMostrarOportunidades(boletoGenerado, contenedorResultado);
    totalBoletosGenerados++; 
  }



  const botonReservar = document.createElement('button');
  botonReservar.id = 'botonReservard';
  botonReservar.textContent = 'Reservar';
  botonReservar.addEventListener('click', function(event) {
      event.preventDefault(); 
      const boletosGenerados = obtenerBoletosGenerados();
  
      const oportunidadesAsociadas = obtenerOportunidadesAsociadas();
  
      mostrarFormularioReserva(totalBoletosGenerados,boletosGenerados, oportunidadesAsociadas);  });
  
  contenedorResultado.appendChild(botonReservar);

  const contenedorCantidadBoletos = document.getElementById('contenedorCantidadBoletos');
  
  contenedorCantidadBoletos.innerHTML = '';

  const contenedorCantidadBoletosTexto = document.createElement('div');
  contenedorCantidadBoletosTexto.textContent = 'Boletos generados: ' + totalBoletosGenerados;

  contenedorCantidadBoletos.appendChild(contenedorCantidadBoletosTexto);
} else {
  contenedorResultado.innerHTML = "<p>No hay suficientes boletos disponibles</p>";
}

  });
}


var oportunidadesArray = []; 

function obtenerYMostrarOportunidades(numeroBoleto) {
  onValue(ref(database, 'oportunidades'), (snapshot) => {
    const oportunidadesDisponibles = [];

    snapshot.forEach((childSnapshot) => {
      const oportunidad = childSnapshot.val();
      if (oportunidad.estado === 'Apartar') {
        oportunidadesDisponibles.push(childSnapshot.key);
      }
    });

    const numerosAleatorios = [];
    while (numerosAleatorios.length < 5 && oportunidadesDisponibles.length > 0) {
      const index = Math.floor(Math.random() * oportunidadesDisponibles.length);
      const numeroAleatorio = oportunidadesDisponibles[index];
      numerosAleatorios.push(numeroAleatorio);
      oportunidadesDisponibles.splice(index, 1); 
    }

    oportunidadesArray.push({ boleto: numeroBoleto, oportunidades: numerosAleatorios });
  });
}


  
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; 
  }
  return array;
}


function obtenerBoletosGenerados() {
  return boletosGeneradosArray;
}


function obtenerOportunidadesAsociadas() {
  const oportunidades = [];
  oportunidadesArray.forEach(item => {
    const oportunidadesBoleto = item.oportunidades;
    oportunidadesBoleto.forEach(oportunidad => {
      oportunidades.push(oportunidad);
    });
  });
  return oportunidades;
}



function mostrarFormularioReserva(cantidadBoletosSeleccionados) {

  const formularioReserva = document.createElement('form');
  formularioReserva.id = 'formularioReserva';
   formularioReserva.style.display = 'flex';
    Object.assign(formularioReserva.style, {
        margin: '0px', 
        flexDirection: 'column',
    });

  const mensajeInicio = document.createElement('p');
  mensajeInicio.textContent = 'APARTA TUS BOLETOS';
mensajeInicio.style.width = '100%'; 
mensajeInicio.style.textAlign = 'center'; 
mensajeInicio.style.marginTop = '20px'; 
mensajeInicio.style.fontSize = '16px'; 
mensajeInicio.style.lineHeight = '1.5'; 
  formularioReserva.appendChild(mensajeInicio);
const mensajeBoletosGenerados = document.createElement('p');
mensajeBoletosGenerados.textContent = `${cantidadBoletosSeleccionados} BOLETO(S) GENERADO(S)`;
mensajeBoletosGenerados.style.width = '100%'; 
mensajeBoletosGenerados.style.textAlign = 'center'; 
mensajeBoletosGenerados.style.marginTop = '20px'; 
mensajeBoletosGenerados.style.fontSize = '16px'; 
mensajeBoletosGenerados.style.lineHeight = '1.5'; 
formularioReserva.appendChild(mensajeBoletosGenerados);


  const campoNombre = document.createElement('input');
  campoNombre.id = 'campoNombre';
  campoNombre.type = 'text';
  campoNombre.placeholder = 'Nombre';
  formularioReserva.appendChild(campoNombre);

  const campoApellido = document.createElement('input');
  campoApellido.id = 'campoApellido';
  campoApellido.type = 'text';
  campoApellido.placeholder = 'Apellido';
  formularioReserva.appendChild(campoApellido);

  const camponumero = document.createElement('input');
  camponumero.id = 'camponumero';
  camponumero.type = 'text';
  camponumero.placeholder = 'numero';
  formularioReserva.appendChild(camponumero);

  const selectEstado = document.createElement('select');
  selectEstado.id = 'selectEstado';
  const estadosMexico = [
    "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas",
    "Chihuahua", "Coahuila", "Colima", "Durango", "Guanajuato", "Guerrero", "Hidalgo",
    "Jalisco", "México", "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca",
    "Puebla", "Mexico", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora",
    "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"
  ];

  estadosMexico.forEach(estado => {
    const option = document.createElement('option');
    option.value = estado;
    option.textContent = estado;
    selectEstado.appendChild(option);
  });
  formularioReserva.appendChild(selectEstado);

  const mensajeFinal = document.createElement('p');
  mensajeFinal.textContent = '¡Al finalizar serás redirigido a numero para enviar la información de tu boleto!';
mensajeFinal.style.width = '100%'; 
mensajeFinal.style.textAlign = 'center';
mensajeFinal.style.marginTop = '20px'; 
mensajeFinal.style.fontSize = '16px';
mensajeFinal.style.lineHeight = '1.5'; 
  formularioReserva.appendChild(mensajeFinal);

  const botonEnviar = document.createElement('button');
  botonEnviar.textContent = 'Apartar';
  formularioReserva.appendChild(botonEnviar);

  
  const saltoDeLinea = document.createElement('br');
  formularioReserva.appendChild(saltoDeLinea);

    const botonCerrar = document.createElement('button');
    botonCerrar.className = 'boton-cerrar';
    botonCerrar.textContent = 'Cerrar';
    botonCerrar.addEventListener('click', function() {
        document.body.removeChild(ventanaEmergente);
        document.body.removeChild(fondoOscuro);
    });
      botonCerrar.style.alignSelf = 'flex-end';
  botonCerrar.style.marginBottom = '10px';
  botonCerrar.style.background = 'red';
  botonCerrar.style.color = 'white';
  botonCerrar.style.border = 'none';
  botonCerrar.style.borderRadius = '5px';
  botonCerrar.style.padding = '5px 10px';
    formularioReserva.appendChild(botonCerrar);
    

  formularioReserva.addEventListener('submit', function(event) {

    botonEnviar.disabled = true;
    botonEnviar.textContent = 'Procesando'; 
    
  const mensajeRedirigiendo = document.createElement('p');
  mensajeRedirigiendo.textContent = 'Redirigiendo';
  formularioReserva.appendChild(mensajeRedirigiendo);

    const nombre = campoNombre.value;
    const apellido = campoApellido.value;
    const numero = camponumero.value;
    const estado = selectEstado.value;

    if (nombre && apellido && numero && estado) {
      const boletosGenerados = obtenerBoletosGenerados();
      const oportunidadesAsociadas = obtenerOportunidadesAsociadas();

      enviarBoletosYOportunidadesPornumero(boletosGenerados, oportunidadesAsociadas, nombre, apellido, numero, estado);
    } else {
      alert('Por favor, completa todos los campos del formulario.');
      botonEnviar.disabled = false;
    botonEnviar.textContent = '';
    }
  });


  const ventanaEmergente = document.createElement('div');
  ventanaEmergente.className = 'ventana-emergente';
  ventanaEmergente.appendChild(formularioReserva);
  document.body.appendChild(ventanaEmergente);
}

async function enviarBoletosYOportunidadesPornumero(boletos, oportunidades, nombre, apellido, numero, estado) {
  try {
    const numeronumero = ''; 

    let mensajeCompleto = `¡Aquí están tus boletos y oportunidades!\n\n
    RIFA ENTRE AMIGOS`;

    let promesasDeActualizacion = [];

    boletos.forEach((boletoNumero, index) => {
        const ops = oportunidades.slice(index * 5, (index + 4) * 5).join(', ');
        mensajeCompleto += `Boleto: ${boletoNumero}\nOportunidades: ${ops}\n\n`;

        promesasDeActualizacion.push(
           
            set(ref(database, `boletos/${boletoNumero}/informacionAdicional`), {
               
                nombre: nombre,
                apellido: apellido,
                numero: numero,
                estado: estado
            }),
          
            set(ref(database, `boletos/${boletoNumero}/oportunidades`), oportunidades.slice(index * 5, (index + 1) * 5))
        );
    });

  
mensajeCompleto += `Enlace para ver las cuentas de pago:\n\n`;
mensajeCompleto += `http://localhost/New/audi/cuentas.html\n\n`;
mensajeCompleto += `El siguiente paso es enviar foto del comprobante de pago por este medio:\n\n`;


    mensajeCompleto += `Nombre: ${nombre}\nApellido: ${apellido}\nnumero: ${numero}\nEstado: ${estado}`;
    document.body.innerHTML += "<p>Redirigiendo</p>";
    const urlnumero = `https://wa.me/${+51944218045}?text=${encodeURIComponent(mensajeCompleto)}`;
    setTimeout(() => {
      window.location.href = urlnumero;
    }, 2000); 

  } catch (error) {
   
    alert('Ocurrió un error al enviar los boletos y oportunidades por numero. Por favor, intenta nuevamente.');
  }
}


const fechaLimite = new Date();
fechaLimite.setDate(fechaLimite.getDate() + 1); 

if (new Date() > fechaLimite) {
    alert("El sistema ha expirado. Por favor, contacta al administrador.");
    window.location.href = "pagina-de-error.html"; 
}

}
