    
    function getQueryVariable(variable) { //para obtener algún valor que se guardó en el url a través del método GET de un formulario
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        //alert(vars);
        for (var i=0; i < vars.length; i++) {
            var pair = vars[i].split("="); 
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return false;
    }

//alert(localStorage.getItem('unidad'));
