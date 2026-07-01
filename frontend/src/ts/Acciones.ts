
 import * as DOM from "./DOM.ts";
 
 export function toggle(e: HTMLElement): void

 { e.classList.toggle('visible', !e.classList.toggle('invisible')); }

 export function navegacionToggle() {

   toggle(DOM.busqueda);
   toggle(DOM.botonNuevoRegistro);
   toggle(DOM.contenedorBotones);
   toggle(DOM.mensajes);
   toggle(DOM.botonVolver);
   toggle(DOM.datosCiudadano);

 }

 export function navegacionEdicion() {

   toggle(DOM.busqueda);
   toggle(DOM.botonNuevoRegistro);
   toggle(DOM.contenedorBotones);
   toggle(DOM.mensajes);
   toggle(DOM.botonesEdicion);
   toggle(DOM.datosCiudadano);

 }