    
    //la siguiente función fue actualizada completamente para solucionar el problema de los acentos        
    // fuente: https://concamilo.com/como-obtener-los-parametros-de-la-url-con-javascript/

    
    function getQueryVariable(variable) { //para obtener algún valor que se guardó en el url a través del método GET de un formulario
      var valores = window.location.search;                                                      
                
      //ALMACENAMOSEN VARIABLES 
      //Creamos la instancia
      var urlParams = new URLSearchParams(valores); //js permite

      //Accedemos a los valores
      return urlParams.get(variable);
    }

//alert(localStorage.getItem('unidad'));
