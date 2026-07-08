
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import iconUrl from 'leaflet/dist/images/marker-icon.png'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

import * as DOM from './DOM.ts'
import { toggle } from './DOM.ts'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl })

let map: L.Map | null = null
let marker: L.Marker | null = null
export let ultimaLat: number = 0
export let ultimaLng: number = 0

export function capturarUbicacion(): void {

  DOM.textoUbicacion.classList.add('visible');
  DOM.textoUbicacion.classList.remove('invisible');

  DOM.textoUbicacion.innerText = "Capturando ubicación...";

  if (!navigator.geolocation) {
    alert('La geolocalización no está disponible en este navegador.')
    return
  }

  DOM.inhabilitar(DOM.botonCapturarUbicacion);
  DOM.inhabilitar(DOM.botonEnviar);
  DOM.inhabilitar(DOM.botonEliminar);
  DOM.inhabilitar(DOM.cancelar);
  DOM.inhabilitar(DOM.botonVolver);
  DOM.inhabilitar(DOM.edicionVolver);

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      DOM.habilitar(DOM.botonCapturarUbicacion);
      ultimaLat = pos.coords.latitude
      ultimaLng = pos.coords.longitude
      inicializarMapa(ultimaLat, ultimaLng)
    },
    (error) => {
      DOM.habilitar(DOM.botonCapturarUbicacion);
      DOM.habilitar(DOM.botonEnviar);
      DOM.habilitar(DOM.botonEliminar);
      DOM.habilitar(DOM.cancelar);
      DOM.habilitar(DOM.botonVolver);
      DOM.habilitar(DOM.edicionVolver);

      if (error.code === error.PERMISSION_DENIED) {
        DOM.textoUbicacion.innerText = "Habilite permiso de ubicación";
      } else {
        DOM.textoUbicacion.innerText = "No se pudo obtener la ubicación";
      }
    },
    { enableHighAccuracy: true }
  )

}

export function reintentar(): void {
  DOM.ubicacionCorrecta.classList.add('invisible');
  DOM.ubicacionCorrecta.classList.remove('visible');
  DOM.ubicacionIncorrecta.classList.add('invisible');
  DOM.ubicacionIncorrecta.classList.remove('visible');
  capturarUbicacion()
}

export function resetMapa(): void {
  if (map) {
    map.remove();
    map = null;
    marker = null;
  }
  ultimaLat = 0;
  ultimaLng = 0;
  DOM.setUbicacionConfirmada(false);

  DOM.textoUbicacion.innerText = 'Presione "Capturar ubicación"';

  DOM.botonCapturarUbicacion.classList.remove('invisible', 'visible');
  DOM.ubicacionCorrecta.classList.remove('visible');
  DOM.ubicacionCorrecta.classList.add('invisible');
  DOM.ubicacionIncorrecta.classList.remove('visible');
  DOM.ubicacionIncorrecta.classList.add('invisible');

}

export function establecerUbicacion(lat: number, lng: number): void {
  ultimaLat = lat;
  ultimaLng = lng;

  if (map) {
    map.setView([lat, lng], 16);
    if (marker) marker.setLatLng([lat, lng]);
  } else {
    map = L.map(DOM.mapa, { center: [lat, lng], zoom: 16, zoomControl: true });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    marker = L.marker([lat, lng]).addTo(map);
    setTimeout(() => map?.invalidateSize(), 200);
  }

  DOM.setUbicacionConfirmada(true);
}

function inicializarMapa(lat: number, lng: number): void {
  if (map) {
    map.setView([lat, lng], 16);
    if (marker) marker.setLatLng([lat, lng]);
    DOM.botonCapturarUbicacion.classList.remove('visible');
    DOM.botonCapturarUbicacion.classList.add('invisible');
    DOM.ubicacionCorrecta.classList.remove('invisible');
    DOM.ubicacionCorrecta.classList.add('visible');
    DOM.ubicacionIncorrecta.classList.remove('invisible');
    DOM.ubicacionIncorrecta.classList.add('visible');
    DOM.textoUbicacion.innerText = "¿La ubicación es correcta?";
    return;
  }

  map = L.map(DOM.mapa, { center: [lat, lng], zoom: 16, zoomControl: true })

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map)

  marker = L.marker([lat, lng]).addTo(map)

  setTimeout(() => map?.invalidateSize(), 200)

  toggle(DOM.botonCapturarUbicacion);
  toggle(DOM.ubicacionCorrecta);
  toggle(DOM.ubicacionIncorrecta);
  DOM.textoUbicacion.innerText = "¿La ubicación es correcta?";

}
