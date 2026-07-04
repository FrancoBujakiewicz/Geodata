
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

 let mensajeFormulario: HTMLElement;
 let botonEnviar: HTMLElement;

 let dni: HTMLInputElement;
 let apellido: HTMLInputElement;
 let nombres: HTMLInputElement;
 let numWhatsapp: HTMLInputElement;
 let direccion: HTMLInputElement;
 let observacion: HTMLInputElement;

 let dniBusqueda: HTMLInputElement;
 let botonBuscar: HTMLElement;
 let botonEliminar: HTMLElement;
 let botonEnvio: HTMLElement;
 let botonesMapa: HTMLElement;

 let ubicacionConfirmada: boolean;
 export function setUbicacionConfirmada(value: boolean) { ubicacionConfirmada = value; }
 export function getUbicacionConfirmada() { return ubicacionConfirmada; }

 let registrarHandler: () => void;
 export function setRegistrarHandler(handler: () => void) { registrarHandler = handler; }

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
  mensajeFormulario,
  botonEnviar,
  dni,
  apellido,
  nombres,
  numWhatsapp,
  direccion,
  observacion,
  dniBusqueda,
  botonBuscar,
  botonEliminar,
  botonEnvio,
  botonesMapa

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
    mensajeFormulario = document.getElementById('mensajeFormulario')!;
    botonEnviar = document.querySelector('#seccionEnvio button')!;

    dni = (document.getElementById('dni')!.querySelector('input') as HTMLInputElement);
    apellido = (document.getElementById('apellido')!.querySelector('input') as HTMLInputElement);
    nombres = (document.getElementById('nombres')!.querySelector('input') as HTMLInputElement);
    numWhatsapp = (document.getElementById('numWhatsapp')!.querySelector('input') as HTMLInputElement);
    direccion = (document.getElementById('direccion')!.querySelector('input') as HTMLInputElement);
    observacion = (document.getElementById('observacion')!.querySelector('input') as HTMLInputElement);

    dniBusqueda = (document.getElementById('contenedorBusqueda')!.querySelector('input') as HTMLInputElement);
    botonBuscar = (document.getElementById('contenedorBusqueda')!.querySelector('button') as HTMLElement);
    botonEliminar = (document.getElementById('botonEliminar') as HTMLElement);
    botonesMapa = (document.getElementById('botonesMapa') as HTMLElement);

    ubicacionConfirmada = false;

    limpiarErrores();

 }

 const placeholders: Record<string, string> = {
  dni: 'Ingresar número de DNI',
  apellido: 'Ingresar apellido',
  nombres: 'Ingresar nombres',
  numWhatsapp: 'Ingresar número de Whatsapp',
  direccion: 'Ingresar dirección',
  observacion: 'Ingresar observación (Opcional)'
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

 export function limpiarErrores(): void {

  mensajeFormulario.innerText = '';

  for (const id of ['dni', 'apellido', 'nombres', 'numWhatsapp', 'direccion', 'observacion']) {
   const input = (document.getElementById(id)!.querySelector('input') as HTMLInputElement);
   input.classList.remove('error');
   input.placeholder = placeholders[id];
  }

 }

 export function mostrarErrorCampo(id: string, mensaje: string): void {

  const input = (document.getElementById(id)!.querySelector('input') as HTMLInputElement);
  input.classList.add('error');
  input.value = '';
  input.placeholder = mensaje;

 }

 export function mostrarErroresValidacion(errores: Record<string, string>): void {

  for (const [campo, mensaje] of Object.entries(errores)) {
   mostrarErrorCampo(campo, mensaje);
  }

 }

 export function toggle(e: HTMLElement): void {
  e.classList.toggle('visible', !e.classList.toggle('invisible'));
 }

 export function navegacionToggle() {
  toggle(busqueda);
  toggle(botonNuevoRegistro);
  toggle(contenedorBotones);
  toggle(mensajes);
  toggle(botonVolver);
  toggle(datosCiudadano);

  botonEnviar.innerText = 'Enviar';
  botonEnviar.onclick = registrarHandler;
  dniBusqueda.value = '';
 }

 export function navegacionEdicion(ciudadanoEliminado: boolean) {
  toggle(busqueda);
  toggle(botonNuevoRegistro);
  toggle(contenedorBotones);
  toggle(mensajes);
  toggle(botonesEdicion);
  toggle(datosCiudadano);

  if(ciudadanoEliminado) {
    botonEliminar.classList.add('invisible');
    botonEliminar.classList.remove('visible');
    botonEnviar.classList.add('invisible');
    botonEnviar.classList.remove('visible');
    botonesMapa.classList.add('invisible');
    botonesMapa.classList.remove('visible');
    textoUbicacion.classList.add('invisible');
    textoUbicacion.classList.remove('visible');

    const inputs = datosCiudadano.querySelectorAll('input');
    inputs.forEach((input: HTMLInputElement) => { input.readOnly = true; });
  } else {
    botonEliminar.classList.remove('invisible');
    botonEliminar.classList.add('visible');
    botonEnviar.classList.remove('invisible');
    botonEnviar.classList.add('visible');
    botonesMapa.classList.remove('invisible');
    botonesMapa.classList.add('visible');
    textoUbicacion.classList.remove('invisible');
    textoUbicacion.classList.add('visible');

    const inputs = datosCiudadano.querySelectorAll('input');
    inputs.forEach((input: HTMLInputElement) => { input.readOnly = false; });
  }

  botonEnviar.innerText = 'Confirmar edición';
  dniBusqueda.value = '';
 }

 export function confirmarUbicacion() {
  toggle(ubicacionCorrecta);
  toggle(ubicacionIncorrecta);
  toggle(botonCapturarUbicacion);
  toggle(textoUbicacion);
  setUbicacionConfirmada(true);
 }
