
const SHEET_ID = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();

const rangoCiudadano = sheet.getRange(1, 1, 1, 10);

function persistenciaRegistrar(datosCiudadano, gmailRegistrador) {

  lock = LockService.getScriptLock();

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

  } catch (error) {

    throw new Error("No se pudo obtener el bloqueo");
    
  } finally { lock.releaseLock(); }

  return datosCiudadano;

}

function persistenciaBuscar(dni) {}
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
