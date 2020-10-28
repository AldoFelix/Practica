var imageObj=[], imagenC=[];
var i=0;
var cartas;
array=[];
 function generaPlantilla(strings,...keys){

 return function(data){

        let temp = strings.slice(); //hace una copia de strings en temp

        keys.forEach( ( key, i ) => {
            if(key==='img')
              temp[ i ] = temp[ i ] + "images/"+data[ key ];
            else
            temp[ i ] = temp[ i ] + data[ key ];
        } );

        return temp.join( '' );
    }

}

var itemTemplate=generaPlantilla`<div class="cajaItem"><img  class="imagen" alt="${ 'nombre' }" src="${ 'img' }">
                                 <aside><br><br><br></aside>${'nombre'}<br><br><br></aside></div><br><br><br><br>
                                 <button onclick="agregarFavorito()">Favorito</button><br><br><br><br><br><br><br>
                                 <center><div class="separador"><button class="btn" onclick="anterior()">Anterior</button>
                                 <button class="btn" onclick="siguiente()">Siguiente</button><br></div></center><br><br>
                                 <center><div class="cajaDescripcion">
                                 ${'descripcion'}
                                 </div></center>`

function lee_json() {
            $.getJSON("files/cartas.json", datos=> {
                cartas=datos.cartas;
                console.log(cartas);
                var lista=document.getElementById("contenedorA01");
                let item=document.createElement("div");
                item.innerHTML=itemTemplate(datos.cartas[i])
                lista.appendChild(item);
            }).fail(() => console.log( "error" ) );
}



function agregarFavorito(){

    var lista=document.getElementById("lista");
    bandera=false;
    indice=0;
    lis=lista.getElementsByTagName("a");
    for(j=0; j<lis.length; j++){

        if(lis[j].innerHTML==cartas[i].nombre){
            bandera=true;
            indice=j;
        }
    }
    if(bandera){
       item=document.getElementById("lista").getElementsByTagName('li');
       item[indice].remove();
    }else{

        let item=document.createElement("li");
        link=document.createElement("a");
        link.setAttribute("href", "#");
        link.setAttribute("onclick", "cargar(this.innerHTML);");
        nom=document.createTextNode(cartas[i].nombre);
        link.appendChild(nom);
        item.appendChild(link);
        lista.appendChild(item);
    }

}

function siguiente(){


      if(i<cartas.length-1){
          i=i+1;
      }else{
          i=0;
      }
      restablecer();
      lee_json();
}

function anterior(){
    if(i>0){
        i=i-1;
    }else{
       i=cartas.length-1;
    }
    restablecer();
    lee_json();
}

function restablecer(){
  lista=document.getElementById("contenedorA01");
  item=document.getElementById("contenedorA01").getElementsByTagName('div');
  item[1].remove();
}

function cargar(cadena){
    var indice;
    var lista=document.getElementById("lista");
    lis=lista.getElementsByTagName("a");
    for(j=0; j<cartas.length; j++){
        if(cartas[j].nombre==cadena){
        indice=j;
        }
    }
    i=indice;
    restablecer();
    lee_json();

}
