
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

 let dni: HTMLInputElement;
 let apellido: HTMLInputElement;
 let nombres: HTMLInputElement;
 let numWhatsapp: HTMLInputElement;
 let direccion: HTMLInputElement;
 let observacion: HTMLInputElement;

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
  textoUbicacion,
  dni,
  apellido,
  nombres,
  numWhatsapp,
  direccion,
  observacion

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

    dni = (document.getElementById('dni')!.querySelector('input') as HTMLInputElement);
    apellido = (document.getElementById('apellido')!.querySelector('input') as HTMLInputElement);
    nombres = (document.getElementById('nombres')!.querySelector('input') as HTMLInputElement);
    numWhatsapp = (document.getElementById('numWhatsapp')!.querySelector('input') as HTMLInputElement);
    direccion = (document.getElementById('direccion')!.querySelector('input') as HTMLInputElement);
    observacion = (document.getElementById('observacion')!.querySelector('input') as HTMLInputElement);

 }

 export function obtenerDatosCiudadano(longitud: number, latitud: number): Record<string, any> {

  return {
   dni: dni.value,
   nombres: nombres.value,
   apellido: apellido.value,
   numWhatsapp: numWhatsapp.value,
   longitud: longitud,
   latitud: latitud,
   direccion: direccion.value,
   observacion: observacion.value
  }

 }
