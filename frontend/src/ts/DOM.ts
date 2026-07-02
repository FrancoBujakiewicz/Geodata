
 let busqueda: HTMLElement;
 let botonNuevoRegistro: HTMLElement;
 let botonVolver: HTMLElement;
 let botonesEdicion: HTMLElement;
 let contenedorBotones: HTMLElement;
 let mensajes: HTMLElement;
 let datosCiudadano: HTMLElement;

 let mapa: HTMLElement;
 let botonCapturarUbicacion: HTMLElement;
 let ubicacionCorrecta: HTMLElement;
 let ubicacionIncorrecta: HTMLElement;
 let textoUbicacion: HTMLElement;

 export {

  busqueda,
  botonNuevoRegistro,
  contenedorBotones,
  botonesEdicion,
  botonVolver,
  mensajes,
  datosCiudadano,
  mapa,
  botonCapturarUbicacion,
  ubicacionCorrecta,
  ubicacionIncorrecta,
  textoUbicacion

 }

 export function init() {

    busqueda = document.getElementById('busqueda')!;
    botonNuevoRegistro = document.getElementById('botonNuevoRegistro')!;
    botonVolver = document.getElementById('botonVolver')!;
    contenedorBotones = document.getElementById('contenedorBotones')!;
    mensajes = document.getElementById('mensajes')!;
    datosCiudadano = document.getElementById('datosCiudadano')!;
    botonesEdicion = document.getElementById('botonesEdicion')!;

    mapa = document.getElementById('mapa')!;
    botonCapturarUbicacion = document.getElementById('botonCapturarUbicacion')!;
    ubicacionCorrecta = document.getElementById('ubicacionCorrecta')!;
    ubicacionIncorrecta = document.getElementById('ubicacionIncorrecta')!;
    textoUbicacion = document.getElementById('textoUbicacion')!;

 }
