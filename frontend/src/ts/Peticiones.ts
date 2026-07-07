
import * as DOM from "./DOM.ts";
import * as Mapa from "./Mapa.ts";

const gas = (window as any)?.google?.script?.run;

export function registrarCiudadano(): void {
  if(!DOM.getUbicacionConfirmada()) {
    DOM.mensajeFormulario.innerText = 'No se confirmó la ubicación';
    return;
  }

  DOM.limpiarErrores();
  DOM.mensajeFormulario.innerText = 'Enviando...';

  const datos = DOM.obtenerDatosCiudadano(Mapa.ultimaLng, Mapa.ultimaLat);

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
    .endpointRegistrar(datos);
}

export function buscarCiudadano(): void {
  const dni = DOM.dniBusqueda.value.trim();
  if (!dni) {
    DOM.mensajes.innerText = 'Ingrese un DNI';
    return;
  }

  DOM.mensajes.innerText = 'Buscando...';

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

        DOM.navegacionEdicion(datos.estaEliminado);

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

export function editarCiudadano(): void {
  if(!DOM.getUbicacionConfirmada()) {
    DOM.mensajeFormulario.innerText = 'No se confirmó la ubicación';
    return;
  }

  DOM.limpiarErrores();
  DOM.mensajeFormulario.innerText = 'Enviando...';

  const datos = DOM.obtenerDatosCiudadano(Mapa.ultimaLng, Mapa.ultimaLat);

  if (!gas) {
    DOM.mensajeFormulario.innerText = 'Error: GAS no disponible';
    return;
  }

  gas
    .withSuccessHandler((resp: any) => {
      if (resp.exito) {
        DOM.mensajeFormulario.innerText = 'Editado correctamente';
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
    .endpointEditar(datos);
}
