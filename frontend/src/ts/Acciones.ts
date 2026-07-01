
 import * as DOM from "./DOM.ts";
 
 export function toggle(e: HTMLElement): void

 { e.classList.toggle('visible', !e.classList.toggle('invisible')); }

 export function navegacionToggle() {

   toggle(DOM.busqueda);
   toggle(DOM.botonNuevoRegistro);
   toggle(DOM.contenedorBotones);
   toggle(DOM.mensajes);
   toggle(DOM.datosCiudadano);

 }
