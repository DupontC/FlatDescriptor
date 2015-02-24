var FlatApp = angular.module('immoApp', []);
var longitude = null;
var latitude = null;
var urlAlbum = null;
var photosphere = null;
var browsers = {chrome: /chrome/i, safari: /safari/i, firefox: /firefox/i, ie: /internet explorer/i};

FlatApp.controller('FlatFrontOfficeCtrl',function($browser ,$scope, $http, $location, $window) {

  //on recupére l'id de l'annonce
  var url = $location.absUrl();
  var param = url.split("/");
  var indiceID = param[param.length-1];

  if(isNumeric(indiceID)) {
      //on demande au serveur les informations sur l'annonce en ajax
      $http({method: 'GET', url: 'data/'+indiceID}).
        success(function(data, status, headers, config) {
          //si les données sont retourée au match avec notre object Angular
          if(null != data && null != indiceID){
          if(isNumeric(indiceID) && data[0]["enLigne"] == true){
              $scope.appartement = data[0];
              $("body").css('background-color', $scope.appartement.color);
              latitude = $scope.appartement.latitude;
              longitude = $scope.appartement.longitude;
              urlAlbum = $scope.appartement.albumPhotos;
              urlPS = $scope.appartement.photosphere;

              //on maj les info sur la photosphere si present
              if(urlPS != null && urlPS != ""){
                navigateur = null;
                userAgent = $window.navigator.userAgent;

                for(var key in browsers) {
                    if (browsers[key].test(userAgent)){
                      navigateur = key;
                    }
                 };
                if(navigateur != "chrome"){
                  photosphere = urlPS;
                }
              }
              //on recharge la page avec les données  pour la map et flirk
              loadScript();
            }else{
              alert("Désolé ,annonce non disponible");
            }
          }
        }).
        error(function(data, status, headers, config) {
          alert("Bada Bom !"+status[0]+" "+headers[0]);
      });
  }//END IS NUMERIC
});//END CONTROLER

/**
* Fonction que vérifie si la variable passé en parametres est de type numérique
**/
function isNumeric(obj) {
    return !isNaN(parseFloat(obj)) && isFinite(obj);
}

/**
*Initilisation de la cartographie et du carousel
**/
function initialize() {

  /**
  * CONFIGURATION GOOGLE MAP
  **/
  //variables pour la mise en place des variable pour la direction
  if(null != longitude && null != latitude && null != urlAlbum){

    //on place l'adresse url de notre album photo
    document.getElementById("album").src = urlAlbum;
    //variables pour la mise en place des variable pour la direction
    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    //google map
    var map;
    var mapOptions = {
      zoom: 15,
      center: new google.maps.LatLng(latitude, longitude)
    };

    map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);
    //on le place sur la map
    var newLatLng =  new google.maps.LatLng(latitude, longitude);

    //on place un merker sur sa posotion
    marker = new google.maps.Marker({
      position: newLatLng,
      map: map,
      animation: google.maps.Animation.BOUNCE,
      draggable: false
    });

    //on lui ajoute une infowindow lors du clic sur le point rouge
    marker['infowindow'] = new google.maps.InfoWindow({
      content: "<span style='color : black'>Ici l'adress</span>"
    });
    google.maps.event.addListener(marker, 'click', function() {
      this['infowindow'].open(map, this);
    });
  }

  /**
  * CONFIGURATION DE LA PHOTOSPHERE
  **/
  if(photosphere != null){
    var divPS = document.getElementById('photosphere');
    var PSV = new PhotoSphereViewer({
      panorama: photosphere,
      container: divPS,
      anim_speed: '1rpm',
      loading_img: "Chargement de l'image"
    });
  }
}


/**
* Fonction de chargement de l'api Google Map
**/
function loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' +
    'callback=initialize';
    document.body.appendChild(script);
    setUpCheet();
}

/**
* Fonction d'initialisation des cheets ;-)
**/
function setUpCheet(){
  cheet('↑ ↑ ↓ ↓ ← → ← → b a', function () {
    document.location.href="https://www.youtube.com/v/gr4IxMgHdDY"
  });
  cheet('g r o s n o u n o u r s', function () {
    alert('Gloire à Gros Nounours');
  });
}
