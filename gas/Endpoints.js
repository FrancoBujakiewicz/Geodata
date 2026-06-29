
 // Apps Script busca una función llamada 'doGet' para servir páginas. 
 function doGet() { return HtmlService.createHtmlOutputFromFile('index');}

 function endpointRegistrar() {

  try {

   const resultado = logicaRegistar(datosCiudadano);
   return { exito: true, datos: resultado };

  } catch (error) { return { exito: false, error: error.message }; }

 }

 function endpointBuscar() {

  try {

   const resultado = logicaBuscar(dni);
   return { exito: true, datos: resultado };

  } catch (error) { return { exito: false, error: error.message }; }

 }

 function endpointEditar() {

  try {

   const resultado = logicaEditar(datosCiudadano);
   return { exito: true, datos: resultado };

  } catch (error) { return { exito: false, error: error.message }; }
  
 }

 function endpointEliminar() {

  try {

   const resultado = logicaEliminar(dni);
   return { exito: true, datos: resultado };

  } catch (error) { return { exito: false, error: error.message }; }

 }
