
 // Apps Script busca una función llamada 'doGet' para servir páginas. 
 function doGet() { return HtmlService.createHtmlOutputFromFile('index');}

 function endpointRegistrar(datosCiudadano, gmailRegistrador) {

  try {

   const resultado = logicaRegistar(datosCiudadano, gmailRegistrador);
   return { exito: true, datos: resultado };

  } catch (error) { return { exito: false, error: error.message }; }

 }

 function endpointBuscar(dni) {

  try {

   const resultado = logicaBuscar(dni);
   return { exito: true, datos: resultado };

  } catch (error) { return { exito: false, error: error.message }; }

 }

 function endpointEditar(datosCiudadano) {

  try {

   const resultado = logicaEditar(datosCiudadano);
   return { exito: true, datos: resultado };

  } catch (error) { return { exito: false, error: error.message }; }
  
 }

 function endpointEliminar(dni) {

  try {

   const resultado = logicaEliminar(dni);
   return { exito: true, datos: resultado };

  } catch (error) { return { exito: false, error: error.message }; }

 }
