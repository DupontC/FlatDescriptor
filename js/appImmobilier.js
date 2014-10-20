var FlatApp = angular.module('immoApp', []);
var longitude = null;
var latitude = null;
var urlAlbum = null;

FlatApp.controller('FlatFrontOfficeCtrl',function($scope, $http, $location) {

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
           if(isNumeric(indiceID) && indiceID <= data.length-1 && data[indiceID]["enLigne"] == true){
              $scope.appartement = data[indiceID];
              latitude = $scope.appartement.latitude;
              longitude = $scope.appartement.longitude;
              urlAlbum = $scope.appartement.albumPhotos;
            }else{
              alert("Désolé ,annonce non disponible");
            }
          }
        }).
        error(function(data, status, headers, config) {
          alert("Bada Bom !"+status[0]+" "+headers[0]);
      });
  }
});

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
}

//On precise que quand la page est charge, on initialise la map Google 
window.onload = loadScript;
