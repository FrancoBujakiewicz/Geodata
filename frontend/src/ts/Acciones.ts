
 import * as DOM from "./DOM.ts";
 import * as Mapa from "./Mapa.ts";
 
 let gmailRegistrador: string = '';

 export function toggle(e: HTMLElement): void

 { e.classList.toggle('visible', !e.classList.toggle('invisible')); }

 export function inicializarGmail(): void {

  const gas = (window as any).google?.script?.run;
  if (!gas) return;

  gas
   .withSuccessHandler((email: string) => { gmailRegistrador = email; })
   .withFailureHandler(() => {})
   .endpointObtenerGmail();

 }

 export function navegacionToggle() {

   toggle(DOM.busqueda);
   toggle(DOM.botonNuevoRegistro);
   toggle(DOM.contenedorBotones);
   toggle(DOM.mensajes);
   toggle(DOM.botonVolver);
   toggle(DOM.datosCiudadano);

   DOM.botonEnviar.innerText = 'Enviar';
   DOM.botonEnviar.onclick = registrarCiudadano;

 }

 export function navegacionEdicion() {

   toggle(DOM.busqueda);
   toggle(DOM.botonNuevoRegistro);
   toggle(DOM.contenedorBotones);
   toggle(DOM.mensajes);
   toggle(DOM.botonesEdicion);
   toggle(DOM.datosCiudadano);

   DOM.botonEnviar.innerText = 'Confirmar edición';

 }

  export function confirmarUbicacion() {

   toggle(DOM.ubicacionCorrecta);
   toggle(DOM.ubicacionIncorrecta);
   toggle(DOM.botonCapturarUbicacion);
   toggle(DOM.textoUbicacion);   
   DOM.setUbicacionConfirmada(true); 

 }

 export function registrarCiudadano(): void {

  if(!DOM.getUbicacionConfirmada()) {

   DOM.mensajeFormulario.innerText = 'No se confirmó la ubicación';
   return;

  }

  DOM.limpiarErrores();
  DOM.mensajeFormulario.innerText = 'Enviando...';

  const datos = DOM.obtenerDatosCiudadano(Mapa.ultimaLng, Mapa.ultimaLat);

  const gas = (window as any).google?.script?.run;
  if (!gas) {
   DOM.mensajeFormulario.innerText = 'Error: GAS no disponible';
   return;
  }

  gas
   .withSuccessHandler((resp: any) => {
    if (resp.exito) {
     DOM.mensajeFormulario.innerText = 'Registrado correctamente';
    } else {
     if (typeof resp.error === 'object') {
      DOM.mostrarErroresValidacion(resp.error);
      DOM.mensajeFormulario.innerText = 'Campos con errores';
     } else {
      DOM.mensajeFormulario.innerText = String(resp.error);
     }
  
    }
   })
   .withFailureHandler(() => {
    DOM.mensajeFormulario.innerText = 'Error de conexión';
   })
   .endpointRegistrar(datos, gmailRegistrador);

 }
