var arr=[],obj="",loc=[];$(document).ready(function(){$.ajax({url:"http://opendata.euskadi.eus/contenidos/ds_localizaciones/centros_salud_en_euskadi/opendata/centros-salud.json",dataType:"jsonp",success:function(){},error:function(){},complete:function(){}});var a,b=[];a=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],$.each(a,function(c,d){b[c]=`<li><a class="${d}_clase" href="#${d}">${d}</a></li> `}),$("#alfabeto").html(b)});function jsonCallback(a){obj=JSON.parse(JSON.stringify(a));let b=0;$.each(obj,function(c,d){"A"==d.documentName.charAt(0)&&(b++,arr[c]=`
        <section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
            <header class="section__play-btn mdl-cell mdl-cell--3-col-desktop mdl-cell--2-col-tablet mdl-cell--4-col-phone mdl-color--teal-100 mdl-color-text--white">
            </header>
            <div class="mdl-card mdl-cell mdl-cell--9-col-desktop mdl-cell--6-col-tablet mdl-cell--4-col-phone">
              <div class="mdl-card__supporting-text">
                <h4>${d.documentName}</h4>
                Municipio: ${d.municipality}<br/>
                Tipo de Centro: ${d.sanidadCenterType}<br/>
                Dirección: ${d.address}<br/>
                Email: ${d.email}<br/>
                Teléfono: ${d.phone}<br/>
                Fax: ${d.sanidadFax}<br/><br/>
                Horario: ${d.sanidadTimeTable}<br/>
                
              </div>
       
            </div>
       
          </section>`)}),arr.sort(),$(".cartas").html(arr),$(".contadorResultados").html(b+" Resultados"),arr=[]}function generarListados(){let a="",b="",c="",d=[];$.each(obj,function(h,j){a=j.municipality+"",b=j.documentName+"",d[h]=[a,b]}),d.sort();for(let h of d)c+=a.toLowerCase()==h[0].toLowerCase()?`<li class="ppoblado"><i class="material-icons">local_hospital</i><span>${h[1]}</span></li>`:`<li class="titulo"><i class="material-icons 2x_web">location_city</i>${h[0]} </li><li class="ppoblado"><i class="material-icons">local_hospital</i><span>${h[1]}</span></li>`,a=h[0];$(".resultadosPoblacion").html(c)}function generarCartas(a){let b=0;return $.each(obj,function(c,d){let f=d.municipality+"";f=f.toLowerCase(),a=a.toLowerCase(),f==a&&(loc[b]=[d.documentName,d.latwgs84,d.lonwgs84],b++,arr[c]=`
      <section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
          <header class="section__play-btn mdl-cell mdl-cell--3-col-desktop mdl-cell--2-col-tablet mdl-cell--4-col-phone mdl-color--teal-100 mdl-color-text--white">
          </header>
          <div class="mdl-card mdl-cell mdl-cell--9-col-desktop mdl-cell--6-col-tablet mdl-cell--4-col-phone">
            <div class="mdl-card__supporting-text">
              <h4>${d.documentName}</h4>
                Municipio: ${d.municipality}<br/>
                Tipo de Centro: ${d.sanidadCenterType}<br/>
                Dirección: ${d.address}<br/>
                Email: ${d.email}<br/>
                Teléfono: ${d.phone}<br/>
                Fax: ${d.sanidadFax}<br/><br/>
                Horario: ${d.sanidadTimeTable}<br/>
            </div>
            <div class="mdl-card__actions">
              <a href="#" class="mdl-button">${d.address}</a>
            </div>
          </div>
          <ul class="mdl-menu mdl-js-menu mdl-menu--bottom-right" for="btn1">
            <li class="mdl-menu__item">Lorem</li>
            <li class="mdl-menu__item" disabled>Ipsum</li>
            <li class="mdl-menu__item">Dolor</li>
          </ul>
        </section>`)}),$(".cartasPosicionamiento").html(arr),loc}$(document).on("click","#apoblacion",function(){generarListados()}),$(document).on("click","p.ppoblado",function(){var b=document.querySelector("dialog"),c=document.querySelector("#show-dialog");b.showModal||dialogPolyfill.registerDialog(b),b.showModal(),b.querySelector(".close").addEventListener("click",function(){b.close()})}),document.getElementById("alfabeto").addEventListener("click",function(a){let b=0;$(".cartas").empty(),$.each(obj,function(c,d){let f=d.documentName.toLowerCase();f.charAt(0)==a.toElement.className.charAt(0)&&(b++,arr[c]=`
        <section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
            <header class="section__play-btn mdl-cell mdl-cell--3-col-desktop mdl-cell--2-col-tablet mdl-cell--4-col-phone mdl-color--teal-100 mdl-color-text--white">
            </header>
            <div class="mdl-card mdl-cell mdl-cell--9-col-desktop mdl-cell--6-col-tablet mdl-cell--4-col-phone">
              <div class="mdl-card__supporting-text">
                <h4>${d.documentName}</h4>
                Municipio: ${d.municipality}<br/>
                Tipo de Centro: ${d.sanidadCenterType}<br/>
                Dirección: ${d.address}<br/>
                Email: ${d.email}<br/>
                Teléfono: ${d.phone}<br/>
                Fax: ${d.sanidadFax}<br/><br/>
                Horario: ${d.sanidadTimeTable}<br/>
              </div>
            </div>
            
          </section>`)}),$(".cartas").html(arr),$(".contadorResultados").html(b+" Resultados"),arr=[]},!1);function initMap(){var a=new google.maps.Map(document.getElementById("map"),{center:{lat:-34.397,lng:150.644},zoom:14}),b=new google.maps.InfoWindow({map:a});navigator.geolocation?navigator.geolocation.getCurrentPosition(function(c){var d={lat:c.coords.latitude,lng:c.coords.longitude};geocodeLatLng(d.lat,d.lng,a,b)},function(){handleLocationError(!0,b,a.getCenter())}):handleLocationError(!1,b,a.getCenter())}function geocodeLatLng(a,b,c,d){var f=new google.maps.Geocoder,g={lat:a,lng:b};f.geocode({location:g},function(h,j){if("OK"===j)if(h[1]){c.setZoom(14),c.setCenter(new google.maps.LatLng(g)),$(".posicion").html(`Te encuentras en: ${h[1].formatted_address}`);let l,m,k=generarCartas(h[1].address_components[0].long_name);for(m=0;m<k.length;m++)l=new google.maps.Marker({position:new google.maps.LatLng(k[m][1],k[m][2]),map:c}),d.setContent(k[m][0]),d.open(c,l),google.maps.event.addListener(l,"click",function(n,o){return function(){d.setContent(k[o][0]),d.open(c,n)}}(l,m))}else window.alert("No hay resultados")})}function handleLocationError(a,b,c){b.setPosition(c),b.setContent(a?"Error: Fall\xF3 el servicio de Geolocalizaci\xF3n":"Error: Tu navegador no soporta la Geolocalizaci\xF3n.")}