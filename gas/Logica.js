function logicaRegistar(datosCiudadano) {
  const validacion = validarDatos(datosCiudadano);
  if (!validacion.esValido) {
    return { exito: false, error: validacion.error };
  }

  if (persistenciaBuscar(datosCiudadano.dni)) {
    throw new Error(`DNI ya se encuentra registrado`);
  }

  try {
    const resultado = persistenciaRegistrar(datosCiudadano);
    return { exito: true, datos: resultado };
  } catch (error) {
    throw new Error("Lo sentimos, no se pudo registrar.");
  }
}

function logicaBuscar(dni) {
  if (!validacionNumerica(dni).esValido) {
    throw new Error("DNI solo puede contener números");
  }

  const ciudadano = persistenciaBuscar(dni);

  if (!ciudadano) {
    throw new Error(`DNI no encontrado`);
  }

  return ciudadano;
}

function logicaEditar(datosCiudadano) {
  const validacion = validarDatos(datosCiudadano);
  if (!validacion.esValido) {
    return { exito: false, error: validacion.error };
  }

  const resultado = persistenciaEditar(datosCiudadano);
  return { exito: true, datos: resultado };
}

function logicaEliminar(dni) {
  if (!validacionNumerica(dni).esValido) {
    throw new Error("DNI solo puede contener números");
  }

  return persistenciaEliminar(dni);
}

/* ################# Validación de datos #################
/: Delimitador del regex.
^ y $: La comparación empieza al inicio del string (^)
y terminal al final del string ($).
\s: Representa espacio en blanco.
+: Uno o mas caracteres.
*/

const REGEX_PARRAFO = /^[A-Za-z0-9ÁÉÍÓÚÜÑáéíóúüñ\s.,]+$/;
const REGEX_SOLO_LETRAS = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/;
const REGEX_SOLO_NUMEROS = /^[0-9]+$/;

function validacionNumerica(numero) {
  if (!numero || String(numero).trim() === '') {
    return { esValido: false };
  }
  if (!REGEX_SOLO_NUMEROS.test(numero)) {
    return { esValido: false };
  }
  return { esValido: true };
}

function validarDatos(datosCiudadano) {
  const errores = {};

  if (!datosCiudadano || typeof datosCiudadano !== 'object') {
    return { esValido: false, error: { general: 'No se recibieron datos del ciudadano' } };
  }

  if (!datosCiudadano.nombres || String(datosCiudadano.nombres).trim() === '') {
    errores.nombres = 'Nombres requeridos';
  } else if (!REGEX_SOLO_LETRAS.test(datosCiudadano.nombres)) {
    errores.nombres = 'Nombres solo puede contener letras';
  }

  if (!datosCiudadano.apellido || String(datosCiudadano.apellido).trim() === '') {
    errores.apellido = 'Apellido requerido';
  } else if (!REGEX_SOLO_LETRAS.test(datosCiudadano.apellido)) {
    errores.apellido = 'Apellido solo puede contener letras';
  }

  const validacionDni = validacionNumerica(datosCiudadano.dni);
  if(String(datosCiudadano.dni).length < 8 || !validacionDni.esValido || /^0+$/.test(datosCiudadano.dni)) {
    errores.dni = 'DNI inválido';
  }

  const validacionNumWhatsapp = validacionNumerica(datosCiudadano.numWhatsapp);
  if (String(datosCiudadano.numWhatsapp).trim() == ''
      || !validacionNumWhatsapp.esValido) {
    errores.numWhatsapp = 'Solo puede contener números';
  }

  if (String(datosCiudadano.direccion).trim() == ''
      || !REGEX_PARRAFO.test(datosCiudadano.direccion)) {
    errores.direccion = 'Direccion inválida';
  }

  if (String(datosCiudadano.observacion).trim() !== ''
      && !REGEX_PARRAFO.test(datosCiudadano.observacion)) {

    errores.observacion = 'Solo puede contener letras, punto y coma';
  }

  return {
    esValido: Object.keys(errores).length === 0,
    error: errores
  };
}
