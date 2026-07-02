
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

 export function buscarCiudadano(): void {

  const dni = DOM.dniBusqueda.value.trim();
  if (!dni) {
   DOM.mensajes.innerText = 'Ingrese un DNI';
   return;
  }

  DOM.mensajes.innerText = 'Buscando...';

  const gas = (window as any).google?.script?.run;
  if (!gas) {
   DOM.mensajes.innerText = 'Error: GAS no disponible';
   return;
  }

  gas
   .withSuccessHandler((resp: any) => {
    DOM.mensajes.innerText = '';
    if (resp.exito) {
     const datos = resp.datos;
     DOM.dni.value = datos.dni || '';
     DOM.apellido.value = datos.apellido || '';
     DOM.nombres.value = datos.nombres || '';
     DOM.numWhatsapp.value = datos.numWhatsapp || '';
     DOM.direccion.value = datos.direccion || '';
     DOM.observacion.value = datos.observacion || '';

     navegacionEdicion();

     if (datos.latitud && datos.longitud) {
      Mapa.establecerUbicacion(Number(datos.latitud), Number(datos.longitud));
     }
    } else {
     DOM.mensajes.innerText = resp.error || 'No se encontró el DNI';
    }
   })
   .withFailureHandler(() => {
    DOM.mensajes.innerText = 'Error de conexión';
   })
   .endpointBuscar(dni);

 }
