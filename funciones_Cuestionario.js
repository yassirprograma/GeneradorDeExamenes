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


