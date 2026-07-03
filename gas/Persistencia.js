
const SHEET_ID = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();

const numeroDeCampos = 9;
const rangoCiudadano = sheet.getRange(1, 1, 1, numeroDeCampos);

function persistenciaRegistrar(datosCiudadano) {
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
        _fila: i + 1
      };
    }
  }
 
  return null;

}

function persistenciaEditar(datosCiudadano, dni) {

  const ciudadanoExistente = persistenciaBuscar(dni);
 
  if (!ciudadanoExistente) {
    throw new Error(`Ciudadano con DNI: ${dni} no encontrado`);
  }
 
 if (ciudadanoExistente.estaEliminado) {
    throw new Error(`No se puede editar un ciudadano que esta eliminado`);
  }

  const fila = ciudadanoExistente._fila;
  const ciudadanoActualizado = Object.assign({}, ciudadanoExistente, datosCiudadano);
  delete ciudadanoActualizado._fila;
 
  const lock = LockService.getScriptLock();
 
  try {
    lock.waitLock(20000);
 
    sheet.getRange(fila, 1, 1, 10).setValues([[
      ciudadanoActualizado.dni,
      ciudadanoActualizado.nombres,
      ciudadanoActualizado.apellido,
      ciudadanoActualizado.numWhatsapp,
      ciudadanoActualizado.longitud,
      ciudadanoActualizado.latitud,
      ciudadanoActualizado.direccion,
      ciudadanoActualizado.observacion,
      ciudadanoActualizado.estaEliminado,
      ciudadanoActualizado.registrador
    ]]);
 
    return ciudadanoActualizado;
  } catch (error) {
    throw new Error("No se pudo editar el ciudadano");
  } finally {
    lock.releaseLock();
  }

}

function persistenciaEliminar(dni) {

  const ciudadanoExistente = persistenciaBuscar(dni);
 
  if (!ciudadanoExistente) {
    throw new Error(`Ciudadano con DNI: ${dni} no encontrado`);
  }
 
  const fila = ciudadanoExistente._fila;
  delete ciudadanoExistente._fila;

  const lock = LockService.getScriptLock();
 
  try {
    lock.waitLock(20000);
 
    sheet.getRange(fila, 9).setValue(true);
    ciudadanoExistente.estaEliminado = true;
 
    return ciudadanoExistente;
  } catch (error) {
    throw new Error("No se pudo eliminar el ciudadano");
  } finally {
    lock.releaseLock();
  }

}

function inicializarSheet() {

  sheet.clear();

  sheet.appendRow([
    'dni', 'nombres', 'apellido', 'num_whatsapp',
    'longitud', 'latitud', 'direccion', 'observacion',
    'estaEliminado'
  ]);

  rangoCiudadano.setFontWeight('bold');
  rangoCiudadano.setBackground('#4a86e8');
  rangoCiudadano.setHorizontalAlignment('center');
  rangoCiudadano.setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);

}
