function select_id(id){
      return document.getElementById(id); //permite obtener una etiqueta por id, dentro del documento html
}

function style(id){
      return select_id(id).style;
}

function readText(ruta_local){
      //función para leer texto de un documento de manera asíncrona

      var text0=null;
      var xmlhttp=new XMLHttpRequest();
      xmlhttp.open("GET", ruta_local, false);
      xmlhttp.send();
      if(xmlhttp.status==200){
            texto=xmlhttp.responseText;
      }

      return texto;

}


//aquí empiezan las funciones para obtener los cuestionarios

function cargaBasePreguntas (unidad){ //devuelve un arreglo con las preguntas de toda la base de preguntas
      let base_preguntas=readText("unidad"+unidad+"_preguntas.json"); //guardo en un objeto la base de preguntas completa
      let preguntas_interpretadas=JSON.parse(base_preguntas); //arreglo con preguntas, es 0-indexado y ya formateado

      return preguntas_interpretadas;
}

function verpreguntasconsola(unidad){
      console.log(cargaBasePreguntas (unidad)); //muestra en la consola todo el archivo JSON
}

function escogerPregunta(x,unidad){ //escoge la x-ésima preungta de alguna unidad
      
      let preguntas_interpretadas=cargaBasePreguntas (unidad); //arreglo con preguntas, es 0-indexado
      let question=preguntas_interpretadas[x]; 

      return question;
}

function generar_N_Preguntas_Aleatorias(n, unidad){ //obtiene aleatoriamente n preguntas de determinada unidad
      let numdepreguntasjson=cargaBasePreguntas(unidad).length; //el número de preguntas que tiene ese archivo
      let pregs_cuestionario=[]; 
      let pregs_id=new Set(); //Sirve para marcar preguntas usadas o ya visitadas

      while(pregs_id.size<n){ 
            let x = Math.floor(Math.random()*(numdepreguntasjson-1)); //genera un numero aleatorio entre 0 y otro número entero
            let pregunta=escogerPregunta(x,unidad);
      
            if(!pregs_id.has(pregunta.idpregunta)){ //si no está visitada esa pregunta
                  //console.log(pregunta);
                  pregs_cuestionario.push(pregunta); //la podemos meter
                  pregs_id.add(pregunta.idpregunta);
            }
            
            
      }

      //console.log(pregs_cuestionario);
      return pregs_cuestionario; //devolvemos el arreglo con los objetos "preguntas"
      
}

//del arreglo que se devuelve debo poder ponerlas en el HTML, luego sacar otro arreglo con las puras respuestas correctas


function escribepreguntas(quizz){ 
      for(var i=0;i< quizz.length;i++){
            
            let question=quizz[i]; 
            //console.log(question);
            x=i+1; //1-indexado
            

            
            select_id("desc_preg"+x.toString()).innerHTML=("<h2>"+question.pregunta+"</h2>");
            select_id("img_preg"+x.toString()).setAttribute("src", question.imagen);
            if(question.imagen==="#")select_id("img_preg"+x.toString()).style.display="none";
            
      
      

            select_id("label_a_preg"+x.toString()).innerHTML+=(" "+question.op_a);
            select_id("img_a_preg"+x.toString()).setAttribute("src", question.img_a);
            if(question.img_a==="#")select_id("img_a_preg"+x.toString()).style.display="none";

            select_id("label_b_preg"+x.toString()).innerHTML+=(" "+question.op_b);
            select_id("img_b_preg"+x.toString()).setAttribute("src", question.img_b);
            if(question.img_b==="#")select_id("img_b_preg"+x.toString()).style.display="none";

            select_id("label_c_preg"+x.toString()).innerHTML+=(" "+question.op_c);
            select_id("img_c_preg"+x.toString()).setAttribute("src", question.img_c);
            if(question.img_c==="#")select_id("img_c_preg"+x.toString()).style.display="none";

            select_id("label_d_preg"+x.toString()).innerHTML+=(" "+question.op_d);      
            select_id("img_d_preg"+x.toString()).setAttribute("src", question.img_d);
            if(question.img_d==="#")select_id("img_d_preg"+x.toString()).style.display="none";
            

      }            
}


function obtenerSolución(quizz){ //devuelve un arreglo con la solución al cuestionario
      let arreglorespuestas=[];

      for (let i = 0; i < quizz.length; i++) {
            let res=quizz[i].respuesta;
            arreglorespuestas.push(res);
      }
      return arreglorespuestas;
}

function obtenerPreguntasCorrectas(){
      /*Devuelve un arreglo con las preguntas que fueron 
       contestadas correctamente, a cada indice se le asigna un 1 si es correcta
       y 0 si fue incorrecta, esto se usará para poder asignar color a las preguntas
      */

      let preguntasCorrectas = [];

      for(let i = 0; i< CuestionarioAleatorio.length; i++ ){

            let respuestaUsuario = CuestionarioAleatorio[i].respuesta;
            let respuestaCorrecta = RespuestasCorrectas[i];

            if(respuestaUsuario == respuestaCorrecta)
                  preguntasCorrectas.push(0);
            else
                  preguntasCorrectas.push(1);
      }
      return preguntasCorrectas;
}

function calificar(RespuestasUsuario, RespuestasCorrectas){

      let calificacion = 0;

      for(let i = 0; i< RespuestasUsuario.length; i++ ){

            let respuestaUsuario = RespuestasUsuario[i];
            let respuestaCorrecta = RespuestasCorrectas[i];

            if(respuestaUsuario === respuestaCorrecta)
                  calificacion++;

      }
      return " " + calificacion;
}


function mostrarRespuesta(n, CuestionarioAleatorio){ //funcion de testeo para mostrar respuesta correcta
      return CuestionarioAleatorio[n].respuesta;
}


function obtenerRespuestasUsuario(numPreguntasAleatorias){


      let nombre_pregunta, respuestaUsuario, opcionesPregunta;
      let respuestas_usuario = []; //Arreglo para guardar las respuestas del usuario
    
      for(let i = 0; i<numPreguntasAleatorias; i++){
       
            nombre_pregunta = 'resp_preg' + (i+1); //Obtenemos el nombre
            opcionesPregunta = document.getElementsByName(nombre_pregunta); //Guardamos las cuatro respuestas de la pregunta

            for(let j = 0; j < opcionesPregunta.length; j++){  //Con este for vemos cual es la que está seleccionada
              if(opcionesPregunta[j].checked )
                 respuestaUsuario = opcionesPregunta[j].value;
            }

            respuestas_usuario.push(respuestaUsuario); //Si la respuesta está seleccionada, la agregamos al arreglo
            
      }

      return respuestas_usuario;

}

function verificarRadios(numPreguntasAleatorias){

      let nombre_pregunta, opcionesPregunta;
      let preguntasContestadas = 0;

      for(let i = 0; i<numPreguntasAleatorias; i++){
       
            nombre_pregunta = 'resp_preg' + (i+1); //Obtenemos el nombre
            opcionesPregunta = document.getElementsByName(nombre_pregunta); //Guardamos las cuatro respuestas de la pregunta

            for(let j = 0; j < opcionesPregunta.length; j++)  //Con este for vemos cual es la que está seleccionada
                  if(opcionesPregunta[j].checked )
                        ++preguntasContestadas;      
      }
      return numPreguntasAleatorias === preguntasContestadas;
}


function escribeResultados(resultado){
      
      //console.log(respuestas_usuario); //muestra el arreglo respuestas_usuario

      select_id("resultados_div").innerHTML = ""; //Esto es necesario para que cada vez que pulsemos el botón se quite lo anterior                
      select_id("header_resultados").innerHTML=("Resultados del test de la unidad "+unidad);
      select_id("resultados_div").innerHTML+=("<p > Has obtenido una calificación de " + resultado+ " / " +  numPreguntasAleatorias + "</p>");
  }


  function marcarRespuestas(numPreguntasAleatorias, respuestas_usuario, RespuestasCorrectas){

      let nombre_pregunta, opcionesPregunta, respuestaUsuario;
      

      for(let i = 0; i<numPreguntasAleatorias; i++){
       
            id_pregunta = 'preg' + (i+1); //Obtenemos el nombre
            pregunta = document.getElementById(id_pregunta); //

           
            if(respuestas_usuario[i]===RespuestasCorrectas[i] )
                   pregunta.style.backgroundColor = '#90ee90';        
            else
                   pregunta.style.backgroundColor = '#ffa07a';        

            
            
      
      
      }

}