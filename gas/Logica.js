
 logicaRegistar(datosCiudadano, gmailRegistrador) {

  const validacion = validarDatos(datosCiudadano);

  if (!validacion.esValido) {
    throw new Error(validacion.error);
  }
 
  if (persistenciaBuscar(datosCiudadano.dni)) {
    throw new Error(`El ciudadano con DNI: ${dni} ya se encuentra registrado`);
  }
 
  resultado = persistenciaRegistrar(datosCiudadano, gmailRegistrador);

  if(!resultado) {

   throw new Error("No se pudo completar el registro");

  } 

  return resultado;

 }

 logicaBuscar(dni) {

  if(!validacionNumerica(dni).esValido) {
    throw new Error("DNI solo puede contener números");
  }

  const ciudadano = persistenciaBuscar(dni);

  if(!ciudadano){
    throw new Error(`Ciudadano con DNI: ${dni} no encontrado`);
  }

  return ciudadano;

 }

 logicaEditar(datosCiudadano) {

  const validacion = validarDatos(datosCiudadano);

  if (!validacion.esValido) {
    throw new Error(validacion.error);
  }
 
  return persistenciaEditar(datosCiudadano);

 }

 logicaEliminar(dni) {

  if(!validacionNumerica(dni).esValido) {
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

 const REGEX_OBSERVACION = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s.,]+$/;
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
  if (!validacionDni.esValido) {
    errores.dni = 'DNI solo puede contener números';
  }

  const validacionNumWhatsapp = validacionNumerica(datosCiudadano.num_whatsapp);
  if (!validacionNumWhatsapp.esValido) {
    errores.numWhatsapp = 'Numero de Whatsapp solo puede contener números';
  }

  if (!REGEX_OBSERVACION.test(datosCiudadano.observacion)) {
    errores.observacion = 'Observación solo puede contener letras, puntos y comas';
  }

  return {
    esValido: Object.keys(errores).length === 0,
    error: errores
  };
}
