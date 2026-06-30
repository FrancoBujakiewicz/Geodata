
 const SHEET_ID = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
 const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();

 const columnaId = 11;
 const rangoCiudadano = sheet.getRange(1, 1, 1, 10);
 const rangoUsuario = sheet.getRange(1, columnaId, 1, 2);

 persistenciaRegistrar(datosCiudadano, gmailRegistrador) {


 }

 persistenciaBuscar() {}
 persistenciaEditar() {}
 persistenciaEliminar() {}

 function inicializarSheet() {
 
   sheet.clear();
 
   sheet.appendRow([
    'dni', 'nombres', 'apellido', 'num_whatsapp', 
    'longitud', 'latitud', 'direccion', 'observacion', 
    'estaEliminado', 'registrador', 'registradorId', 'gmail'
   ]);

  rangoCiudadano.setFontWeight('bold');
  rangoCiudadano.setBackground('#4a86e8');
  rangoCiudadano.setHorizontalAlignment('center');
  rangoCiudadano.setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);

  rangoUsuario.setFontWeight('bold');
  rangoUsuario.setBackground('#6aa84f');
  rangoUsuario.setHorizontalAlignment('center');
  rangoUsuario.setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
 
  const CANTIDAD_FILAS = 50;

  for (let i = 0; i < CANTIDAD_FILAS; i++) {

   const filaActual = 2 + i;
   const filaAnterior = filaActual - 1;

   // Mapeo del número de fila a código ASCII
   const letraId = String.fromCharCode(64 + columnaId);
   const letraGmail = String.fromCharCode(64 + columnaId + 1);

   const formula = `=IF(${letraGmail}${filaActual}="";"";IF(ISNUMBER(${letraId}${filaAnterior});${letraId}${filaAnterior}+1;1))`;

   sheet.getRange(filaActual, columnaId).setFormula(formula);

 }

}
