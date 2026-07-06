
 function doGet() { 

  var page = HtmlService.createHtmlOutputFromFile('index'); 
  page.addMetaTag('viewport', 'width=device-width, initial-scale=0.85, maximum-scale=0.85, minimum-scale=0.85, user-scalable=no');
  return page;

}

function endpointRegistrar(datosCiudadano) {
  try {
    return logicaRegistar(datosCiudadano);
  } catch (error) {
    return { exito: false, error: error.message };
  }
}

function endpointBuscar(dni) {
  try {
    const resultado = logicaBuscar(dni);
    return { exito: true, datos: resultado };
  } catch (error) {
    return { exito: false, error: error.message };
  }
}

function endpointEditar(datosCiudadano) {
  try {
    return logicaEditar(datosCiudadano);
  } catch (error) {
    return { exito: false, error: error.message };
  }
}

function endpointEliminar(dni) {
  try {
    const resultado = logicaEliminar(dni);
    return { exito: true, datos: resultado };
  } catch (error) {
    return { exito: false, error: error.message };
  }
}