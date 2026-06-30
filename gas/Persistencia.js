
const SHEET_ID = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();

const rangoCiudadano = sheet.getRange(1, 1, 1, 10);

function persistenciaRegistrar(datosCiudadano, gmailRegistrador) {
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(20000);

    sheet.appendRow([
      datosCiudadano.dni,
      datosCiudadano.nombres,
      datosCiudadano.apellido,
      datosCiudadano.numWhatsapp,
      datosCiudadano.longitud,
      datosCiudadano.latitud,
      datosCiudadano.direccion,
      datosCiudadano.observacion,
      false, // estaEliminado
      gmailRegistrador
    ]);

    return datosCiudadano;
  } catch (error) {
    throw new Error("No se pudo registrar el ciudadano");
  } finally {
    lock.releaseLock();
  }
}

function persistenciaBuscar(dni) {

  const datos = sheet.getDataRange().getValues();
 
  for (let i = 1; i < datos.length; i++) {
    
    const fila = datos[i];
 
    if (String(fila[0]) === String(dni)) {
      return {
        dni: fila[0],
        nombres: fila[1],
        apellido: fila[2],
        numWhatsapp: fila[3],
        longitud: fila[4],
        latitud: fila[5],
        direccion: fila[6],
        observacion: fila[7],
        estaEliminado: fila[8],
        registrador: fila[9]
      };
    }
  }
 
  return null;

}

function persistenciaEditar(datosCiudadano) {}
function persistenciaEliminar(dni) {}

function inicializarSheet() {

  sheet.clear(); // DEJA LA SHEET EN BLANCO!

  sheet.appendRow([
    'dni', 'nombres', 'apellido', 'num_whatsapp',
    'longitud', 'latitud', 'direccion', 'observacion',
    'estaEliminado', 'registrador'
  ]);

  rangoCiudadano.setFontWeight('bold');
  rangoCiudadano.setBackground('#4a86e8');
  rangoCiudadano.setHorizontalAlignment('center');
  rangoCiudadano.setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);

}
