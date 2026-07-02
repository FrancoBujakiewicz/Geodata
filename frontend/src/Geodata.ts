
import './css/style.css';
import './css/busqueda.css';
import './css/campos.css';
import './css/botones.css';
import './css/contenedorPrincipal.css';
import './css/visibilidad.css';

import * as DOM from "./ts/DOM.ts";
import * as Acciones from "./ts/Acciones.ts";
import * as Mapa from "./ts/Mapa.ts";

 window.addEventListener("DOMContentLoaded", async () => { DOM.init(); Acciones.inicializarGmail(); });

(window as any).Acciones = Acciones;
(window as any).Mapa = Mapa;

