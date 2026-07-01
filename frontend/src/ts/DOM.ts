
 let busqueda: HTMLElement;
 let botonNuevoRegistro: HTMLElement;
 let botonVolver: HTMLElement;
 let botonesEdicion: HTMLElement;
 let contenedorBotones: HTMLElement;
 let mensajes: HTMLElement;
 let datosCiudadano: HTMLElement;

 export {

  busqueda,
  botonNuevoRegistro,
  contenedorBotones,
  botonesEdicion,
  botonVolver,
  mensajes,
  datosCiudadano

 }

 export function init() {

    busqueda = document.getElementById('busqueda')!;
    botonNuevoRegistro = document.getElementById('botonNuevoRegistro')!;
    botonVolver = document.getElementById('botonVolver')!;
    contenedorBotones = document.getElementById('contenedorBotones')!;
    mensajes = document.getElementById('mensajes')!;
    datosCiudadano = document.getElementById('datosCiudadano')!;
    botonesEdicion = document.getElementById('botonesEdicion')!;

 }
