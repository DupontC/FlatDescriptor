var FlatApp = angular.module('immoApp', []);
var longitude = null;
var latitude = null;
var urlAlbum = null;
FlatApp.controller('FlatFrontOfficeCtrl',function($scope, $http, $location) {

    $http({method: 'GET', url: './immo.json'}).
      success(function(data, status, headers, config) {

        data = [
        {
            "enLigne" : false,
            "ville" : "Caen",
            "titre1" : "Lemon drops",
            "texte1" : "Fruitcake toffee jujubes. Topping biscuit sesame snaps jelly caramels jujubes tiramisu fruitcake. Marzipan tart lemon drops chocolate sesame snaps jelly beans.",
            "image1": "../images/1.png",
            "titre2" : "Plum caramels",
            "texte2" : "Lollipop powder danish sugar plum caramels liquorice sweet cookie. Gummi bears caramels gummi bears candy canes cheesecake sweet roll icing dragée. Gummies jelly-o tart. Cheesecake unerdwear.com candy canes apple pie halvah chocolate tiramisu.",
            "image2" : "../images/2.png",
            "titre3" : "Marzipan gingerbread",
            "texte3" : "Soufflé bonbon jelly cotton candy liquorice dessert jelly bear claw candy canes. Pudding halvah bonbon marzipan powder. Marzipan gingerbread sweet jelly.",
            "image3" : "../images/3.png",
            "titre4" : "Carrot cake",
            "texte4" : "Sesame snaps sweet wafer danish. Chupa chups carrot cake icing donut halvah bonbon. Chocolate cake candy marshmallow pudding dessert marzipan jujubes sugar plum.",
            "image4" : "../images/4.png",
            "emplacement":"Sesame snaps sweet wafer danish. Chupa chups carrot cake icing donut halvah bonbon. Chocolate cake candy marshmallow pudding dessert marzipan jujubes sugar plum.",
            "latitude" : "45.7593",
            "longitude" : "4.8431",
            "adresse" : "15 rue de la Part-Dieu 69003 LYON",
            "photos":"Cake cotton candy lollipop. Cake croissant cheesecake candy sugar plum icing apple pie wafer. Pie sugar plum tiramisu tiramisu pie fruitcake candy icing. Candy icing gummies gummies cheesecake brownie lemon drops chocolate gingerbread.",
            "albumPhotos" : "https://www.flickr.com/photos/125729062@N07/14522173061/player/3931c36915",
            "contacts":"Cake cotton candy lollipop. Cake croissant cheesecake candy sugar plum icing apple pie wafer. Pie sugar plum tiramisu tiramisu pie fruitcake candy icing. Candy icing gummies gummies cheesecake brownie lemon drops chocolate gingerbread."
          },
          {
            "enLigne" : true,
            "ville" : "Caen",
            "localisation" : "15 rue de la Part-Dieu",
            "titre1" : "Lemon drops",
            "texte1" : "Fruitcake toffee jujubes. Topping biscuit sesame snaps jelly caramels jujubes tiramisu fruitcake. Marzipan tart lemon drops chocolate sesame snaps jelly beans.",
            "image1": "../images/1.png",
            "titre2" : "Plum caramels",
            "texte2" : "Lollipop powder danish sugar plum caramels liquorice sweet cookie. Gummi bears caramels gummi bears candy canes cheesecake sweet roll icing dragée. Gummies jelly-o tart. Cheesecake unerdwear.com candy canes apple pie halvah chocolate tiramisu.",
            "image2" : "../images/2.png",
            "titre3" : "Marzipan gingerbread",
            "texte3" : "Soufflé bonbon jelly cotton candy liquorice dessert jelly bear claw candy canes. Pudding halvah bonbon marzipan powder. Marzipan gingerbread sweet jelly.",
            "image3" : "../images/3.png",
            "titre4" : "Carrot cake",
            "texte4" : "Sesame snaps sweet wafer danish. Chupa chups carrot cake icing donut halvah bonbon. Chocolate cake candy marshmallow pudding dessert marzipan jujubes sugar plum.",
            "image4" : "../images/4.png",
            "titre5" : "Pudding lollipop",
            "texte5" : "Chupa chups pudding lollipop gummi bears gummies cupcake pie. Cookie cotton candy caramels. Oat cake dessert applicake. Sweet roll tiramisu sweet roll sweet roll.",
            "image5" : "../images/5.png",
            "titre6" : "Soufflé bonbon",
            "texte6" : "Cake cotton candy lollipop. Cake croissant cheesecake candy sugar plum icing apple pie wafer. Pie sugar plum tiramisu tiramisu pie fruitcake candy icing. Candy icing gummies gummies cheesecake brownie lemon drops chocolate gingerbread.",
            "image6" : "../images/6.png",
            "emplacement":"Sesame snaps sweet wafer danish. Chupa chups carrot cake icing donut halvah bonbon. Chocolate cake candy marshmallow pudding dessert marzipan jujubes sugar plum.",
            "latitude" : "45.7593",
            "longitude" : "4.8431",
            "photos":"Cake cotton candy lollipop. Cake croissant cheesecake candy sugar plum icing apple pie wafer. Pie sugar plum tiramisu tiramisu pie fruitcake candy icing. Candy icing gummies gummies cheesecake brownie lemon drops chocolate gingerbread.",
            "albumPhotos" : "https://www.flickr.com/photos/125729062@N07/14522173061/player/3931c36915",
            "contacts":"Cake cotton candy lollipop. Cake croissant cheesecake candy sugar plum icing apple pie wafer. Pie sugar plum tiramisu tiramisu pie fruitcake candy icing. Candy icing gummies gummies cheesecake brownie lemon drops chocolate gingerbread."
          }

          ]

        var url = $location.absUrl();
        var param = url.split("/");
        var indiceID = param[param.length-1];
        if(null != data && null != indiceID){
         if(isNumeric(indiceID) && indiceID <= data.length-1 && data[indiceID]["enLigne"] == true){
            $scope.appartement = data[indiceID];
            latitude = $scope.appartement.latitude;
            longitude = $scope.appartement.longitude;
            urlAlbum = $scope.appartement.albumPhotos;
          }else{
            //alert("Désolé ,annonce non disponible");
          }
        }
      }).
      error(function(data, status, headers, config) {
        alert("Bada Bom !"+status[0]+" "+headers[0]);
    });
  });

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

window.onload = loadScript;
