
import './css/style.css';
import './css/busqueda.css';
import './css/campos.css';
import './css/botones.css';
import './css/contenedorPrincipal.css';
import './css/visibilidad.css';

import * as DOM from "./ts/DOM.ts";
import * as Peticiones from "./ts/Peticiones.ts";
import * as Mapa from "./ts/Mapa.ts";

window.addEventListener("DOMContentLoaded", async () => {
  DOM.init();
  DOM.botonBuscar.onclick = Peticiones.buscarCiudadano;
});

(window as any).Peticiones = Peticiones;
(window as any).DOM = DOM;
(window as any).Mapa = Mapa;
