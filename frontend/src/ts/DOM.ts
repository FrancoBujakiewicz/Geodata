
 let busqueda: HTMLElement;
 let botonNuevoRegistro: HTMLElement;
 let contenedorBotones: HTMLElement;
 let mensajes: HTMLElement;
 let datosCiudadano: HTMLElement;

 export {

  busqueda,
  botonNuevoRegistro,
  contenedorBotones,
  mensajes,
  datosCiudadano

 }

 export function init() {

    busqueda = document.getElementById('busqueda')!;
    botonNuevoRegistro = document.getElementById('botonNuevoRegistro')!;
    contenedorBotones = document.getElementById('contenedorBotones')!;
    mensajes = document.getElementById('mensajes')!;
    datosCiudadano = document.getElementById('datosCiudadano')!;

 }
