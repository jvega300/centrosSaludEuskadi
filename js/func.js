var jsonString = "http://opendata.euskadi.eus/contenidos/ds_localizaciones/centros_salud_en_euskadi/opendata/centros-salud.json"
var alfabeto, letras = new Array 
var arr = []
var obj = "";
var loc = []

alfabeto = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

$(function(){
    cargarJson()
    generarAlfabeto()
})

function generarAlfabeto(){
  $.each(alfabeto, function( i, letra ) {
      letras[i] = `<li><a class="${letra}_clase" href="#${letra}">${letra}</a></li> `
      $("#alfabeto").html(letras);
  })
}

function cargarJson(){
  $.ajax({url: jsonString,dataType: "jsonp", success: function() {
      //console.log("Al cargar con exito");
  },
  error: function() {
      //error en la carga
  },
  complete: function() {
      //Llamar a generar el listado
  }
  }); 
}

function listas(item){

  //Render de plantilla de listado
  let genLista = `
  <section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
    <header class="section__play-btn mdl-cell mdl-cell--3-col-desktop mdl-cell--2-col-tablet mdl-cell--4-col-phone mdl-color--teal-100 mdl-color-text--white">
    </header>
    <div class="mdl-card mdl-cell mdl-cell--9-col-desktop mdl-cell--6-col-tablet mdl-cell--4-col-phone">
      <div class="mdl-card__supporting-text">
        <h4>${item.documentName}</h4>
        Municipio: ${item.municipality}<br/>
        Tipo de Centro: ${item.sanidadCenterType}<br/>
        Dirección: ${item.address}<br/>
        Email: ${item.email}<br/>
        Teléfono: ${item.phone}<br/>
        Fax: ${item.sanidadFax}<br/><br/>
        Horario: ${item.sanidadTimeTable}<br/>
      </div>       
    </div>
  </section>`;

  return genLista
}  

function jsonCallback(json){

  //parsear el jsonp en forma de string dentro de un objeto
  obj = JSON.parse(JSON.stringify(json))
  let contador = 0;
  
  //Establever valores del objeto dentro de un array organizado
  $.each(obj, function( i, item ) {
      
    if(item.documentName.charAt(0)=='A'){
      contador ++;
      //render de la plantilla de cards de Material D.
      arr[i] = listas(item)
    }
  }) 
  
  //Ordenar el array alfabéticamente
  arr.sort();
  
  //Render del array
  $(".cartas").html(arr);
  $(".contadorResultados").html(contador+" Resultados");

  //vacio el objeto
  arr = []

}

function generarListados(){
  
  let municipio = "";
  let nombre = "";
  let glo = "";
  let lis = [];

  $.each(obj, function( i, item ) {
    municipio = String(item.municipality);
    nombre = String(item.documentName);
    lis[i] = [municipio, nombre];

  })

  lis.sort();
    
  for (let li of lis) {
    //console.log(li[0]);
    if(municipio.toLowerCase() == li[0].toLowerCase()){
      glo +=`<li class="ppoblado"><i class="material-icons">local_hospital</i><span>${li[1]}</span></li>`
    }else{
      glo += `<li class="titulo"><i class="material-icons 2x_web">location_city</i>${li[0]} </li><li class="ppoblado"><i class="material-icons">local_hospital</i><span>${li[1]}</span></li>`
    }
    municipio = li[0];
  }
  
  $(".resultadosPoblacion").html(glo);


}

function generarCartas(poblacionActual){

  let con = 0;
  $.each(obj, function( i, item ) {

    let nombre = String(item.municipality);
    nombre = nombre.toLowerCase()
    poblacionActual = poblacionActual.toLowerCase()
      
    if(nombre==poblacionActual){
      
      //guardo los nombre y localizaciones en el objeto loc
      loc[con]=[item.documentName, item.latwgs84, item.lonwgs84];
      con++;

      //render de la plantilla de cards de Material D.
      arr[i] = listas(item)

      }
    }) 
    //console.log(loc)
  $(".cartasPosicionamiento").html(arr);
  return loc;
  arr = []
}

$(document).on('click', "#apoblacion", function(e) {

  generarListados();

});

$(document).on('click', "p.ppoblado", function(e) {

  var dialog = document.querySelector('dialog');
  var showDialogButton = document.querySelector('#show-dialog');
  if (! dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
  }
  
  dialog.showModal( );
  
  dialog.querySelector('.close').addEventListener('click', function() {
    dialog.close();
  });

});

//Click en alfabeto
document.getElementById("alfabeto").addEventListener('click', function(e) {

  let contador = 0;

  $(".cartas").empty();

  $.each(obj, function( i, item ) {
    
    let nombre = item.documentName.toLowerCase()
    if(nombre.charAt(0)==e.toElement.className.charAt(0)){
      contador ++;
      arr[i] = listas(item)
    }
  }) 

  $(".cartas").html(arr);
  $(".contadorResultados").html(contador+" Resultados");

  arr = []

  } 
);

//Inicializar el mapa
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 14
  });
  var infoWindow = new google.maps.InfoWindow({map: map});

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      
      geocodeLatLng(pos.lat, pos.lng, map, infoWindow);
      
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

// Geolocalización inversa
function geocodeLatLng(lat, lng, map, infowindow) {
  var geocoder = new google.maps.Geocoder;

  var latlng = {lat, lng};

  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === 'OK') {
      if (results[1]) {
        map.setZoom(14);
        map.setCenter(new google.maps.LatLng(latlng));

        $(".posicion").html(`Te encuentras en: ${results[1].formatted_address}`);

        let coordenadasCerca =  generarCartas(results[1].address_components[0].long_name);
        
        let marker, i;
        for (i = 0; i < coordenadasCerca.length; i++) {  
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(coordenadasCerca[i][1], coordenadasCerca[i][2]),
            map: map
          });
          
          infowindow.setContent(coordenadasCerca[i][0]);
          infowindow.open(map, marker);
          
          google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
              infowindow.setContent(coordenadasCerca[i][0]);
              infowindow.open(map, marker);
            }
          })(marker, i));
        }
      } else {
        window.alert('No hay resultados');
      }
    } 
  });
}

// Geolocalización Errores
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: Falló el servicio de Geolocalización' :
    'Error: Tu navegador no soporta la Geolocalización.');
}